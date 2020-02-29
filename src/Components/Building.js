import React from "react";
import BigNumber from "big-number";
import { prettifyNumber } from "../Utilities/utilities";
const Building = props => {
    const building = props.building;
    let canBuy = props.building.type === "event" && props.building.owned > 0
        ? false
        : Object.entries(props.building.info)
            .filter(([, value]) => value !== undefined)
            .every(([resourceType, value]) => {
            return BigNumber(value.priceOfNext).lte(BigNumber(props.state[resourceType].hundredths).div(100));
        });
    // Débloque les mines si Cabane en bois
    if ([5, 6, 7].includes(props.building.id) &&
        props.state.currentEra.name === "Age de Pierre") {
        if (props.state.currentEra.upgrades.find(u => u.id === 4).owned === 0) {
            canBuy = false;
        }
    }
    if (props.building.id === 8 &&
        props.state.currentEra.name === "Age de Pierre") {
        if (props.state.currentEra.upgrades.find(u => u.id === 4).owned === 0) {
            canBuy = false;
        }
    }
    if (props.building.id === 9 &&
        props.state.currentEra.name === "Age de Pierre") {
        if (props.state.currentEra.upgrades.find(u => u.id === 8).owned === 0 ||
            props.state.currentEra.upgrades.find(u => u.id === 4).owned === 0) {
            canBuy = false;
        }
    }
    if (props.building.id === 8 && props.state.currentEra.name === "Moyen-Âge") {
        if (props.state.currentEra.upgrades.find(u => u.id === 7).owned === 0) {
            canBuy = false;
        }
    }
    if (props.building.id === 9 && props.state.currentEra.name === "Moyen-Âge") {
        if (props.state.currentEra.upgrades.find(u => u.id === 8).owned === 0) {
            canBuy = false;
        }
    }
    // const overlay = canBuy ? null : <div className="overlay"></div>;
    return (React.createElement("div", { id: 'test', style: {
            cursor: canBuy ? "pointer" : "default",
            backgroundColor: canBuy ? "black" : "rgba(255, 255, 255, 0.5)",
            border: '1px solid #999'
        }, onClick: canBuy ? () => props.buyBuilding(building.id) : () => null, onMouseMove: $event => props.moveTooltip(building.id, $event.pageY - 50 + "px") },
        React.createElement("div", { id: 'dsp' },
            building.plural,
            React.createElement("div", { id: building.name, style: { display: "inline-block", 'vertical-align': "middle", 'margin-right': '50px' } })),
        React.createElement("div", { style: { display: "inline-block", 'vertical-align': "middle", 'margin-right': '260px' } }, building.owned),
        Object.entries(building.info)
            .filter(([, value]) => value !== undefined && value.priceOfNext.val() !== '0')
            .map(([resourceType, value]) => (React.createElement("div", { style: { display: "inline-block", 'vertical-align': "middle", 'margin-right': '10px' } },
            React.createElement("div", { style: { display: "inline-block", 'vertical-align': "middle" } },
                prettifyNumber(value.priceOfNext),
                React.createElement("div", { id: resourceType })))))));
};
export default Building;
