import { createContext, useEffect, useState } from "react"
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newOnlineFriend,  setNewOnlineFriend] = useState(false);

  useEffect(() =>{
    if(auth.user !== undefined && !stompClient){
      connectSocketClient(auth.user);
    }
  }, [auth.user])

  const connectSocketClient = (username) =>{
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(client);
      client.subscribe('/topic/publicNotification', onNotificationReceived, { id: "public"});
      client.subscribe(`/user/${username}/queue/notification`, onNotificationReceived, { id: "private"});
      client.subscribe(`/user/${username}/queue/message`, onMessageReceived, { id: "privateMessages"});
      client.subscribe(`/user/${username}/queue/friend-request`, onFriendRequestReceieved, { id: "friendRequests"});
      client.subscribe(`/user/${username}/queue/chat`, onChatCreated, { id: "userChats"});
      client.subscribe(`/user/${username}/queue/online-friends`, onFriendOnline, { id: "userOnlineFriends"});

      client.send('/app/sendIsOnlineAlert', {}, username);
    });
  }

  const disconnectSocketClient = () =>{
    if(stompClient){
      stompClient.disconnect();
      setStompClient(null);
    }
  }

  //Notifications
  const unsubscribeFromGeneralNotifications = () =>{
    stompClient.unsubscribe('public');
  }

  const subscribeToGeneralNotifications = () =>{
    stompClient.subscribe('/topic/publicNotification', onNotificationReceived, { id: "public"});
  }

  const onNotificationReceived = (notification) => {
    setNotifications(prevNotifications => [
      ...prevNotifications, JSON.parse(notification.body)
    ]);
  }

  const sendNotification = (notification) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendNotification', {}, JSON.stringify(notification));
    }
  }

  const sendPrivateNotification = (notification) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendUserNotification', {}, JSON.stringify(notification));
    }
  }

  const setUserNotifications = (newNotifications) =>{
    setNotifications(newNotifications);
  }

  //Chats
  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  }

  const sendMessage = ({message, sender, receiver}) =>{
    if(message.trim() && stompClient && stompClient.connected){
      const chatMessage = {
        sender: sender,
        content: message,
        receiver: receiver
      };

      setMessages(prevMessages => [...prevMessages, chatMessage]);
      stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
    }
  }

  const setChatMessages = (newMessages) =>{
    setMessages(newMessages);
  }

  const onChatCreated = (chat) =>{
    const newChat = JSON.parse(chat.body);
    setChats((prevChats) => [...prevChats, newChat]);
  }

  const createChat = (chat) =>{
    if (stompClient && stompClient.connected) {
      setChats((prevChats) => [...prevChats, chat]);
      stompClient.send('/app/createChat', {}, JSON.stringify(chat));
    }
  }

  const setUserChats = (newUserChats) =>{
    setChats(newUserChats);
  }

  //Friend Requests
  const onFriendRequestReceieved = (friendRequest) => {
    const receivedFriendRequest = JSON.parse(friendRequest.body);
    setFriendRequests((prevFriendRequests) => [...prevFriendRequests, receivedFriendRequest]);
  }

  const sendFriendRequest = ({sender, receiver}) =>{
    if(stompClient && stompClient.connected){
      const friendRequest = {
        sender: sender,
        receiver: receiver
      };

      stompClient.send('/app/sendFriendRequest', {}, JSON.stringify(friendRequest));
    }
  }

  const setUserFriendRequests = (newFriendRequests) =>{
    setFriendRequests(newFriendRequests);
  }

  //Online Friends
  const onFriendOnline = () =>{
    setNewOnlineFriend(!newOnlineFriend);
  }

  const sendIsOnlineAlert = (username) =>{
    if(stompClient && stompClient.connected){
      stompClient.send('/app/sendIsOnlineAlert', {}, username);
    }
  }

  const contextValue = {
    notifications, 
    sendNotification,
    sendPrivateNotification,
    setUserNotifications,
    connectSocketClient,
    disconnectSocketClient,
    unsubscribeFromGeneralNotifications,
    subscribeToGeneralNotifications,
    messages,
    sendMessage,
    setChatMessages,
    createChat,
    setUserChats,
    chats,
    friendRequests,
    sendFriendRequest,
    setUserFriendRequests,
    newOnlineFriend,
    setNewOnlineFriend,
    sendIsOnlineAlert
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}
