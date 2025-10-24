// pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Shield } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-700 opacity-50">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-24 h-24 text-red-500 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Sorry, you don't have permission to access this page. 
          This area is restricted to administrators only.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all transform hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Admin Contact Info */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            If you believe you should have access, please contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;