import './EditEvent.css'
import editEvent from '../../assets/editEvent.svg';
import { useState } from 'react';
import { useToast } from "../../components/hooks/use-toast";
import { editEventService } from '../../services/eventService';


function NewEvent() {
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

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    if (validateFields()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Preencha todos os campos.",
      });
      return;
    }

    // retorno da função não é necessário por enquanto
    const data = await editEventService({
      name: formData.name,
      photographer: formData.photographer, photographerLink: formData.photographerLink,
      id: formData.id
    });



    toast({
      variant: "default",
      title: "Edição de evento Bem-Sucedida",
      description: "Evento editado!",
    });
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

          <label>Nome do fotógrafo:</label>
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

          <label>Link do fotógrafo:</label>
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

export default NewEvent;
