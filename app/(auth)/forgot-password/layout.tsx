import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(pageMetadata.forgotPassword);

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
