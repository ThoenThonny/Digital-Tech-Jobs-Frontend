import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram, Send } from 'lucide-react';
import Imagescrolling from '../scrolling/Imagescrolling';

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);

  const testimonials = [
    {
      name: "Phanny NayVannet",
      role: "Android Developer | Acleda Bank Plc.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      text: "Experience working with Jobify throughout the recruitment process is good. The interview process was smooth and well-coordinated by Jobify staff. They provided good service! Overall, the support was good. However, more frequent updates during the application stages would have improved the experience."
    },
    {
      name: "Sophia Chen",
      role: "Full Stack Developer | Tech Innovations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      text: "Jobify made my job search incredibly efficient. The platform matched me with opportunities that perfectly aligned with my skills and career goals. The recruitment team was professional and kept me informed throughout the entire process."
    },
    {
      name: "David Kim",
      role: "DevOps Engineer | Cloud Systems",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      text: "I was impressed by how quickly Jobify connected me with top tech companies. The interview preparation resources were excellent, and the support team was always available to answer my questions. Highly recommend!"
    }
  ];

  const mediaItems = [
    {
      date: "September 29, 2025",
      title: "The 13th Forum on China-ASEAN Technology Transfer and Collaboration",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      color: "from-blue-500 to-blue-600"
    },
    {
      date: "September 29, 2025",
      title: "Time to go Digital! (3rd generation)",
      image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop",
      color: "from-amber-500 to-amber-600"
    },
    {
      date: "September 17, 2025",
      title: "Cybersecurity Acronyms",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      color: "from-indigo-600 to-indigo-800"
    },
    {
      date: "September 11, 2025",
      title: "Things you can do with Python",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextMedia = () => {
    if (currentMedia < mediaItems.length - 3) {
      setCurrentMedia(currentMedia + 1);
    }
  };

  const prevMedia = () => {
    if (currentMedia > 0) {
      setCurrentMedia(currentMedia - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Testimonials Section */}
     

      {/* Media Section */}
      

      {/* Featured On Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured On</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            Jobify is delighted to be covered by various Media. Our team adheres to six original core values 
            (Teamwork, High Ambition, Strong Confident, Be the only ONE, Working Hard, and PDCA Quality Cycle) 
            to ensure we deliver what we promise to ourselves and our customers.
          </p>
          
          <div>
            <Imagescrolling/>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-[300px]">
            {/* Left Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 rounded-lg p-3 w-14 h-14 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <span className="text-xl font-semibold">Jobify</span>
              </div>
              
              <p className="text-gray-300 mb-6">
                Jobify is Cambodia's #1 Job Matching Service<br />
                Specialized in IT.
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded flex items-center gap-2 transition-colors">
                  <Linkedin size={20} />
                  <span>Follow</span>
                </button>
                <span className="text-gray-400 text-sm">16,807</span>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                  <Send size={20} />
                </a>
                <a href="#" className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Our Contact</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">
                    #12, Street 2001, Phum Paprak Khang Tboung,<br />
                    Sangkat Kakab, Khan Porsenchey, Phnom Penh,<br />
                    Cambodia
                  </p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Phone size={24} className="text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300">+855 93 739 400</p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Mail size={24} className="text-blue-400 flex-shrink-0" />
                  <p className="text-gray-300">info@jobify.works</p>
                </div>
                
                <div className="flex gap-4 items-center">
                  <Clock size={24} className="text-blue-400 flex-shrink-0" />
                  <div className="text-gray-300">
                    <p>Monday — Friday</p>
                    <p>8:00am - 6:00pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}