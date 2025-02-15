import './Login.css';
import showFaceLogo from '../../assets/showfaceLogoText.svg';
import { useState } from 'react';
import { useToast } from "../../components/hooks/use-toast";
import { loginService, registerService } from '../../services/authService';
import { useAuth } from '../../utils/authContext';
import { AxiosError } from 'axios';

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

  const { login } = useAuth();

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
      name: !isLogin && !formData.name.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      confirmPassword: !isLogin && !formData.confirmPassword.trim(),
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

    if (!isLogin && formData.password !== formData.confirmPassword) {
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

    try {
      if (isLogin) {
        const data = await loginService({ email: formData.email, password: formData.password });
        login(data.user, data.token);
        toast({
          variant: "default",
          title: "Login Bem-Sucedido",
          description: "Bem-vindo de volta!",
        });
      } else {
        const data = await registerService({ name: formData.name, email: formData.email, password: formData.password });
        login(data.user , data.token);
        toast({
          variant: "default",
          title: "Cadastro Bem-Sucedido",
          description: `Bem-vindo, ${formData.name}!`,
        });
      }
      window.location.href = "/"; //colocar pra onde vai após login/cadastro, que seria "meus eventos"
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Erro de Cadastro",
            description: "O e-mail já está em uso. Por favor, utilize outro.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erro",
            description: error.response.data?.message || "Ocorreu um erro.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Ocorreu um erro inesperado.",
        });
      }
    }
  };

  return (
    <div className="fullscreen center">
      <div className='logo'>
        <img src={showFaceLogo} alt="ShowFace logo" style={{ width: "300px", height: "auto" }}/>
      </div>
      <div className="login-container center mt-12">
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

          <button className='button-confirm mt-8' type="submit">{isLogin ? 'Log-in':'Cadastrar'}</button>
        </form>
        <button className='button-redirect mt-4 mb-4' onClick={() => window.location.href = isLogin ? "/cadastro" : "/login"}>{isLogin? "Ainda não tenho uma conta" : "Já tenho uma conta"}</button>
      </div>
    </div>
  );
}

export default Login;
