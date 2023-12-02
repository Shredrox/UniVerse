import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { addFriend, checkFriendship, getUserByName, removeFriend } from "../api/usersApi";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  const { username } = useParams();

  const queryClient = useQueryClient();

  const {data: user, isLoading, isError, error} = useQuery({ 
    queryKey: ["userDetails", username],
    queryFn: () => getUserByName(username),
  });

  const loggedInUserProfile = auth?.user === user?.username;

  const {data: areUsersFriends} = useQuery({
    queryKey: ["areUsersFriends", auth?.user, user?.username],
    queryFn: () => checkFriendship(auth?.user, user?.username),
    enabled: !loggedInUserProfile,
  });

  const {mutateAsync: addFriendMutation} = useMutation({
    mutationFn: addFriend,
    onSuccess: () =>{
      queryClient.invalidateQueries(["areUsersFriends"]);
    },
  });

  const {mutateAsync: removeFriendMutation} = useMutation({
    mutationFn: removeFriend,
    onSuccess: () =>{
      queryClient.invalidateQueries(["areUsersFriends"]);
    },
  });

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="profile-page-container">
      <div className="profile-page-tab">
        <img className="profile-page-picture" src="https://picsum.photos/200/200" alt="ProfilePicture" />
        <h3>{user?.username}</h3>
        <div className="profile-social-tab">
          <div className="profile-counts"><span>Friends</span>69</div>
          <div className="profile-counts"><span>Posts</span>420</div>
        </div>

        {!loggedInUserProfile && 
        <button 
        className="profile-friend-button" 
        onClick={() => areUsersFriends ? 
          removeFriendMutation({ loggedInUser: auth?.user, profileUser: user?.username }) 
          : 
          addFriendMutation({ loggedInUser: auth?.user, profileUser: user?.username })}>
          {areUsersFriends ? "Remove Friend" : "Add Friend"}
        </button>
        }

        {loggedInUserProfile && 
        <div className="user-details">
          {user?.email}
          <button className="confirm-button">Edit</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Profile
