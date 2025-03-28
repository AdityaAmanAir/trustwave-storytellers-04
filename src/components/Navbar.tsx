
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Video, LayoutDashboard, Users } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/", icon: <Users className="h-4 w-4 mr-1" /> },
    { name: "Record", path: "/record", icon: <Video className="h-4 w-4 mr-1" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-1" /> },
    { name: "Testimonials", path: "/testimonials", icon: <Users className="h-4 w-4 mr-1" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-500 font-bold text-xl">TrustWave</span>
              <span className="text-gray-600 ml-1 font-light">Storytellers</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors 
                  ${isActive(link.path) 
                    ? 'text-white bg-primary-500 hover:bg-primary-600' 
                    : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Button
              variant="default"
              className="bg-primary-500 hover:bg-primary-600 ml-4"
              asChild
            >
              <Link to="/record">Start Recording</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-primary-500 hover:bg-primary-50"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium
                  ${isActive(link.path) 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Button
                variant="default"
                className="w-full bg-primary-500 hover:bg-primary-600"
                asChild
              >
                <Link to="/record" onClick={() => setIsMenuOpen(false)}>Start Recording</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
