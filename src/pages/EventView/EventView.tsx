import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./EventView.css";
import UploadShowFace from "../../assets/UploadPhotos.svg";
import FindPhotosShowFace from "../../assets/FindPhotos.svg";
import ShowFaceLogo from "../../assets/showFaceLogo.svg";
import DownloadShowFace from "../../assets/DownloadPhotosEvent.svg";
import ToggleShowFace from "../../components/toggle/toggle";
import { getEventService, findService } from "../../services/eventService";
import { useToast } from "../../components/hooks/use-toast";
import { AxiosError } from "axios";

Modal.setAppElement(document.body);

interface EventImage {
  description: string;
  eventId: number;
  id: number;
  link: string;
  userId: number;
}

interface EventData {
  name: string;
  photographer: string;
  photographerLink: string;
  images: EventImage[];
  pagination: {
    page: number;
    total_pages: number;
  };
}

const EventView: React.FC = () => {
  const [imageList, setImageList] = useState<EventImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const eventId = Number(useQuery().get("id")) || 0;
  const [foundList, setFoundList] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [namePerson, setNamePerson] = useState<string>("");
  const [photographer, setPhotographer] = useState<string>("");
  const [photographerLink, setPhotographerLink] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [toggleEnabled, setToggleEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async (page = 1) => {
      try {
        const events = await getEventService(eventId, page);
        setName(events.name);
        setNamePerson(events.userName);
        setPhotographer(events.photographer);
        setPhotographerLink(events.photographerLink);
        setImageList(events.images);
        setCurrentPage(events.pagination.page);
        setTotalPages(events.pagination.total_pages);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };
    fetchImages(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const foundImageList = await findService({
        file: selfieFile,
        id: Number(eventId),
      });

      if (foundImageList.length === 0) {
        toast({
          variant: "destructive",
          title: "Nenhuma imagem encontrada!",
          description: "Por favor, tente novamente com outra foto.",
        });
        return;
      }

      setFoundList(foundImageList);

      toast({
        variant: "default",
        title: "Imagens encontradas!",
        description: "Clique nas imagens para visualizá-las.",
      });

      setToggleEnabled(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          toast({
            variant: "destructive",
            title: "Nenhuma imagem sua foi encontrada :/",
            description:
              "Entre em contato com o organizador se achar que isso é um problema.",
          });
        }
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Ocorreu um erro com o servidor",
            description: "Aguarde e tente novamente mais tarde.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelfieFile(event.target.files?.[0]);
      toast({
        title: "Arquivo Selecionado",
        description: `Arquivo: ${event.target.files?.[0]?.name || ""}`,
      });
    }
  };

  const downloadImagesAsZip = async () => {
    if (foundList.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhuma imagem encontrada!",
        description: "Por favor, encontre suas fotos antes de baixá-las.",
      });
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("fotos");

    if (!folder) return;

    const imagePromises = foundList.map(async (imageUrl, index) => {
      const fullImageUrl = `http://127.0.0.1:5000/${imageUrl}`;
      const response = await fetch(fullImageUrl);
      const blob = await response.blob();
      folder.file(`image-${index + 1}.jpg`, blob);
    });

    await Promise.all(imagePromises);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "vc-no-showface.zip");

    toast({
      title: "Download iniciado!",
      description: "Suas imagens estão sendo baixadas.",
    });
  };

  return (
    <>
      <div className={`loading-overlay ${loading ? "show" : ""}`}>
        <img src={ShowFaceLogo} className="loading-spinner" alt="Loading" />
        <p>Procurando suas fotos...</p>
      </div>
      <div
        className="wedding-section"
        style={{
          backgroundImage:
            imageList.length > 0
              ? `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(http://127.0.0.1:5000/${imageList[0].link})`
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="wedding-content">
          <h1 className="wedding-title">{name}</h1>
          <p className="wedding-credits">
            criado por {namePerson}
            <br />
            Fotografado por {photographer}
          </p>
        </div>
      </div>

      <div className="top-container">
        <div className="container">
          <label
            htmlFor="file-input"
            className="upload-button"
            aria-label="Fazer upload da sua foto"
          >
            <img src={UploadShowFace} height={500} alt="Upload Icon" />
            <div className="upload-text">sua foto</div>
          </label>
          <input
            type="file"
            id="file-input"
            data-testid="upload-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />

          <button
            className="find-button"
            aria-label="Encontrar suas fotos"
            onClick={handleSubmit}
          >
            <img src={FindPhotosShowFace} alt="Face Icon" className="icon" />
            encontrar minhas fotos!
          </button>

          <div className="description">
            Basta tirar uma selfie e nossa <b>Inteligência Artificial</b> irá
            buscar todas as fotos em que você aparece!
          </div>
        </div>

        <div className="toggle-download-container">
          <div className="toggle-container">
            <ToggleShowFace
              enabled={toggleEnabled}
              onToggle={setToggleEnabled}
              disabled={!(foundList.length > 0)}
            />
            <div className="toggle-text">
              Mostrar apenas as fotos em que apareço
            </div>
          </div>

          <button
            className="download-button"
            onClick={downloadImagesAsZip}
            aria-label="Baixar imagens"
          >
            fazer download das imagens em que apareço
            <img src={DownloadShowFace} alt="Download Icon" />
          </button>
        </div>
      </div>

      <div className="images">
        <div className="grid-container">
          {!toggleEnabled &&
            imageList.map((img, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:5000/${img.link}`}
                alt={`Imagem ${index + 1}`}
                onClick={() =>
                  setSelectedImage(`http://127.0.0.1:5000/${img.link}`)
                }
              />
            ))}
          {toggleEnabled &&
            foundList.map((img, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:5000/${img}`}
                alt={`Imagem ${index + 1}`}
                onClick={() => setSelectedImage(`http://127.0.0.1:5000/${img}`)}
              />
            ))}
        </div>
      </div>
      {!toggleEnabled &&  (
        <div className="pagination-container">
        <button
          className="pagination-button"
          id="previous"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination-button"
          id="next"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
      )}

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel="Image Modal"
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <img
          src={selectedImage || undefined}
          alt="Full-size view"
          style={{ maxWidth: "80%", maxHeight: "80vh" }}
        />
      </Modal>
    </>
  );
};

export default EventView;
