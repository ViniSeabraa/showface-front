import "./header.css"
import unknownUser from "../../assets/unknownUser.svg";
import showFaceLogo from "../../assets/showfaceLogoText.svg"

function Header() {
  return (
    <>
      <div className="header">
        <div><img src={showFaceLogo} alt="ShowFace logo" style={{ width: "170px", height: "auto" }} /></div>
        <div><img src={unknownUser} alt="Usuário desconhecido" style={{ width: "34px", height: "auto" }}/></div>
      </div>
    </>
  );
}

export default Header;