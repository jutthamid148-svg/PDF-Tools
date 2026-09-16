import { useState } from "react";
import { button, cx } from "#/components/ui";
import { SparkIcon, SummarizeIcon, ChatIcon, QuizIcon, NotesIcon, LightbulbIcon, WandIcon } from "#/components/Icons";

interface AiToolbarProps {
  onAction: (action: string, prompt: string) => void;
  isLoading: boolean;
}

const AI_ACTIONS = [
  {
    id: "summarize",
    label: "Summarize",
    icon: SummarizeIcon,
    prompt: "Summarize this document concisely.",
  },
  {
    id: "key-points",
    label: "Key Points",
    icon: LightbulbIcon,
    prompt: "List the key points from this document.",
  },
  {
    id: "explain",
    label: "Explain",
    icon: WandIcon,
    prompt: "Explain the main concepts in this document in simple terms.",
  },
  {
    id: "quiz",
    label: "Quiz Me",
    icon: QuizIcon,
    prompt: "Create 5 quiz questions based on this document.",
  },
  {
    id: "notes",
    label: "Take Notes",
    icon: NotesIcon,
    prompt: "Create organized study notes from this document.",
  },
  {
    id: "chat",
    label: "Ask AI",
    icon: ChatIcon,
    prompt: "__chat__",
  },
];

export function AiToolbar({ onAction, isLoading }: AiToolbarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="animate-blur-in rounded-2xl glass p-4 ring-1 ring-brand-100 dark:ring-brand-600/25 animate-glow-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-white animate-float">
            <SparkIcon className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-semibold text-ink-900 dark:text-white">
            AI Quick Actions
          </span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={button("ghost", "sm")}
        >
          {expanded ? "Less" : "More"}
        </button>
      </div>

      <div className={cx(
        "mt-3 flex flex-wrap gap-2",
        !expanded && "overflow-hidden max-h-[60px]",
      )}>
        {AI_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action.id, action.prompt)}
              disabled={isLoading}
              className={cx(
                "btn-press hover-scale inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium ring-1 transition-all",
                "bg-white text-ink-700 ring-ink-200 hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-300",
                "dark:bg-ink-800 dark:text-ink-200 dark:ring-ink-700 dark:hover:bg-brand-600/15 dark:hover:text-brand-300 dark:hover:ring-brand-600/40",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
