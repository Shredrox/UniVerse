import UniVerseLogo from '../assets/images/logo-universe.png'
import AccessForm from '../components/AccessForm'

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='landing-logo-container'>
        <img src={UniVerseLogo} alt="UniVerseLogo" />
        UniVerse
        <span className='landing-subtitle'>Connecting Minds, Building Futures</span>
      </div>
      <AccessForm/>
    </div>
  )
}

export default Landing
