import { useState, useRef, useEffect } from "react";
import { useAi } from "../../hooks/useAi";

export const ChatComposer = () => {
  const { askQuestion, isLoading } = useAi();
  const [query, setQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [query]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const trimmedQuery = query.trim();
    if (!trimmedQuery || isLoading) {
      return;
    }

    setQuery("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    await askQuestion(trimmedQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="arena-command composer-dock mt-auto border-t border-cyan-300/20 p-4 md:p-5"
    >
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          id="question"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='"write 3 lines of indian politics"'
          className="min-h-[50px] max-h-[150px] flex-1 resize-none rounded-xl border border-cyan-300/35 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-200 focus:bg-slate-900"
          rows={1}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-xl bg-cyan-300 px-6 py-[14px] text-xs font-bold tracking-wide text-slate-900 uppercase transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-300"
        >
          {isLoading ? "Wait..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
