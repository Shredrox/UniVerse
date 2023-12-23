import axios from "axios";

export const getChats = async (username) => {
    const response = await axios.get('http://localhost:8080/api/getUserChats', {
        params: {
          user: username
        }
    });

    return response.data;
}

export const getChat = async (user, chatUser) => {
    const response = await axios.get('http://localhost:8080/api/getMessages', {
     params: {
       user: user,
       chatUser: chatUser
     }
    });

    return response.data;
}
