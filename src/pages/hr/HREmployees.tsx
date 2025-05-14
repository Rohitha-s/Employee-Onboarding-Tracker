
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  startDate: string;
  onboardingStatus: "Not Started" | "In Progress" | "Completed";
  phone?: string;
  address?: string;
  department?: string;
  manager?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

const initialEmployees: Employee[] = [
  {
    id: "emp-001",
    name: "Rohitha",
    email: "rohitha@example.com",
    position: "Software Engineer",
    startDate: "2025-05-01",
    onboardingStatus: "In Progress",
    phone: "+1 555-123-4567",
    address: "123 Main St, Anytown, CA 94321",
    department: "Engineering",
    manager: "Srinivasan",
    emergencyContact: {
      name: "Patrick",
      phone: "+1 555-987-6543",
      relation: "Brother"
    }
  },
  {
    id: "emp-002",
    name: "Akash",
    email: "akash@example.com",
    position: "UX Designer",
    startDate: "2025-05-15",
    onboardingStatus: "Not Started",
    phone: "+1 555-234-5678",
    address: "456 Oak St, Somewhere, CA 94322",
    department: "Design",
    manager: "Nagarajan"
  },
  {
    id: "emp-003",
    name: "Kavya",
    email: "kavya@example.com",
    position: "Project Manager",
    startDate: "2025-04-15",
    onboardingStatus: "In Progress",
    phone: "+1 555-345-6789",
    department: "Project Management"
  },
  {
    id: "emp-004",
    name: "Lauhitt",
    email: "lauhitt@example.com",
    position: "HR Specialist",
    startDate: "2025-05-05",
    onboardingStatus: "Not Started",
    department: "Human Resources"
  },
  {
    id: "emp-005",
    name: "Shishu",
    email: "shishu@example.com",
    position: "Data Analyst",
    startDate: "2025-05-20",
    onboardingStatus: "Not Started",
    department: "Analytics"
  }
];

const HREmployees = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [assignTaskDialogOpen, setAssignTaskDialogOpen] = useState(false);
  const [viewEmployeeDialogOpen, setViewEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    startDate: "",
    phone: "",
    department: ""
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    from:"",
    to:""
  });

  const handleAddEmployee = () => {
    // Validate fields
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.startDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new employee
    const employee: Employee = {
      id: `emp-${Math.floor(Math.random() * 1000)}`,
      name: newEmployee.name,
      email: newEmployee.email,
      position: newEmployee.position,
      startDate: newEmployee.startDate,
      onboardingStatus: "Not Started",
      phone: newEmployee.phone,
      department: newEmployee.department
    };

    setEmployees([...employees, employee]);
    setAddDialogOpen(false);
    setNewEmployee({ name: "", email: "", position: "", startDate: "", phone: "", department: "" });

    toast({
      title: "Success",
      description: "Employee added successfully",
    });
  };

  const handleAssignTask = () => {
    if (!selectedEmployee || !newTask.title || !newTask.description || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would make an API call to assign the task
    toast({
      title: "Success",
      description: `Task "${newTask.title}" assigned to ${selectedEmployee.name}`,
    });

    setAssignTaskDialogOpen(false);
    setNewTask({ title: "", description: "", dueDate: "" ,from:"",to:""});
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewEmployeeDialogOpen(true);
  };

  const handleAssignTaskClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setAssignTaskDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
                <p className="text-gray-600 mt-1">Manage onboarding employees and their tasks</p>
              </div>
              <Button onClick={() => setAddDialogOpen(true)}>Add Employee</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow w-full">
              <div className="w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                              {employee.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{employee.startDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${employee.onboardingStatus === "Completed" ? "bg-green-100 text-green-800" : 
                                employee.onboardingStatus === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                "bg-gray-100 text-gray-800"}`}
                          >
                            {employee.onboardingStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewEmployee(employee)}>View</Button>
                            <Button size="sm" onClick={() => handleAssignTaskClick(employee)}>Assign Task</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Employee Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newEmployee.name} 
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newEmployee.email} 
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input 
                      id="position" 
                      value={newEmployee.position} 
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      value={newEmployee.department} 
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={newEmployee.phone} 
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date" 
                      value={newEmployee.startDate} 
                      onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddEmployee}>Add Employee</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Assign Task Dialog */}
            <Dialog open={assignTaskDialogOpen} onOpenChange={setAssignTaskDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Task to {selectedEmployee?.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input 
                      id="title" 
                      value={newTask.title} 
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="title">From</Label>
                    <Input 
                      id="title" 
                      value={newTask.from} 
                      onChange={(e) => setNewTask({...newTask, from: e.target.value})}
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="title">To</Label>
                    <Input 
                      id="title" 
                      value={newTask.to} 
                      onChange={(e) => setNewTask({...newTask, to: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description" 
                      value={newTask.description} 
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      id="dueDate" 
                      type="date" 
                      value={newTask.dueDate} 
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAssignTaskDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAssignTask}>Assign Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* View Employee Dialog */}
            <Dialog open={viewEmployeeDialogOpen} onOpenChange={setViewEmployeeDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Employee Profile</DialogTitle>
                </DialogHeader>
                {selectedEmployee && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {selectedEmployee.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{selectedEmployee.name}</h3>
                        <p className="text-gray-500">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Position</p>
                        <p className="font-medium">{selectedEmployee.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{selectedEmployee.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{selectedEmployee.department || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Manager</p>
                        <p className="font-medium">{selectedEmployee.manager || "Not assigned"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedEmployee.phone || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Onboarding Status</p>
                        <p className="font-medium">{selectedEmployee.onboardingStatus}</p>
                      </div>
                      {selectedEmployee.address && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{selectedEmployee.address}</p>
                        </div>
                      )}
                    </div>
                    
                    {selectedEmployee.emergencyContact && (
                      <div>
                        <h4 className="font-medium mb-2">Emergency Contact</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p><span className="font-medium">Name:</span> {selectedEmployee.emergencyContact.name}</p>
                          <p><span className="font-medium">Phone:</span> {selectedEmployee.emergencyContact.phone}</p>
                          <p><span className="font-medium">Relation:</span> {selectedEmployee.emergencyContact.relation}</p>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Tasks</h4>
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <p className="text-gray-500">No tasks assigned yet</p>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button onClick={() => setViewEmployeeDialogOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <footer className="mt-auto py-4 text-center text-sm text-gray-500">
              <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HREmployees;
