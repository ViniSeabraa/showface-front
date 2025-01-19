import "./LandingPage.css"
import LandingPhotos from "../../assets/LandingPhotos.svg";

function LandingPage() {
  return (
    <div>
        <div className="first-section">
          <div className="first-section-text">
            <div>Mostre o melhor</div><div>do seu evento,</div><span><div>para cada</div>pessoa</span>
          </div>
          <div className="first-section-image">
            <img src={LandingPhotos} alt="Fotos de vários eventos diferentes"/>
          </div>
        </div>
        <div>
          oii
        </div>
        <div>
          oii
        </div>
    </div>
  );
}

export default LandingPage;