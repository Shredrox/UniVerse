import axios from "./axios";

export const getUsers = async () =>{
    const response = await axios.get('/User/GetAllUsers');
    return response.data;
}

export const userExists = (username) =>{
    //TO DO: Connect to API
    return true;
}

export const getUserById = async (userId) =>{
    const response = await axios.get(`/User/${userId}`);
    return response.data;
}

export const getUserByName = async (username) =>{
    const response = await axios.get(`/User/${username}`);
    return response.data;
}

export const getUserOnlineFriends = async (username) =>{

    const users = [
        {
            username: "Test 1",
            isOnline: true,
        },
        {
            username: "Test 2",
            isOnline: false,
        },
        {
            username: "Test 3",
            isOnline: true,
        },
        {
            username: "Test 4",
            isOnline: true,
        }     
    ]

    return users.filter(user => user.isOnline); 

    // const response = await axios.get(`/User/${username}/GetOnlineFriends`);
    // return response.data;
}

export const checkFriendship = async (user1Username, user2Username) => {
    //   const response = await axios.get('/api/areFriends', {
    //     params: {
    //       user1Username,
    //       user2Username,
    //     },
    //   });
    console.log("friend checking");

    const friends = [
        "IAmDriving",
        "Admin"
    ]

    return friends.includes(user2Username); 
};

export const addFriend = async ({ loggedInUser, profileUser }) =>{
    console.log(loggedInUser + " " + profileUser + " add");
}

export const removeFriend = async ({ loggedInUser, profileUser }) =>{
    console.log(loggedInUser + " " + profileUser + " remove");
}

export const confirmPassword = async ({ username, password }) =>{
    const details = { username: username, email: "", password: password };

    const response = await axios.post('/User/ConfirmPassword', details);
    return response.data;
}

export const updateUserProfile = async ({username, newUsername, email, password}) =>{
    const details = { 
        username: username, 
        newUsername: newUsername, 
        newEmail: email, 
        newPassword: password 
    };

    const response = await axios.post('/User/UpdateProfile', details);
    return response.data;
}
