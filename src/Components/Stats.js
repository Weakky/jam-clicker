import React from "react";
import BigNumber from "big-number";
import { prettifyNumber } from "../Utilities/utilities";
const Stats = props => {
    return (React.createElement("div", { style: {
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            color: "black"
        } }, props.state.currentEra.resources.map(r => (React.createElement("span", null,
        prettifyNumber(BigNumber(props.state[r.name].hundredths).div(100)),
        " ",
        "(",
        prettifyNumber(BigNumber(props.state[r.name].perSecond).div(10)),
        "/s)",
        React.createElement("div", { id: r.name }))))));
};
export default Stats;
