import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { LogOut, User, Menu, X } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  if (location.pathname === "/") return null;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Pathlight</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/saved-roadmaps"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Saved Roadmaps
                </Link>
                <span className="text-sm text-gray-700">
                  Hello, {user.displayName}
                </span>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-sm bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors">
                    <User size={16} />
                    <span>Account</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/saved-roadmaps"
                className="text-sm text-gray-700 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Saved Roadmaps
              </Link>
              <span className="text-sm text-gray-700 px-4">
                Hello, {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
