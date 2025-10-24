import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram, Send, Code, Cpu, Database, Smartphone } from 'lucide-react';
import Imagescrolling from '../scrolling/Imagescrolling';

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);

  const testimonials = [
    {
      name: "Phanny NayVannet",
      role: "Android Developer | Acleda Bank Plc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "Digital Tech Jobs made my career transition into tech seamless. The platform connected me with top companies and the interview process was well-coordinated. Their focus on tech roles ensured I found the perfect match for my skills."
    },
    {
      name: "Sophia Chen",
      role: "Full Stack Developer | Tech Innovations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "As a developer, finding the right tech company was challenging until I discovered Digital Tech Jobs. They understand the tech industry and matched me with opportunities that aligned perfectly with my technical skills and career aspirations."
    },
    {
      name: "David Kim",
      role: "DevOps Engineer | Cloud Systems",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "Digital Tech Jobs specializes in tech roles, which made all the difference. I found multiple relevant opportunities quickly, and their tech-focused approach meant I was speaking with companies that understood my expertise."
    }
  ];

  const techServices = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Frontend, Backend & Full Stack opportunities"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Development",
      description: "iOS, Android & Cross-platform roles"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data & Analytics",
      description: "Data Science, Engineering & Analysis"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "DevOps & Cloud",
      description: "Infrastructure, Cloud & Operations"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tech Services Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Career Specializations</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            We specialize in connecting tech talent with innovative companies. Our focus on technology roles 
            ensures you find the perfect match for your technical skills and career goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Talent Success Stories</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-blue-600">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </p>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={prevTestimonial}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-50"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-blue-50"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured On Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted By Tech Companies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            Digital Tech Jobs is the preferred recruitment platform for leading technology companies in Cambodia. 
            We bridge the gap between innovative tech companies and exceptional tech talent.
          </p>
          
          <div>
            <Imagescrolling/>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 w-14 h-14 flex items-center justify-center">
                  <Cpu className="text-white w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Digital Tech Jobs
                  </span>
                  <p className="text-sm text-gray-400">Cambodia's Tech Career Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Cambodia's premier platform connecting tech talent with innovative companies. 
                Specializing in IT, Software Development, and Digital Technology roles.
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
                  <Linkedin size={20} />
                  <span>Follow Our Tech Updates</span>
                </button>
                <span className="text-gray-400 text-sm">2.5K+ Tech Professionals</span>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                  <Send size={20} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Tech Categories</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Software Development</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Web Development</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Mobile Development</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">Data Science</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">DevOps & Cloud</a>
                <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">UI/UX Design</a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Contact Tech Team</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300 text-sm">
                    Phnom Penh, Cambodia<br />
                    Technology Hub District
                  </p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Phone size={20} className="text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300">+855 12 345 678</p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Mail size={20} className="text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300">careers@digitaltechjobs.com</p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Clock size={20} className="text-blue-400 flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p>Monday — Friday</p>
                    <p>8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Digital Tech Jobs. All rights reserved. | 
              <span className="text-blue-400"> Connecting Cambodia's Tech Talent</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}