/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const CompareFondos = ({ rendimientos, fondos }) => {
  return (
    <div className="container">
      <pre>{JSON.stringify(rendimientos, null, 2)}</pre>
    </div>
  );
};

export default CompareFondos;
