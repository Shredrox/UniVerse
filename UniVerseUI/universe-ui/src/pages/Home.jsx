import React from 'react'
import { Feed } from '../components/Feed'

export const Home = () => {
  return (
    <div id='home-page'>
      <div className='feed-top'>
        Feed
        <div className='create-post'>
            Create post
        </div>
      </div>
      <Feed/>
    </div>
  )
}
