const ErrorFallback = ({error}) => {
  return (
    <div className='error-fallback'>Error: {error.message}</div>
  )
}

export default ErrorFallback
