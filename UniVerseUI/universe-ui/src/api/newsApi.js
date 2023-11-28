import axios from "./axios";

export const getNews = async () =>{
    const response = await axios.get('/News/GetAllNews');
    return response.data;
}

export const getNewsByTitle = async (title) =>{
    const response = await axios.get(`/News/${title}`);
    return response.data;
}

export const addNews = async (news) =>{
    return await axios.post('/News/CreateNews', news);
}

export const updateNews = async (news) =>{
    return await axios.patch(`/News/${post.id}`, news);
}

export const deleteNews = async ({id}) =>{
    return await axios.delete(`/News/${id}`, id);
}
