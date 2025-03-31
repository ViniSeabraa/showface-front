import { useAuth } from "../../utils/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventsByUserIdService } from "../../services/eventService";
import Arrow from "../../assets/arrow.svg";
import Copy from "../../assets/copy.svg";
import Plus from "../../assets/plus.svg";
import Edit from "../../assets/editEvent.svg"
import "./MyEvents.css";

export default function MyEvents() {
  const { getUserData } = useAuth();
  const user = getUserData() || {
    name: "Usuário Desconhecido",
    email: "",
    id: "",
  };
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user.id) return;
      try {
        const events = await getEventsByUserIdService(user.id);
        setEventos(events.events || []);
      } catch (error) {
        console.error("Erro ao buscar eventos", error);
      }
    };

    fetchUserEvents();
  }, [user.id]);

  return (
    <div className="father-container">
      <div className="top-infos mb-8">
        <h1 className="title">Meus eventos</h1>
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <button
        onClick={() => navigate("/newEvent")}
        className="button-create mb-8 py-3"
      >
        <img src={Plus} className="icon" alt="Criar" />
        Criar novo evento
      </button>

      <div className="event-list">
        {eventos.map((evento) => (
          <div key={evento.id} className="event-card">
            <h2 className="event-title">{evento.name}</h2>
            <div className="event-actions">
              <a
                href={`/eventview?id=${evento.id}`}
                className="event-link mr-10"
              >
                <img src={Arrow} className="icon" alt="Acessar" />
                Acessar página do evento
              </a>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    window.location.origin + `/eventview?id=${evento.id}`
                  )
                }
                className="copy-button"
              >
                <img src={Copy} className="icon" alt="Copiar" />
                Copiar link da página
              </button>
              <a href={`/editEvent?id=${evento.id}`} className="copy-button">
                <img src={Edit} className="icon" alt="Editar" />
                Editar evento
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
