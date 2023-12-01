import BellIcon from '../assets/icons/icon-bell.svg'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SocialPanel = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    return (
      <div className='social-panel'>
          <div className='notifications-container'>
              <img src={BellIcon} alt="" />
              Notifications
              <span>0</span>
          </div>
          <div className='chats-container'>
              Chats
              <div className='chat-user'>
                  <div className='chat-profile-picture'></div>
                  Username
              </div>
          </div>
      </div>
    )
}

export default SocialPanel
