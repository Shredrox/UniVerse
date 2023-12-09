import { useLocation, useNavigate } from "react-router-dom"

const ChatCard = ({chat}) => {
  const location = useLocation();
  const navigate = useNavigate();

  function isSelected(path){
    return location.pathname.includes(path) ? 'chat-card-active' : 'chat-card'
  }

  return (
    <div className='chat-card-container'>
      <div className='chat-card-line'>&nbsp;</div>
      <div className={isSelected(`/chats/${chat.user}`) }  onClick={() => navigate(`/chats/${chat.user}`)}>
        <div className="chat-profile-picture"></div>
        {chat.user}
      </div>
    </div>
  )
}

export default ChatCard
