/** @jsx jsx */
import { css, jsx, keyframes } from "@filbert-js/core";
import { Fragment } from "preact";
import { useState } from "preact/hooks";
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
  const [periods, setPeriods] = useState(1);
  const [selectedDates, setSelectedDates] = useState({});
  const state = current.name;
  const closed = state === "closed";

  const handleClick = () => {
    send("toggle");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const periodsArr = Array.from({ length: periods }).map((_, i) => ({
      from: e.target[`from_${i}`].value,
      to: e.target[`to_${i}`].value,
    }));
    compareFondos(periodsArr);
  };

  const addPeriod = () => {
    setPeriods(periods + 1);
  };

  const removePeriod = () => {
    if (periods > 0) {
      setPeriods(periods - 1);
    }
  };

  const mask = (e) => {
    const { name, value } = e.target;
    let newValue = value.replace(/[^\d]/g, "");
    let parsedValue = "";
    parsedValue = `${newValue.slice(0, 2)}`;
    if (newValue.length > 2) {
      parsedValue += `-${newValue.slice(2, 4)}`;
    }
    if (newValue.length > 4) {
      parsedValue += `-${newValue.slice(4, 8)}`;
    }
    setSelectedDates({
      ...selectedDates,
      [name]: parsedValue,
    });
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
          overflow: scroll;
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
            margin: 0 0 2rem;
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
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              grid-gap: 1rem;
              margin: 0 auto 2rem;
              max-width: calc(400px + 1rem);

              label {
                display: flex;
                flex-direction: column;
              }

              input {
                margin-top: 10px;
                border-radius: 5px;
                padding: 1rem;
              }
            `}
          >
            <label id="desde">Desde:</label>
            <label id="hasta">Hasta:</label>
            {Array.from({ length: periods }).map((_, i) => (
              <>
                <input
                  placeholder="DD-MM-AAAA"
                  aria-labelledby="desde"
                  id={`date_from_${i}`}
                  name={`from_${i}`}
                  type="text"
                  onChange={mask}
                  value={selectedDates[`from_${i}`] || ""}
                />
                <input
                  placeholder="DD-MM-AAAA"
                  aria-labelledby="hasta"
                  id={`date_to_${i}`}
                  name={`to_${i}`}
                  type="text"
                  onChange={mask}
                  value={selectedDates[`to_${i}`] || ""}
                />
              </>
            ))}
            <button
              type="button"
              onClick={removePeriod}
              css={css`
                border: 2px solid var(--theme-ash--darkest);
                color: var(--theme-ash--darkest);
                background-color: transparent;
                padding: 0.5em 1em;
                border-radius: 5px;
              `}
            >
              Quitar Periodo
            </button>
            <button
              type="button"
              onClick={addPeriod}
              css={css`
                border: 2px solid var(--theme-orange--darkest);
                color: var(--theme-ash--darkest);
                background-color: transparent;
                padding: 0.5em 1em;
                border-radius: 5px;
              `}
            >
              Agregar Periodo
            </button>
            <button
              css={css`
                border: 0;
                background-color: #f7f7f7;
                padding: 0.5em 1em;
                font-size: 1.5em;
                color: #222222;
                grid-column: -1/1;
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
