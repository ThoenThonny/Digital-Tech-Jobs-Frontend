import React from 'react';
import { Laptop, FileText, Rocket, BookOpen, Award } from 'lucide-react';

export default function Feature() {
    const features = [
        {
            icon: Laptop,
            title: "Quick job matching",
            description: "With our huge networks and clients, getting a job, the one you like is just a few steps away.",
            bgColor: "bg-blue-50"
        },
        {
            icon: FileText,
            title: "Create and export CV template for FREE",
            description: "With this feature you just fill in your background information then you can export the best CVs template which you dream of",
            bgColor: "bg-blue-50"
        },
        {
            icon: Rocket,
            title: "Host your resume for FREE",
            description: "Use our template or customized resume to beautify your career milestones and many companies will take a look around at you.",
            bgColor: "bg-blue-50"
        },
        {
            icon: BookOpen,
            title: "Take the online training course for FREE",
            description: "This course has cooperated with the best IT training center which will not just only improve your soft skill but it will improve your hard skill as well with real purpose and passion. Do not miss it, Take it now.",
            bgColor: "bg-blue-50"
        },
        {
            icon: Award,
            title: "Take the skills test and get the certificate for FREE",
            description: "This skill test ensures and reiterates candidate working capability. You can take it for free, if you passed, you will get the certificate from our organization as well!",
            bgColor: "bg-blue-50"
        }
    ];

    const stats = [
        { icon: "💼", number: "957", label: "Total Jobs" },
        { icon: "👥", number: "15.1k", label: "Seekers" },
        { icon: "🏢", number: "179", label: "Companies" }
    ];

    return (
        <div className="min-h-screen">
            {/* Feature Cards Section */}
            <div className="bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-8"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`${feature.bgColor} rounded-full p-4 flex-shrink-0`}>
                                        <feature.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                        >
                            Browse our jobs now!
                            <span className="text-xl">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Achievement Section with Background */}
            <div
                className="relative bg-cover bg-center bg-fixed py-24"
                style={{
                    backgroundImage: "url('https://i.pinimg.com/1200x/86/52/b9/8652b955a2c65f19dfaa9990cdca8287.jpg')"
                }}
            >
                {/* Dark overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://i.pinimg.com/1200x/b2/b1/50/b2b150dc8091fa20085c629a061dfd48.jpg)" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto px-8">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        Achievement
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-6xl mb-4">{stat.icon}</div>
                                <div className="text-5xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-xl text-white">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seeker's Voices Section */}
           
        </div>
    );
}