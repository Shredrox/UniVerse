import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket'
import ErrorFallback from '../components/fallbacks/ErrorFallback'

import axios from '../api/axios';

export const AccessForm = () => {
  const { setAuth } = useAuth();
  const { connectSocketClient } = useSocket();
  const [activeButton, setActiveButton] = useState('login');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  useEffect(() => {
    setIsUsernameError(false);
  }, [username])

  useEffect(() => {
    setIsEmailError(false);
  }, [email])

  useEffect(() => {
    setIsPasswordError(false);
  }, [password])

  useEffect(() => {
    if(!isUsernameError && !isEmailError && !isPasswordError) {
      setIsError(false);
      setError('');
    }
  }, [isUsernameError, isEmailError, isPasswordError])

  const checkInput = () => {
    if(username === '' && activeButton === 'register'){
      setIsUsernameError(true);
    }
    if(email === ''){
      setIsEmailError(true);
    }
    if(password == ''){
      setIsPasswordError(true);
    }

    if((email === '' || password === '') && activeButton === 'login'){
      setError('Fields cannot be empty');
      setIsError(true);
      return false;
    }else if((username === '' || email === '' || password === '') && activeButton === 'register'){
      setError('Fields cannot be empty');
      setIsError(true);
      return false;
    }

    return true;
  }

  const handleSubmit = async () =>{
    if(!checkInput()){
      return;
    }

    try{
      let url;

      if(activeButton === 'login'){
        url = 'User/Login';
      }
      else{
        url = 'User/Register';
      }

      const response = await axios.post(url,
        JSON.stringify({username, email, password}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
      );

      const accessToken = response?.data?.token;
      const user = response?.data?.username;

      setAuth({user: user, accessToken: accessToken});
      setUsername('');
      setPassword('');
      connectSocketClient(user);
      navigate(from, { replace: true });
    }
    catch(error){
      if(!error?.response){
        setError('No response');
        setIsError(true);
      }else if(error.response?.status === 400){
        setError('An error occurred');
        setIsError(true);
      }else if(error.response?.status === 404){
        setError('Incorrect email or password');
        setIsError(true);
      }else{
        setError('Error');
        setIsError(true);
      }
    }
  }

  const handleButtonChange = (btn) => {
    setActiveButton(btn);
    setError('');
    setIsError(false);
    setIsUsernameError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='access-form'>
      <div>
        <button 
          onClick={() => handleButtonChange('login')} 
          className={activeButton === 'login' ? 'login-button-active' : 'login-button'}>
            Login
        </button>
        <button 
          onClick={() => handleButtonChange('register')} 
          className={activeButton === 'register' ? 'register-button-active' : 'register-button'}>
            Register
        </button>
      </div>

      <div className='access-form-input-container'>
        {activeButton === 'register' && 
        <input 
          className={`access-form-input ${isUsernameError ? 'input-error' : ''}`}
          value={username}
          type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder='Username'
        />
        }
        <input 
          className={`access-form-input ${isEmailError ? 'input-error' : ''}`}
          value={email}
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder='Email'
        />
        <input 
          className={`access-form-input ${isPasswordError ? 'input-error' : ''}`}
          value={password}
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password'
        />
      </div>

      <button 
        onClick={() => handleSubmit()} 
        className='confirm-button'>
        {activeButton === 'login' ? 'Log In' : 'Sign Up'}
      </button>

      Forgot password?
      {isError && <ErrorFallback error={error}/>}
    </div>
  )
}
