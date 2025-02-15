import LandingPhotos from "../../assets/LandingPhotos.svg";
import Upload from "../../assets/upload.svg"
import Share from "../../assets/share.svg"
import FaceVerification from "../../assets/faceVerification.svg"

import "./MyEvents.css"
import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate = useNavigate();

  return (

    <div className="center">

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <h1 style={{justifyContent:"left"}} className="title">Meus eventos</h1>
            <div style={{justifyContent: "right"}}>
            <p>fábio de lima ferreira papais / flfp@ccin.ufpbr</p>
            </div>
        </div>


        <div style={{}}>
            <button className='button-confirm mt-8 mb-8'>+ Criar Evento</button>
        </div>

        <div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly", height: "100px"}}>
            <img src="https://ps.w.org/tiny-compress-images/assets/icon-256x256.png?rev=1088385"/>
            <p>porrada no urso</p>
            <a href="http://#">acessar página do evento</a>
            <button>copiar link da pagina</button>

        </div>

    </div>
  );
}

export default LandingPage;