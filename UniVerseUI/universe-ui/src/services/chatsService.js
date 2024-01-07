import axios from "../api/axios";

export const getChats = async (username) => {
    const response = await axios.get('/chats/getUserChats', {
        params: {
          user: username
        }
    });

    return response.data;
}

export const getChat = async (user, chatUser) => {
    const response = await axios.get('/chats/getMessages', {
     params: {
       user: user,
       chatUser: chatUser
     }
    });

    return response.data;
}
