import { useParams } from 'react-router-dom'
import { useSocket } from '../hooks/useSocket'
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChat } from '../api/chatsApi';
import Loading from '../components/fallbacks/Loading'

const Chat = () => {
  const { username } = useParams();
  const { sendMessage, setChatMessages, messages } = useSocket();
  const { auth } = useAuth();

  const queryClient = useQueryClient();

  const {data: messagesData, isLoading, isError, error} = useQuery({ 
    queryKey: ["chat", auth?.user, username],
    queryFn: () => getChat(auth?.user, username),
  });

  const {mutateAsync: sendMessageMutation} = useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>{
      queryClient.invalidateQueries(["chat", auth?.user, username]);
    },
  });

  useEffect(() => {
    if (messagesData) {
      setChatMessages(messagesData);
    }
  }, [messagesData]);

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
    sendMessageMutation({message: message, sender: auth?.user, receiver: username});
    setMessage('');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleMessageSent();
    }
  };

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
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
