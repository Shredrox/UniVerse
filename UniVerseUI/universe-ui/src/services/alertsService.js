import axios from "../api/axios";

export const getUserNotifications = async (username) =>{
    const response = await axios.get(`/notifications/${username}`);
    return response.data;
}

export const readUserNotifications = async (username) =>{
    const response = await axios.post(`/notifications/${username}/set-read`);
    return response.data;
}
