import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserOnlineFriends, getUserFriendRequests, acceptFriendRequest, rejectFriendRequest } from "../services/usersService";
import { useEffect } from "react";
import { useSocket } from '../hooks/useSocket'

const useAlertsData = (loggedUser) =>{
  const { notifications, friendRequests, setUserFriendRequests } = useSocket();
  const queryClient = useQueryClient();

  const {data: onlineFriends, 
    isLoading: isOnlineFriendsLoading, 
    isError: isOnlineFriendsError,
    error: onlineFriendsError
  } = useQuery({ 
    queryKey: ["userOnlineFriends", loggedUser],
    queryFn: () => getUserOnlineFriends(loggedUser),
    refetchInterval: 10000,
  });

  const {data: friendRequestsData,
    isLoading: isFriendRequestsDataLoading, 
    isError: isFriendRequestsDataError,
    error: friendRequestsDataError
  } = useQuery({ 
    queryKey: ["friendRequests", loggedUser],
    queryFn: () => getUserFriendRequests(loggedUser)
  });

  useEffect(() => {
    if (friendRequestsData) {
      setUserFriendRequests(friendRequestsData);
    }
  }, [friendRequestsData]);

  const {mutateAsync: acceptFriendRequestMutation} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () =>{
      queryClient.invalidateQueries(["friendRequests", loggedUser]);
    },
  });

  const {mutateAsync: rejectFriendRequestMutation} = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () =>{
      queryClient.invalidateQueries(["friendRequests", loggedUser]);
    },
  });

  const isAlertsError =  isOnlineFriendsError || isFriendRequestsDataError;
  const alertsError = onlineFriendsError || friendRequestsDataError;
  const isAlertsLoading = isOnlineFriendsLoading || isFriendRequestsDataLoading;

  return {
    alertData: { notifications, friendRequests, onlineFriends }, 
    isAlertsLoading, 
    isAlertsError, 
    alertsError,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation
  }
}

export default useAlertsData
