
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue = 100,
  label,
  className,
  showPercentage = true,
  size = "md",
  colorClass = "bg-blue-600",
}) => {
  const percentage = Math.min(Math.round((value / maxValue) * 100), 100);
  
  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  }[size];

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-700">{label}</span>
          {showPercentage && <span className="text-sm text-gray-700">{percentage}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-200 rounded-full", heightClass)}>
        <div
          className={cn("rounded-full transition-all progress-bar", heightClass, colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
