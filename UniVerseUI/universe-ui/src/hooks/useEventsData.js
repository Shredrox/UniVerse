import { useQuery } from "@tanstack/react-query";
import { getEvents, getTrendingEvents } from "../services/eventsService";

const useEventsData = () =>{
  const {data: events, 
    isLoading: isEventsDataLoading, 
    isError: isEventsDataError, 
    error: eventsDataError
  } = useQuery({ 
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  const {data: trendingEvents, 
    isLoading: isTrendingEventsDataLoading, 
    isError: isTrendingEventsDataError, 
    error: trendingEventsDataError
  } = useQuery({ 
    queryKey: ["trendingEvents"],
    queryFn: () => getTrendingEvents(),
  });

  const isEventsError =  isEventsDataError || isTrendingEventsDataError;
  const eventsError = eventsDataError || trendingEventsDataError;
  const isEventsLoading = isEventsDataLoading || isTrendingEventsDataLoading;

  return {
    eventsData: {events, trendingEvents}, 
    isEventsLoading, 
    isEventsError, 
    eventsError
  }
}

export default useEventsData
