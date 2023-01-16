import { render, screen } from "@testing-library/react";
import Formulario from "./Formulario";

test("quando o input esta vazio, novos participantes nao podem ser adicionados", () => {
  render(<Formulario />);
  const input = screen.getByPlaceholderText("Insira os nomes do participantes"); // Busca o input pelo seu placeholder
  const botao = screen.getByRole("button"); // Busca o botão pelo seu role
  expect(input).toBeInTheDocument(); // Verifica se o input existe
  expect(botao).toBeDisabled(); // Verifica se o botão está desabilitado
});
