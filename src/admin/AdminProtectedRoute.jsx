// components/AdminProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../service/Auth';

function AdminProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminAuthorization = async () => {
      try {
        console.log('AdminProtectedRoute: Checking admin authorization...');
        
        // Check if user is authenticated first
        const isAuthenticated = await authService.verifyToken();
        if (!isAuthenticated) {
          console.log('AdminProtectedRoute: User not authenticated');
          setIsAuthorized(false);
          return;
        }

        // Check if user is admin
        const userRole = await authService.getUserRole();
        console.log('AdminProtectedRoute: User role:', userRole);
        
        if (userRole === 'admin') {
          console.log('AdminProtectedRoute: User is admin, authorized');
          setIsAuthorized(true);
        } else {
          console.log('AdminProtectedRoute: User is not admin, not authorized');
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('AdminProtectedRoute: Authorization check failed:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuthorization();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking admin permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    console.log('AdminProtectedRoute: Redirecting to 404');
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default AdminProtectedRoute;