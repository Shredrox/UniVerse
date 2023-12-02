import { FaUserFriends } from "react-icons/fa";
import BellIcon from '../assets/icons/icon-bell.svg'
import { useAuth } from '../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { getUserOnlineFriends } from "../api/usersApi";

const SocialPanel = () => {
  const { auth } = useAuth();

  const {data: onlineFriends, isLoading, isError, error} = useQuery({ 
    queryKey: ["userOnlineFriends", auth.user],
    queryFn: () => getUserOnlineFriends(auth.user),
    refetchInterval: 10000,
  });

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className='social-panel'>
      <div className='notifications-container'>
        <img src={BellIcon} alt="BellIcon" />
        <FaUserFriends className="friend-request-icon"/>
      </div>
      <div className='friends-container'>
        Online Friends
        <div className='friends-list'>
          {onlineFriends?.map((friend, index) => 
            <div key={index} className="friend">
              <div className='chat-profile-picture'></div>
              {friend.username}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SocialPanel
