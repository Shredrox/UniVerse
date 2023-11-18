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

function App() {
  const check = true;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={check ? <MainLayout /> : <Landing/>}>
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
