import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, Palette, PenTool, Paintbrush, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import jobService from '../../service/jobsService'; // Import your jobService

export default function Design_level() {
  const scrollRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobLevels, setJobLevels] = useState([
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 0, Icon: Palette },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 0, Icon: PenTool },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 0, Icon: Paintbrush },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 0, Icon: Award },
  ]);

  // Filter only Design category jobs
  const filterDesignCategoryJobs = (jobsData) => {
    if (!jobsData) return [];
    
    return jobsData.filter(job => {
      const category = job.category?.toLowerCase() || '';
      const title = job.title?.toLowerCase() || '';
      const tags = job.tags || [];
      const skills = job.skills || [];
      
      // Design-related keywords
      const designKeywords = [
        'design', 'ui', 'ux', 'graphic', 'creative', 'art', 'visual',
        'illustrator', 'photoshop', 'figma', 'sketch', 'adobe',
        'motion', 'animation', 'brand', 'logo', 'typography',
        'layout', 'prototype', 'wireframe', 'user interface',
        'user experience', 'web design', 'mobile design', 'product design'
      ];
      
      // Check if job is Design-related
      return designKeywords.some(keyword => 
        category.includes(keyword) ||
        title.includes(keyword) ||
        tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        skills.some(skill => skill.toLowerCase().includes(keyword))
      );
    });
  };

  // Fetch jobs from API
  useEffect(() => {
    fetchDesignJobs();
  }, []);

  const fetchDesignJobs = async () => {
    try {
      setLoading(true);
      let designJobs = [];

      // Try to get Design category jobs directly from API
      try {
        designJobs = await jobService.getJobsByCategory('Design');
      } catch (categoryError) {
        console.log('Design category endpoint not available, filtering all jobs...');
        // If category endpoint fails, get all jobs and filter by Design category
        const allJobs = await jobService.getJobs();
        designJobs = filterDesignCategoryJobs(allJobs);
      }

      setJobs(designJobs);
      updateJobLevelsCount(designJobs);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Design jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateJobLevelsCount = (jobsData) => {
    if (!jobsData || jobsData.length === 0) return;

    const levelCounts = {
      'Internship': 0,
      'Junior': 0,
      'Medium': 0,
      'Senior': 0
    };

    // Count Design jobs by level
    jobsData.forEach(job => {
      if (job.level) {
        const level = job.level.toLowerCase();
        if (level.includes('intern') || level.includes('student') || level.includes('trainee')) {
          levelCounts['Internship']++;
        } else if (level.includes('junior') || level.includes('entry') || level.includes('fresher')) {
          levelCounts['Junior']++;
        } else if (level.includes('mid') || level.includes('medium') || level.includes('intermediate') || level.includes('associate')) {
          levelCounts['Medium']++;
        } else if (level.includes('senior') || level.includes('lead') || level.includes('principal') || level.includes('expert')) {
          levelCounts['Senior']++;
        } else {
          // Default to medium if level doesn't match any category
          levelCounts['Medium']++;
        }
      } else {
        // Default to medium if no level specified
        levelCounts['Medium']++;
      }
    });

    // Update job levels with real counts
    setJobLevels(prev => [
      { ...prev[0], count: levelCounts['Internship'] },
      { ...prev[1], count: levelCounts['Junior'] },
      { ...prev[2], count: levelCounts['Medium'] },
      { ...prev[3], count: levelCounts['Senior'] }
    ]);
  };

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      (job.title && job.title.toLowerCase().includes(query)) ||
      (job.company && job.company.toLowerCase().includes(query)) ||
      (job.location && job.location.toLowerCase().includes(query)) ||
      (job.skills && job.skills.some(skill => skill.toLowerCase().includes(query))) ||
      (job.tags && job.tags.some(tag => tag.toLowerCase().includes(query))) ||
      (job.level && job.level.toLowerCase().includes(query)) ||
      (job.type && job.type.toLowerCase().includes(query)) ||
      (job.category && job.category.toLowerCase().includes(query))
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">កំពុងផ្ទុកការងារ Design...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">កំហុស: {error}</p>
          <button 
            onClick={fetchDesignJobs}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-40">
        
        {/* Header */}
        <div className="text-center mb-12 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ស្វែងរកការងារ Design របស់អ្នក</h1>
          <p className="text-gray-600 text-lg">ស្វែងរកឱកាសការងារ Design គ្រប់កម្រិតបទពិសោធន៍</p>
          <div className="mt-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg inline-block">
            <span className="font-semibold">ការងារ Design តែប៉ុណ្ណោះ</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            បង្ហាញតែការងារដែលទាក់ទងនឹង Design
          </div>
        </div>

        {/* Job Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {jobLevels.map((level, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-300 hover:-translate-y-1 text-center"
            >
              <div className="mb-3 flex justify-center">
                <level.Icon className="w-12 h-12 text-gray-800" />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{level.titleKh}</p>
              <p className="text-xs text-gray-500 mb-3">{level.titleEn}</p>
              <div className="flex items-baseline gap-1 justify-center">
                <p className="text-3xl font-bold text-purple-600">{level.count}</p>
                <p className="text-sm text-gray-500">មុខតំណែង</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ស្វែងរកតាមមុខតំណែង, ឧបករណ៍, ក្រុមហ៊ុន ឬទីតាំង..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
          </div>
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              ការងារ Design ពិសេស {searchQuery && `(${filteredJobs.length} លទ្ធផល)`}
              {!searchQuery && `(${jobs.length} ការងារ Design សរុប)`}
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
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex-shrink-0 overflow-hidden border border-gray-100 hover:border-purple-300 cursor-pointer snap-start group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={job.poster || job.image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop'} 
                      alt={job.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      DESIGN
                    </div>
                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-purple-600 shadow-md">
                      {job.level || 'New'}
                    </div>
                    {job.category && (
                      <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        {job.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
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
                    
                    {/* Show category information */}
                    {job.category && (
                      <div className="mb-3">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                          Category: {job.category}
                        </span>
                      </div>
                    )}
                    
                    {/* Tags from job data */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(job.tags || job.skills || []).slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.level && (
                        <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium border border-green-100">
                          {job.level}
                        </span>
                      )}
                      {job.type && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                          {job.type}
                        </span>
                      )}
                    </div>
                    
                    {/* Salary if available */}
                    {job.salary && (
                      <div className="mb-4">
                        <p className="text-green-600 font-semibold text-sm">{job.salary}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Link to={`/design_jop/${job.id}`} className="flex-1">
                        <button className="w-full py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery 
                    ? `មិនមានការងារ Design ដែលត្រូវនឹង "${searchQuery}"` 
                    : 'មិនមានការងារ Design ពេលនេះ'
                  }
                </p>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    លុបការស្វែងរក
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to='/design_jop/detail'>
            <button className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl">
              មើលការងារ Design ទាំងអស់ ({jobs.length})
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