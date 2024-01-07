import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/fallbacks/Loading'
import ErrorFallback from '../components/fallbacks/ErrorFallback'
import useMessagesData from '../hooks/useMessagesData';

const Chat = () => {
  const { username } = useParams();
  const { auth } = useAuth();

  const { messages, 
    isMessagesLoading, 
    isMessagesError, 
    messagesError,
    sendMessageMutation
  } = useMessagesData(auth?.user, username);

  const [message, setMessage] = useState('');
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSent = () =>{
    if(message === ''){
      return;
    }

    sendMessageMutation({message: message, sender: auth?.user, receiver: username});
    setMessage('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleMessageSent();
    }
  }

  if(isMessagesError){
    return <ErrorFallback error={messagesError.message}/>
  }

  if(isMessagesLoading){
    return <Loading/>
  }

  return (
    <div className='chat'>
      <h4>{username}</h4>
      <div className='chat-messages-container' ref={chatRef}>
        {messages.length > 0 ?
        messages?.map((message, index) =>
          <div key={index} className={message.sender === auth?.user ? 'your-chat-message-container' : 'chat-message-container'}>
            <div  className={message.sender === auth?.user ? 'your-chat-message' : 'chat-message'}>
              <div className='message-user'>
                {message.sender} 
                <span className='chat-message-span'>{message.timestamp}</span>
              </div>
              <p>{message.content}</p>
            </div>
          </div>
        )
        :
        <div>No messages with this user.</div>
        }
      </div>
      <div className='chat-input-container'>
        <textarea value={message} onKeyDown={handleKeyPress} onChange={(e) => setMessage(e.target.value)} className='chat-textarea' placeholder='Type a message...'></textarea>
        <button onClick={handleMessageSent} className='chat-send-button'>Send</button>
      </div>
    </div>
  )
}

export default Chat
