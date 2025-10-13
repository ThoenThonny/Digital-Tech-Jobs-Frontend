import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  return (
    <div className="flex ​justify-center z-50 fixed w-full items-center flex-col mt-2">
      <nav className="bg-white w-[90%] sticky top-0 z-50 rounded-3xl px-6  shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center  gap-3">
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
              <a href="/" className='text-gray-800 font-medium hover:text-blue-600 transition-colors'>
                Home
              </a>
            </li>

            {/* Jobs Dropdown */}
            <li className="relative group">
              <button className="text-gray-800 font-medium hover:text-blue-600 transition-colors flex items-center gap-2">
                Jobs 
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                <li>
                  <a href="/itRelate" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors rounded-t-xl">
                    IT Jobs
                  </a>
                </li>
                <li>
                  <a href="/marketing_relate" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors">
                    Marketing Jobs
                  </a>
                </li>
                <li>
                  <a href="/design_jop" className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors rounded-b-xl">
                    Design Jobs
                  </a>
                </li>
              </ul>
            </li>

            {/* Media */}
            <li>
              <a href="/media" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                Media
              </a>
            </li>

            <li>
              <a href="/aboutus" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                About Us
              </a>
            </li>

            <li>
              <a href="/contactus" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            <a href="/register">
              <button className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all hidden md:block">
                Register
              </button>
            </a>
            <a href="/login">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all hidden md:block">
                Login
              </button>
            </a>

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
              <a href="/" className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                Home
              </a>
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
                  <a href="/itRelate" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    IT Jobs
                  </a>
                </li>
                <li>
                  <a href="/marketing_relate" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Marketing Jobs
                  </a>
                </li>
                <li>
                  <a href="/design_jop" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Design Jobs
                  </a>
                </li>
              </ul>
            </li>

            {/* Mobile Media */}
            <li className="flex flex-col">
              <button 
                onClick={() => setMediaOpen(!mediaOpen)} 
                className="text-gray-800 font-medium flex justify-between items-center w-full py-2 px-4 rounded-lg hover:bg-blue-50 transition-all"
              >
                Media 
                <ChevronDown className={`w-4 h-4 transition-transform ${mediaOpen ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`flex flex-col gap-1 mt-1 ml-4 overflow-hidden transition-all duration-300 ${mediaOpen ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    Podcasts
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="/aboutus" className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                About Us
              </a>
            </li>
            <li>
              <a href="/contactus" className="text-gray-800 font-medium hover:text-blue-600 block py-2 px-4 rounded-lg hover:bg-blue-50 transition-all">
                Contact Us
              </a>
            </li>

            <li className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
              <a href="/register">
                <button className="px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all w-full">
                  Register
                </button>
              </a>
              <a href="/login">
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition-all w-full">
                  Login
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;