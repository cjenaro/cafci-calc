/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import { Fragment } from "preact";
import { createMachine, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";

const context = () => ({});

const machine = createMachine(
  {
    closed: state(transition("toggle", "open")),
    open: state(transition("toggle", "closed")),
  },
  context
);

const SelectedFondos = ({ fondos = [], removeFondo }) => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const closed = state === "closed";

  const handleClick = () => {
    send("toggle");
  };
  if (!fondos || !fondos.length) return null;
  return (
    <div
      css={css`
        display: grid;
        margin: 0 auto;
        grid-tempalte-columns: 1fr;
        max-width: 300px;
        position: sticky;
        top: 2em;
        box-shadow: 0px 0px 10px #00000033;
      `}
    >
      <ul
        style={!closed && { maxHeight: "200vh" }}
        css={css`
          list-style-type: none;
          margin: 0;
          padding: 0;
          max-height: 0px;
          transition: max-height 0.2s ease-in-out;
          overflow: hidden;
        `}
      >
        {fondos.map((fondo) => (
          <li
            key={fondo.clase.id}
            css={css`
              padding: 0.5em;
              background-color: #cacaca;
              border: 1px solid #f7f7f7;
              color: #222222;
              display: flex;
              align-items: center;
              justify-content: space-between;

              &:first-of-type {
                border-radius: 0.25em 0.25em 0 0;
              }
            `}
          >
            <p>{fondo.clase.nombre}</p>
            <button
              onClick={() => removeFondo(fondo.id)}
              css={css`
                height: 40px;
                width: 40px;
                border: 0;
                border-radius: 50%;
                background-color: #ffffff55;
              `}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <div
        css={css`
          display: flex;
          align-items: center;
          border-radius: 0 0 0.25em 0.25em;
        `}
      >
        <button
          css={css`
            border: 0;
            background-color: #f7f7f7;
            border-radius: 0 0 0 0.25em;
            padding: 0.5em 1em;
            font-size: 1.5em;
            color: #222222;
            width: 80%;
          `}
        >
          Comparar
        </button>
        <button
          css={css`
            width: 20%;
            border-radius: 0 0 0.25em 0;
            background-color: #fafafa;
            padding: 0.25em 1em;
            font-size: 1.5em;
            border: 0;

            span {
              display: block;
              transition: transform 0.2s ease-in-out;
              transform: rotate(180deg);
            }

            span.downwards {
              transform: rotate(0);
            }
          `}
          onClick={handleClick}
        >
          <span className={!closed ? "upwards" : "downwards"}>&#9662;</span>
        </button>
      </div>
    </div>
  );
};

export default SelectedFondos;
