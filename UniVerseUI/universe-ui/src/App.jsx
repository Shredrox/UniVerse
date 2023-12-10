import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Home } from "./pages/Home"
import News from './pages/News'
import { Courses } from './pages/Courses'
import Jobs from './pages/Jobs'
import Events from './pages/Events'
import { Groups } from './pages/Groups'
import Chats from './pages/Chats'
import  Settings from './pages/Settings'
import { Landing } from './pages/Landing'
import { MainLayout } from './layouts/MainLayout'
import NewsDetails from './pages/NewsDetails'
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import Chat from './pages/Chat'
import ChatsLayout from './layouts/ChatsLayout'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Landing/>}/>
        <Route element={<MainLayout/>}>
          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile/:username" element={<Profile/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/news/:newsTitle" element={<NewsDetails/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
            <Route path="/jobs/:jobId" element={<JobDetails/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/chats" element={<ChatsLayout/>}>
              <Route path="/chats" element={<div className='chat-not-selected'>Select chat</div>}/>
              <Route path="/chats/:username" element={<Chat/>}/>
            </Route>
            <Route path="/settings" element={<Settings/>}/>
          </Route>
        </Route>
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
