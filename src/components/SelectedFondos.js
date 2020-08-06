/** @jsx jsx */
import { css, jsx, keyframes } from "@filbert-js/core";
import { Fragment } from "preact";
import { createMachine, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";
import MinusButton from "./MinusButton";
import DropdownButton from "./DropdownButton";

const wiggle = keyframes`
  50% {
    right: 0rem;
  }
`;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to } = e.target;
    compareFondos({ from: from.value, to: to.value });
  };

  return (
    <>
      <button
        key={`open-${fondos.length}`}
        onClick={handleClick}
        css={css`
          position: fixed;
          z-index: 3;
          border-radius: 2rem 0 0 2rem;
          border: 1px solid var(--theme-green);
          box-shadow: 0px 0px 5px var(--theme-green-darkest);
          padding: 0.5em 2em 0.5em 0.5em;
          font-size: 1.25rem;
          top: 3rem;
          right: -1.5em;
          animation: ${wiggle} 0.4s ease-in-out;
        `}
      >
        {closed ? <>&larr;</> : <>&rarr;</>}
      </button>
      <div
        css={css`
          display: grid;
          margin: 0 auto;
          z-index: 2;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr auto;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          transform: translateX(${closed ? "100%" : "0"});
          box-shadow: 0px 0px 10px #00000033;
          transition: transform 0.5s ease-in-out;
          background-color: var(--theme-orange);
        `}
      >
        <ul
          css={css`
            list-style-type: none;
            margin: 0;
            padding: 0;
          `}
        >
          {fondos.map((fondo) => (
            <li
              key={fondo.clase.id}
              css={css`
                padding: 0.5em;
                background-color: var(--theme-orange--darker);
                border: 1px solid var(--theme-orange--darkest);
                color: #000000;
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <p>{fondo.clase.nombre}</p>
              <MinusButton onClick={() => removeFondo(fondo.id)} />
            </li>
          ))}
        </ul>
        <div className="container">
          <form
            onSubmit={handleSubmit}
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
              grid-gap: 1rem;

              label {
                display: flex;
                flex-direction: column;

                input {
                  margin-top: 10px;
                  border-radius: 5px;
                  padding: 1rem;
                }
              }

              button {
                padding: 0.5rem 1rem;
                border: 1px solid #fafafa;
                font-weight: bold;
                font-size: 1.5rem;
                grid-column: -1/1;
              }
            `}
          >
            <label htmlFor="date_from">
              Desde:
              <input id="date_from" name="from" type="date" />
            </label>
            <label htmlFor="date_to">
              Hasta:
              <input id="date_to" name="to" type="date" />
            </label>
            <button
              css={css`
                border: 0;
                background-color: #f7f7f7;
                padding: 0.5em 1em;
                font-size: 1.5em;
                color: #222222;
              `}
              type="submit"
            >
              Comparar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SelectedFondos;
