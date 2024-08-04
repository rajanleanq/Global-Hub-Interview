import { cn } from "../../../core/lib/utils";

export default function Progress({ percentage }: { percentage: number }) {
  return (
    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden ">
      <div
        data-testid="progress-bar"
        className={cn(
          "flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500",
          ""
        )}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
