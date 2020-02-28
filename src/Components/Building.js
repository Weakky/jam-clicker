import React from "react";
import BigNumber from "big-number";
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
    return (React.createElement("div", { id: "building", style: {
            cursor: canBuy ? "pointer" : "default",
            backgroundColor: canBuy ? "black" : "rgba(255, 255, 255, 0.5)"
        }, onClick: canBuy ? () => props.buyBuilding(building.id) : () => null, onMouseMove: $event => props.moveTooltip(building.id, $event.pageY - 50 + "px") },
        React.createElement("h5", { style: { textAlign: "center" } }, building.name),
        React.createElement("div", { style: { textAlign: "center" } }, building.owned)));
};
export default Building;
