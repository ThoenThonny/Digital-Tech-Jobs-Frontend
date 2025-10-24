import React, { useState, useEffect } from "react";
import Imagescrolling from "../scrolling/Imagescrolling";
import Optionlevel from "../scrolling/Optionlevel";
import Profile from "../scrolling/Profile";
import Footer from "./Footer";
import Feature from "../scrolling/Fearture";
import { Link } from "react-router-dom";

export default function Home() {
    const slides = [
        {
            title: "Job Announcement",
            background:"https://i.pinimg.com/736x/93/b3/2b/93b32b6cc0ead4bf13e6748b30817202.jpg",
            description1: "Be able to access our vast pool of job opportunities.",
            description2: "Beat the crowd and start applying for your next job now!",
        },
        {
            title: "Internship Opportunities",
            background:"https://i.pinimg.com/1200x/ec/ea/bf/eceabf4fc086d85652da770da1967a6f.jpg",
            description1: "Find exciting internships to kickstart your career.",
            description2: "Gain experience with top companies.",
        },
        {
            title: "Career Advice",
            background:"https://i.pinimg.com/736x/93/b3/2b/93b32b6cc0ead4bf13e6748b30817202.jpg",
            description1: "Tips and guidance to make your CV stand out.",
            description2: "Learn from experts in your field.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div>
                <div className="w-[100%] h-[200px] bg-blue-50">

                </div>
                <div className="h-[80vh] bg-gradient-to-br from-blue-50 via-white to-blue-100 px-12 flex flex-col items-center">
                    {/* Carousel */}
                    <div className="w-full h-[400vh] flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                                style={{
                                    backgroundImage: `url(${slide.background})`,  // 👉 use background image from slide
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                 <Link to='/alldetail'>
                                <div className="w-full text-white md:w-1/2 p-6 bg-white/10 backdrop-blur-sm mt-[100px] rounded-xl m-6">
                                   
                                      <h1 className="text-5xl font-bold text-white leading-tight mb-4">
                                        {slide.title}
                                    </h1>
                                    
                                    <p className="text-white text-lg">{slide.description1}</p>
                                    <p className="text-while text-lg">{slide.description2}</p>
                                    <button className="mt-6 px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition text-lg font-semibold shadow-lg">
                                        Explore Jobs
                                    </button>
                                </div>
                                </Link>
                            </div>
                        ))}


                        {/* Illustration (Static for now) */}
                      
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-12">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full transition ${currentSlide === index ? "bg-blue-900" : "bg-gray-300"
                                    }`}
                                onClick={() => setCurrentSlide(index)}
                            ></div>
                        ))}
                    </div>






                </div>
            </div>
            <div>

            </div>

            <div className="flex items-center justify-center">
                <button class="border-1 mt-4 w-[350px] h-[50px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300">
                    Create your profeshional cv now
                </button>
            </div>
            <div className="mt-2">
                <Imagescrolling />
            </div>
            <div>
                <Optionlevel />
            </div>

            <div>
                <Feature />
            </div>
            <div>
                <Profile />
            </div>

           
        </div>

    );
}
