/** @jsx jsx */
import { Fragment } from "preact";
import { createMachine, invoke, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";
import { useState } from "preact/hooks";
import { css, jsx } from "@filbert-js/core";

const context = () => ({
  fondos: [],
  clases: [],
});

async function fetchFondo(_, { event }) {
  const nombre = event.target.fondo.value;
  return fetch(
    `http://api.cafci.org.ar/fondo?limit=0&estado=1&nombre=${nombre}`
  ).then((blob) => blob.json());
}

async function fetchFondoById(_, { event }) {
  const id = event.target.dataset.id;
  return {
    data: await fetch(
      `http://api.cafci.org.ar/fondo/${id}/clase?limit=0`
    ).then((blob) => blob.json()),
    id,
  };
}

const machine = createMachine(
  {
    idle: state(transition("fetch", "loading")),
    loading: invoke(
      fetchFondo,
      transition(
        "done",
        "loaded",
        reduce((ctx, { data: { data: fondos } }) => {
          return { ...ctx, fondos };
        })
      )
    ),
    loadingClases: invoke(
      fetchFondoById,
      transition(
        "done",
        "loaded",
        reduce((ctx, { data: { id, data: clases } }) => {
          return {
            ...ctx,
            clases: { ...ctx.clases, [id]: clases.data },
          };
        })
      )
    ),
    loaded: state(
      transition("fetchClases", "loadingClases"),
      transition("fetch", "loading")
    ),
  },
  context
);

const SearchFondo = () => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const { fondos, clases } = current.context;

  const handleSearchByName = async (e) => {
    e.preventDefault();
    send({ type: "fetch", event: e });
  };

  console.log(state);

  return (
    <>
      <form onSubmit={handleSearchByName}>
        <label htmlFor="fondo">Nombre:</label>
        <input type="text" name="fondo" id="fondo" />
        <button type="submit">Buscar</button>
      </form>
      <ul
        css={css`
          padding: 0;
          list-style-type: none;
        `}
      >
        {fondos.map((fondo) => (
          <li key={fondo.id}>
            {fondo.nombre}
            <button
              data-id={fondo.id}
              onClick={(e) => send({ type: "fetchClases", event: e })}
            >
              Buscar clases
            </button>
            {clases[fondo.id] && (
              <ul>
                {clases[fondo.id].map((clase) => (
                  <li key={clase.id}>{clase.nombre}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchFondo;
