import './Login.css';
import showFaceLogo from '../../assets/showfaceLogoText.svg';
import { useState } from 'react';
import { useToast } from "../../components/hooks/use-toast";

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const isLogin = window.location.href.includes('login');

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
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      confirmPassword: !formData.confirmPassword.trim(),
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

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "As senhas não coincidem.",
      });
      setErrors({
        ...errors,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    toast({
      variant: "default",
      title: "Cadastro Bem-Sucedido",
      description: `Bem-vindo, ${formData.name}!`,
    });
  };

  return (
    <div className="fullscreen center">
      <div className='mt-24 logo'>
        <img src={showFaceLogo} alt="ShowFace logo" style={{ width: "300px", height: "auto" }} />
      </div>
      <div className="login-container mt-12">
        <div className='center mt-6'>        
          <h1 className='title'>{isLogin ? 'Log-in':'Cadastro'}</h1>      
        </div>
        <form className='px-4 mt-6' noValidate onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
              className={errors.name ? 'input-error' : ''}
            />
          </>
        )}

          <label className='mt-6' htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            required
            className={errors.email ? 'input-error' : ''}
          />

          <label className='mt-6' htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
            className={errors.password ? 'input-error' : ''}
          />

          {!isLogin && (
            <>
            <label className='mt-6' htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              required
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            </>
          )}

          <button className='button mt-8 mb-8' type="submit">{isLogin ? 'Log-in':'Cadastrar'}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
