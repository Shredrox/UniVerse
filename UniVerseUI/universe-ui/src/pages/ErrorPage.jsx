import { MdErrorOutline } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <div className='error-card'>
        <span><MdErrorOutline />An error has occured.</span>
        <button 
          onClick={() => window.location.reload()} 
          className="confirm-button">
            Refresh
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
