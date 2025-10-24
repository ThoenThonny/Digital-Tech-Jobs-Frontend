import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, X, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import jobService from '../../service/jobsService';

export default function Alldetail() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobsData = await jobService.getJobs();
        console.log('Jobs data received:', jobsData);
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to load jobs');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on category and search query
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesSearch = !searchQuery || 
      (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  // Get unique categories from jobs
  const categories = ['all', ...new Set(jobs.map(job => job.category).filter(Boolean))];

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'it':
        return 'bg-blue-600 text-white';
      case 'marketing':
        return 'bg-green-600 text-white';
      case 'design':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <div className="w-[100%] h-[200px] bg-blue-50"></div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="w-[100%] h-[200px] bg-blue-50"></div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[100%] h-[200px] bg-blue-50"></div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Find Your Dream Job</h1>
            <p className="text-gray-600 text-lg">Explore opportunities across all experience levels</p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title, company, location, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {cat === 'all' ? 'All Jobs' : cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 font-medium">
              Showing {filteredJobs.length} of {jobs.length} jobs
              {activeCategory !== 'all' && ` in ${activeCategory}`}
            </p>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={job.poster || job.image || getDefaultImage(job.category)} 
                      alt={job.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      onError={(e) => {
                        e.target.src = getDefaultImage(job.category);
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-md">
                      New
                    </div>
                    {job.category && (
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(job.category)}`}>
                        {job.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {job.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{job.location || 'Location not specified'}</span>
                    </div>
                    
                    {/* Tags from job data */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(job.tags || job.skills || []).slice(0, 2).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {(job.tags || job.skills || []).length > 2 && (
                        <span className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full font-medium">
                          +{(job.tags || job.skills || []).length - 2}
                        </span>
                      )}
                    </div>
                    
                    {/* Salary if available */}
                    {job.salary && (
                      <div className="mb-3">
                        <p className="text-green-600 font-semibold text-sm">{job.salary} $</p>
                      </div>
                    )}
                    
                    <Link to={`/allcard/${job.id}`}>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl mb-2">No jobs found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get default image based on category
function getDefaultImage(category) {
  switch (category?.toLowerCase()) {
    case 'it':
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop';
    case 'marketing':
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop';
    case 'design':
      return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop';
    default:
      return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop';
  }
}