import axios from "../api/axios";

export const getNews = async () =>{
    const response = await axios.get('/news');
    return response.data;
}

export const getNewsImage = async (id) =>{
    const response = await axios.get(`/news/${id}/image`, { responseType: 'blob'});
    return response.data;
}

export const getNewsById = async (newsId) =>{
    const response = await axios.get(`/news/${newsId}`);
    return response.data;
}

export const addNews = async (news) =>{
    return await axios.post('/news/createNews', news);
}

export const updateNews = async (data) =>{
    return await axios.post(`/news/update`, data);
}

export const deleteNews = async (newsId) =>{
    return await axios.delete(`/news/delete/${newsId}`, newsId);
}
