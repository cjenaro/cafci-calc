/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const PlusButton = ({ onClick }) => {
  return (
    <button
      aria-label="Add"
      onClick={onClick}
      css={css`
        width: 50px;
        height: 50px;
        background-color: var(--background-color);
        border-radius: 50%;
        border: 0;
        --stroke-color: #222222;
        --fill-color: #fafafa;
      `}
    >
      <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <g id="color">
          <polygon
            fill="var(--fill-color)"
            stroke="none"
            points="56,32.8 39.2,32.8 39.2,16 32.8,16 32.8,32.8 16,32.8 16,39.2 32.8,39.2 32.8,56 39.2,56 39.2,39.2 56,39.2"
          />
        </g>
        <g id="line">
          <polygon
            fill="none"
            stroke="var(--stroke-color)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            points="56,32.8 39.2,32.8 39.2,16 32.8,16 32.8,32.8 16,32.8 16,39.2 32.8,39.2 32.8,56 39.2,56 39.2,39.2 56,39.2"
          />
        </g>
      </svg>
    </button>
  );
};

export default PlusButton;
