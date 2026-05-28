import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Map, Clock, Users, Briefcase, Code, Smartphone, Database, Cloud, Palette, Linkedin, Twitter, Github } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }
    
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  const techCategories = [
    { name: 'Software Development', icon: Briefcase },
    { name: 'Web Development', icon: Code },
    { name: 'Mobile Development', icon: Smartphone },
    { name: 'Data Science', icon: Database },
    { name: 'DevOps & Cloud', icon: Cloud },
    { name: 'UI/UX Design', icon: Palette }
  ];

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', details: ['Phnom Penh, Cambodia', 'Technology Hub District'] },
    { icon: Phone, title: 'Call Us', details: ['+855 12 345 678', '+855 98 765 432'] },
    { icon: Mail, title: 'Email Us', details: ['careers@digitaltechjobs.com', 'support@digitaltechjobs.com'] },
    { icon: Clock, title: 'Working Hours', details: ['Monday — Friday', '8:00 AM - 6:00 PM'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-15 lg:py-19">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Contact Info & Tech Categories */}
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                Get In Touch
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                        <info.icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Categories - Blue Theme */}
            <div className="bg-blue-600 rounded-2xl shadow-lg p-6 lg:p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="w-6 h-6 mr-2 text-white" />
                Tech Categories
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {techCategories.map((category, idx) => (
                  <div key={idx} className="group">
                    <div className="bg-blue-500 hover:bg-blue-400 rounded-lg p-3 transition-all duration-300">
                      <category.icon className="w-5 h-5 mb-2" />
                      <p className="text-sm font-medium">{category.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-blue-400">
                <p className="text-sm text-blue-100">
                  🚀 Specializing in IT, Software Development, and Digital Technology roles across Cambodia
                </p>
              </div>
            </div>

            {/* Social & Weather */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Follow Our Tech Updates</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div>
                  <div className="text-3xl font-bold text-gray-800">92°F</div>
                  <div className="text-gray-600 text-sm">Mostly cloudy</div>
                </div>
                <div className="text-4xl">⛅</div>
                <div className="text-right">
                  <div className="text-gray-800 text-sm">Phnom Penh</div>
                  <div className="text-gray-500 text-xs">Cambodia</div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                <span className="inline-block mr-2">🌏</span> Connecting Cambodia's Tech Talent
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                <Send className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500">
                We'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none"
                  placeholder="How can we help you? Tell us about your tech career needs..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-center">
                  ✓ Message sent successfully! We'll contact you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                  ⚠ Please fill all fields correctly before sending.
                </div>
              )}
            </form>

            {/* Trust Badge */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <div className="flex justify-center gap-6 text-xs text-gray-400">
                <span>🔒 Your data is secure</span>
                <span>⚡ 24/7 Support</span>
                <span>🎯 100% Response rate</span>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;