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

          .container {
            padding: 0 20px;
            width: 900px;
            max-width: 100vw;
            margin: 0 auto;
          }
        `}
      />
      <header
        css={css`
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
        `}
      >
        <h5>CAFCI Calculator</h5>
      </header>
      <main>{children}</main>
      <footer
        css={css`
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <p>
          Made by{" "}
          <a
            href="https://twitter.com/JenaroC"
            target="_blank"
            css={css`
              color: currentColor;
            `}
          >
            @jenaroc
          </a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
