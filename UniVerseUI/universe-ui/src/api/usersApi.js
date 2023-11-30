import axios from "./axios";

export const getUsers = async () =>{
    const response = await axios.get('/User/GetAllUsers');
    return response.data;
}

export const getUserById = async (userId) =>{
    const response = await axios.get(`/User/${userId}`);
    return response.data;
}

export const getUserByName = async (username) =>{
    const response = await axios.get(`/User/${username}`);
    return response.data;
}
