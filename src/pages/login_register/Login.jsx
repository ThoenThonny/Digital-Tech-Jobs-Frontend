import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, LogIn, User, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../../service/Auth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.fromRegister) {
      setSuccess('Registration successful! Please login to continue.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUserRole(null);
    setLoading(true);

    // Validation
    if (!formData.email.trim() || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Logging in user:', { email: formData.email });
      
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      console.log('✅ Login successful:', response);
      
      // Set user role for redirection logic
      const role = response.user?.role || 'user';
      setUserRole(role);
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', formData.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
      }

      // Show success message with role information
      setSuccess(`Welcome back, ${response.user?.name || 'User'}! (${role.toUpperCase()})`);
      
      // Redirect based on user role after delay
      setTimeout(() => {
        redirectBasedOnRole(role);
      }, 1500);

    } catch (err) {
      console.error('❌ Login error:', err);
      
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.response?.status === 422) {
        setError('Please check your input and try again.');
      } else if (err.response?.data?.errors) {
        const backendErrors = err.response.data.errors;
        const errorMessage = Object.values(backendErrors).flat().join(', ');
        setError(`Login failed: ${errorMessage}`);
      } else if (err.message?.includes('Network Error')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to redirect based on user role - FIXED THIS FUNCTION
  const redirectBasedOnRole = (role) => {
    console.log('🔄 Redirecting based on role:', role);
    
    switch (role) {
      case 'admin':
        navigate('/dashboard', { 
          replace: true,
          state: { 
            message: 'Welcome to Admin Dashboard',
            userRole: role
          }
        });
        break;
      case 'user':
      default:
        navigate('/', { 
          replace: true,
          state: { 
            message: 'Welcome back!',
            userRole: role
          }
        });
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // Load remembered email
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && savedEmail) {
      setRememberMe(true);
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  const handleDemoLogin = (role = 'user') => {
    const demoAccounts = {
      user: { email: 'user@example.com', password: 'password' },
      admin: { email: 'admin@example.com', password: 'password' }
    };
    
    setFormData(demoAccounts[role]);
    setSuccess(`Demo ${role} credentials loaded. Click Login to continue.`);
  };

  // Role-based access information
  const roleAccessInfo = {
    admin: {
      title: 'Admin Access',
      description: 'Full system access with administrative privileges',
      features: ['User Management', 'System Settings', 'All Dashboard Access', 'Advanced Analytics'],
      icon: Shield,
      color: 'from-purple-600 to-pink-600'
    },
    user: {
      title: 'User Access', 
      description: 'Standard user access with limited permissions',
      features: ['Personal Dashboard', 'Profile Management', 'Basic Features', 'Limited Access'],
      icon: User,
      color: 'from-blue-600 to-cyan-600'
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4'>
      <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Left Section - Image with Text Overlay */}
        <div className="lg:flex-1 w-full relative overflow-hidden min-h-[400px] lg:min-h-auto">
          <img 
            src="https://i.pinimg.com/736x/0f/d6/cd/0fd6cd63e885e81178a6d0d951f2adc5.jpg" 
            className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700' 
            alt="Welcome back to our community" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 lg:bg-gradient-to-t lg:from-black/70 lg:via-black/40 lg:to-transparent flex flex-col justify-between p-8 lg:p-12">
            
            {/* Top Section - Demo Accounts */}
            <div className="lg:absolute lg:top-8 lg:left-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-3 text-sm lg:text-base">Demo Accounts</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleDemoLogin('user')}
                    className="w-full px-4 py-2 bg-white/20 text-white text-xs lg:text-sm rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <User size={16} />
                    User Account
                  </button>
                  <button 
                    onClick={() => handleDemoLogin('admin')}
                    className="w-full px-4 py-2 bg-white/20 text-white text-xs lg:text-sm rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Shield size={16} />
                    Admin Account
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section - Welcome Text */}
            <div className="mt-auto">
              <h1 className="text-white text-3xl lg:text-5xl font-bold mb-3 lg:mb-4 drop-shadow-lg">Welcome Back!</h1>
              <p className="text-white/90 text-base lg:text-lg drop-shadow-md mb-4 lg:mb-6">
                Welcome back, we've missed you. Login to continue your journey.
              </p>
              
              {/* Role Access Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                {Object.entries(roleAccessInfo).map(([role, info]) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={role} className={`bg-gradient-to-r ${info.color} rounded-xl p-3 lg:p-4 text-white`}>
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent size={18} />
                        <span className="font-semibold text-sm lg:text-base">{info.title}</span>
                      </div>
                      <p className="text-white/90 text-xs lg:text-sm mb-2">{info.description}</p>
                      <div className="space-y-1">
                        {info.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <span className="text-white/80 text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:flex-1 p-6 lg:p-12 flex flex-col justify-center">
          {/* Header with Register Link */}
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
            </div>
            <div className="text-sm text-gray-600">
              <Link 
                to='/register' 
                className="flex items-center gap-1 hover:text-blue-600 transition-colors group"
              >
                New to our platform?
                <span className="text-blue-600 font-semibold group-hover:text-blue-700 group-hover:underline">
                  Create Account
                </span>
              </Link>
            </div>
          </div>

          {/* Main Form Heading */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fade-in">
              <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-700 font-medium">{success}</p>
                <p className="text-green-600 text-sm mt-1">
                  {userRole === 'admin' 
                    ? 'Redirecting to Admin Dashboard...' 
                    : 'Redirecting to User Dashboard...'
                  }
                </p>
                {userRole && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      userRole === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {userRole.toUpperCase()} ROLE
                    </div>
                    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">Please check your credentials and try again</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 lg:px-6 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 lg:px-6 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="mr-2 w-4 h-4 accent-blue-600 disabled:cursor-not-allowed" 
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In to Your Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 lg:my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3 lg:gap-4">
            <button 
              type="button"
              disabled={loading}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>
            <button 
              type="button"
              disabled={loading}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your login is secure. We use encryption to protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}