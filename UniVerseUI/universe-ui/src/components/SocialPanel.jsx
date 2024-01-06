import { FaUserFriends } from "react-icons/fa";
import BellIcon from '../assets/icons/icon-bell.svg'
import { useAuth } from '../hooks/useAuth';
import { useState } from "react";
import Loading from '../components/fallbacks/Loading'
import useAlertsData from "../hooks/useAlertsData";
import OnlineFriend from "./OnlineFriend";

const SocialPanel = () => {
  const { auth } = useAuth();

  const [isNotificationTabOn, setIsNotificationTabOn] = useState(false);
  const [isFriendRequstsTabOn, setIsFriendRequstsTabOn] = useState(false);

  const { 
    alertData, 
    isAlertsLoading, 
    isAlertsError, 
    alertsError, 
    acceptFriendRequestMutation, 
    rejectFriendRequestMutation,
    readNotificationsMutation
  } = useAlertsData(auth?.user);

  const unreadNotificationsCount = alertData.notifications
  ? alertData.notifications.filter(notification => !notification.read).length
  : 0;

  const handleNotificationsOpen = () =>{
    readNotificationsMutation(auth?.user);
    setIsNotificationTabOn(!isNotificationTabOn);
  }

  const handleAcceptFriendRequest = (friendshipId) =>{
    acceptFriendRequestMutation(friendshipId);
  }

  const handleRejectFriendRequest = (friendshipId) =>{
    rejectFriendRequestMutation(friendshipId);
  }

  if(isAlertsError){
    return <div>{alertsError.message}</div>
  }

  if(isAlertsLoading){
    return <Loading/>
  }

  return (
    <div className='social-panel'>
      <div className='notifications-container'>
        <div className="notification-container">
          <img onClick={handleNotificationsOpen} className="notification-icon" src={BellIcon} alt="BellIcon" />
          {unreadNotificationsCount > 0 && 
          <div className="notification-count">{unreadNotificationsCount}</div>}
        </div>
        <div className="friend-requests-container">
          <FaUserFriends onClick={() => setIsFriendRequstsTabOn(!isFriendRequstsTabOn)} className="friend-request-icon"/>
          {alertData.friendRequests?.length > 0 && 
          <div className="notification-count">{alertData.friendRequests?.length}</div>}
        </div>
      </div>
      {isNotificationTabOn &&
      <div className="notification-list-container">
        <h3>Notifications</h3>
        <div className="notification-list">
          {alertData.notifications?.map((notification, index) => 
          <div key={index}>{notification.message}</div>
          )}
        </div>
      </div>
      }
      {isFriendRequstsTabOn &&
      <div className="notification-list-container">
        <h3>Friend Requests</h3>
        <div className="notification-list">
          {alertData.friendRequests?.map((friendRequest, index) => 
          <div key={index}>
            {friendRequest.senderName}
            <button onClick={() => handleAcceptFriendRequest(friendRequest.id)} className="confirm-button">Accept</button>
            <button onClick={() => handleRejectFriendRequest(friendRequest.id)} className="cancel-button">Reject</button>
          </div>
          )}
        </div>
      </div>
      }
      
      <div className='friends-container'>
        Online Friends
        <div className='friends-list'>
          {alertData.onlineFriends.length > 0 ?
          alertData.onlineFriends?.map((friend, index) => 
          <OnlineFriend key={index} friend={friend}/>
          ) 
          :
          <div>No Online Friends</div>}
        </div>
      </div>
    </div>
  )
}

export default SocialPanel
