import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Sidebar } from './components/Sidebar'
import { News } from './pages/News'
import { Courses } from './pages/Courses'
import { Jobs } from './pages/Jobs'
import { Events } from './pages/Events'
import { Groups } from './pages/Groups'
import { Chats } from './pages/Chats'
import { Settings } from './pages/Settings'
import { Topbar } from './components/Topbar'
import { UserPanel } from './components/UserPanel'

function App() {

  return (
    <div className='app-container'>
      <Sidebar/>
      <div className='wrapper'>
        <Topbar/>
        <main id='main-container'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/chats" element={<Chats/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </main>
      </div>
      <UserPanel/>
    </div>
  )
}

export default App
