import { h, render, Fragment } from "preact";
import SearchFondo from "./components/SearchFondo";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <Layout>
        <SearchFondo />
      </Layout>
    </>
  );
};

render(<App />, document.getElementById("app"));
