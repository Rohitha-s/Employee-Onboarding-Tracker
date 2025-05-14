
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, Pen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  taskCount: number;
  createdAt: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  category: string;
  daysToComplete: number;
  required: boolean;
}

const taskTemplates: TaskTemplate[] = [
  {
    id: "TT-001",
    name: "Software Engineer Onboarding",
    description: "Standard onboarding tasks for software engineers",
    category: "Engineering",
    department: "Engineering",
    taskCount: 8,
    createdAt: "2025-01-15"
  },
  {
    id: "TT-002",
    name: "Marketing Specialist Onboarding",
    description: "Onboarding for marketing team members",
    category: "Marketing",
    department: "Marketing",
    taskCount: 6,
    createdAt: "2025-02-10"
  },
  {
    id: "TT-003",
    name: "HR New Hire Process",
    description: "Tasks for HR professionals joining the team",
    category: "Human Resources",
    department: "HR",
    taskCount: 7,
    createdAt: "2025-01-20"
  },
  {
    id: "TT-004",
    name: "Finance Department Onboarding",
    description: "Process for finance team members",
    category: "Finance",
    department: "Finance",
    taskCount: 9,
    createdAt: "2025-03-05"
  }
];

const tasks: Task[] = [
  {
    id: "T-001",
    name: "Complete Personal Information Form",
    description: "Fill out the standard employee information form with personal details",
    category: "Documentation",
    daysToComplete: 2,
    required: true
  },
  {
    id: "T-002",
    name: "Upload ID Proof",
    description: "Upload a scanned copy of your government-issued ID",
    category: "Documentation",
    daysToComplete: 3,
    required: true
  },
  {
    id: "T-003",
    name: "Complete IT Security Training",
    description: "Complete the online IT security training module and quiz",
    category: "Training",
    daysToComplete: 7,
    required: true
  },
  {
    id: "T-004",
    name: "Review Employee Handbook",
    description: "Read and acknowledge receipt of the employee handbook",
    category: "Policies",
    daysToComplete: 5,
    required: true
  },
  {
    id: "T-005",
    name: "Set Up Workstation",
    description: "Complete the workstation setup process with IT team",
    category: "Setup",
    daysToComplete: 1,
    required: true
  }
];

const HRTaskTemplates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [taskSearchTerm, setTaskSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null);
  const [templates, setTemplates] = useState<TaskTemplate[]>(taskTemplates);
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    department: "",
    no_of_tasks: "",
    created: ""
  });

  // New task form state
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    category: "",
    daysToComplete: 1,
    required: true,
    from:"",
    to:"",
    priority:""
  });

  const handleViewTemplate = (template: TaskTemplate) => {
    setSelectedTemplate(template);
  };

  const handleDeleteTemplate = (template: TaskTemplate) => {
    setTemplates(templates.filter(t => t.id !== template.id));
    toast({
      title: "Template Deleted",
      description: `"${template.name}" has been deleted.`
    });
  };

  const handleEditTemplate = (template: TaskTemplate) => {
    setEditingTemplate(template);
  };

  const handleSaveEditedTemplate = () => {
    if (!editingTemplate) return;

    setTemplates(templates.map(t =>
      t.id === editingTemplate.id ? editingTemplate : t
    ));

    toast({
      title: "Template Updated",
      description: `"${editingTemplate.name}" has been updated.`
    });

    setEditingTemplate(null);
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description || !newTemplate.category || !newTemplate.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newId = `TT-00${templates.length + 1}`;
    const now = new Date();
    const newTemplateItem: TaskTemplate = {
      id: newId,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      department: newTemplate.department,
      taskCount: 0,
      createdAt: now.toISOString().split('T')[0]
    };

    setTemplates([...templates, newTemplateItem]);

    toast({
      title: "Template Created",
      description: `"${newTemplate.name}" has been created.`
    });

    setNewTemplate({
      name: "",
      description: "",
      category: "",
      department: "",
      no_of_tasks: "",
      created: ""
    });
  };

  const handleCreateTask = () => {
    if (!newTask.name || !newTask.description || !newTask.category || newTask.daysToComplete < 1) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newId = `T-00${taskList.length + 1}`;
    const newTaskItem: Task = {
      id: newId,
      name: newTask.name,
      description: newTask.description,
      category: newTask.category,
      daysToComplete: newTask.daysToComplete,
      required: newTask.required,
      from:newTask.from,
      to:newTask.to,
      priority:newTask.priority
    };

    setTaskList([...taskList, newTaskItem]);

    toast({
      title: "Task Created",
      description: `Task "${newTask.name}" has been created.`
    });

    setNewTask({
      name: "",
      description: "",
      category: "",
      daysToComplete: 1,
      required: true,
      from:"",
      to:"",
      priority:""
    });
  };

  const handleDeleteTask = (task: Task) => {
    setTaskList(taskList.filter(t => t.id !== task.id));
    toast({
      title: "Task Deleted",
      description: `Task "${task.name}" has been deleted.`
    });
  };

  const filteredTemplates = templates.filter(template => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      template.name.toLowerCase().includes(searchTermLower) ||
      template.description.toLowerCase().includes(searchTermLower) ||
      template.category.toLowerCase().includes(searchTermLower) ||
      template.department.toLowerCase().includes(searchTermLower)
    );
  });

  const filteredTasks = taskList.filter(task => {
    const searchTermLower = taskSearchTerm.toLowerCase();
    return (
      task.name.toLowerCase().includes(searchTermLower) ||
      task.description.toLowerCase().includes(searchTermLower) ||
      task.category.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Task Templates</h1>
              <p className="text-gray-600 mt-2">Create and manage onboarding task templates for different roles.</p>
            </div>

            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="tasks">Individual Tasks</TabsTrigger>
              </TabsList>

              {/* Templates Tab */}
              <TabsContent value="templates">
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                  <div className="flex-grow max-w-md">
                    <Input
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Template</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Template</DialogTitle>
                        <DialogDescription>
                          Create a new template for onboarding tasks.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="templateName" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="templateName"
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="templateName" className="text-right">
                            No.of Tasks
                          </Label>
                          <Input
                            id="templateName"
                            value={newTemplate.no_of_tasks}
                            onChange={(e) => setNewTemplate({ ...newTemplate, no_of_tasks: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="templateName" className="text-right">
                            Created on
                          </Label>
                          <Input
                            id="templateName"
                            value={newTemplate.created}
                            onChange={(e) => setNewTemplate({ ...newTemplate, created: e.target.value })}
                            className="col-span-3"
                          />
                        </div>

                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="templateDescription" className="text-right pt-2">
                            Description
                          </Label>
                          <Textarea
                            id="templateDescription"
                            value={newTemplate.description}
                            onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                            className="col-span-3"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="templateCategory" className="text-right">
                            Category
                          </Label>
                          <Select
                            value={newTemplate.category}
                            onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Onboarding Process">Onboarding Process</SelectItem>
                              <SelectItem value="Document Submission">Document Submission</SelectItem>
                              <SelectItem value="Setup Access">Setup Access</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="templateDepartment" className="text-right">
                            Department
                          </Label>
                          <Select
                            value={newTemplate.department}
                            onValueChange={(value) => setNewTemplate({ ...newTemplate, department: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleCreateTemplate}>Create Template</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <Badge>{template.department}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                          <span>{template.taskCount} tasks</span>
                          <span>Created: {template.createdAt}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleViewTemplate(template)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => handleEditTemplate(template)}
                              >
                                <Pen className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                              <DialogHeader>
                                <DialogTitle>Edit Template</DialogTitle>
                                <DialogDescription>
                                  Update the template details.
                                </DialogDescription>
                              </DialogHeader>
                              {editingTemplate && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="editTemplateName" className="text-right">
                                      Name
                                    </Label>
                                    <Input
                                      id="editTemplateName"
                                      value={editingTemplate.name}
                                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="templateName" className="text-right">
                                      No.of Tasks
                                    </Label>
                                    <Input
                                      id="templateName"
                                      value={newTemplate.no_of_tasks}
                                      onChange={(e) => setNewTemplate({ ...newTemplate, no_of_tasks: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="templateName" className="text-right">
                                      Created on
                                    </Label>
                                    <Input
                                      id="templateName"
                                      value={newTemplate.created}
                                      onChange={(e) => setNewTemplate({ ...newTemplate, created: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="editTemplateDescription" className="text-right pt-2">
                                      Description
                                    </Label>
                                    <Textarea
                                      id="editTemplateDescription"
                                      value={editingTemplate.description}
                                      onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                                      className="col-span-3"
                                      rows={3}
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="editTemplateCategory" className="text-right">
                                      Category
                                    </Label>
                                    <Select
                                      value={editingTemplate.category}
                                      onValueChange={(value) => setEditingTemplate({ ...editingTemplate, category: value })}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Onboarding Process">Onboarding Process</SelectItem>
                                        <SelectItem value="Document Submission">Document Submission</SelectItem>
                                        <SelectItem value="Setup Access">Setup access</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="editTemplateDepartment" className="text-right">
                                      Department
                                    </Label>
                                    <Select
                                      value={editingTemplate.department}
                                      onValueChange={(value) => setEditingTemplate({ ...editingTemplate, department: value })}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select department" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Engineering">Engineering</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="HR">HR</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button type="submit" onClick={handleSaveEditedTemplate}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteTemplate(template)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Individual Tasks Tab */}
              <TabsContent value="tasks">
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                  <div className="flex-grow max-w-md">
                    <Input
                      placeholder="Search tasks..."
                      value={taskSearchTerm}
                      onChange={(e) => setTaskSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Task</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>
                          Create a new task that can be added to onboarding templates.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskName" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="taskName"
                            placeholder="Enter task name"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskName" className="text-right">
                            From
                          </Label>
                          <Input
                            id="taskName"
                            placeholder="Enter the task giver's id"
                            value={newTask.from}
                            onChange={(e) => setNewTask({ ...newTask, from: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskName" className="text-right">
                            To
                          </Label>
                          <Input
                            id="taskName"
                            placeholder="Enter the task receiver's id"
                            value={newTask.to}
                            onChange={(e) => setNewTask({ ...newTask, to: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskCategory" className="text-right">
                            Priority
                          </Label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskCategory" className="text-right">
                            Category
                          </Label>
                          <Select
                            value={newTask.category}
                            onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Documentation">Documentation</SelectItem>
                              <SelectItem value="Training">Training</SelectItem>
                              <SelectItem value="Setup">Setup</SelectItem>
                              <SelectItem value="Policies">Policies</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taskDays" className="text-right">
                            Days to Complete
                          </Label>
                          <Input
                            id="taskDays"
                            type="number"
                            placeholder="Enter days"
                            value={newTask.daysToComplete.toString()}
                            onChange={(e) => setNewTask({ ...newTask, daysToComplete: parseInt(e.target.value) || 1 })}
                            className="col-span-3"
                            min={1}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="taskDescription" className="text-right pt-2">
                            Description
                          </Label>
                          <Textarea
                            id="taskDescription"
                            placeholder="Enter task description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            className="col-span-3"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Required</Label>
                          <div className="flex items-center space-x-2 col-span-3">
                            <input
                              type="checkbox"
                              id="taskRequired"
                              className="w-4 h-4"
                              checked={newTask.required}
                              onChange={(e) => setNewTask({ ...newTask, required: e.target.checked })}
                            />
                            <Label htmlFor="taskRequired">Task is required for completion</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleCreateTask}>Save Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Required
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredTasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                  <div className="text-sm text-gray-500">{task.description}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="outline">{task.category}</Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{task.daysToComplete} {task.daysToComplete === 1 ? 'day' : 'days'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex rounded-full h-2.5 w-2.5 ${task.required ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                <span className="ml-1.5 text-sm text-gray-900">{task.required ? 'Yes' : 'No'}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDeleteTask(task)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Template View Dialog */}
            <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{selectedTemplate?.name}</DialogTitle>
                  <DialogDescription>
                    {selectedTemplate?.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Department:</span> {selectedTemplate?.department}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Created:</span> {selectedTemplate?.createdAt}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Tasks in Template</h3>
                  <div className="max-h-[300px] overflow-y-auto border rounded-md">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Required</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {tasks.slice(0, 5).map((task) => (
                          <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium">{task.name}</div>
                            </td>
                            <td className="px-4 py-3 text-sm">{task.category}</td>
                            <td className="px-4 py-3 text-sm">{task.daysToComplete} days</td>
                            <td className="px-4 py-3 text-center">
                              {task.required ? (
                                <svg className="h-5 w-5 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-gray-300 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setEditingTemplate(selectedTemplate);
                    setSelectedTemplate(null);
                  }}>
                    Edit Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HRTaskTemplates;
