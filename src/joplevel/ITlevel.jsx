import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, GraduationCap, Sprout, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function ITlevel() {
  const scrollRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const jobLevels = [
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 1, Icon: GraduationCap },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 5, Icon: Sprout },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 17, Icon: Briefcase },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 16, Icon: Award },
  ];

  const jobs = [
    { id: 1, image: 'https://i.pinimg.com/1200x/0d/b3/d2/0db3d2d15b86e1ca9616cd454c562b10.jpg', tags: ['Flutter', 'Postgres', 'REST'], title: 'Mobile Developer', company: 'Tech Corp', location: 'Phnom Penh' },
    { id: 2, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', tags: ['Software', 'IT'], title: 'Software Engineer', company: 'Digital Solutions', location: 'Remote' },
    { id: 3, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', tags: ['JSON', 'API'], title: 'Backend Developer', company: 'StartUp Inc', location: 'Phnom Penh' },
    { id: 4, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', tags: ['Postgres', 'MongoDB'], title: 'Database Admin', company: 'Data Systems', location: 'Siem Reap' },
    { id: 5, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', tags: ['React', 'UI/UX'], title: 'Frontend Developer', company: 'Creative Agency', location: 'Phnom Penh' },
    { id: 6, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72', tags: ['DevOps', 'AWS'], title: 'Cloud Engineer', company: 'Cloud Services', location: 'Remote' },
  ];

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your IT Job</h1>
          <p className="text-gray-600 text-lg">Explore opportunities across all experience levels</p>
        </div>

        {/* Job Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {jobLevels.map((level, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-1 text-center"
            >
              <div className="mb-3 flex justify-center">
                <level.Icon className="w-12 h-12 text-gray-800" />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{level.titleKh}</p>
              <p className="text-xs text-gray-500 mb-3">{level.titleEn}</p>
              <div className="flex items-baseline gap-1 justify-center">
                <p className="text-3xl font-bold text-blue-600">{level.count}</p>
                <p className="text-sm text-gray-500">positions</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="relative  ">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title, skills, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
             
          </div>
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Jobs {searchQuery && `(${filteredJobs.length} results)`}
            </h2>
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
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
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
                  
                  <Link to={`/itlevel/${job.id}`}>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                  </Link>
                </div>
              </div>
            ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to='/itRelate/itCardDetail'>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl">
            View All Jobs
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