/** @jsx jsx */
import { Fragment } from "preact";
import {
  createMachine,
  invoke,
  immediate,
  reduce,
  state,
  transition,
} from "robot3";
import { useMachine } from "preact-robot";
import { useState } from "preact/hooks";
import { css, jsx } from "@filbert-js/core";
import { ENDPOINT_BASE } from "../utils/constants";
import { fetchFondo, fetchFondoById as fetchById } from "../utils/api";
import PlusButton from "./PlusButton";
import DropdownButton from "./DropdownButton";
import Spinner from "./Spinner";

const context = () => ({
  fondos: [],
  clases: [],
  hiddenClases: {},
});

function toggleHideClass(ctx, { id }) {
  return {
    ...ctx,
    hiddenClases: { ...ctx.hiddenClases, [id]: !ctx.hiddenClases[id] },
  };
}

async function fetchFondoById(_, { id }) {
  return {
    data: await fetchById({ id }),
    id,
  };
}

const machine = createMachine(
  {
    idle: state(transition("fetch", "loading")),
    loading: invoke(
      (_, { name }) => fetchFondo({ name }),
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
    input: state(immediate("loaded")),
    loaded: state(
      transition("fetchClases", "loadingClases"),
      transition("fetch", "loading"),
      transition("toggleHideClases", "input", reduce(toggleHideClass))
    ),
  },
  context
);

const SearchFondo = ({ selectFondo }) => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const { fondos, clases, hiddenClases } = current.context;

  const handleSearchByName = async (e) => {
    e.preventDefault();
    send({ type: "fetch", name: e.target.fondo.value });
  };

  const handleFetchClases = (id) => {
    const wasFetched = !!clases[id];
    if (wasFetched) {
      send({ type: "toggleHideClases", id });
    } else {
      send({ type: "fetchClases", id });
    }
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
            --border-color: var(--theme-ash);
            font-size: inherit;
            border: 4px solid var(--border-color);
            transition: border-color 0.2s ease-in-out;
            background-color: var(--theme-green);
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            outline: 0;
          }

          button {
            --border-color: var(--theme-ash);
            font-size: inherit;
            border: 4px solid var(--border-color);
            background-color: var(--theme-ash);
            color: var(--theme-green);
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            transition: border-color 0.2s ease-in-out;
          }

          button:hover {
            --border-color: var(--theme-ash--darker);
          }

          button:active {
            --border-color: var(--theme-ash--darkest);
          }

          input:focus {
            --border-color: var(--theme-ash--darker);
          }
        `}
      >
        <label htmlFor="fondo">Nombre:</label>
        <input type="text" autocomplete={false} name="fondo" id="fondo" />
        <button disabled={state === "loading"} type="submit">
                {state === "loading" ? "Cargando..." : "Buscar"}
        </button>
      </form>
      <ul
        css={css`
          padding: 0;
          list-style-type: none;
          border: 2px solid var(--theme-ash);
          border-radius: 0.25rem;
        `}
      >
        {fondos.map((fondo) => (
          <li
            key={fondo.id}
            css={css`
              padding: 0.5rem 1rem;
              background-color: var(--theme-green);
              border-bottom: 2px solid var(--theme-ash);
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
              {state === "loadingClases" ? (
                <Spinner />
              ) : (
                <DropdownButton
                  upwards={!hiddenClases[fondo.id] && !!clases[fondo.id]}
                  onClick={() => handleFetchClases(fondo.id)}
                />
              )}
            </span>
            {!hiddenClases[fondo.id] && clases[fondo.id] && (
              <ul
                css={css`
                  list-style-type: none;
                  background-color: var(--theme-green--darker);
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
                      border-bottom: 1px solid var(--theme-ash--darker);
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      &:last-child {
                        border-bottom: 0;
                      }
                    `}
                  >
                    {clase.nombre}
                    <PlusButton
                      onClick={() =>
                        selectFondo({ ...fondo, clase: { ...clase } })
                      }
                    />
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
