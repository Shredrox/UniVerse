import axios from "./axios";

export const getPosts = async () =>{
    const response = await axios.get('/Posts/GetAllPosts');
    return response.data;
}

export const addPost = async (post) =>{
    return await axios.post('/Posts/CreatePost', post);
}

export const updatePost = async (post) =>{
    return await axios.patch(`/Posts/${post.id}`, post);
}

export const deletePost = async ({id}) =>{
    return await axios.delete(`/Posts/${id}`, id);
}