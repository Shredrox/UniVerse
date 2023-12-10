import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth'
import ChatCard from '../components/ChatCard';
import { getChats } from '../api/chatsApi';
import { useEffect, useState } from 'react';
import { userExists } from '../api/usersApi';
import { useSocket } from '../hooks/useSocket';

const Chats = () => {
  const { auth } = useAuth();
  const { createChat, setUserChats, chats } = useSocket();

  const queryClient = useQueryClient();

  const {data: chatsData, isLoading, isError, error} = useQuery({ 
    queryKey: ["chats", auth?.user],
    queryFn: () => getChats(auth?.user),
  });

  const {mutateAsync: addChatMutation} = useMutation({
    mutationFn: createChat,
    onSuccess: () =>{
      queryClient.invalidateQueries(["chats", auth?.user]);
    },
  });

  useEffect(() => {
    if (chatsData) {
      setUserChats(chatsData);
    }
  }, [chatsData]);

  const [isAddingChat, setIsAddingChat] = useState(false);
  const [newChatUser, setNewChatUser] = useState('');
  const [inputError, setInputError] = useState('');

  const handleAddChat = () => {
    if(!userExists(newChatUser)){
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

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
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
