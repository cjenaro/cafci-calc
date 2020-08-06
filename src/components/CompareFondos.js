/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const CompareFondos = ({ fondos }) => {

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} css={css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      grid-gap: 1rem;

      label {
        display: flex;
        flex-direction: column;

        input {
          margin-top: 10px;
          border-radius: 5px;
        padding: 1rem;
        }
      }

      button {
        padding: 0.5rem 1rem;
        border: 1px solid #fafafa;
        font-weight: bold;
        font-size: 1.5rem;
        grid-column: -1/1;
      }
    `}>
      <label htmlFor="date_from">
              Desde:
      <input
        id="date_from"
        name="from"
        type="date"      
      />
        </label>
        <label htmlFor="date_to">
          Hasta:
      <input 
        id="date_to"
        name="to"
        type="date"      
      />
        </label>
        <button type="submit">Comparar!</button>
      </form>
    </div>
  );
};

export default CompareFondos;
