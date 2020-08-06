/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import { Fragment } from "preact";
import { createMachine, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";
import MinusButton from "./MinusButton";
import DropdownButton from "./DropdownButton";

const context = () => ({});

const machine = createMachine(
  {
    closed: state(transition("toggle", "open")),
    open: state(transition("toggle", "closed")),
  },
  context
);

const SelectedFondos = ({ fondos = [], removeFondo, compareFondos }) => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const closed = state === "closed";

  const handleClick = () => {
    send("toggle");
  };

  return (
    <>
      <button
        onClick={handleClick}
        css={css`
          position: fixed;
          z-index: 2;
          border-radius: 2rem 0 0 2rem;
          border: 1px solid var(--theme-green);
          box-shadow: 0px 0px 5px var(--theme-green-darkest);
          padding: 0.5em;
          font-size: 1.25rem;
          top: 3rem;
          right: 0;
        `}
      >
        {closed ? <>&larr;</> : <>&rarr;</>}
      </button>
      <div
        css={css`
          display: grid;
          margin: 0 auto;
          grid-template-columns: 1fr;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          transform: translateX(${closed ? "100%" : "0"});
          box-shadow: 0px 0px 10px #00000033;
          transition: transform 0.5s ease-in-out;
        `}
      >
        <ul
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
              <MinusButton onClick={() => removeFondo(fondo.id)} />
            </li>
          ))}
        </ul>
        <button
          css={css`
            border: 0;
            background-color: #f7f7f7;
            border-radius: 0 0 0 0.25em;
            padding: 0.5em 1em;
            font-size: 1.5em;
            color: #222222;
          `}
          onClick={compareFondos}
        >
          Comparar
        </button>
      </div>
    </>
  );
};

export default SelectedFondos;
