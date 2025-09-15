import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { LogOut, User, Menu, X, Compass } from "lucide-react";

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
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 group focus-ring rounded-lg px-2 py-1"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Pathlight
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                Career Guidance
              </span>
            </div>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link
                  to="/saved-roadmaps"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-ring text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  Saved Roadmaps
                </Link>
                <Link
                  to="/quiz"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-ring text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  Take Quiz
                </Link>
              </nav>

              {/* User Profile */}
              <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>

                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 transition-all duration-200 focus-ring border border-gray-200 hover:border-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                      {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <User size={16} className="text-gray-600" />
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus-ring"
                    >
                      <LogOut size={16} className="text-gray-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus-ring"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-600" />
                ) : (
                  <Menu size={24} className="text-gray-600" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col space-y-1">
              <Link
                to="/saved-roadmaps"
                className="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Saved Roadmaps
              </Link>
              <Link
                to="/quiz"
                className="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Take Quiz
              </Link>

              <div className="px-4 py-3 border-t border-gray-200 mt-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="text-gray-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
