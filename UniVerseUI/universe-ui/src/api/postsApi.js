import axios from "./axios";

export const getPosts = async () =>{
    const response = await axios.get('/Posts/GetAllPosts');
    return response.data;
}

export const getFriendsPosts = async (username) =>{
    const response = await axios.get('/Posts/GetAllPosts');
    return response.data;
}

export const getPostById = async (id) =>{
    const response = await axios.patch(`/Posts/${post.id}`, id);
    return response.data;
}

export const getPostComments = async (postId) =>{
    //TO DO: Connect to API
}

export const addPostComment = async ({postId, username, content}) =>{
    console.log(postId + " " + username + " " + content);
}

export const getCommentReplies = async (commentId) =>{
    //TO DO: Connect to API
}

export const addCommentReply = async ({commentId, username, content}) => {
    //TO DO: Connect to API
}

export const getPostCommentCount = async (postId) =>{
    return 420;
}

export const getPostLikes = async (postId) =>{
    return 69;
}

export const getIsLiked = async (postId, username) =>{
    console.log(postId + " " + username);
    return false;
}

export const likePost = async ({postId, username}) =>{
    console.log(postId + " " + username + " like");
}

export const unlikePost = async ({postId, username}) =>{
    console.log(postId + " " + username + " unlike");
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