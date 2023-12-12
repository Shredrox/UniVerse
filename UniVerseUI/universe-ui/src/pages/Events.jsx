import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { attendEvent, getEvents, getTrendingEvents } from '../api/eventsApi';
import Event from '../components/Event';
import { MdEventAvailable } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import TrendingEvent from '../components/TrendingEvent';
import { useAuth } from "../hooks/useAuth";
import Loading from '../components/fallbacks/Loading'

const Events = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {data: events, isLoading: eventsLoading, isError, error} = useQuery({ 
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  const {data: trendingEvents, isLoading: trendingEventsIsLoading, isError: trendingEventsIsError, error: trendingEventsError} = useQuery({ 
    queryKey: ["trendingEvents"],
    queryFn: () => getTrendingEvents(),
  });

  const {mutateAsync: attendEventMutation} = useMutation({
    mutationFn: attendEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries(["events", "trendingEvents"]);
    },
  });

  const attendNewEvent = (eventId) =>{
    attendEventMutation({eventId: eventId, username: auth?.user})
  }

  if(isError || trendingEventsIsError){
    return <div>{error?.message}{trendingEventsError?.message}</div>
  }

  if(eventsLoading || trendingEventsIsLoading){
    return <Loading/>
  }

  return (
    <div className='events-container'>
      <div className="trending-events-container">
        <h2><IoTrendingUp className='event-icon'/>Trending Events</h2>
        <div className='trending-events-list'>
          {trendingEvents?.map((event, index) =>
            <TrendingEvent key={index} event={event} attendEvent={attendNewEvent}/>
          )}
        </div>
      </div>
      <div className="events-list-container">
      <h2><MdEventAvailable className='event-icon'/>Events</h2>
        <div className='events-list'>
          {events?.map((event, index) =>
            <Event key={index} event={event} attendEvent={attendNewEvent}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
