import { useMutation, useQuery } from '@tanstack/react-query';
import { attendEvent, getEvents } from '../api/eventsApi';
import Event from '../components/Event';
import { MdEventAvailable } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import TrendingEvent from '../components/TrendingEvent';
import { useAuth } from "../hooks/useAuth";

const Events = () => {
  const { auth } = useAuth();

  const {data: events, isLoading, isError, error} = useQuery({ 
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  const {mutateAsync: attendEventMutation} = useMutation({
    mutationFn: attendEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries(["events"]);
    },
  });

  const attendNewEvent = (eventId) =>{
    console.log(eventId);
    attendEventMutation({eventId: eventId, username: auth?.user})
  }

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className='events-container'>
      <div className="trending-events-container">
        <h2><IoTrendingUp className='event-icon'/>Trending Events</h2>
        <div className='trending-events-list'>
          {events.map((event, index) =>
            <TrendingEvent key={index} event={event}/>
          )}
        </div>
      </div>
      <div className="events-list-container">
      <h2><MdEventAvailable className='event-icon'/> Events</h2>
        <div className='events-list'>
          {events.map((event, index) =>
            <Event key={index} event={event} attendEvent={attendNewEvent}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events
