import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Sorteio from "./Sorteio";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio";

jest.mock("../../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../../state/hooks/useResultadoDoSorteio", () => {
  return {
    useResultadoDoSorteio: jest.fn(),
  };
});

describe("Na pagina de sorteio", () => {
  const participantes = ["Ana Catarina", "João", "Maria"];

  const resultado = new Map<string, string>([
    ["Ana Catarina", "João"],
    ["João", "Maria"],
    ["Maria", "Ana Catarina"],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test("Todos os participantes podem exibir seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole("option");

    expect(opcoes).toHaveLength(participantes.length);
  });
  test("O amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );
    const select = screen.getByPlaceholderText("Selecione o seu nome");
    fireEvent.change(select, { target: { value: participantes[0] } });
    const botao = screen.getByRole("button");
    fireEvent.click(botao);
    const amigoSecreto = screen.getByRole("alert");
    expect(amigoSecreto).toBeInTheDocument();
  });
});
