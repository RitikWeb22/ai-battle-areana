import { type FormEvent } from "react";

type ArenaComposerProps = {
  prompt: string;
  isSubmitting: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void | Promise<void>;
};

const ArenaComposer = ({
  prompt,
  isSubmitting,
  onPromptChange,
  onSubmit,
}: ArenaComposerProps) => {
  return (
    <form className="arena-form arena-form--bottom" onSubmit={onSubmit}>
      <input
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder="Ask something like: what is the capital of France?"
        aria-label="Prompt input"
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Battling..." : "Start Battle"}
      </button>
    </form>
  );
};

export default ArenaComposer;
