import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'
import { FaUserAstronaut } from "react-icons/fa";
import useProfilePicture from "../hooks/useProfilePicture";

const ChatCard = ({chat}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { auth } = useAuth();
  const chatUser = auth?.user === chat.user1 ? chat.user2 : chat.user1;
  const chatPath = `/chats/${chatUser}`;

  const { profilePicture } = useProfilePicture("chatUserProfilePicture", chatUser);

  function isSelected(path){
    return location.pathname.includes(path) ? 'chat-card-active' : 'chat-card'
  }

  return (
    <div className='chat-card-container'>
      <div className='chat-card-line'>&nbsp;</div>
      <div className={isSelected(chatPath)}  
        onClick={() => navigate(chatPath)}>
        <div className="chat-profile-picture">
          {profilePicture?.size > 0 ? 
          <img className='author-profile-picture' src={URL.createObjectURL(profilePicture)} alt="ProfilePicture" /> 
          :
          <FaUserAstronaut className="chat-profile-picture-placeholder-icon"/>}
        </div>
        {chatUser}
      </div>
    </div>
  )
}

export default ChatCard
