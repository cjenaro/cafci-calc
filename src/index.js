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
    selectedFondos: [
      ...ctx.selectedFondos.filter((f) => f.id !== fondo.id),
      fondo,
    ],
  };
}

function setRendimiento(ctx, { data }) {
  const rendimientos = data.reduce((acc, current) => {
    const { idFondo, data: currentData } = current;
    return {
      ...acc,
      [`${currentData.desde.fecha}-${currentData.hasta.fecha}`]: {
        ...acc[`${currentData.desde.fecha}-${currentData.hasta.fecha}`],
        [idFondo]: {
          desde: currentData.desde.valor,
          hasta: currentData.hasta.valor,
          directo: currentData.directo,
          rendimiento: currentData.rendimiento,
          tna: currentData.tna,
        },
        desde: currentData.desde.fecha,
        hasta: currentData.hasta.fecha,
      },
    };
  }, {});
  return {
    ...ctx,
    rendimientos,
  };
}

function removeFondoById(ctx, { id }) {
  return {
    ...ctx,
    selectedFondos: [...ctx.selectedFondos.filter((fondo) => fondo.id !== id)],
  };
}

async function fetchAllRendimientos(ctx, { data }) {
  const objects = ctx.selectedFondos.reduce(
    (acc, fondo) => [
      ...acc,
      ...data.map((period) => ({
        idFondo: fondo.id,
        idClase: fondo.clase.id,
        from: period.from,
        to: period.to,
      })),
    ],
    []
  );

  const promises = objects.map((obj) => {
    return fetchRendimiento(obj).then((r) => ({ ...r, idFondo: obj.idFondo }));
  });

  return Promise.all(promises);
}

function setScroll(ctx) {
  document.body.style.overflow = "auto";
  return ctx;
}

const machine = createMachine(
  {
    idle: state(
      transition("select", "input", reduce(addFondo)),
      transition("remove", "input", reduce(removeFondoById)),
      transition("select-date", "loadingRendimiento", reduce(setScroll)),
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

  const compareFondos = (periods) => {
    send({ type: "select-date", data: periods });
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
              selectFondo={selectFondo}
            />
            <SearchFondo selectFondo={selectFondo} />
          </>
        )}
      </Layout>
    </>
  );
};

render(<App />, document.getElementById("app"));
