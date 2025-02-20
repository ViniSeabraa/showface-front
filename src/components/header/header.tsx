import "./header.css"
import { Link } from "react-router-dom";
import unknownUser from "../../assets/unknownUser.svg";
import showFaceLogo from "../../assets/showfaceLogoText.svg"

function Header() {
  return (
    <>
      <div className="header">
        <div>
          <Link to="/">
            <img src={showFaceLogo} alt="ShowFace logo" style={{ width: "170px", height: "auto" }} />
          </Link>
        </div>
        <div>
          <Link to="/myEvents">
            <img src={unknownUser} alt="Usuário desconhecido" style={{ width: "34px", height: "auto" }} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;