import { useQuery } from "@tanstack/react-query";
import { getUserProfilePicture } from "../services/usersService";

const useProfilePicture = (queryKey, user) =>{
  const {data: profilePicture, 
		isLoading: isProfilePictureLoading, 
		isError: isProfilePictureError, 
		error: profilePictureError
	} = useQuery({
    queryKey: [queryKey, user],
    queryFn: () => getUserProfilePicture(user),
  });

  return { 
    profilePicture, 
    isProfilePictureLoading,  
    isProfilePictureError, 
    profilePictureError 
  }
}

export default useProfilePicture
