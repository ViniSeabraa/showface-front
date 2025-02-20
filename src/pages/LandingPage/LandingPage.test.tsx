import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LandingPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders main sections and buttons", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mostre o melhor/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crie uma conta no ShowFace/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Já tenho uma conta/i })).toBeInTheDocument();
  });

  it("navigates when buttons are clicked", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Crie uma conta no ShowFace/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/cadastro");

    fireEvent.click(screen.getByRole("button", { name: /Já tenho uma conta/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
