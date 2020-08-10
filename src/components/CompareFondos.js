/** @jsx jsx */
import { useState, useEffect } from "preact/hooks";
import { css, jsx } from "@filbert-js/core";

const CompareFondos = ({ rendimientos, fondos }) => {
  const [detailedFondos, setDetailedFondos] = useState([]);

  return (
    <div className="container">
      <table
        css={css`
          width: 100%;
          overflow: scroll;
          border-collapse: collapse;

          th {
            background-color: var(--theme-ash--darker);
            color: #ffffff;
            padding: 0.5rem 0.75rem;
            border: 1px solid var(--theme-green);
            text-align: right;
          }

          td {
            text-align: right;
            background-color: var(--theme-ash);
            padding: 0.5rem 0.75rem;
            color: #ffffff;
            border: 1px solid var(--theme-green);
          }
        `}
      >
        <thead>
          <tr>
            <th id="blank">&nbsp;</th>
            <th
              css={css`
                text-align: center;
              `}
              colspan={Object.keys(rendimientos).length}
            >
              TNA
            </th>
          </tr>
          <tr>
            <th>Nombre</th>
            {Object.keys(rendimientos).map((key) => {
              const rendimiento = rendimientos[key];
              return (
                <th
                  key={`rendimiento-${rendimiento.desde}-${rendimiento.hasta}`}
                >
                  {rendimiento.desde}-{rendimiento.hasta}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {fondos.map((fondo, i) => (
            <tr key={`row-${i}`}>
              <td>{fondo.nombre}</td>
              {Object.keys(rendimientos).map((key) => {
                const rendimiento = rendimientos[key][fondo.id];
                return <td>{rendimiento && rendimiento.tna}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareFondos;
