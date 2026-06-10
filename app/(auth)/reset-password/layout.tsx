import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageMetadata.resetPassword);

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
