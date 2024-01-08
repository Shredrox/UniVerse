import { useEffect, useState } from "react";
import { confirmPassword } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import ErrorFallback from '../components/fallbacks/ErrorFallback'

const ProfileEditForm = ({profileUser, updateUserProfileMutation, setIsEditOn}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const navigate = useNavigate();

  useEffect(() =>{
    if(profileUser !== null){
      setName(profileUser.username);
      setEmail(profileUser.email);
    }
  }, [profileUser])

  useEffect(() =>{
    setIsValidPassword(true);
  }, [password])

  const handleProfileEdit = async () =>{
    const validPasswrd = await confirmPassword({username: profileUser.username, password: password});

    if(!validPasswrd){
      setIsValidPassword(false);
      return;
    }

    const requestData = new FormData();
    requestData.append('username', profileUser.username);
    requestData.append('newUsername', name);
    requestData.append('newEmail', email);
    requestData.append('newPassword', newPassword);

    if(image !== null){
      requestData.append('profilePicture', image);
    }

    await updateUserProfileMutation(requestData);

    navigate(`/profile/${name}`)
    window.location.reload(); 
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleCancel = () =>{
    setIsEditOn(false);
    setIsValidPassword(true);
    setPassword('');
  }

  return (
    <div className="profile-edit-container">
      <label 
        htmlFor="file"
        className="profile-page-add-image">
        {image ? "Change Image" : "Update Profile Picture"}
      </label>
      {image && <label>{imageName}</label>}
      <input 
      	type="file"
        id="file"
        accept="image/*"
        style={{display: "none"}}
        onChange={handleImageChange}
      />
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
  )
}

export default ProfileEditForm
