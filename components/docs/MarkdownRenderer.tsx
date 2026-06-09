import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1
      className="text-3xl font-semibold mb-6 pb-3 leading-tight"
      style={{
        color: "var(--color-primary)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="text-xl font-semibold mt-10 mb-4 leading-snug"
      style={{ color: "var(--color-on-surface)", fontFamily: "var(--font-sans)" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="text-base font-semibold mt-7 mb-3"
      style={{ color: "var(--color-on-surface)", fontFamily: "var(--font-sans)" }}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className="text-sm font-semibold mt-5 mb-2 uppercase tracking-widest"
      style={{ color: "var(--color-on-surface-variant)", fontFamily: "var(--font-sans)" }}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p
      className="mb-4 leading-7 text-sm"
      style={{ color: "var(--color-on-surface-variant)" }}
    >
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="transition-colors duration-150 underline underline-offset-2"
      style={{ color: "var(--color-secondary)", textDecorationColor: "var(--color-outline)" }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul
      className="mb-4 pl-5 flex flex-col gap-1.5 text-sm list-disc"
      style={{ color: "var(--color-on-surface-variant)" }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className="mb-4 pl-5 flex flex-col gap-1.5 text-sm list-decimal"
      style={{ color: "var(--color-on-surface-variant)" }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-6">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="my-4 pl-4 py-1 text-sm italic"
      style={{
        borderLeft: "3px solid var(--color-outline-variant)",
        color: "var(--color-on-surface-variant)",
        background: "rgba(255,255,255,0.025)",
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code
          className={`${className ?? ""} block text-xs leading-6 font-mono`}
          style={{ color: "var(--color-on-surface)" }}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="text-xs font-mono px-1.5 py-0.5 rounded"
        style={{
          background: "var(--color-surface-container-high)",
          color: "var(--color-accent-bone)",
        }}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre
      className="my-5 p-4 rounded overflow-x-auto text-xs leading-6"
      style={{
        background: "var(--color-surface-container-lowest)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto">
      <table
        className="w-full text-sm border-collapse"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th
      className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-widest"
      style={{ color: "var(--color-on-surface)" }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="px-4 py-2.5 text-xs"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}
    >
      {children}
    </td>
  ),
  hr: () => (
    <hr
      className="my-8"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: "var(--color-on-surface)" }}>
      {children}
    </strong>
  ),
};

/**
 * Renders a markdown string using the project's Executive Precision design tokens.
 * Supports GFM (tables, strikethrough, task lists) and syntax highlighting.
 * @param content - Raw markdown string
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
