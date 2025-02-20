import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyEvents from './MyEvents';
import { useAuth } from '../../utils/authContext';
import { getEventsByUserIdService } from '../../services/eventService';
import '@testing-library/jest-dom';

jest.mock('../../utils/authContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../services/eventService', () => ({
  getEventsByUserIdService: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Componente MyEvents', () => {
  const mockGetUserData = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      getUserData: mockGetUserData,
    });

    mockGetUserData.mockReturnValue({
      id: '123',
      name: 'Usuário Teste',
      email: 'teste@teste.com',
    });

    (getEventsByUserIdService as jest.Mock).mockResolvedValue({
      events: [
        { id: '1', name: 'Evento Teste 1' },
        { id: '2', name: 'Evento Teste 2' },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValueOnce(undefined),
      },
      configurable: true,
    });
  });

  it('renderiza os dados do usuário e a lista de eventos', async () => {
    render(
      <Router>
        <MyEvents />
      </Router>
    );

    expect(screen.getByText('Usuário Teste')).toBeInTheDocument();
    expect(screen.getByText('teste@teste.com')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Evento Teste 1')).toBeInTheDocument();
      expect(screen.getByText('Evento Teste 2')).toBeInTheDocument();
    });
  });

  it('navega para a página de criação de novo evento ao clicar no botão "Criar novo evento"', () => {
    render(
      <Router>
        <MyEvents />
      </Router>
    );

    fireEvent.click(screen.getByText('Criar novo evento'));

    expect(mockNavigate).toHaveBeenCalledWith('/newEvent');
  });

  it('copia o link do evento para a área de transferência ao clicar no botão "copiar link da página"', async () => {
    render(
      <Router>
        <MyEvents />
      </Router>
    );

    const copyButton = screen.getAllByAltText('Copiar')[0];
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `${window.location.origin}/eventview?id=1`
      );
    });
  });
});
