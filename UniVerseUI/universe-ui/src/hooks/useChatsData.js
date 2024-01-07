import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChats } from "../services/chatsService";
import { useEffect } from "react";
import { useSocket } from "./useSocket";

const useChatsData = (user) =>{
  const { createChat, setUserChats, chats } = useSocket();

  const queryClient = useQueryClient();

  const {data: chatsData, 
    isLoading: isChatsLoading, 
    isError: isChatsError, 
    error: chatsError
  } = useQuery({ 
    queryKey: ["chats", user],
    queryFn: () => getChats(user),
  });

  const {mutateAsync: addChatMutation} = useMutation({
    mutationFn: createChat,
    onSuccess: () =>{
      queryClient.invalidateQueries(["chats", user]);
    },
  });

  useEffect(() => {
    if (chatsData) {
      setUserChats(chatsData);
    }
  }, [chatsData]);

  return {
    chats, 
    isChatsLoading, 
    isChatsError, 
    chatsError,
    addChatMutation,
  }
}

export default useChatsData
