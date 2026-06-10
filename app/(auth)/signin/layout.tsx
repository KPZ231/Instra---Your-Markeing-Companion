import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageMetadata.signin);

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
