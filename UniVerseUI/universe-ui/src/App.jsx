import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { Sidebar } from './components/Sidebar'
import { News } from './pages/News'
import { Courses } from './pages/Courses'
import { Jobs } from './pages/Jobs'
import { Events } from './pages/Events'
import { Groups } from './pages/Groups'

function App() {

  return (
    <div className='app-container'>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/groups" element={<Groups/>}/>
      </Routes>
    </div>
  )
}

export default App
