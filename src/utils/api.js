import { ENDPOINT_BASE } from "./constants";

export async function fetchRendimiento({ idFondo, idClase, from, to }) {
  return await fetch(
    `${ENDPOINT_BASE}/fondo/${idFondo}/clase/${idClase}/rendimiento/${from}/${to}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

export async function fetchFondo({ name }) {
  return await fetch(`${ENDPOINT_BASE}/fondo?limit=0&estado=1&nombre=${name}`)
    .then((blob) => blob.json())
    .catch((err) => console.error(err));
}

export async function fetchFondoById({ id }) {
  return await fetch(`${ENDPOINT_BASE}/fondo/${id}/clase?limit=0`)
    .then((blob) => blob.json())
    .catch((err) => console.error(err));
}
