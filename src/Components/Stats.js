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
      <span>
        Current nanites: {prettifyNumber(BigNumber(props.nanites).div(100))}
      </span>
      <span>
        Nanites generated per second:{" "}
        {prettifyNumber(BigNumber(props.nanitesPerSecond).div(10))}
      </span>
      <span>
        Total nanites generated:{" "}
        {prettifyNumber(BigNumber(props.generatedNanites).div(100))}
      </span>
      <span>
        Hand generated nanites:{" "}
        {prettifyNumber(BigNumber(props.handGeneratedNanites).div(100))}
      </span>
      <span>Buildings owned: {props.buildingsOwned}</span>
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
