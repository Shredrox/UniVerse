const Event = ({event, attendEvent}) => {
  return (
    <div className='event'>
      <img src="https://picsum.photos/250/200" alt="EventImage" />
      <div className="event-info">
        <h3>{event.title}</h3>
        <h4>{event.date}</h4>
        <span>{event.description}</span>
        <button 
          onClick={() => attendEvent(event.id)} 
          className="confirm-button">
            Attend
        </button>
      </div>
    </div>
  )
}

export default Event
