import axios from "./axios";

export const getChats = (username) => {
    const chats = [
        { 
            user: "Tester"
        },
        {
            user: "Goddamn"
        }
    ]
    
    return chats
}

export const getChat = (user, chatUser) => {
    const result = [
        {
            sender: "Goddamn",
            content: "Pls work",
            receiver: "Tester",
            timestamp: "09/12/2023 21:50"
        },
        {
            sender: "Goddamn",
            content: "Pls work 2",
            receiver: "Tester",
            timestamp: "09/12/2023 21:40"
        },
        ,
        {
            sender: "Goddamn",
            content: "Pls work 3",
            receiver: "Tester",
            timestamp: "09/12/2023 21:55"
        },
        {
            sender: "haerjaer",
            content: "Pls work 2",
            receiver: "Testaerjaerjer",
            timestamp: "alabaetjkarsteksrtala"
        },
        {
            sender: "Tester",
            content: "Pls work 4",
            receiver: "Goddamn",
            timestamp: "09/12/2023 21:55"
        },
        {
            sender: "Tester",
            content: "Pls work 5",
            receiver: "Goddamn",
            timestamp: "09/12/2023 21:45"
        }
    ]

    const filteredResult = result.filter(chat => 
        (chat.receiver === user && chat.sender === chatUser) 
        || (chat.receiver === chatUser && chat.sender === user));

    const sortedResult = filteredResult.sort((a, b) => {
        return a.timestamp.localeCompare(b.timestamp);
    });

    
    return sortedResult;
}
