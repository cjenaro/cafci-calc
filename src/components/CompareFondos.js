/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const CompareFondos = ({ fondos, goBack }) => {
  return (
    <div className="container">
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default CompareFondos;
