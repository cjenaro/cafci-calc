/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import { fetchDetailedFondo } from "../utils/api";

const CompareFondos = ({ rendimientos, fondos }) => {
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
                text-align: center !important;
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
            <th>Sector</th>
            <th>Moneda</th>
            <th>Rescate</th>
          </tr>
        </thead>
        <tbody>
          {fondos.map((fondo, i) => (
            <tr key={`row-${i}`}>
              <td>{fondo.nombre}</td>
              {Object.keys(rendimientos).map((key) => {
                const rendimiento = rendimientos[key][fondo.id];
                return (
                  <td>{rendimiento && Math.floor(Number(rendimiento.tna))}%</td>
                );
              })}
              <td>{fondo.tipoRentaId}</td>
              <td>{fondo.monedaId}</td>
              <td>
                {fondo.diasLiquidacion &&
                  `${Number(fondo.diasLiquidacion) * 24} hrs`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareFondos;
