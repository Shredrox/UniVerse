import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChat } from "../services/chatsService";
import { useEffect } from "react";
import { useSocket } from "./useSocket";

const useMessagesData = (loggedUser, chatUser) =>{
  const { sendMessage, setChatMessages, messages } = useSocket();

  const queryClient = useQueryClient();

  const {data: messagesData, 
    isLoading: isMessagesLoading, 
    isError: isMessagesError, 
    error: messagesError
  } = useQuery({ 
    queryKey: ["chat", loggedUser, chatUser],
    queryFn: () => getChat(loggedUser, chatUser),
  });

  const {mutateAsync: sendMessageMutation} = useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>{
      queryClient.invalidateQueries(["chat", loggedUser, chatUser]);
    },
  });

  useEffect(() => {
    if (messagesData) {
      setChatMessages(messagesData);
    }
  }, [messagesData]);

  return {
    messages, 
    isMessagesLoading, 
    isMessagesError, 
    messagesError,
    sendMessageMutation,
  }
}

export default useMessagesData 
