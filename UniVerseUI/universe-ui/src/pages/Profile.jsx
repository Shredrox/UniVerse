import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getUserByName } from "../api/usersApi";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  const { username } = useParams();

  const {data: user, isLoading, isError, error} = useQuery({ 
    queryKey: ["userDetails", username],
    queryFn: () => getUserByName(username),
  });

  const loggedInUserProfile = auth?.user === user?.username;

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
          <h4>Friends: 69</h4>
          <h4>Posts: 420</h4>
        </div>
        
        {loggedInUserProfile 
        && 
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
