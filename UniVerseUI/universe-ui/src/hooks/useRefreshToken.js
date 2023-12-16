import axios from "../api/axios"
import { useAuth } from "./useAuth"

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () =>{
    const response = await axios.post('User/RefreshToken',{},{
      withCredentials: true
    });

    setAuth(prev => {
      return {...prev, 
        user: response.data.username,
        accessToken: response.data.newAccessToken
      }
    });
    return response.data.newAccessToken;
  }

  return refresh;
}

export default useRefreshToken
