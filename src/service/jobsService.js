import api from "./api";

// Job API Service
export const jobService = {
  // ✅ Get all jobs
  async getJobs() {
    try {
      const response = await api.get('/jobs');
      // Your backend returns jobs array directly
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch jobs');
    }
  },

  // ✅ Get job by ID
  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      // Your backend returns job object directly
      return response.data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
  },

  // ✅ Create new job
  async createJob(jobData) {
    try {
      const formData = new FormData();
      
      // Append all job data to FormData
      Object.keys(jobData).forEach(key => {
        if (key === 'poster' && jobData[key] instanceof File) {
          formData.append('poster', jobData[key]);
        } else if (jobData[key] !== null && jobData[key] !== undefined) {
          formData.append(key, jobData[key]);
        }
      });

      const response = await api.post('/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Your backend returns {data: job, message: '...'}
      return response.data.data; // Return the job data
    } catch (error) {
      console.error('Error creating job:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.error || 'Failed to create job');
    }
  },

  // ✅ Update job - Using POST method (changed from PUT)
  async updateJob(id, jobData) {
    try {
      const formData = new FormData();
      
      // Append all job data to FormData
      Object.keys(jobData).forEach(key => {
        if (key === 'poster' && jobData[key] instanceof File) {
          formData.append('poster', jobData[key]);
        } else if (jobData[key] !== null && jobData[key] !== undefined) {
          formData.append(key, jobData[key]);
        }
      });

      // Use POST method for update (changed from PUT)
      const response = await api.post(`/jobs/${id}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Your backend returns {data: job, message: '...'}
      return response.data.data; // Return the updated job data
    } catch (error) {
      console.error('Error updating job:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.error || 'Failed to update job');
    }
  },

  // ✅ Delete job
  async deleteJob(id) {
    try {
      const response = await api.delete(`/jobs/${id}`);
      // Your backend returns {message: '...'}
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete job');
    }
  },

  // 🔍 Search jobs (if you add this to your controller)
  async searchJobs(keyword) {
    try {
      const response = await api.get(`/jobs/search/${keyword}`);
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw new Error(error.response?.data?.error || 'Failed to search jobs');
    }
  },

  // 📁 Get jobs by category (if you add this to your controller)
  async getJobsByCategory(category) {
    try {
      const response = await api.get(`/jobs/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs by category:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch jobs by category');
    }
  },

  // 🏷️ Get jobs by type (if you add this to your controller)
  async getJobsByType(type) {
    try {
      const response = await api.get(`/jobs/type/${type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs by type:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch jobs by type');
    }
  },

  // 📊 Get jobs by level (if you add this to your controller)
  async getJobsByLevel(level) {
    try {
      const response = await api.get(`/jobs/level/${level}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs by level:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch jobs by level');
    }
  },

  // 👑 Admin: Get all jobs for admin
  async getAdminJobs() {
    try {
      const response = await api.get('/admin/jobs');
      return response.data.data; // Return jobs array
    } catch (error) {
      console.error('Error fetching admin jobs:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch admin jobs');
    }
  },

  // 👑 Admin: Delete job as admin
  async adminDeleteJob(id) {
    try {
      const response = await api.delete(`/admin/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting job as admin:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete job as admin');
    }
  },

  // 👑 Admin: Get all users
  async getAdminUsers() {
    try {
      const response = await api.get('/admin/users');
      return response.data.data; // Return users array
    } catch (error) {
      console.error('Error fetching admin users:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch admin users');
    }
  },

  // 👑 Admin: Get dashboard stats
  async getAdminDashboard() {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data.data; // Return dashboard data
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch admin dashboard');
    }
  },

  // 👑 Admin: Check if user is admin
  async checkAdmin() {
    try {
      const response = await api.get('/admin/check');
      return response.data; // Return {is_admin: true/false, user: userData}
    } catch (error) {
      console.error('Error checking admin status:', error);
      throw new Error(error.response?.data?.error || 'Failed to check admin status');
    }
  }
};

// Individual export functions for direct usage
export const getJobs = () => jobService.getJobs();
export const getJobById = (id) => jobService.getJobById(id);
export const createJob = (jobData) => jobService.createJob(jobData);
export const updateJob = (id, jobData) => jobService.updateJob(id, jobData);
export const deleteJob = (id) => jobService.deleteJob(id);
export const searchJobs = (keyword) => jobService.searchJobs(keyword);
export const getJobsByCategory = (category) => jobService.getJobsByCategory(category);
export const getJobsByType = (type) => jobService.getJobsByType(type);
export const getJobsByLevel = (level) => jobService.getJobsByLevel(level);

// Admin functions
export const getAdminJobs = () => jobService.getAdminJobs();
export const adminDeleteJob = (id) => jobService.adminDeleteJob(id);
export const getAdminUsers = () => jobService.getAdminUsers();
export const getAdminDashboard = () => jobService.getAdminDashboard();
export const checkAdmin = () => jobService.checkAdmin();

export default jobService;