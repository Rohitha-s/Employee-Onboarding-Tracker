
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type UserRole = "employee" | "hr" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  resetPassword: (email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for JWT token in localStorage on initial load
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // For mock JWT in our demo, we're using a simple base64 encoded JSON
        // In a real app, this would be a proper JWT token
        const decoded = JSON.parse(atob(token));
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp > currentTime) {
          // Token is still valid
          setUser({
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          });
          setIsAuthenticated(true);
        } else {
          // Token expired, remove it
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock JWT authentication
    // In a real application, this would make an API call to your backend
    
    if (!email || !password) return false;
    
    // For demo purposes, we're generating a mock token based on email
    const isHr = email.includes("hr");
    const role: UserRole = isHr ? "hr" : "employee";
    const name = isHr ? "HR Manager" : "John Doe";
    const id = isHr ? "hr-123" : "emp-456";
    
    // Generate expiration time (24 hours from now)
    const expirationTime = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    
    // Create a mock JWT token payload
    const tokenPayload = {
      sub: id,
      name: name,
      email: email,
      role: role,
      exp: expirationTime
    };
    
    // Encode the token (this is a simplified mock, not a real JWT)
    const mockToken = btoa(JSON.stringify(tokenPayload));
    
    // Store the token
    localStorage.setItem("token", mockToken);
    
    // Set user data
    setUser({
      id,
      name,
      email,
      role,
    });
    
    setIsAuthenticated(true);
    return true;
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset implementation
    // In a real application, this would make an API call to your backend
    
    if (!email) return false;
    
    // Simulate successful password reset request
    // In a real application, the backend would send an email with reset instructions
    console.log(`Password reset requested for: ${email}`);
    
    // Return success
    return true;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    // Mock forgot password implementation
    // In a real application, this would make an API call to your backend
    
    if (!email) return false;
    
    // Simulate successful forgot password request
    // In a real application, the backend would send an email with reset link
    console.log(`Forgot password email sent to: ${email}`);
    
    // Return success
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    resetPassword,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
