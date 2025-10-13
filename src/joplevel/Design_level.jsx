import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, Palette, PenTool, Paintbrush, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Design_level() {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const jobLevels = [
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 3, icon: Palette },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 8, icon: PenTool },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 12, icon: Paintbrush },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 9, icon: Award },
  ];

  const jobs = [
    { id: 1, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5', tags: ['Figma', 'Sketch', 'Prototyping'], title: 'UI/UX Designer', company: 'Creative Studios', location: 'Phnom Penh' },
    { id: 2, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d', tags: ['Adobe XD', 'User Research'], title: 'Product Designer', company: 'Tech Innovators', location: 'Remote' },
    { id: 3, image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea', tags: ['Illustrator', 'Branding'], title: 'Graphic Designer', company: 'Design House', location: 'Phnom Penh' },
    { id: 4, image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960', tags: ['After Effects', 'Animation'], title: 'Motion Designer', company: 'Media Lab', location: 'Siem Reap' },
    { id: 5, image: 'https://images.unsplash.com/photo-1558655146-d09347e92766', tags: ['Typography', 'Layout'], title: 'Visual Designer', company: 'Brand Agency', location: 'Phnom Penh' },
    { id: 6, image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d', tags: ['3D Design', 'Blender'], title: '3D Designer', company: 'Digital Arts Co', location: 'Remote' },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Design Job</h1>
          <p className="text-gray-600 text-lg">Explore creative opportunities across all experience levels</p>
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
              placeholder="Search by design role, tools, company, location, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Design Jobs</h2>
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
                  
                <Link to={`/design_jop/${job.id}`}>
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
         <Link to='/design_jop/detail'>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl">
            View All Design Jobs
          </button>
         </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}