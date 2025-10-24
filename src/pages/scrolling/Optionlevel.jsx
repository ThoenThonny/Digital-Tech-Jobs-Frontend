import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Building2, Briefcase, Zap, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobService } from '../../service/jobsService'; // Import the jobService

export default function Optionlevel() {
  const scrollRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobLevels = [
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍', titleEn: 'Internship', count: 15, icon: Briefcase },
    { titleKh: 'ការងារត្រូវការបទពិសោធន៍តិចតួច', titleEn: 'Junior Level', count: 15, icon: Zap },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍មធ្យម', titleEn: 'Medium Level', count: 15, icon: TrendingUp },
    { titleKh: 'ការងារមិនត្រូវការបទពិសោធន៍ខ្ពស់', titleEn: 'Senior Level', count: 15, icon: Award },
  ];

  // Load jobs from API
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading jobs from API...');
      
      const jobsData = await jobService.getJobs();
      console.log('✅ Jobs loaded successfully:', jobsData);
      
      // Transform API data to match your component structure
      const transformedJobs = jobsData.map((job, index) => ({
        id: job.id,
        image: job.poster || getDefaultImage(job.category, index),
        tags: job.skill ? job.skill.split(',').map(s => s.trim()) : [job.category],
        title: job.title,
        company: job.company,
        location: job.location,
        category: job.category || 'IT', // Default to IT if no category
        salary: job.salary,
        level: job.level,
        experience: job.experience,
        description: job.job_description
      }));
      
      setJobs(transformedJobs);
    } catch (err) {
      console.error('❌ Error loading jobs:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      setJobs(getMockJobs());
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get default images based on category
  const getDefaultImage = (category, index) => {
    const categoryImages = {
      IT: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
      ],
      Marketing: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1455849318169-8d3cb32ba205?w=400&h=300&fit=crop'
      ],
      Design: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop'
      ]
    };
    
    const images = categoryImages[category] || categoryImages.IT;
    return images[index % images.length];
  };

  // Fallback mock data (keep your original mock data as backup)
  const getMockJobs = () => {
    return [
      // Your original mock data here (the 45 jobs array)
      // ... (keep your original mock data array)
    ];
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  // Update job counts based on actual data
  const updatedJobLevels = jobLevels.map(level => ({
    ...level,
    count: jobs.filter(job => {
      switch(level.titleEn) {
        case 'Internship': return job.level === 'intern';
        case 'Junior Level': return job.level === 'junior';
        case 'Medium Level': return job.level === 'mid';
        case 'Senior Level': return job.level === 'senior' || job.level === 'lead';
        default: return false;
      }
    }).length
  }));

  // Get unique categories from actual jobs
  const categories = ['all', ...new Set(jobs.map(job => job.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Dream Job</h1>
          <p className="text-gray-600 text-lg">Explore opportunities across all experience levels</p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-700">
              <strong>Note:</strong> {error} - Showing demo data
            </div>
          )}
        </div>

        {/* Job Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {updatedJobLevels.map((level, i) => {
            const IconComponent = level.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
              >
                <div className="mb-3 text-center flex justify-center">
                  <IconComponent className="w-12 h-12 text-black" />
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1 text-center">{level.titleKh}</p>
                <p className="text-xs text-gray-500 mb-3 text-center">{level.titleEn}</p>
                <div className="flex items-baseline gap-1 justify-center">
                  <p className="text-3xl font-bold text-blue-600">{level.count}</p>
                  <p className="text-sm text-gray-500">positions</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
            >
              {cat === 'all' ? 'All Jobs' : cat}
            </button>
          ))}
        </div>

        {/* Jobs Section with Scroll */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Jobs {filteredJobs.length > 0 && `(${filteredJobs.length})`}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-200 hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Scrollable Jobs Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
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
                      {job.level || 'New'}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Building2 className="w-4 h-4 text-black" />
                      <span>{job.company}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 text-black" />
                      <span>{job.location}</span>
                    </div>

                    {job.salary && (
                      <div className="text-sm text-green-600 font-semibold mb-3">
                        ${job.salary.toLocaleString()}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags && job.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link to={`/allcard/${job.id}`}>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
                <button 
                  onClick={loadJobs}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reload Jobs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <Link to={'/alldetail'}>
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium shadow-lg hover:shadow-xl">
              View All Jobs
            </button>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}