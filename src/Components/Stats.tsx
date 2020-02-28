import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";
import { State } from "../Reducers/gameReducer";
import { Era, ResourceTypes } from "../game-data";

type Props = {
  state: State;
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
      {/* <span >
        Bois: {prettifyNumber(BigNumber(props.bois.hundredths).div(100))}{" "}
        ({prettifyNumber(BigNumber(props.bois.perSecond).div(10))}/s)
          <div id={"wood"}></div>
      </span>
      <span>
        Pierre:{" "}
        {prettifyNumber(BigNumber(props.pierre.hundredths).div(100))} (
        {prettifyNumber(BigNumber(props.pierre.perSecond).div(10))}/s)
          <div id={"stone"}></div>
      </span>
      <span>
        Nourriture:{" "}
        {prettifyNumber(BigNumber(props.nourriture.hundredths).div(100))}{" "}
        ({prettifyNumber(BigNumber(props.nourriture.perSecond).div(10))}
        /s)
          <div id={"food"}></div>
      </span> */}
      {props.state.currentEra.resources.map(r => (
        <span>
          {r.name}:{" "}
          {prettifyNumber(
            BigNumber(props.state[r.name as ResourceTypes].hundredths).div(100)
          )}{" "}
          (
          {prettifyNumber(
            BigNumber(props.state[r.name as ResourceTypes].perSecond).div(10)
          )}
          /s)
          <div id={r.name} />
        </span>
      ))}
    </div>
  );
};

export default Stats;
