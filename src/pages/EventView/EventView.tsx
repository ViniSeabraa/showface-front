import './EventView.css';

import ToggleShowFace from "../../components/toggle/toggle.tsx";

import UploadShowFace from '../../assets/UploadPhotos.svg';

import FindPhotosShowFace from '../../assets/FindPhotos.svg';

import DownloadShowFace from '../../assets/DownloadPhotosEvent.svg';







import React from "react";
import "./EventView.css";

const imageList = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: "../recursos/FotoDoCasamento.png",
  alt: `Foto ${i + 1}`,
}));

const EventView: React.FC = () => {
  return (
    <>

      <div className="wedding-section">
        <div className="wedding-content">
          <h1 className="wedding-title">Casamento de João e Maria</h1>
          <p className="wedding-credits">
            criado por João Pereira<br />fotos por Anderson Fotógrafo
          </p>
        </div>
      </div>

      <div className='true-container'>


      <div className="container">
        <button className="upload-btn" aria-label="Fazer upload da sua foto">
          <img src={UploadShowFace} height={500} alt="Upload Icon" />
          <div className="upload-txt">sua foto</div>
        </button>

        <button className="find-btn" aria-label="Encontrar suas fotos">
          <img src={FindPhotosShowFace} alt="Face Icon" className="icon" />
          encontrar minhas fotos!
        </button>

        <div className="description">
          Basta tirar uma selfie e nossa <b>Inteligência Artificial</b> irá buscar todas as fotos em que você aparece!
        </div>
      </div>

      <div className="contem_tudo">
        <div className="toggle-container">
        <ToggleShowFace/>
        <div className="texto_toggle">Mostrar apenas as fotos em que apareço</div>
        </div>

        <button className="download-button" aria-label="Baixar imagens">
            fazer download das imagens em que apareço
          <img src={DownloadShowFace} alt="Download Icon" />
        </button>
      </div>

      </div>

      <div className="grid-container">
        {imageList.map((image) => (
          <img key={image.id} src={image.src} alt={image.alt} />
        ))}
      </div>

      <div className="pagination">
        <span>Página:</span>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <a key={num} href="#">
            {num}
          </a>
        ))}
        <span>...</span>
      </div>
    </>
  );
};

export default EventView;

