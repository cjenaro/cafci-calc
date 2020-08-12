/** @jsx jsx */
import { keyframes, css, jsx } from "@filbert-js/core";

const loadingG = keyframes`
  0% {
    transform: translate(5px, 0) rotate(0deg);
  }
  50% {
    transform: translate(-5px, 0) rotate(360deg);
  }
  100% {
    transform: translate(5px, 0) rotate(0deg);
  }
`;

const Spinner = () => (
  <div
    css={css`
      background-color: var(--theme-green--darkest);
      width: 15px;
      height: 15px;
      border-radius: 5px;
      animation: ${loadingG} 0.5s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite;
    `}
  ></div>
);

export default Spinner;
