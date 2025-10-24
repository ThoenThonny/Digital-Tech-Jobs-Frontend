import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Profile() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
 

  const testimonials = [
    {
      name: "TO NY",
      role: "Backend Developer.",
      image: "/public/photo1.jpg",
      text: "Experience working with Jobify throughout the recruitment process is good. The interview process was smooth and well-coordinated by Jobify staff. They provided good service! Overall, the support was good. However, more frequent updates during the application stages would have improved the experience."
    },
    {
      name: "TING TONG",
      role: "Frontend Developer",
      image: "/public/photo.jpg",
      text: "Jobify made my job search incredibly efficient. The platform matched me with opportunities that perfectly aligned with my skills and career goals. The recruitment team was professional and kept me informed throughout the entire process."
    },
   
  ];


  // ✅ Auto-play for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  

  return (
    <div className=" bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {testimonials[currentTestimonial].text}
                </p>
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'w-8 bg-blue-600' 
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
