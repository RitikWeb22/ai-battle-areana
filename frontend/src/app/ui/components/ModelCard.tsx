import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface ModelCardProps {
  title: string;
  modelName: string;
  solutionText: string;
  score: number;
  sampling: string;
  accent: "cyan" | "fuchsia";
}

const colorMap = {
  cyan: {
    border: "border-cyan-300/20",
    textTitle: "text-cyan-200",
    textChip: "text-cyan-100",
    borderChip: "border-cyan-300/40",
  },
  fuchsia: {
    border: "border-fuchsia-300/20",
    textTitle: "text-fuchsia-200",
    textChip: "text-fuchsia-100",
    borderChip: "border-fuchsia-300/40",
  },
};

export const ModelCard = ({
  title,
  modelName,
  solutionText,
  score,
  sampling,
  accent,
}: ModelCardProps) => {
  const [copied, setCopied] = useState(false);
  const colors = colorMap[accent];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(solutionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className={`arena-card flex min-h-0 flex-col ${colors.border}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className={`text-[10px] tracking-[0.2em] uppercase ${colors.textTitle}`}>
            {title}
          </p>
          <h3 className={`text-2xl font-bold mt-1 ${colors.textTitle}`}>
            {modelName}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <span className={`latency-chip ${colors.textChip}`}>
            Stable Latency
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`copy-chip ${colors.borderChip} ${colors.textChip}`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      
      <div className="markdown-body flex-1 overflow-y-auto pr-2 chat-scroll">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {solutionText}
        </ReactMarkdown>
      </div>
      
      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-white/10 pt-4 text-[11px] font-medium tracking-wide text-slate-400 uppercase">
        <span>Score: {score}/10</span>
        <span>Sampling: {sampling}</span>
      </div>
    </article>
  );
};
