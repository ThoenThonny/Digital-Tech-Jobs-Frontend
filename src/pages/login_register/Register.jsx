import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Registration submitted!');
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
            <h1 className="text-white text-5xl font-bold mb-4">Welcome !</h1>
            <p className="text-white/90 text-lg">Join our community and start your journey with us today.</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="text-right mb-8 text-sm text-gray-600">
                <Link to='/login'>
                            Are you a member? <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors">Login</span>

                </Link>

          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-8">Register</h2>

          <div className="space-y-5">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all hover:border-gray-300"
              />
            </div>

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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 mt-6"
            >
              Register
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}