import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../service/Auth';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const navigate = useNavigate();

  // Password strength indicator function
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: 'gray' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengthConfig = {
      0: { label: 'Very Weak', color: 'red' },
      1: { label: 'Weak', color: 'red' },
      2: { label: 'Fair', color: 'orange' },
      3: { label: 'Good', color: 'yellow' },
      4: { label: 'Strong', color: 'green' },
      5: { label: 'Very Strong', color: 'green' }
    };

    return { strength, ...strengthConfig[strength] };
  };

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email format is invalid';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      
      case 'password_confirmation':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      password_confirmation: validateField('password_confirmation', formData.password_confirmation)
    };

    setFieldErrors(errors);
    
    // Check if any errors exist
    return Object.values(errors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate form
    if (validateForm()) {
      setError('Please fix the errors above');
      return;
    }

    setLoading(true);

    try {
      console.log('🔄 Registering user:', { 
        name: formData.name,
        email: formData.email,
        // Don't log password in production
      });
      
      // Call authService register
      const response = await authService.register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });

      console.log('✅ Registration successful:', response);
      
      // Try auto-login after successful registration
      try {
        const loginResponse = await authService.login({
          email: formData.email.trim(),
          password: formData.password
        });
        
        console.log('✅ Auto-login successful:', loginResponse);
        
        // Redirect based on role
        const role = loginResponse.user?.role || 'user';
        setTimeout(() => {
          navigate(role === 'admin' ? '/dashboard' : '/', {
            replace: true,
            state: {
              message: `Welcome to ${role === 'admin' ? 'Admin Dashboard' : 'our platform'}!`,
              userRole: role
            }
          });
        }, 1000);
        
      } catch (loginError) {
        console.error('Auto-login failed, redirecting to login page:', loginError);
        // If auto-login fails, show success page and redirect to login
        setUserEmail(formData.email);
        setSuccess(true);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      });

    } catch (err) {
      console.error('❌ Registration error:', err);
      
      // Handle specific error cases
      if (err.response?.status === 422 && err.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = err.response.data.errors;
        const newFieldErrors = {};
        
        // Map backend field names to frontend field names
        Object.keys(backendErrors).forEach(key => {
          const fieldName = key === 'password_confirmation' ? 'password_confirmation' : key;
          newFieldErrors[fieldName] = backendErrors[key][0];
        });
        
        setFieldErrors(newFieldErrors);
        setError('Please fix the validation errors below');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.message?.includes('Network Error')) {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear general error when user starts typing
    if (error) setError('');

    // Validate field in real-time
    if (fieldErrors[name]) {
      const fieldError = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Function to navigate to login with email pre-filled
  const goToLogin = () => {
    navigate('/login', { 
      state: { 
        preFilledEmail: userEmail,
        fromRegister: true
      }
    });
  };

  // Success state component
  if (success) {
    return (
      <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-green-50'>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle size={80} className="text-green-500" />
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-2">Welcome to our community!</p>
          <p className="text-gray-500 text-sm mb-6">Your account has been created successfully.</p>
          
          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center justify-center text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle size={16} className="text-green-500 mr-2" />
              Account created successfully
            </div>
            <div className="flex items-center justify-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <CheckCircle size={16} className="text-blue-500 mr-2" />
              Ready to sign in
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={goToLogin}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowRight size={20} />
              Continue to Login
            </button>
            
            <p className="text-sm text-gray-500">
              We'll automatically fill your email: <strong>{userEmail}</strong>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              You can now sign in with your new account credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
      <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Left Section - Image with Text Overlay */}
        <div className="lg:flex-1 w-full relative overflow-hidden min-h-[400px] lg:min-h-auto">
          <img 
            src="https://i.pinimg.com/736x/0f/d6/cd/0fd6cd63e885e81178a6d0d951f2adc5.jpg" 
            className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700' 
            alt="People collaborating in a modern workspace" 
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 lg:bg-gradient-to-t lg:from-black/70 lg:via-black/40 lg:to-transparent flex flex-col justify-end p-8 lg:p-12">
            <div className="lg:mb-8">
              <h1 className="text-white text-4xl lg:text-5xl font-bold mb-3 lg:mb-4 drop-shadow-lg">Join Our Community!</h1>
              <p className="text-white/90 text-lg lg:text-xl drop-shadow-md">
                Create your account and start your journey with us today.
              </p>
            </div>
            
            {/* Feature List */}
            <div className="hidden lg:block space-y-3 mt-6">
              <div className="flex items-center text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Connect with professionals worldwide</span>
              </div>
              <div className="flex items-center text-white/90">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span>Access exclusive opportunities</span>
              </div>
              <div className="flex items-center text-white/90">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span>Grow your career and skills</span>
              </div>
              <div className="flex items-center text-white/90">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                <span>Join instantly - start in seconds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:flex-1 p-6 lg:p-12 flex flex-col justify-center">
          {/* Header with Login Link */}
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            </div>
            <div className="text-sm text-gray-600">
              <Link 
                to='/login' 
                className="flex items-center gap-1 hover:text-blue-600 transition-colors group"
              >
                Already have an account?
                <span className="text-blue-600 font-semibold group-hover:text-blue-700 group-hover:underline">
                  Sign In
                </span>
              </Link>
            </div>
          </div>

          {/* Main Form Heading */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Get Started</h2>
            <p className="text-gray-600">Create your account in just a few steps</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">{error}</p>
                <p className="text-red-600 text-sm mt-1">Please check the form and try again</p>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 lg:px-6 py-3 lg:py-4 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  fieldErrors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300'
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {fieldErrors.name}
                </p>
              )}
            </div>

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
                onBlur={handleBlur}
                required
                disabled={loading}
                className={`w-full px-4 lg:px-6 py-3 lg:py-4 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  fieldErrors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {fieldErrors.email}
                </p>
              )}
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
                  placeholder="Create a strong password (min. 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength="8"
                  disabled={loading}
                  className={`w-full px-4 lg:px-6 py-3 lg:py-4 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed pr-12 ${
                    fieldErrors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300'
                  }`}
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
              {fieldErrors.password ? (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {fieldErrors.password}
                </p>
              ) : (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Password strength</span>
                    {formData.password && (
                      <span className={`text-xs font-medium ${
                        getPasswordStrength(formData.password).color === 'red' ? 'text-red-600' :
                        getPasswordStrength(formData.password).color === 'orange' ? 'text-orange-600' :
                        getPasswordStrength(formData.password).color === 'yellow' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {getPasswordStrength(formData.password).label}
                      </span>
                    )}
                  </div>
                  {formData.password && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getPasswordStrength(formData.password).color === 'red' ? 'bg-red-500 w-1/5' :
                          getPasswordStrength(formData.password).color === 'orange' ? 'bg-orange-500 w-2/5' :
                          getPasswordStrength(formData.password).color === 'yellow' ? 'bg-yellow-500 w-3/5' :
                          getPasswordStrength(formData.password).color === 'green' ? 'bg-green-500 w-full' :
                          'bg-gray-500 w-0'
                        }`}
                      ></div>
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Use at least 8 characters with uppercase, lowercase, numbers & symbols
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  disabled={loading}
                  className={`w-full px-4 lg:px-6 py-3 lg:py-4 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed pr-12 ${
                    fieldErrors.password_confirmation 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed p-1"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {fieldErrors.password_confirmation}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Your Account...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Terms and Conditions */}
          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline font-medium">Terms of Service</a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>

          {/* Quick Login Option */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Already have an account?</p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                <ArrowRight size={16} />
                Sign In to Existing Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}