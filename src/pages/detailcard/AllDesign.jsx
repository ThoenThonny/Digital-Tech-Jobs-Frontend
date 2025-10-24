import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ArrowLeft, 
  Building,
  Calendar,
  Users,
  CheckCircle
} from 'lucide-react';
import { getJobById } from '../../service/jobsService';

export default function AllDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('description');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobData = await getJobById(id);
        console.log('Job data received:', jobData);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message || 'Failed to load job details');
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    } else {
      setError('No job ID provided');
      setLoading(false);
    }
  }, [id]);

  // Data processing functions
  const getRequirements = () => {
    if (!job) return [];
    
    if (job.requirements && Array.isArray(job.requirements)) {
      return job.requirements;
    }
    if (typeof job.requirements === 'string') {
      return job.requirements.split('/v/').filter(item => item.trim());
    }
    return [];
  };

  const getBenefits = () => {
    if (!job) return [];
    
    if (job.benefits && Array.isArray(job.benefits)) {
      return job.benefits;
    }
    if (typeof job.benefits === 'string') {
      return job.benefits.split('/v/').filter(item => item.trim());
    }
    return [];
  };

  const getResponsibilities = () => {
    if (!job) return [];
    
    if (job.responsibilities && Array.isArray(job.responsibilities)) {
      return job.responsibilities;
    }
    if (typeof job.responsibilities === 'string') {
      return job.responsibilities.split('/v/').filter(item => item.trim());
    }
    return [];
  };

  const getSkills = () => {
    if (!job) return [];
    
    if (job.skill && Array.isArray(job.skill)) {
      return job.skill;
    }
    if (typeof job.skill === 'string') {
      return job.skill.split(',').map(item => item.trim()).filter(item => item);
    }
    if (job.tags && Array.isArray(job.tags)) {
      return job.tags;
    }
    if (job.skills && Array.isArray(job.skills)) {
      return job.skills;
    }
    return [];
  };

  // Process data only when job exists
  const requirements = job ? getRequirements() : [];
  const benefits = job ? getBenefits() : [];
  const responsibilities = job ? getResponsibilities() : [];
  const skills = job ? getSkills() : [];

  // Format salary for display
  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable';
    if (typeof salary === 'string' && salary.includes('M')) {
      return salary.replace('M', ' Million');
    }
    return salary;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
          >
            <ArrowLeft size={20} />
            Browse Other Jobs
          </button>
        </div>
      </div>
    );
  }

  // Navigation sections
  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'requirements', label: 'Requirements', count: requirements.length },
    { id: 'responsibilities', label: 'Responsibilities', count: responsibilities.length },
    { id: 'benefits', label: 'Benefits', count: benefits.length },
  ].filter(section => section.count === undefined || section.count > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mt-20">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Jobs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Job Overview */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={job.poster || job.image || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'}
                    alt={job.title}
                    className="w-56 h-46 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    {job.category && (
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        <span>{job.category}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <DollarSign className="mx-auto text-purple-600" size={20} />
                      <div className="mt-1 font-semibold">{formatSalary(job.salary)}</div>
                      <div className="text-xs text-gray-500">Salary</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Briefcase className="mx-auto text-green-600" size={20} />
                      <div className="mt-1 font-semibold">{job.level || job.experience}</div>
                      <div className="text-xs text-gray-500">Level</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Clock className="mx-auto text-blue-600" size={20} />
                      <div className="mt-1 font-semibold">{job.type}</div>
                      <div className="text-xs text-gray-500">Type</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Calendar className="mx-auto text-orange-600" size={20} />
                      <div className="mt-1 font-semibold">
                        {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recent'}
                      </div>
                      <div className="text-xs text-gray-500">Posted</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills/Tags */}
              {skills.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm border mb-6">
              <div className="flex overflow-x-auto">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? 'border-purple-600 rounded-xl text-purple-600 bg-purple-50'
                        : 'border-transparent text-gray-500 rounded-xl hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                    {section.count && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeSection === section.id 
                          ? 'bg-purple-200 text-purple-700' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {section.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Description */}
              {activeSection === 'description' && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                  <div className="prose max-w-none text-gray-600">
                    <p className="whitespace-pre-line leading-relaxed">
                      {job.description || job.job_description || 'No description available.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {activeSection === 'requirements' && requirements.length > 0 && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {activeSection === 'responsibilities' && responsibilities.length > 0 && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 text-blue-500 mt-1" size={18} />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {activeSection === 'benefits' && benefits.length > 0 && (
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                  <ul className="space-y-3">
                    {benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="flex-shrink-0 text-purple-500 mt-1" size={18} />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Action Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
                <button 
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold shadow-sm"
                  onClick={() => {
                    console.log('Applying for job:', job.id);
                    // Add application logic here
                  }}
                >
                  Apply Now
                </button>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building size={16} />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>Design Company</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Job Meta Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Posted:</span>
                    <span className="text-gray-700">
                      {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-700">{job.category || 'Design'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <span className="text-gray-700">{job.level || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="text-gray-700">{job.type || 'Full-time'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}