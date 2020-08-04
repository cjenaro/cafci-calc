/** @jsx jsx */
import { css, Global, jsx } from "@filbert-js/core";
import { Fragment } from "preact";

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background-color: #222222;
            color: #ffffff;
            font-family: sans-serif;
          }

          #app {
            display: grid;
            grid-template-rows: auto 1fr auto;
            min-height: 100vh;
          }
        `}
      />
      <header>CAFCI Calculator</header>
      <main>{children}</main>
      <footer>
        <p>Made by @jenaroc</p>
      </footer>
    </>
  );
};

export default Layout;
