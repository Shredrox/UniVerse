import axios from "axios";

export const getChats = (username) => {
    const chats = [
        { 
            user: "LoginTest",
            you: "Tester"
        },
        {
            user: "Goddamn",
            you: "Tester"
        },
        {
            user: "Tester",
            you: "LoginTest"
        }
    ]

    const result = chats.filter(u => u.you === username);
    
    return result
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
