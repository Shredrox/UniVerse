import axios from "./axios"

export const getEvents = async () =>{
    const response = await axios.get('/events');
    return response.data;
}

export const getTrendingEvents = async () =>{
    const response = await axios.get('/events/trending');
    return response.data;
}

export const getIsAttending = async ({eventId, username}) => {
    const response = await axios.get(`/events/${eventId}/attending/${username}`);
    return response.data;
}

export const attendEvent = async ({eventId, username}) =>{
    const response = await axios.post(`/events/${eventId}/attend`, {
        params: {
          username: username
        }
    });

    return response.data;
}

export const removeAttending = async ({eventId, username}) =>{
    const response = await axios.post(`/events/${eventId}/remove-attending`, {
        params: {
          username: username
        }
    });

    return response.data;
}

export const addEvent = async (event) =>{
    return await axios.post('/events/create-event', event);
}

export const updateEvent = async (event) =>{
    return await axios.patch(`/events/${event.id}`, event);
}

export const deleteEvent = async (id) =>{
    return await axios.delete(`/events/${id}`, id);
}
