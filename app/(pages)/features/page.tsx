import type { Metadata } from "next";
import { buildMetadata, pageMetadata } from "@/lib/seo/metadata";
import PageHeader from "@/components/ui/PageHeader";
import FeaturesSection from "@/components/ui/FeaturesSection";
import OpenSourcePlugins from "@/components/ui/OpenSourcePlugins";
import CTA from "@/components/ui/CTA";

export const metadata: Metadata = buildMetadata(pageMetadata.features);

export default function FeaturesPage() {
  return (
    <>
      <PageHeader i18nPrefix="featuresHeader" headingId="features-heading" />
      <FeaturesSection />
      <OpenSourcePlugins />
      <CTA />
    </>
  );
}
