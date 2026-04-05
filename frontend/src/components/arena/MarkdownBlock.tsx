import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { useState } from "react";

type MarkdownBlockProps = {
  content: string;
};

const MarkdownBlock = ({ content }: MarkdownBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="arena-markdown-block">
      <button
        type="button"
        className="arena-copy-btn"
        onClick={handleCopy}
        aria-label="Copy markdown"
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const rawCode = String(children).replace(/\n$/, "");
            const languageMatch = /language-(\w+)/.exec(className || "");

            if (!className) {
              return (
                <code className="arena-inline-code" {...props}>
                  {children}
                </code>
              );
            }

            const highlighted = languageMatch
              ? hljs.highlight(rawCode, { language: languageMatch[1] }).value
              : hljs.highlightAuto(rawCode).value;

            return (
              <pre className="arena-code-block">
                <code
                  className={`hljs ${className}`}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownBlock;
