import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const team = [
    {
      name: 'TO NY',
      role: 'Backend Developer ',
      email: 'tony@gmail.com',
      phone: '+1 (555) 123-4567',
      location: 'Phnom Phenh',
      initials: 'SJ',
      color: '/public/photo1.jpg'
    },
    {
      name: 'TING TONG',
      role: 'Frontend Developer',
      email: 'tingtong@gmail.com',
      phone: '+1 (555) 987-6543',
      location: 'Phnom Phenh',
      initials: 'MC',
      color: '/public/photo.jpg'
    }
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
         <div className="w-[100%] h-[100px] ">

                </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Our team is here to help you with any questions
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                
                <img
                src={member.color}
                alt=""
                className="w-32 h-32 rounded-full object-cover object-center shadow-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-6">
                  {member.role}
                </p>
                
                <div className="w-full space-y-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">{member.phone}</span>
                  </a>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">{member.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Send Us a Message
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="How can we help you?"
              />
            </div>
            
            <button

              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}