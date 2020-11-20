/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";

const MinusButton = ({ onClick }) => {
  return (
    <button
      aria-label="Remove"
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
          <polyline
            fill="var(--fill-color)"
            stroke="none"
            points="59.9656,40.6667 13.9656,40.6667 13.9656,30.7614 59.9572,30.7614"
          />
        </g>
        <g id="line">
          <rect
            x="31.5039"
            y="12.5953"
            width="10.2956"
            height="46.3303"
            transform="matrix(6.123234e-17 -1 1 6.123234e-17 0.8912 72.4122)"
            fill="none"
            stroke="var(--stroke-color)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </g>
      </svg>
    </button>
  );
};

export default MinusButton;
