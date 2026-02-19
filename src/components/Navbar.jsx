import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showWhiteNav = !isLandingPage || scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showWhiteNav ? 'bg-white shadow-sm' : 'bg-[#015388]/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" data-testid="navbar-logo">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showWhiteNav ? 'bg-[#015388]' : 'bg-white/20'}`}>
              <Dog className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${showWhiteNav ? 'text-[#015388]' : 'text-white'}`}>
              Perdidog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/#features" 
              className={`font-medium transition-colors ${showWhiteNav ? 'text-gray-600 hover:text-[#015388]' : 'text-white/90 hover:text-white'}`}
            >
              Características
            </Link>
            <Link 
              to="/#how-it-works" 
              className={`font-medium transition-colors ${showWhiteNav ? 'text-gray-600 hover:text-[#015388]' : 'text-white/90 hover:text-white'}`}
            >
              Cómo Funciona
            </Link>
            <Link 
              to="/#download" 
              className={`font-medium transition-colors ${showWhiteNav ? 'text-gray-600 hover:text-[#015388]' : 'text-white/90 hover:text-white'}`}
            >
              Descargar
            </Link>
            <Link to="/login" data-testid="login-button">
              <Button 
                className={`rounded-full px-6 ${showWhiteNav ? 'bg-[#015388] text-white hover:bg-[#016dad]' : 'bg-white text-[#015388] hover:bg-gray-100'}`}
              >
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${showWhiteNav ? 'text-[#015388]' : 'text-white'}`}
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              <Link 
                to="/#features" 
                className="block py-2 text-gray-600 hover:text-[#015388] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Características
              </Link>
              <Link 
                to="/#how-it-works" 
                className="block py-2 text-gray-600 hover:text-[#015388] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Cómo Funciona
              </Link>
              <Link 
                to="/#download" 
                className="block py-2 text-gray-600 hover:text-[#015388] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Descargar
              </Link>
              <Link 
                to="/login" 
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full bg-[#015388] text-white hover:bg-[#016dad] rounded-full">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
