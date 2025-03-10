import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EventView from "./EventView";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("../../services/eventService", () => ({
  getEventService: jest.fn().mockResolvedValue({
    name: "Evento de Casamento",
    userName: "Maria Irene",
    photographer: "Carlos Silva",
    photographerLink: "http://link-do-fotografo.com",
    images: [{ link: "imagem1.jpg" }],
  }),
  findService: jest.fn().mockResolvedValue([]),
}));

describe("EventView", () => {
  test("Deve renderizar a tela do evento corretamente", async () => {
    render(
      <MemoryRouter initialEntries={["/event?id=1"]}>
        <EventView />
      </MemoryRouter>
    );

    expect(await screen.findByText("Evento de Casamento")).toBeInTheDocument();
    expect(screen.getByText(/criado por.*Maria Irene/)).toBeInTheDocument();
    expect(screen.getByText(/Fotografado por.*Carlos Silva/)).toBeInTheDocument();
    expect(screen.getByText("encontrar minhas fotos!")).toBeInTheDocument();
  });

  test("Deve simular upload de foto e disparar a busca", async () => {
    render(
      <MemoryRouter initialEntries={["/event?id=1"]}>
        <EventView />
      </MemoryRouter>
    );

    const fileInput = screen.getByTestId("upload-input");
    const file = new File(["selfie"], "selfie.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText("sua foto")).toBeInTheDocument();

    const findButton = screen.getByText("encontrar minhas fotos!");
    fireEvent.click(findButton);

    await waitFor(() => {
      expect(screen.getByText("encontrar minhas fotos!")).toBeInTheDocument();
    });
  });
});
