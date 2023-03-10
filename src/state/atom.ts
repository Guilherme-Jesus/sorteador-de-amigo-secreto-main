import { atom } from "recoil";

export const listaDePartipantesState = atom<string[]>({
  key: "listaDePartipantesState",
  default: [],
});
export const errorState = atom<string>({
  key: "errorState",
  default: "",
});
export const resultadoDoAmigoSecreto = atom<Map<string, string>>({
  key: "resultadoDoAmigoSecreto",
  default: new Map(),
});
