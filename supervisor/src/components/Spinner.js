import React from "react";
import Loader from "react-loader-spinner";

export default ({ marginTop }) => (
  <div
    style={{
      display: "grid",
      justifyItems: "center",
      marginTop
    }}
  >
    <Loader type="Oval" color="rgb(67, 132, 245)" />
  </div>
);
