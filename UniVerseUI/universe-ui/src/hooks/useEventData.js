import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { attendEvent, getIsAttending, removeAttending } from "../services/eventsService";

const useEventData = (eventId, user) =>{
  const queryClient = useQueryClient();

  const {data: isAttending, 
    isLoading: isAttendingLoading, 
    isError: isAttendingError, 
    error: attendingError
  } = useQuery({ 
    queryKey: ["eventIsAttending", eventId, user],
    queryFn: () => getIsAttending(eventId, user),
  });

  const {mutateAsync: attendEventMutation} = useMutation({
    mutationFn: attendEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries(["eventIsAttending", eventId, user]);
    },
  });

  const {mutateAsync: removeAttendingMutation} = useMutation({
    mutationFn: removeAttending,
    onSuccess: () =>{
      queryClient.invalidateQueries(["eventIsAttending", eventId, user]);
    },
  });

  return {
    isAttending, 
    isAttendingLoading, 
    isAttendingError, 
    attendingError,
    attendEventMutation,
    removeAttendingMutation
  }
}

export default useEventData
