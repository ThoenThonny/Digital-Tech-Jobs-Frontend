import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LayoutDashboard, 
  Users, 
  LogOut, 
  X, 
  Menu, 
  Briefcase, 
  Image, 
  DollarSign,
  MapPin,
  Building,
  Code,
  Clock,
  Award,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  Server,
  Monitor,
  User,
  Shield,
  Calendar
} from 'lucide-react';
import { jobService } from '../service/jobsService';
import { authService } from '../service/Auth';

// Enhanced Modal Component with different sizes
function Modal({ open, onClose, children, size = 'md' }) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`bg-gray-900 rounded-xl shadow-2xl p-6 z-10 w-full mx-4 transform transition-all duration-300 ${
          sizeClasses[size]
        } ${
          open ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Alert Component for notifications
function Alert({ type, message, onClose }) {
  const alertConfig = {
    success: {
      bg: 'bg-green-900/50',
      border: 'border-green-700',
      text: 'text-green-200',
      icon: <CheckCircle className="w-5 h-5" />
    },
    error: {
      bg: 'bg-red-900/50',
      border: 'border-red-700',
      text: 'text-red-200',
      icon: <AlertCircle className="w-5 h-5" />
    },
    warning: {
      bg: 'bg-yellow-900/50',
      border: 'border-yellow-700',
      text: 'text-yellow-200',
      icon: <AlertCircle className="w-5 h-5" />
    },
    info: {
      bg: 'bg-blue-900/50',
      border: 'border-blue-700',
      text: 'text-blue-200',
      icon: <AlertCircle className="w-5 h-5" />
    }
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <div className={`fixed top-4 right-4 z-50 ${config.bg} ${config.border} border rounded-lg p-4 min-w-80 max-w-md backdrop-blur-sm transform transition-all duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${config.text}`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.text}`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// Job Card Component
const JobCard = ({ job, onEdit, onDelete, loading }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">{job.title}</h4>
        <p className="text-blue-400 font-medium">{job.company}</p>
      </div>
      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full capitalize">
        {job.level}
      </span>
    </div>
    
    {job.poster && (
      <div className="mb-4">
        <img 
          src={job.poster} 
          alt={job.title}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
    )}
    
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <MapPin size={14} />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <DollarSign size={14} />
        <span>${job.salary}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock size={14} />
        <span className="capitalize">{job.type?.replace('-', ' ')}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Code size={14} />
        <span>{job.category}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Award size={14} />
        <span>{job.experience}</span>
      </div>
    </div>

    {job.benefits && (
      <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-green-400">Benefits: </span>
          {job.benefits}
        </p>
      </div>
    )}

    <div className="flex items-center justify-between">
      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
        {job.skill}
      </span>
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(job)}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Edit2 size={14} />
          Edit
        </button>
        <button 
          onClick={() => onDelete(job.id)}
          disabled={loading}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  </div>
);

// User Table Component
const UserTable = ({ users, onDelete, loading }) => (
  <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 border-b border-gray-700">
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Joined Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.map((user, index) => (
            <tr 
              key={user.id} 
              className="bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              {/* User Info */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-100 truncate">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ID: {user.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Shield size={16} className={`${
                    user.role === 'admin' ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium capitalize ${
                    user.role === 'admin' ? 'text-purple-400' : 'text-gray-300'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </td>

              {/* Joined Date */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(user.created_at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    user.email_verified_at 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-yellow-500'
                  }`}></div>
                  <span className={`text-sm ${
                    user.email_verified_at 
                      ? 'text-green-400' 
                      : 'text-yellow-400'
                  }`}>
                    {user.email_verified_at ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {user.role !== 'admin' ? (
                    <button 
                      onClick={() => onDelete(user.id)}
                      disabled={loading}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  ) : (
                    <span className="px-3 py-2 bg-gray-700 text-gray-400 text-sm rounded-lg flex items-center gap-2">
                      <Shield size={16} />
                      Protected
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Empty State */}
    {users.length === 0 && (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No users found</p>
        <p className="text-gray-600 text-sm mt-1">Users will appear here once they register</p>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  // Job Posting Form Data
  const [postJobFormData, setPostJobFormData] = useState({
    title: '',
    category: 'IT',
    company: '',
    level: 'junior',
    skill: '',
    type: 'full-time',
    salary: '',
    location: '',
    job_description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    experience: '1',
    poster: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState({ 
    jobs: false, 
    users: false,
    action: false,
    dashboard: false 
  });
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Available categories and options
  const categories = [
    'IT', 'Design', 'Marketing'
  ];

  const experienceLevels = [
    { value: 'intern', label: 'Intern', description: 'Entry level, no experience required' },
    { value: 'junior', label: 'Junior', description: '0-2 years of experience' },
    { value: 'mid', label: 'Mid-Level', description: '2-5 years of experience' },
    { value: 'senior', label: 'Senior', description: '5+ years of experience' },
    { value: 'lead', label: 'Lead', description: '7+ years with leadership experience' }
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full Time', icon: Clock },
    { value: 'part-time', label: 'Part Time', icon: Clock },
    { value: 'contract', label: 'Contract', icon: FileText },
    { value: 'remote', label: 'Remote', icon: MapPin },
    { value: 'hybrid', label: 'Hybrid', icon: Building }
  ];

  // Experience options in years
  const experienceOptions = [
    { value: '0', label: 'No experience' },
    { value: '1', label: '1+ years' },
    { value: '2', label: '2+ years' },
    { value: '3', label: '3+ years' },
    { value: '5', label: '5+ years' },
    { value: '7', label: '7+ years' },
    { value: '10', label: '10+ years' }
  ];

  // Only 2 Developers: Backend & Frontend
  const profileCards = [
    {
      name: 'Thonny',
      role: 'Backend Developer',
      avatar: '/public/Ny.jpg',
      description: 'Backend PHP Laravel , and database design. Expert in building scalable APIs and microservices architecture.',
      department: 'Backend Team',
      joinDate: '2025-10-15',
      skills: ['PHP', 'Laravel', 'MySQL', 'MongoDB', 'SQL Server'],
      conect:'https://www.facebook.com/bro.nyslot',
      projects: 24,
      rating: 4.8,
      icon: Server
    },
    {
      name: 'Koem Tong',
      role: 'Frontend Developer',
      avatar: '/public/Tong.jpg',
      description: 'Frontend expert specializing in React, and modern JavaScript. Passionate about creating responsive web applications.',
      department: 'Frontend Team',
      joinDate: '2025-10-15',
      skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind', 'Next.js'],
      conect:'https://www.facebook.com/khong.kimtong',
      projects: 18,
      rating: 4.9,
      icon: Monitor
    }
  ];

  // Show alert function
  const showAlert = (type, message, duration = 5000) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, duration);
  };

  // Load current user and data on component mount
  useEffect(() => {
    loadCurrentUser();
    loadPostedJobs();
    loadUsers();
  }, []);

  // Load current user info
  const loadCurrentUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setCurrentUser(userData.user || userData);
    } catch (error) {
      console.error('Error loading current user:', error);
      showAlert('error', 'Failed to load user information');
    }
  };

  // Load posted jobs from API
  const loadPostedJobs = async () => {
    try {
      setLoading(prev => ({ ...prev, jobs: true }));
      const jobsData = await jobService.getJobs();
      setPostedJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      showAlert('error', 'Failed to load jobs: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, jobs: false }));
    }
  };

  // Load users from API (admin only)
  const loadUsers = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      const usersData = await jobService.getAdminUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
      showAlert('error', 'Failed to load users: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert('error', 'Please select a valid image file (JPEG, PNG, etc.)');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showAlert('error', 'Image size should be less than 2MB');
        return;
      }

      setPostJobFormData({
        ...postJobFormData,
        poster: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setPostJobFormData({
      ...postJobFormData,
      poster: null
    });
    setImagePreview(null);
  };

  // Open Post Job Modal for creating or editing
  const openPostJobModal = (job = null) => {
    if (job) {
      // Editing existing job
      setEditingJob(job);
      // Extract numeric value from experience string (e.g., "1+ years" -> "1")
      const experienceValue = job.experience ? job.experience.replace('+ years', '').replace(' years', '') : '1';
      
      setPostJobFormData({
        title: job.title || '',
        category: job.category || 'IT',
        company: job.company || '',
        level: job.level || 'junior',
        skill: job.skill || '',
        type: job.type || 'full-time',
        salary: job.salary || '',
        location: job.location || '',
        job_description: job.job_description || '',
        requirements: job.requirements || '',
        responsibilities: job.responsibilities || '',
        benefits: job.benefits || '',
        experience: experienceValue,
        poster: null // Don't pre-fill poster for editing
      });
      
      // Set image preview if job has a poster
      if (job.poster) {
        setImagePreview(job.poster);
      } else {
        setImagePreview(null);
      }
    } else {
      // Creating new job
      setEditingJob(null);
      setPostJobFormData({
        title: '',
        category: 'IT',
        company: '',
        level: 'junior',
        skill: '',
        type: 'full-time',
        salary: '',
        location: '',
        job_description: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        experience: '1',
        poster: null
      });
      setImagePreview(null);
    }
    setShowPostJobModal(true);
  };

  const savePostedJob = async () => {
    // Validate required fields
    const requiredFields = [
      'title', 'company', 'location', 'salary', 'job_description', 
      'requirements', 'responsibilities', 'benefits', 'experience'
    ];
    
    const missingFields = requiredFields.filter(field => !postJobFormData[field]);
    
    if (missingFields.length > 0) {
      showAlert('error', `Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));

      const jobData = {
        title: postJobFormData.title,
        category: postJobFormData.category,
        company: postJobFormData.company,
        level: postJobFormData.level,
        skill: postJobFormData.skill,
        type: postJobFormData.type,
        salary: parseFloat(postJobFormData.salary) || 0,
        location: postJobFormData.location,
        job_description: postJobFormData.job_description,
        requirements: postJobFormData.requirements,
        responsibilities: postJobFormData.responsibilities,
        benefits: postJobFormData.benefits,
        experience: postJobFormData.experience + '+ years',
        poster: postJobFormData.poster
      };

      if (editingJob) {
        // Update existing job using jobService
        await jobService.updateJob(editingJob.id, jobData);
        showAlert('success', 'Job updated successfully!');
      } else {
        // Create new job using jobService
        await jobService.createJob(jobData);
        showAlert('success', 'Job posted successfully!');
      }
      
      await loadPostedJobs();
      setShowPostJobModal(false);
    } catch (error) {
      console.error('Error posting job:', error);
      showAlert('error', error.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  const deletePostedJob = async (id) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      // Use jobService to delete job
      await jobService.deleteJob(id);
      await loadPostedJobs();
      showAlert('success', 'Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      showAlert('error', 'Failed to delete job: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  // Delete user (admin only)
  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, action: true }));
      // Note: You'll need to add a delete user endpoint in your backend
      showAlert('warning', 'User deletion feature coming soon');
      // For now, just reload users
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('error', 'Failed to delete user: ' + error.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setShowLogoutModal(false);
      showAlert('info', 'Logged out successfully!');
      // Redirect to login page after logout
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      console.error('Error logging out:', error);
      showAlert('error', 'Failed to logout: ' + error.message);
    }
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'post-job', icon: Briefcase, label: 'Post Job' },
    ...(currentUser?.role === 'admin' ? [{ id: 'users', icon: Users, label: 'Users' }] : [])
  ];

  const renderContent = () => {
    if (activeNav === 'users' && currentUser?.role === 'admin') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">User Management</h3>
              <p className="text-gray-400 mt-1">View and manage system users</p>
            </div>
            {/* Statistics */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Total: {users.length} users</span>
              <span>•</span>
              <span>Admins: {users.filter(u => u.role === 'admin').length}</span>
              <span>•</span>
              <span>Users: {users.filter(u => u.role === 'user').length}</span>
            </div>
          </div>

          {loading.users && (
            <div className="bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              Loading users...
            </div>
          )}

          <UserTable 
            users={users} 
            onDelete={deleteUser} 
            loading={loading.action} 
          />
        </div>
      );
    }

    if (activeNav === 'post-job') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Job Management</h3>
              <p className="text-gray-400 mt-1">Create and manage job postings</p>
            </div>
            <button
              onClick={() => openPostJobModal()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Post New Job
            </button>
          </div>

          {loading.jobs && (
            <div className="bg-blue-900/50 border border-blue-700 text-blue-200 px-4 py-3 rounded-lg">
              Loading jobs...
            </div>
          )}

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Posted Jobs ({postedJobs.length})</h4>
            {postedJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No jobs posted yet</p>
                <p className="text-gray-600 text-sm mt-1">Get started by posting your first job</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {postedJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onEdit={openPostJobModal} 
                    onDelete={deletePostedJob} 
                    loading={loading.action} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Dashboard View
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-xl p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-gray-100 mb-3">
            Welcome back, {currentUser?.name || 'Admin'}!
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Streamline your hiring process with our comprehensive job management platform. 
            Post jobs, track applications, and manage your team efficiently.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-600 transition-all cursor-pointer" onClick={() => openPostJobModal()}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-100">Post New Job</h3>
                <p className="text-gray-400 text-sm">Create and publish a new job listing</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-100">{postedJobs.length} Active Jobs</h3>
                <p className="text-gray-400 text-sm">Currently posted job listings</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-100">{users.length} Users</h3>
                <p className="text-gray-400 text-sm">Registered users in the system</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-100">{profileCards.length} Developers</h3>
                <p className="text-gray-400 text-sm">Backend & Frontend specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Developer Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-86">
          {profileCards.map((profile, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="md:flex">
                {/* LEFT SIDE - Image */}
                <div className="md:w-1/2 w-full h-60 md:h-auto overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* RIGHT SIDE - Info */}
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      {profile.name}
                      {profile.verified && (
                        <span className="text-blue-400">
                          <profile.icon className="w-4 h-4" />
                        </span>
                      )}
                    </h2>
                    <p className="text-green-400 font-medium mb-2">{profile.role}</p>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {profile.description}
                    </p>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
                    <p>
                      <span className="text-gray-500">Role:</span>{" "}
                      {profile.department}
                    </p>
                    <p>
                      <span className="text-gray-500">Joined:</span>{" "}
                      {profile.joinDate}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <a href={profile.conect} target='_blank' rel="noopener noreferrer" className="mt-6 px-4 py-2 bg-green-500 text-black font-semibold rounded-md hover:bg-green-400 transition-all text-center">
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">New job posted</p>
                  <p className="text-gray-400 text-xs">Senior Full Stack Developer</p>
                </div>
                <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-200 text-sm">User registered</p>
                  <p className="text-gray-400 text-xs">New user joined the system</p>
                </div>
                <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-gray-100 mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Backend Team</p>
                    <p className="text-gray-400 text-xs">API & Database</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">1 Developer</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Frontend Team</p>
                    <p className="text-gray-400 text-xs">UI/UX & Client-side</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">1 Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show loading while fetching current user
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Alert System */}
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(prev => ({ ...prev, show: false }))} 
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold text-gray-200">JOB SYSTEM</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-200 transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
              {currentUser.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-200 truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all border border-gray-800"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-950 overflow-hidden">
        <div className="border-b border-gray-800 p-6 flex items-center justify-between bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-100">
            {activeNav === 'users' ? 'User Management' : 
             activeNav === 'post-job' ? 'Job Management' : 'Dashboard Overview'}
          </h2>
          <div className="text-sm text-gray-400">
            Role: <span className="font-semibold text-gray-200 capitalize">{currentUser.role}</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>

      {/* Big Post Job Modal */}
      <Modal open={showPostJobModal} onClose={() => setShowPostJobModal(false)} size="xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-100">
              {editingJob ? 'Edit Job' : 'Post New Job'}
            </h3>
            <p className="text-gray-400 mt-1">
              {editingJob ? 'Update the job details' : 'Fill in the details to create a new job posting'}
            </p>
          </div>
          <button
            onClick={() => setShowPostJobModal(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
          {/* Left Column - Basic Information */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Building size={18} />
                Basic Information
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Job Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Frontend Developer"
                    value={postJobFormData.title}
                    onChange={e => setPostJobFormData({ ...postJobFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company *</label>
                  <input
                    type="text"
                    placeholder="e.g., Tech Corp Inc."
                    value={postJobFormData.company}
                    onChange={e => setPostJobFormData({ ...postJobFormData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., New York, NY"
                      value={postJobFormData.location}
                      onChange={e => setPostJobFormData({ ...postJobFormData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Salary *</label>
                    <input
                      type="number"
                      placeholder="e.g., 75000"
                      value={postJobFormData.salary}
                      onChange={e => setPostJobFormData({ ...postJobFormData, salary: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                  <select
                    value={postJobFormData.category}
                    onChange={e => setPostJobFormData({ ...postJobFormData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Experience Level</label>
                    <select
                      value={postJobFormData.level}
                      onChange={e => setPostJobFormData({ ...postJobFormData, level: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Job Type</label>
                    <select
                      value={postJobFormData.type}
                      onChange={e => setPostJobFormData({ ...postJobFormData, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Required Experience *</label>
                  <select
                    value={postJobFormData.experience}
                    onChange={e => setPostJobFormData({ ...postJobFormData, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {experienceOptions.map(exp => (
                      <option key={exp.value} value={exp.value}>{exp.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Required Skills *</label>
                  <input
                    type="text"
                    placeholder="e.g., React, Node.js, TypeScript"
                    value={postJobFormData.skill}
                    onChange={e => setPostJobFormData({ ...postJobFormData, skill: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Image size={18} />
                Job Poster {editingJob && <span className="text-sm text-gray-500">(Leave empty to keep current image)</span>}
              </h4>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg mx-auto"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm mb-2">Upload job poster image</p>
                    <p className="text-gray-500 text-xs mb-3">PNG, JPG up to 2MB</p>
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors cursor-pointer inline-block">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <FileText size={18} />
                Job Details
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Job Description *</label>
                  <textarea
                    placeholder="Describe the role, responsibilities, and what makes this job exciting..."
                    value={postJobFormData.job_description}
                    onChange={e => setPostJobFormData({ ...postJobFormData, job_description: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Requirements *</label>
                  <textarea
                    placeholder="List the required qualifications, skills, and experience..."
                    value={postJobFormData.requirements}
                    onChange={e => setPostJobFormData({ ...postJobFormData, requirements: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Responsibilities *</label>
                  <textarea
                    placeholder="Detail the day-to-day tasks and responsibilities..."
                    value={postJobFormData.responsibilities}
                    onChange={e => setPostJobFormData({ ...postJobFormData, responsibilities: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Benefits *</label>
                  <textarea
                    placeholder="Health insurance, flexible hours, remote work, professional development..."
                    value={postJobFormData.benefits}
                    onChange={e => setPostJobFormData({ ...postJobFormData, benefits: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPostJobModal(false)}
                  disabled={loading.action}
                  className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={savePostedJob}
                  disabled={loading.action}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                >
                  {loading.action ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingJob ? 'Updating...' : 'Posting...'}
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      {editingJob ? 'Update Job' : 'Post Job'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal open={showLogoutModal} onClose={() => setShowLogoutModal(false)} size="sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">Confirm Logout</h3>
          <p className="text-gray-400 mb-6">Are you sure you want to logout from the dashboard?</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}