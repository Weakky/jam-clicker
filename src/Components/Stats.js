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
        } },
        React.createElement("span", null,
            "Bois: ",
            prettifyNumber(BigNumber(props.bois.hundredths).div(100)),
            " ",
            "(",
            prettifyNumber(BigNumber(props.bois.perSecond).div(10)),
            "/s)",
            React.createElement("div", { id: "wood" })),
        React.createElement("span", null,
            "Pierre:",
            " ",
            prettifyNumber(BigNumber(props.pierre.hundredths).div(100)),
            " (",
            prettifyNumber(BigNumber(props.pierre.perSecond).div(10)),
            "/s)",
            React.createElement("div", { id: "stone" })),
        React.createElement("span", null,
            "Nourriture:",
            " ",
            prettifyNumber(BigNumber(props.nourriture.hundredths).div(100)),
            " ",
            "(",
            prettifyNumber(BigNumber(props.nourriture.perSecond).div(10)),
            "/s)",
            React.createElement("div", { id: "food" }))));
};
export default Stats;
