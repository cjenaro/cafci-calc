/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const DropdownButton = ({ onClick, upwards }) => {
  return (
    <button
      aria-label="Add"
      onClick={onClick}
      css={css`
        width: 35px;
        height: 35px;
        background-color: var(--background-color);
        border-radius: 50%;
        border: 0;
        --stroke-color: #222222;
        --fill-color: #fafafa;
        --stroke-width: 4;

        svg {
          transition: transform 0.3s ease-in-out;
          transform: rotate(${upwards ? "180deg" : "0deg"});
        }
      `}
    >
      <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <g id="line">
          <path
            fill="none"
            stroke="var(--stroke-color)"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke-Miterlimit="10"
            strokeWidth="var(--stroke-width)"
            d="M57.1347,17L47,35.8824l-9.9304,18.5018c-0.4407,0.8211-1.6984,0.8211-2.1391,0L25,35.8824L14.8653,17"
          />
        </g>
      </svg>
    </button>
  );
};

export default DropdownButton;
