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

const SearchFondo = ({ selectFondo }) => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const { fondos, clases } = current.context;

  const handleSearchByName = async (e) => {
    e.preventDefault();
    send({ type: "fetch", event: e });
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSearchByName}
        css={css`
          display: grid;
          grid-template-columns: 100%;
          grid-gap: 1rem;
          font-size: 2rem;

          input {
            font-size: inherit;
            border: 4px solid #cacaca;
            transition: border-color 0.2s ease-in-out;
            background-color: #cacaca;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            outline: 0;
          }

          button {
            font-size: inherit;
            border: 4px solid #cacaca;
            background-color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
          }

          input:focus {
            border-color: #ffffff;
          }
        `}
      >
        <label htmlFor="fondo">Nombre:</label>
        <input type="text" autocomplete={false} name="fondo" id="fondo" />
        <button type="submit">Buscar</button>
      </form>
      <ul
        css={css`
          padding: 0;
          list-style-type: none;
          border: 2px solid #ffffff;
          border-radius: 0.25rem;
        `}
      >
        {fondos.map((fondo) => (
          <li
            key={fondo.id}
            css={css`
              padding: 0.5rem 1rem;
              background-color: #cacaca;
              border-bottom: 2px solid #ffffff;
              color: #222222;
            `}
          >
            <span
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              {fondo.nombre}
              <button
                data-id={fondo.id}
                onClick={(e) => send({ type: "fetchClases", event: e })}
                css={css`
                  background-color: #ffffff55;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  border: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <span
                  css={css`
                    font-size: 2rem;
                    margin-bottom: -0.5rem;
                    pointer-events: none;
                  `}
                >
                  &#9662;
                </span>
              </button>
            </span>
            {clases[fondo.id] && (
              <ul
                css={css`
                  list-style-type: none;
                  background-color: #ffffff55;
                  border-radius: 0.2rem;
                  margin: 1rem 0;
                  padding: 0.5rem;
                `}
              >
                {clases[fondo.id].map((clase) => (
                  <li
                    key={clase.id}
                    css={css`
                      padding: 0.3rem 0;
                      border-bottom: 1px solid #ffffff;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      &:last-child {
                        border-bottom: 0;
                      }
                    `}
                  >
                    {clase.nombre}
                    <button
                      onClick={() =>
                        selectFondo({ ...fondo, clase: { ...clase } })
                      }
                      css={css`
                        border-radius: 50%;
                        padding: 0;
                        height: 40px;
                        width: 40px;
                        background-color: #ffffff55;
                        border: 0;
                      `}
                    >
                      +
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFondo;
