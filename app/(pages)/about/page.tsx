import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";
import AboutInstra from "@/components/ui/AboutInstra";
import Values from "@/components/ui/Values";
import WhyUs from "@/components/ui/WhyUs";
import AboutPlugins from "@/components/ui/AboutPlugins";
import CTA from "@/components/ui/CTA";

export const metadata: Metadata = buildMetadata(pageMetadata.about);

export default function AboutPage() {
  return (
    <>
      <AboutInstra />
      <Values />
      <WhyUs />
      <AboutPlugins />
      <CTA />
    </>
  );
}
