
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { FileText, User, BookOpen } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "not_started" | "in_progress" | "completed";
  type: "document" | "form" | "training" | "profile" | "course";
  formFields?: Record<string, string>;
  trainingContent?: string;
  routePath?: string;
}

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Profile",
    description: "Complete your employee profile with all necessary information",
    dueDate: "2025-05-15",
    status: "not_started",
    type: "profile",
    routePath: "/employee/profile"
  },
  {
    id: "task-3",
    title: "Introduction to Tech Mahindra",
    description: "Learn about Tech Mahindra's history, culture, and values",
    dueDate: "2025-05-20",
    status: "not_started",
    type: "course",
    trainingContent: `
      <h2>Introduction to Tech Mahindra</h2>
      <p>Welcome to Tech Mahindra! This course will help you understand our company's history, values, and culture.</p>
      
      <h3>Module 1: Company History</h3>
      <p>Tech Mahindra is an Indian multinational technology company that provides information technology (IT) and business process outsourcing (BPO) services. It was founded in 1986 as a joint venture between Mahindra & Mahindra and British Telecommunications.</p>
      
      <h3>Module 2: Values and Mission</h3>
      <p>Our core values:</p>
      <ul>
        <li>Good Corporate Citizenship</li>
        <li>Professionalism</li>
        <li>Customer First</li>
        <li>Quality Focus</li>
        <li>Dignity of the Individual</li>
      </ul>
      
      <h3>Module 3: Global Presence</h3>
      <p>Tech Mahindra has operations in over 90 countries with more than 125,000 employees serving 900+ global customers, including Fortune 500 companies.</p>
      
      <p>After reviewing this content, please mark the task as completed to acknowledge your understanding of Tech Mahindra's background and values.</p>
    `
  },
  {
    id: "task-4",
    title: "Submit Bank Details",
    description: "Provide your bank account details for salary processing",
    dueDate: "2025-05-18",
    status: "not_started",
    type: "form",
    formFields: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      branchName: "",
      accountType: ""
    }
  },
  {
    id: "task-6",
    title: "IT Security Fundamentals",
    description: "Learn essential IT security practices and protocols",
    dueDate: "2025-05-22",
    status: "not_started",
    type: "course",
    trainingContent: `
      <h2>IT Security Fundamentals</h2>
      <p>Welcome to the IT Security Fundamentals course. This training is essential for all Tech Mahindra employees.</p>
      
      <h3>Module 1: Password Security</h3>
      <ul>
        <li>Use strong passwords with a combination of uppercase, lowercase, numbers, and special characters</li>
        <li>Never share your password with anyone</li>
        <li>Change your password every 90 days</li>
        <li>Do not use the same password for multiple accounts</li>
      </ul>
      
      <h3>Module 2: Phishing Awareness</h3>
      <ul>
        <li>Be cautious of emails from unknown senders</li>
        <li>Do not click on suspicious links or download attachments from unknown sources</li>
        <li>Verify sender email addresses carefully</li>
        <li>Report suspicious emails to the IT security team</li>
      </ul>
      
      <h3>Module 3: Data Protection</h3>
      <ul>
        <li>Encrypt sensitive data</li>
        <li>Only access data that you need for your role</li>
        <li>Do not share confidential information via unsecured channels</li>
        <li>Lock your computer when away from your desk</li>
      </ul>
      
      <p>After reviewing this content, please mark the task as completed to acknowledge your understanding and compliance with Tech Mahindra's IT security policies.</p>
    `
  }
];

const EmployeeMyTasks = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const handleFormSubmit = () => {
    if (!selectedTask) return;

    // Check if all fields are filled
    const requiredFields = selectedTask.formFields ? Object.keys(selectedTask.formFields) : [];
    const allFieldsFilled = requiredFields.every(field => formValues[field]?.trim());
    
    if (!allFieldsFilled) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Update task status
    setTaskList(taskList.map(task => 
      task.id === selectedTask.id ? {...task, status: "completed" as const} : task
    ));
    
    toast({
      title: "Form Submitted",
      description: "Your information has been submitted successfully"
    });
    
    setFormValues({});
    setSelectedTask(null);
    setFormDialogOpen(false);
  };

  const handleCompleteTraining = () => {
    if (!selectedTask) return;
    
    // Update task status
    setTaskList(taskList.map(task => 
      task.id === selectedTask.id ? {...task, status: "completed" as const} : task
    ));
    
    toast({
      title: "Training Completed",
      description: "You have successfully completed the training"
    });
    
    setSelectedTask(null);
    setTrainingDialogOpen(false);
  };
  
  const handleStartTask = (task: Task) => {
    setSelectedTask(task);
    
    if (task.type === "form") {
      // Initialize form values
      if (task.formFields) {
        const initialValues: Record<string, string> = {};
        Object.keys(task.formFields).forEach(key => {
          initialValues[key] = "";
        });
        setFormValues(initialValues);
      }
      setFormDialogOpen(true);
    } else if (task.type === "course" || task.type === "training") {
      setTrainingDialogOpen(true);
    } else if (task.type === "profile") {
      // Navigate to profile page
      navigate(task.routePath || "/employee/profile");
    } else if (task.routePath) {
      // Navigate to the specified route
      navigate(task.routePath);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
              <p className="text-gray-600 mt-2">Review and complete your onboarding tasks.</p>
            </div>

            <div className="space-y-4">
              {taskList.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{task.title}</CardTitle>
                      {getStatusBadge(task.status)}
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Due Date:</span> {task.dueDate}
                      </div>
                      <div className="flex space-x-2">
                        {task.status !== "completed" && (
                          <Button size="sm" onClick={() => handleStartTask(task)}>
                            {task.type === "document" && <FileText className="h-4 w-4 mr-2" />}
                            {task.type === "form" && <User className="h-4 w-4 mr-2" />}
                            {(task.type === "course" || task.type === "training") && <BookOpen className="h-4 w-4 mr-2" />}
                            {task.status === "in_progress" ? "Continue" : "Start Task"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>

      {/* Form Dialog */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>{selectedTask?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTask?.id === "task-4" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formValues.bankName || ""}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    placeholder="Enter bank name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formValues.accountNumber || ""}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={formValues.ifscCode || ""}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                    placeholder="Enter IFSC code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    value={formValues.branchName || ""}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                    placeholder="Enter branch name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Input
                    id="accountType"
                    value={formValues.accountType || ""}
                    onChange={(e) => handleInputChange("accountType", e.target.value)}
                    placeholder="Savings/Current"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleFormSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course/Training Dialog */}
      <Dialog open={trainingDialogOpen} onOpenChange={setTrainingDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div 
              className="prose prose-blue max-w-none" 
              dangerouslySetInnerHTML={{ __html: selectedTask?.trainingContent || "" }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTrainingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCompleteTraining}>Mark as Completed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeMyTasks;
