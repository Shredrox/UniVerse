import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import { useAuth } from "../hooks/useAuth"
import Loading from '../components/fallbacks/Loading'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  
  useEffect(() => {
    const verifyRefreshToken = async () =>{
      try{
        await refresh();
      }
      catch(error){
        console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  return (
    <>
      {isLoading ? <Loading/> : <Outlet/>}
    </>
  )
}

export default PersistLogin
