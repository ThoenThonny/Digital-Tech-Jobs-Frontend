import React from 'react';
import { Mail, Phone, MapPin, Code, Palette, Rocket, Heart, Award, Users, Target, Coffee, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section with Decorative Elements */}
      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart size={18} className="text-pink-300" />
              <span className="text-sm font-medium">Built with passion</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 ">
              About Our Journey
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto ">
              We're a team of dreamers, builders, and problem-solvers dedicated to creating 
              meaningful experiences that make a difference in people's lives.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Our Mission Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
            <Target size={18} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Our Mission</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Creating Impact Through<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Innovation & Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We believe that great design and technology can transform businesses and improve lives. 
            Our mission is to deliver exceptional solutions that combine creativity, functionality, 
            and user-centric design.
          </p>
        </div>

        {/* Values Section - Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Rocket className="w-8 h-8 text-blue-600" />,
              title: "Innovation First",
              description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
              gradient: "from-blue-50 to-indigo-50"
            },
            {
              icon: <Users className="w-8 h-8 text-purple-600" />,
              title: "Collaborative Spirit",
              description: "Great things happen when talented people work together towards a common goal.",
              gradient: "from-purple-50 to-pink-50"
            },
            {
              icon: <Award className="w-8 h-8 text-green-600" />,
              title: "Quality Driven",
              description: "We never compromise on quality, ensuring every project exceeds expectations.",
              gradient: "from-green-50 to-emerald-50"
            },
            {
              icon: <Heart className="w-8 h-8 text-red-500" />,
              title: "Customer First",
              description: "Your success is our success. We're dedicated to helping you achieve your goals.",
              gradient: "from-red-50 to-orange-50"
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-600" />,
              title: "Fast Execution",
              description: "We move quickly without sacrificing quality, delivering results when you need them.",
              gradient: "from-yellow-50 to-amber-50"
            },
            {
              icon: <Coffee className="w-8 h-8 text-teal-600" />,
              title: "Work-Life Balance",
              description: "Happy team members create better work. We prioritize well-being and balance.",
              gradient: "from-teal-50 to-cyan-50"
            }
          ].map((value, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${value.gradient} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Story Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-6">
                <Users size={18} className="text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">Our Story</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                From Dream to Reality
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  What started as a small group of passionate developers in a coffee shop has grown 
                  into a thriving creative agency. We've always believed that the best work happens 
                  when talented people come together with a shared vision.
                </p>
                <p>
                  Over the years, we've had the privilege of working with amazing clients, from 
                  ambitious startups to established enterprises. Each project has taught us something 
                  new and helped us grow both as professionals and as a team.
                </p>
                <p>
                  Today, we're proud to be a diverse team of designers, developers, and strategists 
                  who are united by our commitment to excellence and our love for what we do.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-2">500+</div>
                <div className="text-blue-200 mb-6">Projects Completed</div>
                <div className="text-6xl font-bold mb-2">50+</div>
                <div className="text-blue-200 mb-6">Happy Clients</div>
                <div className="text-6xl font-bold mb-2">8</div>
                <div className="text-blue-200">Team Members</div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}