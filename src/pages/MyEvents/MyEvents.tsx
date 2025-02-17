import { useAuth } from '../../utils/authContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventsByUserIdService } from '../../services/eventService';
import Arrow from '../../assets/arrow.svg';
import Copy from '../../assets/copy.svg';

export default function MeusEventos() {
  const { getUserData } = useAuth();
  const user = getUserData() || { nome: "Usuário Desconhecido", email: "", id:""};
  const navigate = useNavigate();

  const [eventos, setEventos] = useState([]);

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
    <div className="bg-white p-6 rounded-md shadow-md mt-32 w-full max-w-4xl mx-auto">
      <div className="text-right text-gray-700 mb-4">
        <p className="font-bold">{user.name}</p>
        <p>{user.email}</p>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Meus eventos</h1>
      <button 
        onClick={() => navigate('/newEvent')}
        className="w-full bg-yellow-500 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-600"
      >
        + Criar novo evento
      </button>

      <div className="mt-6 space-y-4">
        {eventos.map((evento) => (
          <div key={evento.id} className="flex items-center bg-gray-100 p-4 rounded-md shadow">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{evento.name}</h2>
            </div>
            <div className="flex space-x-4">
              <a 
                href={`/eventview?id=${evento.id}`} 
                className="flex items-center text-yellow-500 font-medium hover:underline mr-8"
              >
                <span className='mr-4'><img src={Arrow} style={{ width: "20px", height: "auto" }}/></span> acessar página do evento
              </a>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.origin + `/eventview?id=${evento.id}`)}
                className="flex items-center text-gray-700 font-medium hover:underline"
              >
                <span className='mr-2'><img src={Copy} style={{ width: "20px", height: "auto" }}/></span> copiar link da página
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
