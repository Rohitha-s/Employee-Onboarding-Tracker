
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation items based on user role
  const employeeNavItems = [
    { name: "Dashboard", path: "/employee/dashboard", icon: "dashboard" },
    { name: "My Tasks", path: "/employee/tasks", icon: "file-text" },
    { name: "Documents", path: "/employee/documents", icon: "file-text" },
    { name: "My Profile", path: "/employee/profile", icon: "user" },
    { name: "Support", path: "/employee/support", icon: "users" },
  ];

  const hrNavItems = [
    { name: "Dashboard", path: "/hr/dashboard", icon: "dashboard" },
    { name: "Employees", path: "/hr/employees", icon: "users" },
    { name: "Task Templates", path: "/hr/task-templates", icon: "file-text" },
    { name: "Reports", path: "/hr/reports", icon: "file-text" },
  ];

  const navItems = user?.role === "hr" ? hrNavItems : employeeNavItems;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dashboard":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "users":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case "file-text":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "user":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        );
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex-shrink-0">
      <div className="p-4 pt-0 h-full flex flex-col">
        <div className="mt-2 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="flex-shrink-0">{getIcon(item.icon)}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <img src="/placeholder.svg" alt="Tech Mahindra" className="h-8 w-8" />
            <div className="text-xs">
              <div>Tech Mahindra Ltd.</div>
              <div className="text-gray-500">Employee Portal v1.0</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
