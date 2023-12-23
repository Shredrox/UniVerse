import axios from "../api/axios";

export const getUsers = async () =>{
    const response = await axios.get('/users');
    return response.data;
}

export const getUsersByFilter = async (filter) =>{
    const response = await axios.get(`/users/search/${filter}`);
    return response.data;
}

export const userExists = async (username) =>{
    const response = await axios.get(`/users/exists/${username}`);
    return response.data;
}

export const getUserByName = async (username) =>{
    const response = await axios.get(`/users/${username}`);
    return response.data;
}

export const getUserOnlineFriends = async (username) =>{
    const response = await axios.get(`/users/${username}/online-friends`);
    return response.data;
}

export const checkFriendship = async (usernameUser1, usernameUser2) => {
    const response = await axios.get('/users/check-friendship', {
      params: {
        usernameUser1,
        usernameUser2,
      },
    });

    return response.data;
};

export const addFriend = async ({ loggedInUser, profileUser }) =>{
    const response = await axios.post(`/users/${loggedInUser}/add-friend/${profileUser}`);
    return response.data;
}

export const removeFriend = async ({ loggedInUser, profileUser }) =>{
    const response = await axios.post(`/users/${loggedInUser}/remove-friend/${profileUser}`);
    return response.data;
}

export const confirmPassword = async ({ username, password }) =>{
    const details = { username: username, email: "", password: password };

    const response = await axios.post('/users/confirm-password', details);
    return response.data;
}

export const updateUserProfile = async ({username, newUsername, email, password}) =>{
    const details = { 
        username: username, 
        newUsername: newUsername, 
        newEmail: email, 
        newPassword: password 
    };

    const response = await axios.post('/users/update-profile', details);
    return response.data;
}
