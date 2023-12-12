import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './styles/style.css'
import { SocketProvider } from './contexts/SocketContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false}/>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
