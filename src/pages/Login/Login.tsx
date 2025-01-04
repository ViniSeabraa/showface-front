import './Login.css'
import showFaceLogo from '../../assets/showfaceLogoText.svg'

function App() {

  return (
    <div className='fullscreen' >
      <div>
        <img src={showFaceLogo} alt="ShowFace logo"/>
      </div>
      <div className='login-container'>
        <div>Cadastro</div>
      </div>
    </div>
  )
}

export default App
