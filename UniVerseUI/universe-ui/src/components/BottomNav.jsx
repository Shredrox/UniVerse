import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '../assets/icons/icon-home.svg'
import NewsIcon from '../assets/icons/icon-newspaper.svg'
import JobsIcon from '../assets/icons/icon-job.svg'
import EventsIcon from '../assets/icons/icon-calendar.svg'
import ChatsIcon from '../assets/icons/icon-chat.svg'
import SettingsIcon from '../assets/icons/icon-cog.svg'

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) =>{
    return location.pathname.includes(path) ? 'bottom-nav-button-active' : 'bottom-nav-button'
  }

  const linksData = [
    { id: 1, to: '/home', text: 'Home', icon: HomeIcon },
    { id: 2, to: '/news', text: 'News', icon: NewsIcon },
    { id: 3, to: '/jobs', text: 'Jobs', icon: JobsIcon },
    { id: 4, to: '/events', text: 'Events', icon: EventsIcon},
    { id: 5, to: '/chats', text: 'Chats', icon: ChatsIcon },
    { id: 6, to: '/settings', text: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className='bottom-nav'>
      <ul className='bottom-nav-links'>
        {linksData.map((link) =>
          <li key={link.id}>
            <Link key={link.id} to={link.to} className='link'>
              <button key={link.id} className={isActive(link.to)}>
                <img src={link.icon} className='link-icon'/>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BottomNav
