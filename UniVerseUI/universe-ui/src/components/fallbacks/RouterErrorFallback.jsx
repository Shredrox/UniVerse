import { MdErrorOutline } from "react-icons/md";
import { useNavigate, useRouteError } from "react-router-dom";

const RouterErrorFallback = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="router-error-fallback-container">
      <div className='router-error-fallback'>
        <span><MdErrorOutline className="error-icon"/>{error.message}</span>
        <button onClick={() => navigate(0)} className="confirm-button">Try Again</button>
      </div>
    </div>
  )
}

export default RouterErrorFallback
