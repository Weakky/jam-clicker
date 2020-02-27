import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";

function Stats(props) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        color: "black"
      }}
    >
      <span>Bois: {prettifyNumber(BigNumber(props.nanites).div(100))}</span>
      <span>Bois généré par seconde: </span>{" "}
      {prettifyNumber(BigNumber(props.nanitesPerSecond).div(10))}
    </div>
  );
}

Stats.propTypes = {
  nanites: PropTypes.object.isRequired,
  nanitesPerSecond: PropTypes.object.isRequired,
  generatedNanites: PropTypes.object.isRequired,
  handGeneratedNanites: PropTypes.object.isRequired,
  buildingsOwned: PropTypes.number.isRequired
};

export default Stats;
