import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";
import { State } from "../Reducers/gameReducer";

type Props = {
  bois: State["Bois"];
  pierre: State["Pierre"];
  nourriture: State["Nourriture"];
};

const Stats: React.FC<Props> = props => {
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
        Bois: {prettifyNumber(BigNumber(props.bois.hundredths).div(100))}{" "}
        ({prettifyNumber(BigNumber(props.bois.perSecond).div(10))}/s)
      </span>
      <span>
        Pierre:{" "}
        {prettifyNumber(BigNumber(props.pierre.hundredths).div(100))} (
        {prettifyNumber(BigNumber(props.pierre.perSecond).div(10))}/s)
      </span>
      <span>
        Nourriture:{" "}
        {prettifyNumber(BigNumber(props.nourriture.hundredths).div(100))}{" "}
        ({prettifyNumber(BigNumber(props.nourriture.perSecond).div(10))}
        /s)
      </span>
    </div>
  );
};

export default Stats;
