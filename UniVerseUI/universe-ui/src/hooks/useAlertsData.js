import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserOnlineFriends, getUserFriendRequests, acceptFriendRequest, rejectFriendRequest } from "../services/usersService";
import { useEffect } from "react";
import { useSocket } from '../hooks/useSocket'
import { getUserNotifications, readUserNotifications } from "../services/alertsService";

const useAlertsData = (loggedUser) =>{
  const { notifications, setUserNotifications, friendRequests, setUserFriendRequests, newOnlineFriend, setNewOnlineFriend } = useSocket();
  const queryClient = useQueryClient();

  const {data: onlineFriends, 
    isLoading: isOnlineFriendsLoading, 
    isError: isOnlineFriendsError,
    error: onlineFriendsError,
    refetch: refetchOnlineFriends
  } = useQuery({ 
    queryKey: ["userOnlineFriends", loggedUser],
    queryFn: () => getUserOnlineFriends(loggedUser),
  });

  const {data: userNotifications,
    isLoading: isUserNotificationsLoading, 
    isError: isUserNotificationsError,
    error: userNotificationsError
  } = useQuery({ 
    queryKey: ["userNotifications", loggedUser],
    queryFn: () => getUserNotifications(loggedUser)
  });

  const {data: friendRequestsData,
    isLoading: isFriendRequestsDataLoading, 
    isError: isFriendRequestsDataError,
    error: friendRequestsDataError
  } = useQuery({ 
    queryKey: ["friendRequests", loggedUser],
    queryFn: () => getUserFriendRequests(loggedUser)
  });

  useEffect(() =>{
    if(newOnlineFriend){
      refetchOnlineFriends();
      setNewOnlineFriend(!newOnlineFriend);
    }
  }, [newOnlineFriend])

  useEffect(() => {
    if (friendRequestsData) {
      setUserFriendRequests(friendRequestsData);
    }
  }, [friendRequestsData]);

  useEffect(() => {
    if (userNotifications) {
      setUserNotifications(userNotifications);
    }
  }, [userNotifications]);

  const {mutateAsync: readNotificationsMutation} = useMutation({
    mutationFn: readUserNotifications,
    onSuccess: () =>{
      queryClient.invalidateQueries(["userNotifications", loggedUser]);
    },
  });

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

  const isAlertsError =  isOnlineFriendsError || isFriendRequestsDataError || isUserNotificationsError;
  const alertsError = onlineFriendsError || friendRequestsDataError || userNotificationsError;
  const isAlertsLoading = isOnlineFriendsLoading || isFriendRequestsDataLoading || isUserNotificationsLoading;

  return {
    alertData: { notifications, friendRequests, onlineFriends }, 
    isAlertsLoading, 
    isAlertsError, 
    alertsError,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
    readNotificationsMutation
  }
}

export default useAlertsData
