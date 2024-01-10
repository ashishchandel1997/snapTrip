import React, { useState } from "react";
import ReactSnackBar from "react-js-snackbar";

const Snackbar = ({ setToggle, displayText }) => {
  const [state, setState] = useState(true);

  setTimeout(() => {
    setState(false);
    setToggle(false);
  }, 3000);

  return (
    <div>
      <ReactSnackBar Show={state}>
        <span
          className="text-center"
          style={{ fontWeight: "500", fontSize: "14px" }}
        >
          {displayText}
        </span>
      </ReactSnackBar>
    </div>
  );
};
export default Snackbar;
