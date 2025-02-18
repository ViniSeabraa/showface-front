import './EventView.css';
import UploadShowFace from '../../assets/UploadPhotos.svg';
import FindPhotosShowFace from '../../assets/FindPhotos.svg';
import DownloadShowFace from '../../assets/DownloadPhotosEvent.svg';
import ToggleShowFace from "../../components/toggle/toggle.tsx";
import React from "react";
import { getEventsByUserIdService } from "../../services/eventService.tsx";
import { useEffect, useState } from "react";


const EventView: React.FC = () => {
  
  
  const [imageList, setImageList] = useState<string[]>([]);
  const [namePerson, setnamePerson] = useState<string>('');
  const [photographer, setPhotographer] = useState<string>('');
  useEffect(() => {
    const fetchImages = async () => {
      const {Events} = await getEventsByUserIdService('1');
      try {
        const nome: string = Events.name;
        const fotografo: string= Events.photograpehr;

        setnamePerson(nome);

        setPhotographer(fotografo);

        const images: string[] = Events.images; // Supondo que retorna apenas um array de URLs
        setImageList(images);
      } 
      catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    if (true) {  // atualizar condição
      fetchImages();
    }
  }, []);

  return (
<>

<div className="wedding-section">
  <div className="wedding-image">
    <img src={imageList[0]} alt="Imagem do evento" />
  </div>
  <div className="wedding-content">
  
    <h1 className="wedding-title">{namePerson}</h1>
    <p className="wedding-credits">
      criado por João Pereira<br />
      Fotografado por
      {photographer}
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
      <ToggleShowFace />
      <div className="texto_toggle">Mostrar apenas as fotos em que apareço</div>
    </div>

    <button className="download-button" aria-label="Baixar imagens">
      fazer download das imagens em que apareço
      <img src={DownloadShowFace} alt="Download Icon" />
    </button>
  </div>

</div>

<div className="grid-container">
{imageList.map((src, index) => (
  <img key={index} src={src} alt={`Imagem ${index + 1}`} />
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

//Metodo GetService para buscar as fotos do evento