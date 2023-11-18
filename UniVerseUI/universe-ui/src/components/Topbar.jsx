import React from 'react'
import SearchIcon from '../assets/icons/icon-search-outline.svg'

export const Topbar = () => {
  return (
    <div className='topbar'>
        <div className="search-container">
            <img src={SearchIcon}/>
            <input className='search-bar' type="text" placeholder="Search.."/>
        </div>
    </div>
  )
}
