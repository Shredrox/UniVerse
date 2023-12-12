import axios from "./axios"

// export const getEvents = async () =>{
//     const response = await axios.get('/Events/GetAllEvents');
//     return response.data;
// }

// export const getTrendingEvents = async () =>{
//     //TO DO: Connect to API...
// }

export const getEvents = () =>{
    const events = [
        {
            id: 1,
            title: "Concert",
            description: " akjhgaeljkrhnlkjaernhkjaernhlkjaernhkjaenrlhkjn",
            date: "12-12-2023",
            attending: true
        },
        {
            id: 2,
            title: "Concert",
            date: "12-12-2023"
        },
        {
            id: 3,
            title: "Concert",
            date: "12-12-2023"
        }
    ]

    return events;
    //const response = await axios.get('/Events/GetAllEvents');
    //return response.data;
}

export const getTrendingEvents = () =>{
    //TO DO: Connect to API...
    return getEvents();
}

export const attendEvent = ({eventId, username}) =>{
    //TO DO: Connect to API...
}

export const getIsAttending = ({eventId, username}) => {
    //TO DO: Connect to API...
}

export const addEvent = async (event) =>{
    return await axios.post('/Events/CreateEvent', event);
}

export const updateEvent = async (event) =>{
    return await axios.patch(`/Events/${event.id}`, event);
}

export const deleteEvent = async ({id}) =>{
    return await axios.delete(`/Events/${id}`, id);
}