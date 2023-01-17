import shuffle from "just-shuffle";

export const realizarSorteio = (participantes: string[]) => {
  const totalDeParticipantes = participantes.length;
  const embaralhado = shuffle(participantes);
  const resultado = new Map<string, string>();

  for (let i = 0; i < totalDeParticipantes; i++) {
    const indexAmigo = i === totalDeParticipantes - 1 ? 0 : i + 1;
    resultado.set(embaralhado[i], embaralhado[indexAmigo]);
  }
  return resultado;
};
