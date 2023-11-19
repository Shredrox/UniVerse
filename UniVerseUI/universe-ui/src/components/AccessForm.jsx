import { useState } from 'react'

export const AccessForm = ({setLoggedIn}) => {
  const [activeButton, setActiveButton] = useState(1);

  function setButton(btn){
    setActiveButton(btn);
  }

  return (
    <div className='access-form'>
      <div>
        <button 
          onClick={() => setButton(1)} 
          className={activeButton === 1 ? 'login-button-active' : 'login-button'}>
            Login
        </button>
        <button 
          onClick={() => setButton(2)} 
          className={activeButton === 2 ? 'register-button-active' : 'register-button'}>
            Register
        </button>
      </div>
      <div className='access-form-input-container'>
        {activeButton === 2 && <input type="text" placeholder='Username'/>}
        <input type="email" placeholder='Email'/>
        <input type="password" placeholder='Password'/>
      </div>
      <button onClick={() => setLoggedIn()} className='confirm-button'>
        {activeButton === 1 ? 'Log In' : 'Sign Up'}
      </button>
      Forgot password?
    </div>
  )
}
