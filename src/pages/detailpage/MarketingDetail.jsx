import React, { useRef, useState } from 'react';
import { Building2, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function MarkitingDetail() {
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
        title: "Marketing Intern",
        company: "Digital Media Agency",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        tags: ["Internship", "Remote", "$18/hour"]
      },
      {
        id: 2,
        title: "Social Media Intern",
        company: "Brand Builders Co",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
        tags: ["Internship", "Hybrid", "$17/hour"]
      },
      {
        id: 3,
        title: "Content Marketing Intern",
        company: "Content Hub",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        tags: ["Internship", "On-site", "$19/hour"]
      },
      {
        id: 4,
        title: "Email Marketing Intern",
        company: "Marketing Solutions",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
        tags: ["Internship", "Remote", "$16/hour"]
      },
      {
        id: 5,
        title: "SEO Intern",
        company: "Digital Growth Labs",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
        tags: ["Internship", "Hybrid", "$20/hour"]
      }
    ],
    entry: [
      {
        id: 6,
        title: "Junior Marketing Coordinator",
        company: "Creative Innovations",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Remote", "$48k-58k"]
      },
      {
        id: 7,
        title: "Social Media Specialist",
        company: "Brand Strategy Group",
        location: "Denver, CO",
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Hybrid", "$50k-60k"]
      },
      {
        id: 8,
        title: "Content Writer",
        company: "Publishing Plus",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop",
        tags: ["Entry Level", "On-site", "$45k-55k"]
      },
      {
        id: 9,
        title: "Digital Marketing Assistant",
        company: "Tech Marketing Pro",
        location: "Miami, FL",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Remote", "$52k-62k"]
      },
      {
        id: 10,
        title: "Marketing Analyst",
        company: "Data Insights Inc",
        location: "Portland, OR",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        tags: ["Entry Level", "Hybrid", "$50k-60k"]
      }
    ],
    mid: [
      {
        id: 11,
        title: "Marketing Manager",
        company: "Global Brand Solutions",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Remote", "$75k-95k"]
      },
      {
        id: 12,
        title: "SEO Manager",
        company: "Digital Excellence",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Hybrid", "$70k-90k"]
      },
      {
        id: 13,
        title: "Content Strategy Manager",
        company: "Creative Agency Plus",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop",
        tags: ["Mid Level", "On-site", "$78k-98k"]
      },
      {
        id: 14,
        title: "Brand Manager",
        company: "Market Leaders Co",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Remote", "$80k-100k"]
      },
      {
        id: 15,
        title: "Performance Marketing Manager",
        company: "Growth Partners",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
        tags: ["Mid Level", "Hybrid", "$76k-96k"]
      }
    ],
    senior: [
      {
        id: 16,
        title: "Senior Marketing Manager",
        company: "Fortune 500 Corp",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        tags: ["Senior", "Remote", "$120k-150k"]
      },
      {
        id: 17,
        title: "Head of Marketing",
        company: "Tech Innovation Labs",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
        tags: ["Senior", "Hybrid", "$130k-160k"]
      },
      {
        id: 18,
        title: "Chief Marketing Officer",
        company: "Enterprise Solutions",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
        tags: ["Senior", "Remote", "$140k-180k"]
      },
      {
        id: 19,
        title: "VP of Brand & Marketing",
        company: "Global Enterprises",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        tags: ["Senior", "On-site", "$150k-200k"]
      },
      {
        id: 20,
        title: "Senior Director of Growth",
        company: "SaaS Unicorn",
        location: "San Jose, CA",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        tags: ["Senior", "Hybrid", "$160k-220k"]
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
       <Link to={`/marketingDetail/${job.id}`}>
        
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
            Marketing Careers Await
          </h1>
        </div>

        <JobSection 
          title="Internships" 
          level="internship" 
          jobs={jobsByLevel.internship}
          icon="🎓"
          gradient="from-green-400 to-emerald-500"
        />

        <JobSection 
          title="Entry Level" 
          level="entry" 
          jobs={jobsByLevel.entry}
          icon="🚀"
          gradient="from-blue-400 to-cyan-500"
        />

        <JobSection 
          title="Mid Level" 
          level="mid" 
          jobs={jobsByLevel.mid}
          icon="📊"
          gradient="from-purple-400 to-blue-500"
        />

        <JobSection 
          title="Senior Level" 
          level="senior" 
          jobs={jobsByLevel.senior}
          icon="👑"
          gradient="from-orange-400 to-red-500"
        />
      </div>
    </div>
    
  );
}