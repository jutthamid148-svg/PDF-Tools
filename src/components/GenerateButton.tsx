import { SparkIcon } from "./Icons";
import { cx } from "./ui";

export function GenerateButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={cx("generate-button", className)}>
      <span className="generate-button-glow" aria-hidden="true" />
      <span className="relative z-10">{children}</span>
      <SparkIcon className="relative z-10 h-5 w-5 generate-button-spark" />
    </button>
  );
}
