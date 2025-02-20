import { render, screen, fireEvent } from '@testing-library/react';
import NewEvent from './newEvent';
import '@testing-library/jest-dom';

jest.mock('../../components/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

jest.mock('../../utils/authContext', () => ({
  useAuth: () => ({ getUserData: () => ({ nome: 'Test User', email: 'test@example.com', id: '123' }) }),
}));

describe('NewEvent Component', () => {
  test('renders the NewEvent form correctly', () => {
    render(<NewEvent />);

    expect(screen.getByText('Criar evento')).toBeInTheDocument();

    expect(screen.getByLabelText('Nome do evento:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do fotógrafo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Link do fotógrafo:')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '+ Criar Evento' })).toBeInTheDocument();
  });

  test('allows user to type into form fields', () => {
    render(<NewEvent />);

    const nameInput = screen.getByLabelText('Nome do evento:');
    const photographerInput = screen.getByLabelText('Nome do fotógrafo:');
    const photographerLinkInput = screen.getByLabelText('Link do fotógrafo:');

    fireEvent.change(nameInput, { target: { value: 'Evento Teste' } });
    fireEvent.change(photographerInput, { target: { value: 'Fotógrafo X' } });
    fireEvent.change(photographerLinkInput, { target: { value: 'www.fotografoX.com' } });

    expect(nameInput).toHaveValue('Evento Teste');
    expect(photographerInput).toHaveValue('Fotógrafo X');
    expect(photographerLinkInput).toHaveValue('www.fotografoX.com');
  });
});