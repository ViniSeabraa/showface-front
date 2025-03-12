import './EditEvent.css'
import editEvent from '../../assets/editEvent.svg';
import { useState, useEffect } from 'react';
import { useToast } from "../../components/hooks/use-toast";
import { editEventService, getEventService } from '../../services/eventService';
import { useLocation } from 'react-router-dom';

function EditEvent() {
  const [formData, setFormData] = useState({
    id: 1,
    name: '',
    photographer: '',
    photographerLink: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    photographer: false,
    photographerLink: false,
  });

  const { toast } = useToast();
  const location = useLocation();
  const eventId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) return;
      try {
        const event = await getEventService(Number(eventId));
        setFormData({
          id: event.id,
          name: event.name,
          photographer: event.photographer,
          photographerLink: event.photographerLink,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do evento", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateFields = () => {
    const newErrors = {
      name: !formData.name.trim(),
      photographer: !formData.photographer.trim(),
      photographerLink: !formData.photographerLink.trim(),
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateFields()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Preencha todos os campos.",
      });
      return;
    }

    try {
      await editEventService({
        id: formData.id,
        name: formData.name,
        photographer: formData.photographer,
        photographerLink: formData.photographerLink,
      });

      toast({
        variant: "default",
        title: "Edição de evento Bem-Sucedida",
        description: "Evento editado!",
      });

      window.location.href = "/myEvents";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao editar evento",
        description: "Ocorreu um erro ao editar o evento. Tente novamente mais tarde.",
      });
    }
  };

  return (
    <div className='center'>
      <div>
        <h1 className='title'>Editar evento</h1>    

        <div className='square'>
          <form noValidate onSubmit={handleSubmit}>
            <label htmlFor="name">Nome do evento:</label>
            <input
              type="text"
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder="Casamento de João e Maria"
              required
              className={errors.name ? 'input-error' : ''}
            />

            <label htmlFor="photographer">Nome do fotógrafo:</label>
            <input
              type="text"
              id='photographer'
              name='photographer'
              value={formData.photographer}
              onChange={handleChange}
              placeholder="Anderson Fotógrafo"
              required
              className={errors.photographer ? 'input-error' : ''}
            />

            <label htmlFor="photographerLink">Link do fotógrafo:</label>
            <input
              type="url"
              id='photographerLink'
              name='photographerLink'
              value={formData.photographerLink}
              onChange={handleChange}
              placeholder="www.andersonfotografia.com"
              required
              className={errors.photographerLink ? 'input-error' : ''}
            />

            <p className='mt-8' style={{fontSize: '13px', textAlign: 'center'}}>ainda não é possível editar as fotos de álbuns :(</p>

            <button className='button-confirm mt-8 mb-8' type="submit" style={{display: 'flex', justifyContent: 'center'}}>
              <img src={editEvent} alt="" style={{width: '23px'}}/>
              Editar evento
            </button>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default EditEvent;