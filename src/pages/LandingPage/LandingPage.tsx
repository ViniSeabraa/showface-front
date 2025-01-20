import "./LandingPage.css"
import LandingPhotos from "../../assets/LandingPhotos.svg";
import Upload from "../../assets/upload.svg"
import Share from "../../assets/share.svg"
import FaceVerification from "../../assets/faceVerification.svg"
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div>
        <div className="first-section">
          <div className="first-section-text bold">
            <div>Mostre o melhor</div><div>do seu evento,</div><span><div>para cada</div>pessoa</span>
          </div>
          <div className="first-section-image">
            <img src={LandingPhotos} alt="Fotos de vários eventos diferentes"/>
          </div>
        </div>
        <div className="second-section bold">
          <div className="text-icon">
            <div><img src={Upload} style={{ width: "55px", height: "auto" }} alt="Upload icon"/></div>
            <div className="mt-8">
              <div>Faça upload</div> 
              <div>do seu álbum</div>
              <div>em nossa</div> 
              <div>plataforma</div>
            </div>
          </div>
          <div className="text-icon">
            <div><img src={Share} style={{ width: "55px", height: "auto" }} alt="Share icon"/></div>
            <div className="mt-8">
              <div>Compartilhe</div>
              <div>seu álbum</div>  
              <div>com seus</div>
              <div>convidados</div>
          </div>
          </div>
          <div className="text-icon">
            <div><img src={FaceVerification} style={{ width: "55px", height: "auto" }} alt="Face Verification icon"/></div>
            <div className="mt-8">
              <div>Cada pessoa</div> 
              <div>pode encontrar</div> 
              <div>as <span className="underline">suas</span></div> 
              <div><span className="underline">melhores fotos</span></div></div>
          </div>
        </div>
        <div className="third-section">
          <div className="third-content bold">
            <div>Suba seu álbum e agregue</div>
            <div>valor ao seu evento</div>
            <button onClick={() => navigate("/cadastro")} className="button mt-8">Crie uma conta no ShowFace</button>
            <div><button onClick={() => navigate("/login")} className="button black">Já tenho uma conta</button></div>
          </div>
        </div>
    </div>
  );
}

export default LandingPage;