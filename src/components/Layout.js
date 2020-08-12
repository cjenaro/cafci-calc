/** @jsx jsx */
import { css, Global, jsx } from "@filbert-js/core";
import { Fragment } from "preact";
import FullPageSpinner from './FullPageSpinner'

const Layout = ({ children, goHome, currentState }) => {
  return (
    <>
      <Global
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Capriola&display=swap');

          :root {
            --theme-green: hsl(155, 30%, 61%);
            --theme-green--darker: hsl(155, 30%, 41%);
            --theme-green--darkest: hsl(155, 30%, 21%);
            --theme-ash: hsl(33, 20%, 32%);
            --theme-ash--darker: hsl(33, 20%, 22%);
            --theme-ash--darkest: hsl(33, 20%, 12%);
            --theme-orange: hsl(14, 65%, 45%);
            --theme-orange--darker: hsl(14, 65%, 35%);
            --theme-orange--darkest: hsl(14, 65%, 25%);
            --theme-golden: hsl(41, 79%, 52%);
            --theme-golden--darker: hsl(41, 79%, 32%);
            --theme-golden--darkest: hsl(41, 79%, 12%);
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background-color: var(--theme-green);
            color: #000000;
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
          margin-bottom: 1rem;
          background-color: var(--theme-green--darkest);
          color: var(--theme-green);
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
            margin: 0;
          `}
        >
          Calculadora CAFCI
        </h5>
      </header>
      <main>{currentState === "loadingRendimiento" ? <FullPageSpinner />: children}</main>
      <footer
        css={css`
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <p>
          Datos oficiales de{" "}
          <a
            href="https://cafci.org.ar"
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              color: currentColor;
            `}
          >
            CAFCI
          </a>
        </p>
        <p>
          Made by{" "}
          <a
            href="https://twitter.com/JenaroC"
            target="_blank"
            rel="noopener noreferrer"
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
