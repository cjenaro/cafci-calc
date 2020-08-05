import { h, render, Fragment } from "preact";
import { createMachine, immediate, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";
import SearchFondo from "./components/SearchFondo";
import Layout from "./components/Layout";
import SelectedFondos from "./components/SelectedFondos";
import CompareFondos from "./components/CompareFondos";

const context = () => ({
  selectedFondos: [],
  selectedDates: {
    from: Date.now(),
    to: Date.now(),
  },
});

function addFondo(ctx, { fondo }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos, fondo],
  };
}

function selectDate(ctx, { data }) {
  return {
    ...ctx,
    selectedDates: { ...ctx.selectedDates, ...data },
  };
}

function removeFondoById(ctx, { id }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos.filter((fondo) => fondo.id !== id)],
  };
}

const machine = createMachine(
  {
    idle: state(
      transition("select", "input", reduce(addFondo)),
      transition("remove", "input", reduce(removeFondoById)),
      transition("compare", "comparing")
    ),
    input: state(immediate("idle")),
    comparing: state(
      transition("select-date", "dateInput", reduce(selectDate)),
      transition("resume", "idle")
    ),
    dateInput: state(immediate("comparing")),
  },
  context
);

const App = () => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const { selectedFondos } = current.context;

  const removeFondo = (id) => {
    send({ type: "remove", id });
  };

  const selectFondo = (fondo) => {
    send({ type: "select", fondo });
  };

  const compareFondos = () => {
    send("compare");
  };

  const goHome = () => send("resume");

  return (
    <>
      <Layout currentState={state} goHome={goHome}>
        {state === "comparing" ? (
          <CompareFondos fondos={selectedFondos} goBack={goHome} />
        ) : (
          <>
            <SelectedFondos
              compareFondos={compareFondos}
              removeFondo={removeFondo}
              fondos={selectedFondos}
            />
            <SearchFondo selectFondo={selectFondo} />
          </>
        )}
      </Layout>
    </>
  );
};

render(<App />, document.getElementById("app"));
