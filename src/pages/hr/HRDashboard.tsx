
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const taskStatusData = [
  { name: "Not Started", value: 65 },
  { name: "In Progress", value: 15 },
  { name: "Completed", value: 20 }
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const taskCategoryData = [
  { name: "Personal Info", count: 3 },
  { name: "Docs", count: 1 },
  { name: "Orientation", count: 2 },
  { name: "Setup", count: 1 }
];

// Sample employees data
const employees = [
  {
    id: "emp-001",
    name: "Rohitha",
    email: "rohitha@example.com",
    position: "Software Engineer",
    startDate: "2025-05-01",
    onboardingStatus: "In Progress"
  },
  {
    id: "emp-002",
    name: "Akash",
    email: "akash@example.com",
    position: "UX Designer",
    startDate: "2025-05-15",
    onboardingStatus: "Not Started"
  },
  {
    id: "emp-003",
    name: "Kavya",
    email: "kavya@example.com",
    position: "Project Manager",
    startDate: "2025-04-15",
    onboardingStatus: "In Progress"
  },
  {
    id: "emp-004",
    name: "Lauhitt",
    email: "lauhitt@example.com",
    position: "HR Specialist",
    startDate: "2025-05-05",
    onboardingStatus: "Not Started"
  },
  {
    id: "emp-005",
    name: "Shishu",
    email: "shishu@example.com",
    position: "Data Analyst",
    startDate: "2025-05-20",
    onboardingStatus: "Not Started"
  }
];

const HRDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-7xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
              <p className="text-gray-600 mt-2">Monitor employee onboarding progress and manage tasks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Tasks" 
                value="5" 
                description="Across all employees"
              />
              <StatCard 
                title="Completed" 
                value="1" 
                description="Tasks verified or completed"
                colorClass="bg-green-50"
                textColorClass="text-green-600"
              />
              <StatCard 
                title="In Progress" 
                value="2"
                description="Tasks currently being worked on"
                colorClass="bg-blue-50"
                textColorClass="text-blue-600"
              />
              <StatCard 
                title="Needs Verification" 
                value="1" 
                description="Tasks awaiting HR approval"
                colorClass="bg-purple-50"
                textColorClass="text-purple-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Task Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {taskStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Task Categories</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={taskCategoryData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#003b7d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Onboarding Employees</h2>
              <Button onClick={() => navigate("/hr/employees")}>View All Employees</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employees.slice(0, 3).map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
                                {employee.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{employee.startDate}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${employee.onboardingStatus === "Completed" ? "bg-green-100 text-green-800" : 
                                employee.onboardingStatus === "In Progress" ? "bg-blue-100 text-blue-800" : 
                                "bg-yellow-100 text-yellow-800"}`}>
                              {employee.onboardingStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => navigate(`/hr/employees`)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {employees.length > 3 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                            <Button 
                              variant="link" 
                              onClick={() => navigate("/hr/employees")}
                            >
                              View {employees.length - 3} more employees
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;
