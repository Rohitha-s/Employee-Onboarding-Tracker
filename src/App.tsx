
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeMyTasks from "./pages/employee/EmployeeMyTasks";
import EmployeeDocuments from "./pages/employee/EmployeeDocuments";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import EmployeeSupport from "./pages/employee/EmployeeSupport";
import HRDashboard from "./pages/hr/HRDashboard";
import HREmployees from "./pages/hr/HREmployees";
import HRTaskTemplates from "./pages/hr/HRTaskTemplates";
import HRReports from "./pages/hr/HRReports";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import OfficeMap from "./pages/resources/OfficeMap";
import HolidayCalendar from "./pages/resources/HolidayCalendar";
import CompanyPolicies from "./pages/resources/CompanyPolicies";
import TaskPage from "./components/TaskPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Employee Routes */}
            <Route 
              path="/employee/dashboard" 
              element={
                <ProtectedRoute role="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/tasks" 
              element={
                <ProtectedRoute role="employee">
                  <EmployeeMyTasks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/tasks/:taskId" 
              element={
                <ProtectedRoute role="employee">
                  <TaskPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/documents" 
              element={
                <ProtectedRoute role="employee">
                  <EmployeeDocuments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/profile" 
              element={
                <ProtectedRoute role="employee">
                  <EmployeeProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/support" 
              element={
                <ProtectedRoute role="employee">
                  <EmployeeSupport />
                </ProtectedRoute>
              } 
            />
            
            {/* HR Routes */}
            <Route 
              path="/hr/dashboard" 
              element={
                <ProtectedRoute role="hr">
                  <HRDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hr/employees" 
              element={
                <ProtectedRoute role="hr">
                  <HREmployees />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hr/task-templates" 
              element={
                <ProtectedRoute role="hr">
                  <HRTaskTemplates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hr/reports" 
              element={
                <ProtectedRoute role="hr">
                  <HRReports />
                </ProtectedRoute>
              } 
            />

            {/* Resource Routes */}
            <Route 
              path="/office-map" 
              element={
                <ProtectedRoute role="employee">
                  <OfficeMap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/holiday-calendar" 
              element={
                <ProtectedRoute role="employee">
                  <HolidayCalendar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company-policies" 
              element={
                <ProtectedRoute role="employee">
                  <CompanyPolicies />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all - 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
