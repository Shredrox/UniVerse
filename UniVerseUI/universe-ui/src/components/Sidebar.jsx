import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
        UniVerse
        <ul>
            <li><Link to='/'><button>Home</button></Link></li>
            <li><Link to='/news'><button>News</button></Link></li>
            <li><Link to='/courses'><button>Courses</button></Link></li>
            <li><Link to='/jobs'><button>Jobs</button></Link></li>
            <li><Link to='/events'><button>Events</button></Link></li>
            <li><Link to='/groups'><button>Groups</button></Link></li>
        </ul>
    </div>
  )
}
