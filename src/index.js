import { h, render, Fragment } from "preact";
import { createMachine, immediate, reduce, state, transition } from "robot3";
import { useMachine } from "preact-robot";
import SearchFondo from "./components/SearchFondo";
import Layout from "./components/Layout";
import SelectedFondos from "./components/SelectedFondos";

const context = () => ({
  selectedFondos: [],
});

function addFondo(ctx, { fondo }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos, fondo],
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
      transition("remove", "input", reduce(removeFondoById))
    ),
    input: state(immediate("idle")),
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

  return (
    <>
      <Layout>
        <SelectedFondos removeFondo={removeFondo} fondos={selectedFondos} />
        <SearchFondo selectFondo={selectFondo} />
      </Layout>
    </>
  );
};

render(<App />, document.getElementById("app"));
