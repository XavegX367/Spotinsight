import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { delay } from './utils/Helpers';
import { Home, Login, LoginCheck, Player } from './pages';
import { getUser } from './utils/APIRoutes';
import { logo, logo_symbol, logo_text, logo_text_white } from './assets';
import UserHeader from './components/UserHeader';
import Navigation from './components/Navigation';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeNav, setActiveNav] = useState("insight")

  useEffect(() => {
    checkUser();
    checkNav();
  }, [])

  const checkUser = async () => {
    await delay(350);
    if(localStorage.getItem('access_token') === null){
      return;
    }

    const userData = await getUser(localStorage.getItem('access_token'));
    if(userData === undefined){
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        navigate('/login');
    } else {
        setUser(userData);
    }

  }

  const checkNav = () => {
    const location = window.location.pathname.split('/');
    if(location[1] === "player"){
      setActiveNav('player');
    }
  }

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between 
      items-center bg-[#3d3c3c] sm:px-8 px-4 py-4 border-b 
      border-b-[#49494a]'>
        <Link to="/" className="flex" >
          <img src={logo_symbol} alt="logo" className='w-10 
          object-contain'/>
          <img src={logo_text} alt="logo" className='w-32 md:block hidden
          object-contain mt-1 ml-2'/>
        </Link>

        {
          (user !== null) ?
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav}/>
          :
          ""
        }
        {
          (user !== null) ?
          <UserHeader user={user} setUser={setUser}/>
          :
          ""
        }

      </header>
      <main className='py-3 w-full bg-[#232323] min-h-[calc(100vh-73px)] text-gray-100'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/player' element={<Player />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login-check' element={<LoginCheck />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App