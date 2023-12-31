import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkFriendship, getUserByName, getUserFriendsCount, removeFriend, updateUserProfile } from "../services/usersService";
import { useSocket } from "./useSocket";
import { getUserPostsCount } from "../services/postsService";

const useProfileData = (profileUser, loggedUser) =>{
  const queryClient = useQueryClient();
	const { sendFriendRequest } = useSocket();

  const {data: user, 
		isLoading: isProfileUserLoading, 
		isError: isProfileUserError, 
		error: profileUserError
	} = useQuery({ 
    queryKey: ["userDetails", profileUser],
    queryFn: () => getUserByName(profileUser),
  });

	const loggedInUserProfile = loggedUser === user?.username;

	const {data: friendshipStatus, 
		isLoading: isFriendshipLoading, 
		isError: isFriendshipError, 
		error: friendshipError
	} = useQuery({
    queryKey: ["friendshipStatus", loggedUser, user?.username],
    queryFn: () => checkFriendship(loggedUser, user?.username),
    enabled: !loggedInUserProfile,
  });

  const {data: friendsCount, 
		isLoading: isfriendsCountLoading, 
		isError: isfriendsCountError, 
		error: friendsCountError
	} = useQuery({
    queryKey: ["friendsCount", user?.username],
    queryFn: () => getUserFriendsCount(user?.username),
  });

  const {data: postsCount, 
		isLoading: isPostsCountLoading, 
		isError: isPostsCountError, 
		error: postsCountError
	} = useQuery({
    queryKey: ["postsCount", user?.username],
    queryFn: () => getUserPostsCount(user?.username),
  });

  const {mutateAsync: addFriendMutation} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>{
      queryClient.invalidateQueries(["friendshipStatus", loggedUser, user?.username]);
    },
  });

  const {mutateAsync: removeFriendMutation} = useMutation({
    mutationFn: removeFriend,
    onSuccess: () =>{
      queryClient.invalidateQueries(["friendshipStatus", loggedUser, user?.username]);
    },
  });

  const {mutateAsync: updateUserProfileMutation} = useMutation({
    mutationFn: updateUserProfile,
  });

  const isProfileError =  isProfileUserError || isFriendshipError || isfriendsCountError || isPostsCountError;
  const profileError = profileUserError || friendshipError || friendsCountError || postsCountError;
  const isProfileLoading = isProfileUserLoading || isFriendshipLoading || isfriendsCountLoading || isPostsCountLoading;

  return {
    profileData: {user, loggedInUserProfile, friendshipStatus, friendsCount, postsCount}, 
    isProfileLoading, 
    isProfileError, 
    profileError,
    addFriendMutation,
    removeFriendMutation,
		updateUserProfileMutation
  }
}

export default useProfileData
