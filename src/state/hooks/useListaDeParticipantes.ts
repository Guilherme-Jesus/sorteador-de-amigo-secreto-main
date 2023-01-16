import { listaDePartipantesState } from "./../atom";
import { useRecoilValue } from "recoil";
export const useListaDeParticipantes = () => {
  return useRecoilValue(listaDePartipantesState);
};
