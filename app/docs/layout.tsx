import type { Metadata } from "next";
import { getDocsTree } from "@/lib/api/docs";
import DocsSidebar from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: "Documentation — Instra",
  description: "Instra technical documentation: auth, database, i18n, architecture, and more.",
};

/**
 * Two-column docs layout: sticky sidebar on the left, scrollable content on the right.
 * The sidebar tree is built at render time from the /docs/ filesystem — fully dynamic.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const tree = getDocsTree();

  return (
    <div className="flex w-full min-h-[calc(100vh-73px)]">
      <DocsSidebar tree={tree} />
      <main className="flex-1 min-w-0 px-8 md:px-14 py-12">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
