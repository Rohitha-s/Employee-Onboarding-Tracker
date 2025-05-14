
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type TaskStatus = "not_started" | "in_progress" | "completed" | "overdue";

interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  daysOverdue?: number;
  onAction?: () => void;
  actionLabel?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  dueDate,
  daysOverdue,
  onAction,
  actionLabel = "Start Task"
}) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "overdue":
        return "Overdue";
      default:
        return "Not Started";
    }
  };

  const getActionLabel = () => {
    switch (status) {
      case "completed":
        return "View Details";
      case "in_progress":
        return "Continue";
      case "overdue":
        return "Complete Now";
      default:
        return actionLabel;
    }
  };

  return (
    <Card className="task-card border rounded-lg overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={cn("ml-2", getStatusColor(status))}>
            {getStatusText(status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-gray-600 text-sm">{description}</p>
        {dueDate && (
          <div className="mt-4 text-sm">
            <span className="text-gray-500">Due: </span>
            <span className={cn(status === "overdue" ? "text-red-600 font-medium" : "text-gray-700")}>
              {dueDate}
            </span>
          </div>
        )}
        {status === "overdue" && daysOverdue && (
          <div className="mt-1 text-sm text-red-600">
            Overdue by {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={onAction} 
          variant={status === "completed" ? "outline" : "default"}
          className={cn(
            "w-full",
            status === "overdue" && "bg-red-600 hover:bg-red-700"
          )}
        >
          {getActionLabel()}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
