import Event from '../components/Event';
import { MdEventAvailable } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import TrendingEvent from '../components/TrendingEvent';
import { useAuth } from "../hooks/useAuth";
import Loading from '../components/fallbacks/Loading'
import useEventsData from '../hooks/useEventsData';

const Events = () => {
  const { auth } = useAuth();

  const { 
    eventsData, 
    isEventsLoading,
    isEventsError,
    eventsError,
  } = useEventsData(auth?.user);

  if(isEventsError){
    throw Error(eventsError);
  }

  if(isEventsLoading){
    return <Loading/>
  }

  return (
    <div className='events-container'>
      <div className="trending-events-container">
        <h2><IoTrendingUp className='event-icon'/>Trending Events</h2>
        <div className='trending-events-list'>
        {eventsData.trendingEvents?.map((event, index) =>
          <TrendingEvent key={index} event={event}/>
        )}
        </div>
      </div>
      <div className="events-list-container">
      <h2><MdEventAvailable className='event-icon'/>Events</h2>
        <div className='events-list'>
        {eventsData.events?.map((event, index) =>
          <Event key={index} event={event}/>
        )}
        </div>
      </div>
    </div>
  )
}

export default Events
