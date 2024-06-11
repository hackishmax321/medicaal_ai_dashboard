import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.png'
import userImg  from '../../assets/images/avatar-icon.png'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import EventEmitter from '../../utils/EventEmitter'

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  }, 
  {
    path: '/doctors',
    display: 'Doctors'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact-us',
    display: 'Contact Us'
  },
  {
    path: '/about-us',
    display: 'About Us'
  }
]

function Header() {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setID] = useState(localStorage.getItem('id'));
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

  console.log(localStorage.getItem('avatar'))

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('stcky__header')
      } else {
        headerRef.current.classList.remove('stcky__header')
      }
    })
  }

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener('scroll', handleStickyHeader)
  }, [])

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  const loginListner = (data) => {
      if(data){
        setUsername(localStorage.getItem('username'));
        setRole(localStorage.getItem('role'));
        setAvatar(localStorage.getItem('avatar'));
      } else {
        alert("Login Failed!");
      }
  }

  const logoutLister = () => {

      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');

      setUsername(null);
      setRole(null);
      setID(null);
      EventEmitter.emit('LogoutSignal');
      navigate('/home');
      window.location.reload();
  }

  useEffect(() => {
      let listner = EventEmitter.addListener('loginCompleted', loginListner);
      return () => {
        listner.remove();
      }
  }, []);

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* PLACE LOGO */}
          <div>
            <img src={logo} alt='site-logo'/>
          </div>

          {/* Navigation Menu */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((item) => <li>
                  <NavLink to={item.path} className={navClass => navClass.isActive ? 'text-primary text-[16px] leading-7 font-[600]':'text-black text-[16px] leading-7 font-[500]'}>
                    {item.display}
                  </NavLink>
              </li>)}
            </ul>
          </div>

          {/* Personal Section */}
          <div className='flex items-center gap-4'>
                  <div className={username?'':'hidden'}>
                    <Link to={'/profile'}>
                      <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                        <img src={avatar} className='w-full rounded-full' alt=""/>
                      </figure>
                    </Link>
                  </div>
                  {username?
                    <button onClick={() => logoutLister()} className='bg-secondary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                      Logout
                    </button>:<Link to={'/signin'}>
                    <button className='bg-primary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                      Login
                    </button>
                  </Link>}
                  <span className='md:hidden' onClick={toggleMenu}>
                    <BiMenu className='w-6 h-6 cursor-pointer'/>
                  </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header