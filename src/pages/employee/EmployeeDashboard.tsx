
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";
import ProgressBar from "@/components/ProgressBar";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed" | "overdue";
  dueDate?: string;
  daysOverdue?: number;
  taskPath?: string;
}

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate API call to fetch tasks
    setTimeout(() => {
      setPendingTasks([
        {
          id: "profile",
          title: "Complete Personal Information Form",
          description: "Fill out your basic personal information including contact details and emergency contacts.",
          status: "in_progress",
          dueDate: "2025-05-20",
          taskPath: "/employee/profile"
        },
        {
          id: "upload-id",
          title: "Upload ID Proof",
          description: "Upload a scanned copy or clear photograph of your government-issued ID card.",
          status: "not_started",
          dueDate: "2025-05-18",
          taskPath: "/employee/tasks/upload-id"
        },
        {
          id: "company-policies",
          title: "Review Company Policies",
          description: "Read and acknowledge the company policies and code of conduct.",
          status: "not_started",
          dueDate: "2025-05-25",
          taskPath: "/company-policies"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTaskAction = (taskId: string, taskPath?: string) => {
    if (taskPath) {
      // Navigate to the task page if path is defined
      navigate(taskPath);
    } else {
      // Default to tasks page
      navigate(`/employee/tasks/${taskId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "John"}!</h1>
              <p className="text-gray-600 mt-2">Track your onboarding progress and complete your pending tasks.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-md p-3">
                      <img src="/placeholder.svg" alt="Onboarding" className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">Welcome to Tech Mahindra!</h2>
                      <p className="text-gray-600">
                        We're excited to have you join our team. This dashboard will help
                        you track your onboarding progress and complete necessary tasks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium text-gray-700 mb-3">Onboarding Progress</h3>
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Overall completion</span>
                    <span className="float-right font-medium">40%</span>
                  </div>
                  <ProgressBar value={40} maxValue={100} size="md" />
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold tm-blue-text">5</div>
                      <div className="text-sm text-gray-600">Total Tasks</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">2</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">1</div>
                      <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Tasks</h2>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((_, i) => (
                  <Card key={i} className="h-48 animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-auto"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    dueDate={task.dueDate}
                    daysOverdue={task.daysOverdue}
                    onAction={() => handleTaskAction(task.id, task.taskPath)}
                    actionLabel={task.status === "not_started" ? "Start Task" : "Continue"}
                  />
                ))}
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Resources</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition cursor-pointer" onClick={() => navigate("/office-map")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Office Map</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition cursor-pointer" onClick={() => navigate("/holiday-calendar")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Holiday Calendar</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition cursor-pointer" onClick={() => navigate("/company-policies")}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Company Policies</span>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
