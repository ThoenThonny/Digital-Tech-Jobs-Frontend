import React, { useState, useEffect } from 'react';
import { Building2, MapPin, ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import jobService from '../../service/jobsService';

export default function MarkitingDetail() {
  const [expandedSections, setExpandedSections] = useState({
    internship: false,
    entry: false,
    mid: false,
    senior: false
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter only Marketing category jobs
  const filterMarketingCategoryJobs = (jobsData) => {
    if (!jobsData) return [];
    
    return jobsData.filter(job => {
      const category = job.category?.toLowerCase() || '';
      const title = job.title?.toLowerCase() || '';
      const tags = job.tags || [];
      const skills = job.skills || [];
      
      // Marketing-related keywords
      const marketingKeywords = [
        'marketing', 'digital marketing', 'social media', 'content', 'seo',
        'advertising', 'brand', 'campaign', 'market research', 'analytics',
        'email marketing', 'influencer', 'public relations', 'pr',
        'growth', 'demand generation', 'product marketing', 'content marketing',
        'social media marketing', 'performance marketing', 'brand management'
      ];
      
      // Check if job is Marketing-related
      return marketingKeywords.some(keyword => 
        category.includes(keyword) ||
        title.includes(keyword) ||
        tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        skills.some(skill => skill.toLowerCase().includes(keyword))
      );
    });
  };

  // Fetch jobs from API
  useEffect(() => {
    fetchMarketingJobs();
  }, []);

  const fetchMarketingJobs = async () => {
    try {
      setLoading(true);
      let marketingJobs = [];

      // Try to get Marketing category jobs directly from API
      try {
        marketingJobs = await jobService.getJobsByCategory('Marketing');
      } catch (categoryError) {
        console.log('Marketing category endpoint not available, filtering all jobs...');
        // If category endpoint fails, get all jobs and filter by Marketing category
        const allJobs = await jobService.getJobs();
        marketingJobs = filterMarketingCategoryJobs(allJobs);
      }

      setJobs(marketingJobs);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Marketing jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Categorize Marketing jobs by level
  const categorizeJobsByLevel = (marketingJobs) => {
    const categorized = {
      internship: [],
      entry: [],
      mid: [],
      senior: []
    };

    marketingJobs.forEach(job => {
      const level = job.level?.toLowerCase() || '';
      
      if (level.includes('intern') || level.includes('student') || level.includes('trainee')) {
        categorized.internship.push(job);
      } else if (level.includes('junior') || level.includes('entry') || level.includes('fresher')) {
        categorized.entry.push(job);
      } else if (level.includes('mid') || level.includes('medium') || level.includes('intermediate') || level.includes('associate')) {
        categorized.mid.push(job);
      } else if (level.includes('senior') || level.includes('lead') || level.includes('principal') || level.includes('expert')) {
        categorized.senior.push(job);
      } else {
        // Default to mid level if no level specified
        categorized.mid.push(job);
      }
    });

    return categorized;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const JobCard = ({ job, isExpanded }) => (
    <div 
      className={`${isExpanded ? 'w-full' : 'min-w-[320px] flex-shrink-0 snap-start'} bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-300 cursor-pointer group`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={job.poster || job.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'} 
          alt={job.title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          MARKETING
        </div>
        {job.level && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-green-600 shadow-md">
            {job.level}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
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
        
        {/* Tags from job data */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(job.tags || job.skills || []).slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium border border-green-100"
            >
              {tag}
            </span>
          ))}
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
        
        <Link to={`/marketingDetail/${job.id}`}>
          <button className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );

  const JobSection = ({ title, level, jobs, icon, gradient }) => {
    const isExpanded = expandedSections[level];
    
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 text-sm">{jobs.length} marketing positions available</p>
            </div>
          </div>
          
          {jobs.length > 0 && (
            <button 
              onClick={() => toggleSection(level)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''} group-hover:translate-x-1`} />
            </button>
          )}
        </div>

        {jobs.length > 0 ? (
          !isExpanded ? (
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
          )
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No {title.toLowerCase()} marketing positions available</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading marketing jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={fetchMarketingJobs}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categorizedJobs = categorizeJobsByLevel(jobs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 p-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Marketing Careers Await
          </h1>
          <p className="text-gray-600 text-xl mb-4">
            Explore marketing opportunities across all experience levels
          </p>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block">
            <span className="font-semibold">Marketing Jobs Only</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Showing {jobs.length} marketing positions
          </div>
        </div>

        <JobSection 
          title="Marketing Internships" 
          level="internship" 
          jobs={categorizedJobs.internship}
          icon="🎓"
          gradient="from-green-400 to-emerald-500"
        />

        <JobSection 
          title="Entry Level Marketing" 
          level="entry" 
          jobs={categorizedJobs.entry}
          icon="🚀"
          gradient="from-blue-400 to-cyan-500"
        />

        <JobSection 
          title="Mid Level Marketing" 
          level="mid" 
          jobs={categorizedJobs.mid}
          icon="📊"
          gradient="from-purple-400 to-blue-500"
        />

        <JobSection 
          title="Senior Level Marketing" 
          level="senior" 
          jobs={categorizedJobs.senior}
          icon="👑"
          gradient="from-orange-400 to-red-500"
        />
      </div>
    </div>
  );
}