/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import { fetchCurrencies, fetchTypes } from "../utils/api";
import { useState, useEffect, useRef } from "preact/hooks";

const CompareFondos = ({ rendimientos, fondos }) => {
  const tableRef = useRef();
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

  const toCSV = (element, selector) => {
    const rows = element.querySelectorAll("tr");
    return Array.from(rows)
      .map((row) =>
        Array.from(row.querySelectorAll(selector))
          .map((cell) => cell.innerText)
          .join(", ")
      )
      .join("\n");
  };

  const handleExport = () => {
    const head = tableRef.current.querySelector("thead");
    const body = tableRef.current.querySelector("tbody");
    const headCSV = toCSV(head, "th");
    const bodyCSV = toCSV(body, "td");
    const href = `data:text/csv;charset=utf-8, ${headCSV}\n${bodyCSV}`;
    const a = document.createElement("a");
    a.href = href;
    a.download = "cafci_calc.csv";
    a.click();
  };

  return (
    <div className="container">
      <div
        css={css`
          width: 100%;
          overflow: scroll;
          @media (max-width: 430px) {
            box-shadow: inset -9px 0 9px -9px rgba(0, 0, 0, 0.4);
          }
        `}
      >
        {currencies && types && (
          <table
            ref={tableRef}
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
        <button
          onClick={handleExport}
          css={css`
            padding: 0.5rem 1rem;
            background-color: var(--theme-green--darkest);
            color: #ffffff;
            border: 0;
            text-transform: uppercase;
            letter-spacing: 0.25rem;
            font-weight: bold;
            margin-top: 1rem;
          `}
        >
          Exportar a un CSV (Compatible con excel)
        </button>
      </div>
    </div>
  );
};

export default CompareFondos;
