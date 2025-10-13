import React, { useState } from 'react';
import { Building2, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function DesignDetail() {
  const [expandedSections, setExpandedSections] = useState({
    internship: false,
    entry: false,
    mid: false,
    senior: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const jobsByLevel = {
    internship: [
      {
        id: 1,
        title: "UI/UX Design Intern",
        company: "Creative Studios",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        tags: ["Internship", "Remote", "$20/hour"]
      },
      {
        id: 2,
        title: "Graphic Design Intern",
        company: "Brand Collective",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
        tags: ["Internship", "Hybrid", "$18/hour"]
      },
      {
        id: 3,
        title: "Visual Design Intern",
        company: "Design House",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop",
        tags: ["Internship", "On-site", "$19/hour"]
      },
      {
        id: 4,
        title: "Web Design Intern",
        company: "Digital Creatives",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        tags: ["Internship", "Remote", "$17/hour"]
      },
      {
        id: 5,
        title: "Motion Design Intern",
        company: "Animation Labs",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
        tags: ["Internship", "Hybrid", "$21/hour"]
      }
    ],
    entry: [
      {
        id: 6,
        title: "Junior UI Designer",
        company: "Tech Innovators",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Remote", "$52k-65k"]
      },
      {
        id: 7,
        title: "Junior Graphic Designer",
        company: "Creative Agency",
        location: "Denver, CO",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Hybrid", "$50k-62k"]
      },
      {
        id: 8,
        title: "Product Designer I",
        company: "Startup Labs",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop",
        tags: ["Entry Level", "On-site", "$55k-68k"]
      },
      {
        id: 9,
        title: "Brand Designer",
        company: "Identity Studio",
        location: "Miami, FL",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Remote", "$48k-60k"]
      },
      {
        id: 10,
        title: "Web Designer",
        company: "Digital Arts Co",
        location: "Portland, OR",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Hybrid", "$50k-63k"]
      }
    ],
    mid: [
      {
        id: 11,
        title: "Senior UI/UX Designer",
        company: "Design Leaders",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Remote", "$85k-110k"]
      },
      {
        id: 12,
        title: "Product Designer",
        company: "Tech Giants Inc",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Hybrid", "$90k-115k"]
      },
      {
        id: 13,
        title: "Visual Design Lead",
        company: "Creative Collective",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop",
        tags: ["Mid Level", "On-site", "$82k-105k"]
      },
      {
        id: 14,
        title: "Motion Design Lead",
        company: "Animation Studios",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Remote", "$88k-112k"]
      },
      {
        id: 15,
        title: "Brand Design Manager",
        company: "Global Brands",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Hybrid", "$85k-108k"]
      }
    ],
    senior: [
      {
        id: 16,
        title: "Principal Designer",
        company: "Fortune 500 Design",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        tags: ["Senior", "Remote", "$140k-180k"]
      },
      {
        id: 17,
        title: "Head of Design",
        company: "Tech Unicorn",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
        tags: ["Senior", "Hybrid", "$150k-190k"]
      },
      {
        id: 18,
        title: "Creative Director",
        company: "Elite Agency",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop",
        tags: ["Senior", "Remote", "$160k-200k"]
      },
      {
        id: 19,
        title: "VP of Design",
        company: "Global Enterprises",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
        tags: ["Senior", "On-site", "$170k-220k"]
      },
      {
        id: 20,
        title: "Chief Design Officer",
        company: "Innovation Corp",
        location: "San Jose, CA",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
        tags: ["Senior", "Hybrid", "$180k-250k"]
      }
    ]
  };

  const JobCard = ({ job, isExpanded }) => (
    <div 
      className={`${isExpanded ? 'w-full' : 'min-w-[320px] flex-shrink-0 snap-start'} bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer group`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={job.image} 
          alt={job.title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-md">
          New
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <Building2 className="w-4 h-4" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link to={`/design_jop/detail/${job.id}`}>
        <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          View Details
        </button>
        </Link>
      </div>
    </div>
  );

  const JobSection = ({ title, level, jobs, icon, gradient }) => {
    const isExpanded = expandedSections[level];
    
    return (
      <div>
      
      
      <div className="mb-12">
        
        
        <div className="flex justify-between items-center  mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 text-sm">{jobs.length} positions available</p>
            </div>
          </div>
          
          <button 
            onClick={() => toggleSection(level)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''} group-hover:translate-x-1`} />
          </button>
        </div>

        {!isExpanded ? (
          <div 
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {jobs.map(job => (
              <JobCard key={job.id} job={job} isExpanded={false} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} isExpanded={true} />
            ))}
          </div>
        )}
      </div>
      </div>

    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Design Careers Await
          </h1>
        </div>

        <JobSection 
          title="Internships" 
          level="internship" 
          jobs={jobsByLevel.internship}
          icon="🎨"
          gradient="from-green-400 to-emerald-500"
        />

        <JobSection 
          title="Entry Level" 
          level="entry" 
          jobs={jobsByLevel.entry}
          icon="✏️"
          gradient="from-blue-400 to-cyan-500"
        />

        <JobSection 
          title="Mid Level" 
          level="mid" 
          jobs={jobsByLevel.mid}
          icon="🖌️"
          gradient="from-purple-400 to-blue-500"
        />

        <JobSection 
          title="Senior Level" 
          level="senior" 
          jobs={jobsByLevel.senior}
          icon="🏆"
          gradient="from-orange-400 to-red-500"
        />
      </div>
    </div>
    
  );
}