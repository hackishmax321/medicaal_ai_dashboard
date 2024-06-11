import React from 'react'
import Header from '../components/header/Header'
import Routes from '../routes/Routes'
import Footer from '../components/footer/Footer'
import Routings from '../routes/Routes'

function Layout() {
  return (
    <>
        <Header/>
        <Routings/>
        <Footer/>
    </>
  )
}

export default Layout