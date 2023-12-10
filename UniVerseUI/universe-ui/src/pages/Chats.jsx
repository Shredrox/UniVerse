import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth'
import ChatCard from '../components/ChatCard';
import { getChats } from '../api/chatsApi';

const Chats = () => {
  const { auth } = useAuth();

  const {data: chats, isLoading, isError, error} = useQuery({ 
    queryKey: ["chats", auth?.user],
    queryFn: () => getChats(auth?.user),
  });

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className='chats-list'>
      {chats.length > 0 ?
      chats?.map((chat, index) =>
        <ChatCard key={index} chat={chat}/>
      )
      :
      <div>No chats</div>
      }
    </div>
  )
}

export default Chats
