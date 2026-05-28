import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../pages/home/Navbar'
import Home from '../pages/home/Home'
import IT_relate from '../pages/jops/IT_relate'
import Footer from '../pages/home/Footer'
import ItcardDetail from '../pages/detailpage/ItcardDetail'
import Marketing_jops from '../pages/jops/Marketing_jops'
import MarkitingDetail from '../pages/detailpage/MarketingDetail'
import Design_jops from '../pages/jops/Design_jops'
import DesignDetail from '../pages/detailpage/DesignDetail'
import AboutUs from '../pages/about_us/AboutUs'
import Contact_us from '../pages/contact_us/contact_us'
import Register from '../pages/login_register/Register'
import Login from '../pages/login_register/Login'
import Alldetail from '../pages/detailpage/Alldetail'
import HomecardDetail from '../pages/detailcard/HomecardDetail'
import ItcardMoreDetail from '../pages/detailcard/ItcardMoreDetal'
import AllDetailCardIT from '../pages/detail_all_level_card/AllDetailCardIT'
import MarketingCardDetail from '../pages/detailcard/MarketingCardDetail'
import AllMaketingCard from '../pages/detail_all_level_card/AllMaketingCard'
import AllDesign from '../pages/detailcard/AllDesign'
import AllDetailCardDesign from '../pages/detail_all_level_card/AllDetailCardDesign'
import Dashboard from '../admin/Dashboard'
import NotFound from '../pages/NotFound/NotFound'
import AdminProtectedRoute from '../admin/AdminProtectedRoute'
import authService from '../service/Auth'


authService.initializeAuth();


function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Checking authentication...</p>
      </div>
    </div>
  )
}

// Protected Route Component (for regular authenticated users)
function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Checking authentication...');
        
        // Check if token exists and is valid
        const hasValidToken = await authService.verifyToken();
        
        if (hasValidToken) {
          console.log('ProtectedRoute: User is authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('ProtectedRoute: User is not authenticated');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('ProtectedRoute: Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirecting to login');
    return <Navigate to="/login" replace />
  }

  return children
}

// Public Route Component (for login/register pages)
function PublicRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('PublicRoute: Checking authentication...');
        
        // Check if token exists and is valid
        const hasValidToken = await authService.verifyToken();
        
        if (hasValidToken) {
          console.log('PublicRoute: User is authenticated, redirecting to home');
          setIsAuthenticated(true);
        } else {
          console.log('PublicRoute: User is not authenticated, showing public page');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('PublicRoute: Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    console.log('PublicRoute: Redirecting to home');
    return <Navigate to="/" replace />
  }

  return children
}

function Layout() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/register' || location.pathname === '/login'
  const isNotFoundPage = location.pathname === '/404'
  const isDashboardPage = location.pathname === '/dashboard'

  return (
    <div>
  
      {!isAuthPage && !isNotFoundPage && !isDashboardPage && <Navbar />}

      <Routes>
     
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

     
        <Route path="/404" element={<NotFound />} />

    
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/itRelate' element={<ProtectedRoute><IT_relate /></ProtectedRoute>} />
        <Route path='/itRelate/itCardDetail' element={<ProtectedRoute><ItcardDetail /></ProtectedRoute>} />
        <Route path='/marketing_relate' element={<ProtectedRoute><Marketing_jops /></ProtectedRoute>} />
        <Route path='/marketingDetail' element={<ProtectedRoute><MarkitingDetail /></ProtectedRoute>} />
        <Route path='/design_jop' element={<ProtectedRoute><Design_jops /></ProtectedRoute>} />
        <Route path='/design_jop/detail' element={<ProtectedRoute><DesignDetail /></ProtectedRoute>} />
        <Route path='/aboutus' element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path='/contactus' element={<ProtectedRoute><Contact_us /></ProtectedRoute>} />
        <Route path='/alldetail' element={<ProtectedRoute><Alldetail /></ProtectedRoute>} />
        <Route path='/allcard/:id' element={<ProtectedRoute><HomecardDetail /></ProtectedRoute>} />
        <Route path='/itlevel/:id' element={<ProtectedRoute><ItcardMoreDetail /></ProtectedRoute>} />
        <Route path='/itRelate/itCardDetail/:id' element={<ProtectedRoute><AllDetailCardIT /></ProtectedRoute>} />
        <Route path='/marketing_relate/:id' element={<ProtectedRoute><MarketingCardDetail /></ProtectedRoute>} />
        <Route path='/marketingDetail/:id' element={<ProtectedRoute><AllMaketingCard /></ProtectedRoute>} />
        <Route path='/design_jop/:id' element={<ProtectedRoute><AllDesign /></ProtectedRoute>} />
        <Route path='/design_jop/detail/:id' element={<ProtectedRoute><AllDetailCardDesign /></ProtectedRoute>} />


        <Route path='/dashboard' element={
          <ProtectedRoute>
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          </ProtectedRoute>
        } />

       
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

      {!isAuthPage && !isNotFoundPage && !isDashboardPage && <Footer />}
    </div>
  )
}

function Main() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default Main