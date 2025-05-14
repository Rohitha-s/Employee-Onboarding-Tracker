
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="tm-blue text-white">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Tech Mahindra Logo" className="h-10 w-10" />
            <span className="text-xl font-semibold">Tech Mahindra</span>
          </div>
          <Button 
            onClick={() => navigate("/login")} 
            variant="outline" 
            className="bg-white text-blue-800 hover:bg-blue-50"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20 flex-grow">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight fade-in">
                Employee Onboarding Tracker
              </h1>
              <p className="text-xl opacity-90 fade-in" style={{ animationDelay: "0.2s" }}>
                Streamline your onboarding experience with our comprehensive tracking system. 
                Complete tasks, upload documents, and stay connected with HR—all in one place.
              </p>
              <div className="pt-6 fade-in" style={{ animationDelay: "0.4s" }}>
                <Button 
                  onClick={() => navigate("/login")} 
                  size="lg"
                  className="bg-white text-blue-800 hover:bg-blue-50"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 tm-blue-text">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 tm-blue-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 tm-blue-text">Task Management</h3>
              <p className="text-gray-600">
                Track all your onboarding tasks in one place. View due dates, completion status, and receive notifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 tm-blue-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 tm-blue-text">Document Management</h3>
              <p className="text-gray-600">
                Securely upload, store, and share important documents required for your onboarding process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 tm-blue-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 tm-blue-text">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your progress through visual dashboards and receive timely updates on your onboarding journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p>© 2025 Tech Mahindra. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p>Employee Onboarding Tracker v1.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
