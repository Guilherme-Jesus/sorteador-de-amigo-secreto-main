import { useState } from "react";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";

const Sorteio = () => {
  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState<string>("");
  const [amigoSecreto, setAmigoSecreto] = useState<string>("");
  const resultado = useResultadoDoSorteio();

  const sortear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez as string) as string);
    }
  };

  return (
    <section>
      <form onSubmit={sortear}>
        <select
          value={participanteDaVez}
          onChange={(e) => setParticipanteDaVez(e.target.value)}
          required
          placeholder="Selecione o seu nome"
          name="participanteDaVez"
          id="participanteDaVez"
        >
          {participantes.map((participante) => (
            <option key={participante}>{participante}</option>
          ))}
        </select>
        <button>Sortear</button>
      </form>
      {amigoSecreto && (
        <p role={"alert"}>Seu amigo secreto é: {amigoSecreto}</p>
      )}
    </section>
  );
};

export default Sorteio;
