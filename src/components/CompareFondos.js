/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const CompareFondos = ({ rendimientos, fondos }) => {
  return (
    <div className="container">
      <table>
        <thead>
          <th>Nombre</th>
          {Object.keys(rendimientos).map(key => {
            const rendimiento = rendimientos[key]
                  return (
            <th key={`rendimiento-${rendimiento.desde.fecha}-${rendimiento.hasta.fecha}`}>     
              {rendimiento.desde.fecha}-{rendimiento.hasta.fecha}
            </th>
          )})}
        </thead>
        <tbody>
          {fondos.map((fondo, i) => (
            <tr key={`row-${i}`}>
              <td>{fondo.nombre}</td> 
              {Object.keys(rendimientos).map(key => {
                 const rendimiento = rendimientos[key]     
                return (
                <td>{rendimiento && rendimiento.tna}</td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(rendimientos, null, 2)}</pre>
    </div>
  );
};

export default CompareFondos;
