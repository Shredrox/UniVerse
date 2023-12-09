import { useParams } from 'react-router-dom'

const Chat = () => {
  const { username } = useParams();

  return (
    <div className='chat'>
      <h4>{username}</h4>
      <div className='chat-messages-container'>messages</div>
      <div className='chat-input-container'>
        <textarea className='chat-textarea' placeholder='Type a message...'></textarea>
        <button className='chat-send-button'>Send</button>
      </div>
    </div>
  )
}

export default Chat
