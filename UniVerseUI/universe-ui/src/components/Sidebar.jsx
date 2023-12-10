import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket'
import UniVerseLogo from '../assets/images/logo-universe.png'
import HomeIcon from '../assets/icons/icon-home.svg'
import NewsIcon from '../assets/icons/icon-newspaper.svg'
import JobsIcon from '../assets/icons/icon-job.svg'
import EventsIcon from '../assets/icons/icon-calendar.svg'
import ChatsIcon from '../assets/icons/icon-chat.svg'
import SettingsIcon from '../assets/icons/icon-cog.svg'

const Sidebar = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const { disconnectNotifications } = useSocket();
  const navigate = useNavigate();

  function isActive(path){
    return location.pathname.includes(path) ? 'link-btn' : 'link-btn-off'
  }

  const linksData = [
    { id: 1, to: '/home', text: 'Home', icon: HomeIcon },
    { id: 2, to: '/news', text: 'News', icon: NewsIcon },
    { id: 3, to: '/jobs', text: 'Jobs', icon: JobsIcon },
    { id: 4, to: '/events', text: 'Events', icon: EventsIcon},
    { id: 5, to: '/chats', text: 'Chats', icon: ChatsIcon }
  ];

  return (
    <aside className='sidebar'>
      <div className='logo-container'>
        <img src={UniVerseLogo}/>
        UniVerse
      </div>
      <div className='profile-container'>
        <div className='profile-picture'>
          <img src="https://picsum.photos/100/100" alt="ProfilePicture" />
        </div>
        <label className='username' onClick={() => navigate(`/profile/${auth.user}`)}>{auth.user}</label> 
        <button onClick={()=> {setAuth({}); disconnectNotifications(); navigate('/');}} className='confirm-button'>Log Out</button>         
      </div>

      <ul>
        {linksData.map((link) =>
          <li key={link.id}>
            <Link key={link.id} to={link.to} className='link'>
              <button key={link.id} className={isActive(link.to)}>
                <img src={link.icon} className='link-icon'/>
                {link.text}
              </button>
            </Link>
          </li>
        )}
      </ul>

      <Link to='/settings' className='link settings-link'>
        <button className={isActive('/settings')}>
          <img src={SettingsIcon} className='link-icon'/>
          Settings
        </button>
      </Link>
    </aside>
  )
}

export default Sidebar
