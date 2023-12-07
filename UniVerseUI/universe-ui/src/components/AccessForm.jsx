import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification'

import axios from '../api/axios';

export const AccessForm = () => {
  const { setAuth } = useAuth();
  const { connectNotifications } = useNotification();
  const [activeButton, setActiveButton] = useState(1);

  const errRef = useRef();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() =>{
    setErrorMsg('');
  }, [user, password])

  const handleSubmit = async () =>{
    try{
      let url;

      if(activeButton === 1){
        url = 'User/Login';
      }
      else{
        url = 'User/Register';
      }

      const response = await axios.post(url,
        JSON.stringify({user, email, password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      );

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      const username = response?.data?.username;

      setAuth({user: username, accessToken});
      setUser('');
      setPassword('');
      connectNotifications(username);
      navigate(from, { replace: true });
    }
    catch(error){
      if(!error?.response){
        setErrorMsg('No response');
      }else if(error.response?.status === 400){
        setErrorMsg('Missing info');
      }else if(error.response?.status === 401){
        setErrorMsg('Unathorized');
      }else{
        setErrorMsg('Error');
      }

      errRef.current.focus();
    }
  }

  return (
    <div className='access-form'>
      <p ref={errRef} aria-live='assertive'>{errorMsg}</p>
      <div>
        <button 
          onClick={() => setActiveButton(1)} 
          className={activeButton === 1 ? 'login-button-active' : 'login-button'}>
            Login
        </button>
        <button 
          onClick={() => setActiveButton(2)} 
          className={activeButton === 2 ? 'register-button-active' : 'register-button'}>
            Register
        </button>
      </div>

      <div className='access-form-input-container'>
        {activeButton === 2 && <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Username'/>}
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
      </div>

      <button onClick={() => handleSubmit()} className='confirm-button'>
        {activeButton === 1 ? 'Log In' : 'Sign Up'}
      </button>

      Forgot password?
    </div>
  )
}
