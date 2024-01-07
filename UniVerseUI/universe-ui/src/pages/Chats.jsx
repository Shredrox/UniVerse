import { useAuth } from '../hooks/useAuth'
import ChatCard from '../components/ChatCard';
import { userExists } from '../services/usersService';
import { useState } from 'react';
import Loading from '../components/fallbacks/Loading'
import { useErrorBoundary } from 'react-error-boundary';
import useChatsData from '../hooks/useChatsData';

const Chats = () => {
  const { auth } = useAuth();
  const { showBoundary } = useErrorBoundary();

  const { 
    chats,
    isChatsLoading,
    isChatsError,
    chatsError,
    addChatMutation 
  } = useChatsData(auth?.user);

  const [isAddingChat, setIsAddingChat] = useState(false);
  const [newChatUser, setNewChatUser] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddChat = async () => {
    if(!await userExists(newChatUser)){
      setInputError("User doesn't exist");
      return;
    }

    addChatMutation({user1: auth?.user, user2: newChatUser}); 
    setIsAddingChat(!isAddingChat);
    setNewChatUser('');
  }

  const handleCancel = () => {
    setIsAddingChat(!isAddingChat); 
    setNewChatUser(''); 
    setInputError('');
  }

  if(isChatsError){
    showBoundary(chatsError.message);
  }

  if(isChatsLoading){
    return <Loading/>
  }

  return (
    <div className='chat-list-container'>
      <div className='chats-list'>
        {chats.length > 0 ?
        chats?.map((chat, index) =>
          <ChatCard key={index} chat={chat}/>
        )
        :
        <div>No chats</div>
        }
      </div>
      {isAddingChat ?
        <div className="add-chat-input-container"> 
          <div>
            <button className="comment-cancel-button" onClick={() => setIsAddingChat(!isAddingChat)}>X</button>
            <input 
              value={newChatUser} 
              onChange={(e) => {setNewChatUser(e.target.value); setInputError('');}} 
              className='add-chat-input' 
              type="text" 
              placeholder='Username...'/>
          </div>
          <span>{inputError}</span>
          <button onClick={handleAddChat} className='confirm-button'>Confirm</button>
        </div>
        :
        <button onClick={handleCancel} className="confirm-button">Create Chat</button>
      }
    </div>
  )
}

export default Chats
