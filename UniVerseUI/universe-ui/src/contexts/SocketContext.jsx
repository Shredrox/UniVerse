import { createContext, useState } from "react"
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const connectNotifications = (username) =>{
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(client);
      client.subscribe('/topic/publicNotification', onReceived, { id: "public"});
      client.subscribe(`/user/${username}/queue/notification`, onReceived, { id: "private"});
      client.subscribe('/topic/messages', onMessageReceived, { id: "messages"});
      client.subscribe(`/user/${username}/queue/message`, onMessageReceived, { id: "privateMessages"});
    });
  }

  const disconnectNotifications = () =>{
    if(stompClient){
      stompClient.disconnect();
      setStompClient(null);
    }
  }

  const unsubscribeFromGeneralNotifications = () =>{
    stompClient.unsubscribe('public');
  }

  const subscribeToGeneralNotifications = () =>{
    stompClient.subscribe('/topic/publicNotification', onReceived, { id: "public"});
  }

  const onReceived = (notification) => {
    console.log('Received: ' + notification);
    setNotifications(prevNotifications => [
      ...prevNotifications, JSON.parse(notification.body)
    ]);
  }

  const sendNotification = (notification) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendNotification', {}, JSON.stringify(notification));
    }
  };

  const sendPrivateNotification = (notification) => {
    if (stompClient && stompClient.connected) {
      stompClient.send('/app/sendUserNotification', {}, JSON.stringify(notification));
    }
  };

  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  }

  const sendMessage = ({message, sender, receiver}) =>{
    if(message.trim() && stompClient && stompClient.connected){
      const chatMessage = {
        sender: sender,
        content: message,
        receiver: receiver,
        timestamp: new Date().toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false 
        })
      };

      setMessages(prevMessages => [...prevMessages, chatMessage]);

      stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
    }
  }

  const contextValue = {
    notifications, 
    sendNotification,
    sendPrivateNotification,
    connectNotifications,
    disconnectNotifications,
    unsubscribeFromGeneralNotifications,
    subscribeToGeneralNotifications,
    messages,
    sendMessage
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}
