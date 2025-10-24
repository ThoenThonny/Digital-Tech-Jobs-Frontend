import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, User, LogOut, Briefcase } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../../service/Auth'; // Adjust path to your authService

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and route changes
  useEffect(() => {
    checkAuthStatus();
  }, [location]); // Re-check when route changes

  const checkAuthStatus = async () => {
    try {
      const token = authService.getToken();
      if (token) {
        // Verify token is still valid by getting current user
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      authService.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      setUser(null);
      setProfileOpen(false);
      setIsOpen(false);
      authService.removeToken();
      navigate('/');
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'user':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('.profile-dropdown')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  if (loading) {
    return (
      <div className="flex justify-center z-50 fixed w-full items-center flex-col mt-2">
        <nav className="bg-white w-[90%] sticky top-0 z-50 rounded-3xl px-6 shadow-lg border border-gray-100 animate-pulse">
          <div className="flex items-center justify-between py-4">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="flex gap-4">
              <div className="h-9 bg-gray-200 rounded-full w-24"></div>
              <div className="h-9 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex justify-center z-50 fixed w-full items-center flex-col mt-2">
      <nav className="bg-white w-[90%] sticky top-0 z-50 rounded-3xl px-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/public/Gemini_Generated_Image_vf1q27vf1q27vf1q.png" 
              alt="Digital Tech Jobs" 
              className="h-[100px] w-[150px] object-contain"
            />
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-gray-900">Digital Tech Jobs</h1>
              <p className="text-xs text-gray-500 font-medium">Career Platform</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link to="/" className='text-gray-800 font-medium hover:text-blue-600 transition-colors'>
                Home
              </Link>
            </li>

            {/* Jobs Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-medium hover:text-blue-600 transition-colors flex items-center gap-2">
                Jobs 
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <li>
                  <Link to="/itRelate" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors rounded-t-xl">
                    IT Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/marketing_relate" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors">
                    Marketing Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/design_jop" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors rounded-b-xl">
                    Design Jobs
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/aboutus" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contactus" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                Contact Us
              </Link>
            </li>

          
            
          </ul>

          {/* Right Side - Auth Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              /* User is logged in - Show Profile */
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                >
                  {/* User Avatar */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getUserInitials()}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getRoleBadgeColor()}`}></div>
                    </div>
                    
                    {/* User Info - Hidden on mobile, shown on desktop */}
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-tight max-w-[120px] truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                    
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Profile Dropdown */}
                <div className={`absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-2xl border border-gray-100 transition-all duration-300 z-50 ${
                  profileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  {/* User Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleBadgeColor()}`}>
                          {user.role?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {/* Simple welcome message instead of dashboard link */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-50 text-blue-700">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Welcome back!</span>
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all group w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>

                  {/* Session Info */}
                  <div className="p-3 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      Session active • <span className="text-green-600 font-medium">Online</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* User is not logged in - Show Login/Register */
              <>
                <Link to="/register">
                  <button className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all hidden md:block">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all hidden md:block">
                    Login
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Hamburger */}
            <button 
              className="text-gray-800 text-2xl cursor-pointer ml-2 md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                Home
              </Link>
            </li>

            {/* Mobile Jobs */}
            <li className="flex flex-col">
              <button 
                onClick={() => setJobsOpen(!jobsOpen)} 
                className="text-gray-800 font-medium flex justify-between items-center w-full py-2 px-4 rounded-lg hover:bg-blue-50 transition-all"
              >
                Jobs 
                <ChevronDown className={`w-4 h-4 transition-transform ${jobsOpen ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`flex flex-col gap-1 mt-1 ml-4 overflow-hidden transition-all duration-300 ${jobsOpen ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link to="/itRelate" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    IT Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/marketing_relate" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Marketing Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/design_jop" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Design Jobs
                  </Link>
                </li>
              </ul>
            </li>

            {/* Show Jobs Management for logged-in users in mobile */}
            {user && (
              <li>
                <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  My Jobs
                </Link>
              </li>
            )}

            <li>
              <Link to="/aboutus" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactus" onClick={() => setIsOpen(false)} className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                Contact Us
              </Link>
            </li>

            {/* Mobile Auth Buttons */}
            {user ? (
              /* Mobile User Info */
              <li className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">✓ Online</p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 rounded-full border-2 border-red-600 text-red-600 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            ) : (
              /* Mobile Login/Register */
              <li className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all w-full">
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all w-full">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;