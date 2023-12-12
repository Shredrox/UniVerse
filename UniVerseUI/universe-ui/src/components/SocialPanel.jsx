import { FaUserFriends } from "react-icons/fa";
import BellIcon from '../assets/icons/icon-bell.svg'
import { useAuth } from '../hooks/useAuth';
import { useQuery } from "@tanstack/react-query";
import { getUserOnlineFriends } from "../api/usersApi";
import { useSocket } from '../hooks/useSocket'
import { useState } from "react";

const SocialPanel = () => {
  const { auth } = useAuth();
  const { notifications } = useSocket();

  const [isNotificationTabOn, setIsNotificationTabOn] = useState(false);

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
        <div className="notification-container">
          <img onClick={() => setIsNotificationTabOn(!isNotificationTabOn)} className="notification-icon" src={BellIcon} alt="BellIcon" />
          {notifications?.length > 0 && 
          <div className="notification-count">{notifications?.length}</div>}
        </div>
        <FaUserFriends className="friend-request-icon"/>
      </div>
      {isNotificationTabOn &&
      <div className="notification-list-container">
        <h3>Notifications</h3>
        <div className="notification-list">
          {notifications?.map((notification, index) => 
          <div key={index}>{notification.message}</div>
          )}
        </div>
      </div>
      }
      
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
