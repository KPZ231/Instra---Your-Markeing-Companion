"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaFile, FaFolder, FaFolderOpen } from "react-icons/fa6";
import type { DocNode } from "@/lib/api/docs";

interface DocsSidebarProps {
  tree: DocNode[];
}

interface FolderNodeProps {
  node: Extract<DocNode, { type: "folder" }>;
  depth: number;
}

interface FileNodeProps {
  node: Extract<DocNode, { type: "file" }>;
  depth: number;
}

/**
 * Collapsible folder entry in the docs sidebar.
 */
function FolderNode({ node, depth }: FolderNodeProps) {
  const pathname = usePathname();
  const isAnyChildActive = pathname.includes(`/docs/${node.children
    .flatMap((c) => (c.type === "file" ? [c.slug.join("/")] : []))
    .find((s) => pathname.endsWith(s)) ?? "__none__"}`);

  const [isOpen, setIsOpen] = useState(isAnyChildActive || depth === 0);

  return (
    <div>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-2 w-full py-1.5 px-3 rounded text-sm transition-colors duration-100 cursor-pointer group"
        style={{
          paddingLeft: `${12 + depth * 14}px`,
          color: "var(--color-on-surface-variant)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className="shrink-0"
          style={{ color: "var(--color-outline)" }}
        >
          <FaChevronRight size={10} />
        </motion.span>
        {isOpen ? (
          <FaFolderOpen size={12} className="shrink-0" style={{ color: "var(--color-outline)" }} />
        ) : (
          <FaFolder size={12} className="shrink-0" style={{ color: "var(--color-outline)" }} />
        )}
        <span className="truncate tracking-wide">{node.title}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <NodeList nodes={node.children} depth={depth + 1} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Clickable file entry in the docs sidebar.
 */
function FileNode({ node, depth }: FileNodeProps) {
  const pathname = usePathname();
  const href = `/docs/${node.slug.join("/")}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="flex items-center gap-2 py-1.5 rounded text-sm transition-colors duration-100"
      style={{
        paddingLeft: `${12 + depth * 14}px`,
        paddingRight: "12px",
        color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!isActive)
          (e.currentTarget as HTMLAnchorElement).style.background =
            "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isActive)
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
      }}
    >
      <FaFile
        size={11}
        className="shrink-0"
        style={{ color: isActive ? "var(--color-primary)" : "var(--color-outline)" }}
      />
      <span className="truncate tracking-wide">{node.title}</span>
    </Link>
  );
}

/**
 * Renders a list of DocNodes (mixed files and folders).
 */
function NodeList({ nodes, depth }: { nodes: DocNode[]; depth: number }) {
  return (
    <div className="flex flex-col">
      {nodes.map((node) =>
        node.type === "folder" ? (
          <FolderNode key={node.name} node={node} depth={depth} />
        ) : (
          <FileNode key={node.slug.join("/")} node={node} depth={depth} />
        )
      )}
    </div>
  );
}

/**
 * Left-side documentation navigation sidebar.
 * Reads DocNode tree from server, highlights the active route via usePathname.
 * @param tree - Pre-built doc tree from getDocsTree()
 */
export default function DocsSidebar({ tree }: DocsSidebarProps) {
  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 min-h-screen sticky top-[73px] self-start py-8"
      style={{
        borderRight: "1px solid rgba(255,255,255,0.055)",
        height: "calc(100vh - 73px)",
        overflowY: "auto",
      }}
    >
      <p
        className="px-3 mb-3 text-xs font-mono tracking-widest uppercase"
        style={{ color: "var(--color-outline)" }}
      >
        Documentation
      </p>
      <nav>
        <NodeList nodes={tree} depth={0} />
      </nav>
    </aside>
  );
}
