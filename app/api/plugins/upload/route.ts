import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { uploadBundle, buildBundleKey } from "@/lib/plugins/storage";
import { createPlugin, submitVersionForReview } from "@/lib/plugins/registry";
import { parseManifest } from "@/lib/plugins/manifest";

/**
 * POST /api/plugins/upload
 * Accepts multipart/form-data with fields:
 *   - slug: string
 *   - name: string
 *   - description: string
 *   - manifest: JSON string
 *   - bundle: .js file
 *
 * Creates a plugin + version in PENDING_REVIEW state.
 * @returns 201 { pluginId, versionId } on success
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const slug = formData.get("slug");
  const name = formData.get("name");
  const description = formData.get("description");
  const manifestStr = formData.get("manifest");
  const bundleFile = formData.get("bundle");

  if (
    typeof slug !== "string" || !slug.trim() ||
    typeof name !== "string" || !name.trim() ||
    typeof description !== "string" || !description.trim() ||
    typeof manifestStr !== "string" || !manifestStr.trim() ||
    !(bundleFile instanceof File)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ALLOWED_MIME = [
    "application/javascript",
    "text/javascript",
    "text/plain",
  ];
  if (
    !bundleFile.name.endsWith(".js") ||
    (bundleFile.type !== "" && !ALLOWED_MIME.includes(bundleFile.type))
  ) {
    return NextResponse.json({ error: "Bundle must be a .js file" }, { status: 400 });
  }

  let manifestJson: unknown;
  try {
    manifestJson = JSON.parse(manifestStr);
  } catch {
    return NextResponse.json({ error: "Manifest must be valid JSON" }, { status: 400 });
  }

  const manifestResult = parseManifest(manifestJson);
  if (!manifestResult.success) {
    return NextResponse.json(
      { error: "Invalid manifest structure" },
      { status: 400 }
    );
  }

  const bundleCode = await bundleFile.text();
  const storageKey = buildBundleKey(slug.trim(), manifestResult.data.version);

  try {
    await uploadBundle(slug.trim(), manifestResult.data.version, bundleCode);
  } catch {
    return NextResponse.json({ error: "Bundle upload failed" }, { status: 500 });
  }

  let pluginId: string;
  let versionId: string;
  try {
    const { plugin, version } = await createPlugin({
      slug: slug.trim(),
      name: name.trim(),
      description: description.trim(),
      authorId: userId,
      manifest: manifestResult.data,
      bundleStorageKey: storageKey,
    });
    pluginId = plugin.id;
    versionId = version.id;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("already taken")) {
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    return NextResponse.json({ error: "Plugin creation failed" }, { status: 500 });
  }

  try {
    await submitVersionForReview(versionId);
  } catch {
    return NextResponse.json({ error: "Review submission failed" }, { status: 500 });
  }

  return NextResponse.json({ pluginId, versionId }, { status: 201 });
}
