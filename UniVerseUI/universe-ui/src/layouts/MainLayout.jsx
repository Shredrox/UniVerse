import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import SocialPanel from '../components/SocialPanel'
import BottomNav from '../components/BottomNav'

export const MainLayout = () => {
  return(
    <>
      <Sidebar/>
      <div className='wrapper'>
        <Topbar/>
        <main id='main-container'>
          <Outlet />
        </main>
        <BottomNav/>
      </div>
      <SocialPanel/>
    </>
  );
}   