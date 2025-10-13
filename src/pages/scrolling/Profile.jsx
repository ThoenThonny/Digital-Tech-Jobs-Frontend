import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Profile() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);

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

  // ✅ Auto-play for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // ✅ Auto-play for media slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMedia((prev) => {
        if (prev >= mediaItems.length - 3) {
          return 0; // reset to start
        }
        return prev + 1;
      });
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const nextMedia = () => {
    setCurrentMedia((prev) =>
      prev >= mediaItems.length - 3 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMedia((prev) =>
      prev <= 0 ? mediaItems.length - 3 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
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

        {/* Media Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Media</h2>
            <Link to='/media'>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              See more
              <ChevronRight size={20} />
            </button>
            </Link>
          </div>

          <div className="relative">
            {/* Nav Buttons */}
            <button 
              onClick={prevMedia}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>

            <button 
              onClick={nextMedia}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>

            {/* Media Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-500"
                style={{ transform: `translateX(-${currentMedia * 33.33}%)` }}
              >
                {mediaItems.map((item, index) => (
                  <div 
                    key={index}
                    className="min-w-[calc(33.333%-1rem)] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                  >
                    <div className={`h-48 bg-gradient-to-br ${item.color} relative`}>
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={16} />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: mediaItems.length - 2 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMedia(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentMedia 
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
