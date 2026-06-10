import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageMetadata.signup);

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
