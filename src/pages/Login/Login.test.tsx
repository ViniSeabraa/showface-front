/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../utils/authContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('../../services/authService', () => ({
  loginService: jest.fn().mockResolvedValue({
    user: { name: 'Test User', email: 'test@example.com' },
    token: 'test-token',
  }),
  registerService: jest.fn().mockResolvedValue({
    user: { name: 'Test User', email: 'test@example.com' },
    token: 'test-token',
  }),
}));

describe('Login Component', () => {
  it('should render login form when the URL includes "login"', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Log-in')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(screen.getByText('Log-in')).toBeInTheDocument();
  });

  it('should render registration form when the URL includes "cadastro"', () => {
    render(
      <MemoryRouter initialEntries={['/cadastro']}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Cadastro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirme sua senha')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  it('should handle form submission correctly for login', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Log-in'));

    const { loginService } = require('../../services/authService'); 
    expect(loginService).toHaveBeenCalled();
  });

  it('should handle form submission correctly for registration', async () => {
    render(
      <MemoryRouter initialEntries={['/cadastro']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), { target: { value: 'teste' } });
    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirme sua senha'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Cadastrar'));

    const { registerService } = require('../../services/authService'); 
    expect(registerService).toHaveBeenCalled();
  });
});
