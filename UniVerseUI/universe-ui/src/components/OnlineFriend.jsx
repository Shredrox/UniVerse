import useProfilePicture from "../hooks/useProfilePicture";
import { FaUserAstronaut } from "react-icons/fa";

const OnlineFriend = ({friend}) => {
  const { profilePicture } = useProfilePicture("onlineUserProfilePicture", friend);

  return (
    <div className="friend">
      <div className='chat-profile-picture'>
        {profilePicture?.size > 0 ? 
        <img className='author-profile-picture' src={URL.createObjectURL(profilePicture)} alt="ProfilePicture" /> 
        :
        <FaUserAstronaut className="chat-profile-picture-placeholder-icon"/>}
      </div>
      {friend}
    </div>
  )
}

export default OnlineFriend
