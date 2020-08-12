/** @jsx jsx */
import { css, jsx } from "@filbert-js/core";
import Spinner from "./Spinner";

const FullPageSpinner = () => {
  return (
    <div
      css={css`
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        & > * {
          width: 35px;
          height: 35px;
        }
      `}
    >
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
