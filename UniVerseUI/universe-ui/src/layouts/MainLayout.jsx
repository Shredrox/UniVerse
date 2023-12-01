import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import SocialPanel from '../components/SocialPanel'

export const MainLayout = () => {
  return(
    <>
      <Sidebar/>
      <div className='wrapper'>
        <Topbar/>
        <main id='main-container'>
          <Outlet />
        </main>
      </div>
      <SocialPanel/>
    </>
  );
}   