import axios from "./axios"

export const getEvents = async () =>{
    const response = await axios.get('/Events/GetAllEvents');
    return response.data;
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