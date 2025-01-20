import showFaceLogoWhite from "../../assets/showFaceLogoTextWhite.svg";
import "./footer.css"

function Footer() {
    return (
      <>
        <div className="footer">
          <div><img src={showFaceLogoWhite} alt="ShowFace logo" style={{ width: "170px", height: "auto" }} /></div>
        </div>
      </>
    );
  }
  
  export default Footer;