
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const onboardingTimeData = [
  { name: 'Completed', value: 14 },
  { name: 'In Progress', value: 10 },
  { name: 'Reviewed', value: 8 },
  { name: 'Pending', value: 12 },
];

const documentCompletionData = [
  { name: 'Completed', value: 67 },
  { name: 'Pending', value: 33 },
];

const taskCompletionByDeptData = [
  { name: 'Rohitha', completed: 78, pending: 22 },
  { name: 'Akash', completed: 75, pending: 25 },
  { name: 'Kavya', completed: 82, pending: 18 },
  { name: 'Lauhitt', completed: 71, pending: 29 },
  { name: 'Shishu', completed: 67, pending: 33 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];
const PIE_COLORS = ['#4CAF50', '#FF9800'];

const HRReports = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
              <p className="text-gray-600 mt-2">Overview of onboarding metrics and analytics.</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="departments">By Department</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Task Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="110%" height="100%">
                        <BarChart
                          data={onboardingTimeData}
                          margin={{ top: 20, right: 50, left: 10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#3B82F6"/>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Document Completion Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={documentCompletionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {documentCompletionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Task Completion by Individuals</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={taskCompletionByDeptData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" fill="#4CAF50" name="Completed (%)" stackId="a" />
                          <Bar dataKey="pending" fill="#FF9800" name="Pending (%)" stackId="a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Departments Tab */}
              <TabsContent value="departments">
                <Card>
                  <CardHeader>
                    <CardTitle>Onboarding Metrics by Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees Onboarded</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Documents</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Engineering</td>
                            <td className="px-6 py-4 whitespace-nowrap">12</td>
                            <td className="px-6 py-4 whitespace-nowrap">4</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Marketing</td>
                            <td className="px-6 py-4 whitespace-nowrap">8</td>
                            <td className="px-6 py-4 whitespace-nowrap">5</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">HR</td>
                            <td className="px-6 py-4 whitespace-nowrap">4</td>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Finance</td>
                            <td className="px-6 py-4 whitespace-nowrap">7</td>
                            <td className="px-6 py-4 whitespace-nowrap">3</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Sales</td>
                            <td className="px-6 py-4 whitespace-nowrap">10</td>
                            <td className="px-6 py-4 whitespace-nowrap">6</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HRReports;
