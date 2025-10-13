import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Login submitted!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='flex justify-center items-center min-h-screen w-full bg-gray-100'>
      <div className="flex max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden m-4">
        {/* Left Section - Full Image with Text Overlay */}
        <div className="flex-1 w-full relative overflow-hidden">
          <img 
            src="https://i.pinimg.com/736x/0f/d6/cd/0fd6cd63e885e81178a6d0d951f2adc5.jpg" 
            className='w-full h-full object-cover' 
            alt="" 
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-12">
            <h1 className="text-white text-5xl font-bold mb-4">Wellcome back !</h1>
            <p className="text-white/90 text-lg">Welcome back, we've missed you. Login to continue your journey.</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="text-right mb-8 text-sm text-gray-600">

<Link to='/register'>
            Don't have an account? <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">Register</span>

</Link>

          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-8">Login</h2>

          <div className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all hover:border-gray-300"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 w-4 h-4 accent-blue-600" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">
                Forgot password?
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 mt-6"
            >
              Login
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-3 border-2 border-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex-1 py-3 border-2 border-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}