/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import { fetchCurrencies, fetchTypes } from "../utils/api";
import { useState, useEffect } from "preact/hooks";

const CompareFondos = ({ rendimientos, fondos }) => {
  const [currencies, setCurrencies] = useState(null);
  const [types, setTypes] = useState(null);

  const shapeCurrencies = (currencies) => {
    setCurrencies(shapeCollection(currencies));
  };

  const shapeTypes = (types) => {
    setTypes(shapeCollection(types));
  };

  const shapeCollection = (collection) => {
    return collection.data.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: { ...curr },
      };
    }, {});
  };

  useEffect(() => {
    fetchCurrencies().then(shapeCurrencies);
    fetchTypes().then(shapeTypes);
  }, []);

  return (
    <div className="container">
      <div
        css={css`
          width: 100%;
          overflow: scroll;
          box-shadow: inset -9px 0 9px -9px rgba(0, 0, 0, 0.4);
        `}
      >
        {currencies && types && (
          <table
            css={css`
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
                <tr key={`row-${i}-${fondo.id}`}>
                  <td>{fondo.nombre}</td>
                  {Object.keys(rendimientos).map((key) => {
                    const rendimiento = rendimientos[key][fondo.id];
                    return (
                      <td>
                        {rendimiento && Math.floor(Number(rendimiento.tna))}%
                      </td>
                    );
                  })}
                  <td>{types[fondo.tipoRentaId].nombre}</td>
                  <td>{currencies[fondo.monedaId].codigoCafci}</td>
                  <td>
                    {fondo.diasLiquidacion &&
                      `${Number(fondo.diasLiquidacion) * 24} hrs`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompareFondos;
