const TrendingEvent = ({event}) => {
  return (
    <div className='trending-event'>
        <img src="https://picsum.photos/200/100" alt="EventImage" />
        <h3>{event.title}</h3>
    </div>
  )
}

export default TrendingEvent
