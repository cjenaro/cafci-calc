/** @jsx jsx */
import { css, Global, jsx } from "@filbert-js/core";
import { Fragment } from "preact";

const Layout = ({ children, goHome, currentState }) => {
  return (
    <>
      <Global
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Capriola&display=swap');

          :root {
            --theme-green: #80bca3;
            --theme-ash: #655643;
            --theme-orange: #bf4d28;
            --theme-golden: #e6ac27;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background-color: #222222;
            color: #ffffff;
            font-family: Capriola, sans-serif;
          }

          button {
            cursor: pointer;
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
        {currentState !== "idle" && (
          <button
            css={css`
              border: 0;
              background-color: transparent;
              font-size: 1.25rem;
              color: currentColor;
              margin-right: 1rem;
              text-decoration: underline;
            `}
            onClick={goHome}
          >
            &larr; Atras
          </button>
        )}
        <h5
          css={css`
            font-size: 1.25rem;
          `}
        >
          Calculadora CAFCI
        </h5>
      </header>
      <main>{children}</main>
      <footer
        css={css`
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <p>Datos oficiales de CAFCI</p>
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
