import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import UniVerseLogo from '../assets/images/logo-universe.png'
import HomeIcon from '../assets/icons/icon-home.svg'
import NewsIcon from '../assets/icons/icon-newspaper.svg'
import CourseIcon from '../assets/icons/icon-course.svg'
import JobsIcon from '../assets/icons/icon-job.svg'
import EventsIcon from '../assets/icons/icon-calendar.svg'
import GroupsIcon from '../assets/icons/icon-users.svg'
import ChatsIcon from '../assets/icons/icon-chat.svg'
import SettingsIcon from '../assets/icons/icon-cog.svg'

export const Sidebar = () => {
  const location = useLocation();

  function isActive(path){
    return location.pathname === path ? 'link-btn' : 'link-btn-off'
  }

  const linksData = [
    { id: 1, to: '/home', text: 'Home', icon: HomeIcon },
    { id: 2, to: '/news', text: 'News', icon: NewsIcon },
    { id: 3, to: '/courses', text: 'Courses', icon: CourseIcon},
    { id: 4, to: '/jobs', text: 'Jobs', icon: JobsIcon },
    { id: 5, to: '/events', text: 'Events', icon: EventsIcon},
    { id: 6, to: '/groups', text: 'Groups', icon: GroupsIcon },
    { id: 7, to: '/chats', text: 'Chats', icon: ChatsIcon }
  ];

  return (
    <div className='sidebar'>
      <div className='logo-container'>
        <img src={UniVerseLogo}/>
        UniVerse
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
    </div>
  )
}
