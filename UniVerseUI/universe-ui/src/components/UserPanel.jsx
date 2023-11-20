import BellIcon from '../assets/icons/icon-bell.svg'
import { useAuth } from '../hooks/useAuth';

export const UserPanel = () => {
    const { setAuth } = useAuth();

    return (
      <div className='user-panel'>
          <div className='notifications-container'>
              <img src={BellIcon} alt="" />
              Notifications
              <span>0</span>
          </div>
          <div className='profile-container'>
              <div className='profile-picture'></div>
              User
              <button onClick={()=> setAuth({})} className='confirm-button'>Log Out</button>         
          </div>
          <div className='profile-container'>
              Chats
              <div className='chat-user'>
                  <div className='chat-profile-picture'></div>
                  Username
              </div>
          </div>
      </div>
    )
}
