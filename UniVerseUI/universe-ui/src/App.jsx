import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home } from "./pages/Home"
import { News } from './pages/News'
import { Courses } from './pages/Courses'
import { Jobs } from './pages/Jobs'
import { Events } from './pages/Events'
import { Groups } from './pages/Groups'
import { Chats } from './pages/Chats'
import { Settings } from './pages/Settings'
import { Landing } from './pages/Landing'
import { MainLayout } from './layouts/MainLayout'
import { useState } from 'react'

function App() {
  const [isLoggedIn, toggleIsLoggedIn] = useState(false);

  function setLoggedIn(){
    toggleIsLoggedIn(!isLoggedIn); 
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={isLoggedIn ? <MainLayout setLoggedIn={setLoggedIn}/> : <Landing setLoggedIn={setLoggedIn}/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/chats" element={<Chats/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>   
    )
  );

  return (
    <div className='app-container'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
