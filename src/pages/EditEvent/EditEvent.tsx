import './EditEvent.css'
import editEvent from '../../assets/editEvent.svg';
import { useState } from 'react';
import { useToast } from "../../components/hooks/use-toast";

function NewEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    photographer: '',
    photographerLink: '',
  });

  const [errors, setErrors] = useState({
    eventName: false,
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
      eventName: !formData.eventName.trim(),
      photographer: !formData.photographer.trim(),
      photographerLink: !formData.photographerLink.trim(),
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateFields()) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Preencha todos os campos.",
      });
      return;
    }
  };

  return (
    <div className='center'>
      <div>

      <h1 className='title'>Editar evento</h1>    

        <div className='square'>

          <form noValidate onSubmit={handleSubmit}>

          <label htmlFor="eventName">Nome do evento:</label>
            <input
              type="text"
              id='eventName'
              name='eventName'
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Casamento de João e Maria"
              required
              className={errors.eventName ? 'input-error' : ''}
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
