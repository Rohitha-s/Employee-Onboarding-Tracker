
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import NotificationPanel from './NotificationPanel';

interface NavbarProps {
  showBackButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showBackButton = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="tm-blue text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 rounded-full hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          
          <Link to="/" className="flex items-center space-x-3">
            <span className="font-bold text-xl md:text-2xl">Tech Mahindra</span>
            <span className="text-lg font-light">Onboarding Portal</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <NotificationPanel />

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold border-2 border-white">
                  {user.name.charAt(0)}
                </div>
                <Button onClick={handleLogout} variant="ghost" className="text-white hover:text-blue-200 hover:bg-blue-800">
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
