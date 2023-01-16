import { useRecoilValue, useSetRecoilState } from "recoil";
import { errorState, listaDePartipantesState } from "../atom";

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaDePartipantesState);
  const list = useRecoilValue(listaDePartipantesState);
  const setErro = useSetRecoilState(errorState);
  return (nome: string) => {
    if (list.includes(nome)) {
      setErro("Nomes duplicados não são permitidos");
      setTimeout(() => {
        setErro("");
      }, 5000);
      return;
    }
    return setLista((lista) => [...lista, nome]);
  };
};
