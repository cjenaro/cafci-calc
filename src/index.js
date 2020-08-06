import { h, render, Fragment } from "preact";
import {
  createMachine,
  immediate,
  reduce,
  invoke,
  state,
  transition,
} from "robot3";
import { useMachine } from "preact-robot";
import SearchFondo from "./components/SearchFondo";
import Layout from "./components/Layout";
import SelectedFondos from "./components/SelectedFondos";
import CompareFondos from "./components/CompareFondos";
import { fetchRendimiento } from "./utils/api";

const context = () => ({
  selectedFondos: [],
  rendimienos: [],
});

function addFondo(ctx, { fondo }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos, fondo],
  };
}

function setRendimiento(ctx, data) {
  return {
    ...ctx,
    rendimientos: { ...data },
  };
}

function removeFondoById(ctx, { id }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos.filter((fondo) => fondo.id !== id)],
  };
}

async function fetchAllRendimientos(ctx, { data: { from, to } }) {
  const promises = ctx.selectedFondos.map((fondo) => {
    return fetchRendimiento({
      idFondo: fondo.id,
      idClase: fondo.clase.id,
      from,
      to,
    });
  });
  return Promise.all(promises);
}

const machine = createMachine(
  {
    idle: state(
      transition("select", "input", reduce(addFondo)),
      transition("remove", "input", reduce(removeFondoById)),
      transition("select-date", "loadingRendimiento"),
      transition("compare", "comparing")
    ),
    input: state(immediate("idle")),
    comparing: state(transition("resume", "idle")),
    loadingRendimiento: invoke(
      fetchAllRendimientos,
      transition("done", "comparing", reduce(setRendimiento))
    ),
  },
  context
);

const App = () => {
  const [current, send] = useMachine(machine);
  const state = current.name;
  const { selectedFondos, rendimientos } = current.context;

  const removeFondo = (id) => {
    send({ type: "remove", id });
  };

  const selectFondo = (fondo) => {
    send({ type: "select", fondo });
  };

  const compareFondos = ({ from, to }) => {
    console.log(from, to);
    send({ type: "select-date", data: { from, to } });
  };

  const goHome = () => send("resume");

  return (
    <>
      <Layout currentState={state} goHome={goHome}>
        {state === "comparing" ? (
          <CompareFondos
            rendimientos={rendimientos}
            fondos={selectedFondos}
            goBack={goHome}
          />
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
