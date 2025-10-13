import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '../pages/home/Navbar'
import Home from '../pages/home/Home'
import IT_relate from '../pages/jops/IT_relate'
import Footer from '../pages/home/Footer'
import ItcardDetail from '../pages/detailpage/ItcardDetail'
import Marketing_jops from '../pages/jops/Marketing_jops'
import MarkitingDetail from '../pages/detailpage/MarketingDetail'
import Design_jops from '../pages/jops/Design_jops'
import DesignDetail from '../pages/detailpage/DesignDetail'
import Media from '../pages/media/Media'
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
import AllDetailMedia from '../pages/detail_all_level_card/AllDetailMedia'
import Dashboard from '../admin/Dashboard'

function Layout() {
  const location = useLocation()
  const hideLayout = location.pathname === '/register'  || location.pathname ==='/login' ||location.pathname==='/dashboard'

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Home page */}
        <Route path='/' element={<Home />} />
        {/* IT page */}
        <Route path='/itRelate' element={<IT_relate />} />
        <Route path='/itRelate/itCardDetail' element={<ItcardDetail />} />
        {/* Marketing page */}
        <Route path='/marketing_relate' element={<Marketing_jops />} />
        <Route path='/marketingDetail' element={<MarkitingDetail />} />
        {/* Design jobs */}
        <Route path='/design_jop' element={<Design_jops />} />
        <Route path='/design_jop/detail' element={<DesignDetail />} />
        {/* Media page */}
        <Route path='/media' element={<Media />} />
        {/* About us */}
        <Route path='/aboutus' element={<AboutUs />} />
        {/* Contact us */}
        <Route path='/contactus' element={<Contact_us />} />
        {/* Register */}
        <Route path='/register' element={<Register />} />

        {/* Login page  */}
        <Route path='/login'  element={<Login/>}/>

        {/* all detail */}
        <Route path='/alldetail'  element={<Alldetail/>}/>

        {/* Detail of card  */}
        <Route path='/allcard/:id' element={<HomecardDetail/>}/>

        {/* IT level card */}
        <Route  path='/itlevel/:id' element={<ItcardMoreDetail/>}/>

        {/* All IT Detail card */}

        <Route path='/itRelate/itCardDetail/:id' element={<AllDetailCardIT/>}/>

        {/* Maketing level card */}
        <Route path='/marketing_relate/:id' element={<MarketingCardDetail/>}/>
        {/* All Maketing detail card  */}
        <Route path='/marketingDetail/:id' element={<AllMaketingCard/>}/>

        {/* Design level card */}
        <Route path='/design_jop/:id'  element={<AllDesign/>}/>

        {/* All Design detail card  */}
        <Route path='/design_jop/detail/:id' element={<AllDetailCardDesign/>} />
        {/* All Media card detail  */}
        <Route path='/media/:id' element={<AllDetailMedia/>}/>
        {/* Dashboard */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>


   

      {!hideLayout && <Footer />}
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
