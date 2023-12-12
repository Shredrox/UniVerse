import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import SocialPanel from '../components/SocialPanel'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from "../components/fallbacks/ErrorFallback"

export const MainLayout = () => {
  return(
    <>
      <Sidebar/>
      <div className='wrapper'>
        <Topbar/>
        <main id='main-container'>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
      <SocialPanel/>
    </>
  );
}   