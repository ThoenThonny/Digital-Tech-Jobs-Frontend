// service/Auth.js
import api from "./api";

// Auth API Service
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      
      // Save token to localStorage and set default header
      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
        throw new Error(`Registration failed: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  },

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      
      // Save token to localStorage and set default header
      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      
      // Handle validation errors
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
        throw new Error(`Login failed: ${errorMessages}`);
      }
      
      throw new Error(error.response?.data?.message || 'Invalid login credentials');
    }
  },

  // Logout user
  async logout() {
    try {
      // Call logout endpoint if token exists
      const token = this.getToken();
      if (token) {
        await api.post('/logout');
      }
      
      // Clear token from storage and headers
      this.removeToken();
      
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      // Still remove token even if API call fails
      this.removeToken();
      throw new Error(error.response?.data?.message || 'Failed to logout');
    }
  },

  // Get current user info
  async getCurrentUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      
      // If unauthorized, clear token
      if (error.response?.status === 401) {
        this.removeToken();
        throw new Error('Session expired. Please login again.');
      }
      
      throw new Error(error.response?.data?.message || 'Failed to get user information');
    }
  },

  // Get all users (admin only) - ADD THIS TO YOUR BACKEND API ROUTES
  async getUsers() {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Check if user is admin
  async checkAdmin() {
    try {
      const response = await api.get('/admin/check');
      return response.data;
    } catch (error) {
      console.error('Error checking admin access:', error);
      throw new Error(error.response?.data?.message || 'Admin access denied');
    }
  },

  // Get user role
  async getUserRole() {
    try {
      const user = await this.getCurrentUser();
      return user.role || 'user';
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'user';
    }
  },

  // Check if current user is admin
  async isAdmin() {
    try {
      const role = await this.getUserRole();
      return role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },

  // Token management
  setToken(token) {
    localStorage.setItem('access_token', token);
    // Also set in sessionStorage for redundancy
    sessionStorage.setItem('access_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  getToken() {
    // Try localStorage first, then sessionStorage
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  },

  removeToken() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization'];
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  // Initialize auth state (call this when app starts)
  initializeAuth() {
    const token = this.getToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Token initialized:', token.substring(0, 20) + '...');
    } else {
      console.log('No token found during initialization');
    }
    return token;
  },

  // Verify token is still valid
  async verifyToken() {
    try {
      if (!this.isAuthenticated()) {
        return false;
      }
      await this.getCurrentUser();
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      this.removeToken();
      return false;
    }
  }
};

// Individual export functions for direct usage
export const register = (userData) => authService.register(userData);
export const login = (credentials) => authService.login(credentials);
export const logout = () => authService.logout();
export const getCurrentUser = () => authService.getCurrentUser();
export const getUsers = () => authService.getUsers();
export const getUserById = (id) => authService.getUserById(id);
export const checkAdmin = () => authService.checkAdmin();
export const isAuthenticated = () => authService.isAuthenticated();
export const initializeAuth = () => authService.initializeAuth();
export const verifyToken = () => authService.verifyToken();

export default authService;