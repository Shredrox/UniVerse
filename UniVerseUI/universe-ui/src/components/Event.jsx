import { useAuth } from "../hooks/useAuth";
import useEventData from "../hooks/useEventData";

const Event = ({event}) => {
  const { auth } = useAuth();

  const { 
    isAttending, 
    attendEventMutation,
    removeAttendingMutation,
    deleteEventMutation
  } = useEventData(event.id, auth?.user);

  const handleClick = () =>{
    if(isAttending){
      removeAttendingMutation({eventId: event.id, username: auth?.user});
      return;
    }

    attendEventMutation({eventId: event.id, username: auth?.user});
  }

  const handleDelete = async () =>{
    await deleteEventMutation(event.id);
  }

  return (
    <div className='event'>
      <img src="https://picsum.photos/250/200" alt="EventImage" />
      <div className="event-info">
        <h3>{event.title}</h3>
        <h4>{event.date}</h4>
        <span>{event.description}</span>
        <button 
          onClick={handleClick} 
          className="confirm-button">
          {isAttending ? "Attending" : "Attend"}
        </button>
        {auth?.role === "ADMIN" && 
        <button 
          onClick={handleDelete} 
          className="cancel-button">
            Delete
        </button>
        }
      </div>
    </div>
  )
}

export default Event
