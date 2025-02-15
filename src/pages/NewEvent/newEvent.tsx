import './newEvent.css';
import AlbumUpload from '../../assets/AlbumUpload.svg';
import { useState } from 'react';
import { useToast } from "../../components/hooks/use-toast";
import { createEventService } from '../../services/eventService';


function NewEvent() {
  const [formData, setFormData] = useState({
    name: '',
    photographer: '',
    photographerLink: '',
    userId: 1,
    userName: ''
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

    // retorno da função não é necessário por enquanto
    const data = await createEventService({
      name: formData.name,
      photographer: formData.photographer, photographerLink: formData.photographerLink,
      userId: formData.userId, userName: formData.userName,
    });



    toast({
      variant: "default",
      title: "Criação de evento Bem-Sucedida",
      description: "Evento criado!",
    });

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      toast({
        title: "Arquivo Selecionado",
        description: `Arquivo: ${event.target.files[0].name}`,
      });
    }
  };

  return (
    <div className='center'>
      <div>
        <h1 className='title'>Criar evento</h1>    

        <div className='square'>
          <form noValidate onSubmit={handleSubmit}>
            <label htmlFor="name">Nome do evento:</label>
            <input
              type="text"
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder="Meu evento"
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
              placeholder="Fotógrafo X"
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
              placeholder="www.fotografoX.com"
              required
              className={errors.photographerLink ? 'input-error' : ''}
            />

            <div className='mt-6' id="albumUpload" onClick={() => document.getElementById('file-input')?.click()}>
              <img src={AlbumUpload} alt="Album Upload button"/>
              <p style={{fontSize: '13px', textAlign: 'right'}}>Mande todas as fotos do seu álbum em algum arquivo .zip (compactado)</p>
            </div>
            <input 
              type="file" 
              id="file-input" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />

            <button className='button-confirm mt-8 mb-8' type="submit">+ Criar Evento</button>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default NewEvent;
