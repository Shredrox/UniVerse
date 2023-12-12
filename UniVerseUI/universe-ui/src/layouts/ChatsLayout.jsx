import { Outlet } from "react-router-dom"
import Chats from "../pages/Chats"

const ChatsLayout = () => {
  return (
    <div className='chats-container'>
      <div className="chats-list-container">
        <h2>Chats</h2>
        <div className="chats-outlet-container">
          <Chats/>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ChatsLayout
