import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { addFriend, checkFriendship, confirmPassword, getUserByName, removeFriend, updateUserProfile } from "../api/usersApi";
import { useAuth } from "../hooks/useAuth";
import Loading from '../components/fallbacks/Loading'
import { useEffect, useState } from "react";
import ErrorFallback from '../components/fallbacks/ErrorFallback'

const Profile = () => {
  const { auth } = useAuth();
  const { username } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {data: user, isLoading, isError, error} = useQuery({ 
    queryKey: ["userDetails", username],
    queryFn: () => getUserByName(username),
  });

  const [isEditOn, setIsEditOn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);

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

  const {mutateAsync: updateUserProfileMutation} = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () =>{
      navigate(`/profile/${name}`)
      window.location.reload(); 
    },
  });

  useEffect(() =>{
    if(user !== null){
      setName(user?.username);
      setEmail(user?.email);
    }
  }, [user])

  useEffect(() =>{
    setIsValidPassword(true);
  }, [password])

  const handleProfileEdit = async () =>{
    const validPasswrd = await confirmPassword({username: user?.username, password: password});

    if(!validPasswrd){
      setIsValidPassword(false);
      return;
    }

    updateUserProfileMutation({username: user?.username, newUsername: name, email: email, password: newPassword});
  }

  const handleCancel = () =>{
    setIsEditOn(false);
    setIsValidPassword(true);
    setPassword('');
  }

  if(isError){
    throw Error(error);
  }

  if(isLoading){
    return <Loading/>
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
          {isEditOn ? 
          <div className="profile-edit-container">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username"/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Old Password"/>
            {!isValidPassword && <ErrorFallback error={"Wrong password!"}/>}
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="New Password"/>
            <div className="profile-edit-button-container">
              <button onClick={handleCancel} className="confirm-button">Cancel</button>
              <button onClick={handleProfileEdit} className="confirm-button">Save</button>
            </div>
          </div>
          :
          <button onClick={() => setIsEditOn(true)} className="confirm-button">Edit</button>
          }
        </div>
        }
      </div>
    </div>
  )
}

export default Profile
