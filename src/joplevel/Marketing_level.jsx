import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, Filter, ChevronDown, BookOpen, Sprout, Briefcase, Star } from 'lucide-react';

export default function Marketing_level() {
  const scrollRef = useRef(null);

  const jobLevels = [
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 8, icon: BookOpen },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 12, icon: Sprout },
    { titleKh: 'ការងារមានបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 23, icon: Briefcase },
    { titleKh: 'ការងារមានបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 14, icon: Star },
  ];

  const jobs = [
    { id: 1, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0', tags: ['SEO', 'Content', 'Analytics'], title: 'Digital Marketing Specialist', company: 'Creative Agency', location: 'Phnom Penh' },
    { id: 2, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', tags: ['Social Media', 'Campaigns'], title: 'Social Media Manager', company: 'Brand Solutions', location: 'Remote' },
    { id: 3, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7', tags: ['Copywriting', 'Strategy'], title: 'Content Marketing Manager', company: 'Media Group', location: 'Phnom Penh' },
    { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', tags: ['Google Ads', 'PPC', 'ROI'], title: 'Performance Marketing Specialist', company: 'Growth Marketing', location: 'Siem Reap' },
    { id: 5, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978', tags: ['Brand Strategy', 'Marketing'], title: 'Brand Marketing Manager', company: 'Retail Corp', location: 'Phnom Penh' },
    { id: 6, image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312', tags: ['Email Marketing', 'Automation'], title: 'Email Marketing Specialist', company: 'E-commerce Hub', location: 'Remote' },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Dream Marketing Job</h1>
          <p className="text-gray-600 text-lg">Explore marketing opportunities across all experience levels</p>
        </div>

        {/* Job Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {jobLevels.map((level, i) => {
            const IconComponent = level.icon;
            return (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
              >
                <div className="mb-3">
                  <IconComponent className="w-10 h-10 text-black" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">{level.titleKh}</p>
                <p className="text-xs text-gray-500 mb-3">{level.titleEn}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-blue-600">{level.count}</p>
                  <p className="text-sm text-gray-500">positions</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Bar Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title, skills, keywords, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Marketing Jobs</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Jobs Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                className="min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex-shrink-0 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer snap-start group"
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
                  
                  <Link to={`/marketing_relate/${job.id}`}>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to='/marketingDetail'>
          
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl">
            View All Marketing Jobs
          </button>
          </Link>
        </div>
      </div>

      {/* hide scrollbar for normal React */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}