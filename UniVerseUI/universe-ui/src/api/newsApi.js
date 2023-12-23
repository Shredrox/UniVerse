import axios from "./axios";

export const getNews = async () =>{
    const response = await axios.get('/news');
    return response.data;
}

export const getNewsByTitle = async (title) =>{
    const response = await axios.get(`/news/${title}`);
    return response.data;
}

export const addNews = async (news) =>{
    return await axios.post('/news/createNews', news);
}

export const updateNews = async (news) =>{
    return await axios.patch(`/news/${post.id}`, news);
}

export const deleteNews = async ({id}) =>{
    return await axios.delete(`/news/${id}`, id);
}
