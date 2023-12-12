import { Outlet } from "react-router-dom"
import Chats from "../pages/Chats"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../components/fallbacks/ErrorFallback"

const ChatsLayout = () => {
  return (
    <div className='chats-container'>
      <div className="chats-list-container">
        <h2>Chats</h2>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="chats-outlet-container">
            <Chats/>
            <Outlet />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default ChatsLayout
