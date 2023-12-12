import { useErrorBoundary } from "react-error-boundary"
import { MdErrorOutline } from "react-icons/md";

const ErrorFallback = ({error}) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="error-fallback-container">
      <div className='error-fallback'>
        <span><MdErrorOutline className="error-icon"/> Error: {error.message}</span>
        <button onClick={resetBoundary} className="confirm-button">Try Again</button>
      </div>
    </div>
  )
}

export default ErrorFallback
