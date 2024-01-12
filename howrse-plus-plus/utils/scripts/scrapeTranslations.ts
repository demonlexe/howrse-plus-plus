const spanishVersion = {
  ["Disable simplified training"]: "Desactivar el entrenamiento simplificado",
  ["Disable automatic bedding"]: "Desactivar el lecho automático",
  ["Turn off simplified rides"]: "Desactivar las montas simplificadas",
  ["Coat"]: "Capa",
  ["Display coverings"]: "Mostrar las montas",
  ["too fat"]: "demasiado gorda",
  ["underweight"]: "demasiado delgada",
  ["10 days"]: "10 días",
  ["3 days"]: "3 días",
  ["Search"]: "Buscar",
  ["Difficulty"]: "Dificultad",
  ["Participants"]: "Participantes",
  ["Kitty"]: "Bote",
  ["Classical"]: "Monta Clásica",
  ["Western"]: "Monta Western",
  ["Genetic potential"]: "Potencial genético",
  ["Create Cover"]: "Crear monta",
  ["female"]: "hembra",
  ["Gender"]: "Sexo",
  ["Cover a mare"]: "Cover a mare" // TODO: Button
  //FIXME
}

const frenchVersion = {
  //FIXME
}
export function Translate(key, host) {
  const lang = host ?? window.location.host
  if (lang.match("caballow")) {
    return spanishVersion[key]
  } else if (lang.match("equidow")) {
    return frenchVersion[key]
  } else return key
}
