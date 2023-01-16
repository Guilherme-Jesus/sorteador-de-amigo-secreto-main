import { useNavigate } from "react-router-dom";

import "./Rodape.css";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";

const Rodape = () => {
  const participantes = useListaDeParticipantes();

  const navigate = useNavigate();

  const iniciar = () => {
    navigate("/sorteio");
  };

  return (
    <footer className="rodape-configuracoes">
      <button
        className="botao"
        disabled={participantes.length < 3}
        onClick={iniciar}
      >
        Iniciar brincadeira
      </button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
};

export default Rodape;
