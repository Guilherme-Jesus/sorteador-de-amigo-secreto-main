import { act, fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

describe("O Comportamento do Formulario.tsx", () => {
  test("quando o input esta vazio, novos participantes nao podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes do participantes"
    ); // Busca o input pelo seu placeholder
    const botao = screen.getByRole("button"); // Busca o botão pelo seu role
    expect(input).toBeInTheDocument(); // Verifica se o input existe
    expect(botao).toBeDisabled(); // Verifica se o botão está desabilitado
  });
  test("Adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    // Busca o input pelo seu placeholder
    const input = screen.getByPlaceholderText(
      "Insira os nomes do participantes"
    );
    // Busca o botão pelo seu role
    const botao = screen.getByRole("button");
    //inserir um valor no input
    fireEvent.change(input, { target: { value: "Ana Catarina" } });

    // clicar no botao no botao de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
    // garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });
  test("Nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes do participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    const mensagemDeErro = screen.getByRole("alert");
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos"
    );
  });
  test("A mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes do participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    fireEvent.change(input, { target: { value: "Ana Catarina" } });

    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
