const TrendingEvent = ({event, attendEvent}) => {
  return (
    <div className='trending-event' >
      <img src="https://picsum.photos/200/100" alt="EventImage" />
      <h3>{event.title}</h3>
      <button 
        onClick={() => attendEvent(event.id)} 
        className="confirm-button">
          Attend
      </button>
    </div>
  )
}

export default TrendingEvent
