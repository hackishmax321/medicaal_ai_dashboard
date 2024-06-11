import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'
import Services from '../pages/Services'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Doctors from '../pages/Doctors'
import DoctorDetails from '../pages/DoctorDetails'
import Profile from '../pages/profile/Profile'
import Appointments from '../pages/profile/Appointments'
import Records from '../pages/profile/Records'
import AppointmentForm from '../pages/AppointmentForm'
import MedicalRecords from '../pages/profile/MedicalRecords'
import Users from '../pages/profile/Users'

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

function Routings() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact-us' element={<Contact/>}/> 
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/doctors'>
            <Route path='' element={<Doctors/>}/>
            <Route path=':id' element={<DoctorDetails/>}/>
            <Route path=':id/:name' element={<AppointmentForm/>}/>
        </Route>
        <Route path='/profile'>
            <Route path='' element={<Profile/>}/>
            <Route path='appointments' element={<Appointments/>}/>
            <Route path='records' element={<Records/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='medicalbook/:patient' element={<MedicalRecords/>}/>
        </Route>
        <Route path='*' element={<NotFound />} />
        
    </Routes>
  )
}

export default Routings