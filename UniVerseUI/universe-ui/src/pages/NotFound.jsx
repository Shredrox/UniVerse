import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='not-found-page'>
      <div className='not-found-page-text-container'><h1>404</h1> Page Not Found</div>
      <button onClick={() => navigate('/')} className='confirm-button'>Go To Home</button>
    </div>
  )
}

export default NotFound
