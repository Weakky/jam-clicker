import React, { Component } from "react";
import { connect } from "react-redux";
import BigNumber from "big-number";
import Building from "./Building";
import Stats from "./Stats";
import Tooltip from "./Tooltip";
import { loadGame, saveGame, clearSave, tick, addNanites, buyBuilding, hideTooltip, moveTooltip } from "../Actions/gameActions";
import { prettifyNumber, updateTitleTag } from "../Utilities/utilities";
class Game extends Component {
    constructor(props) {
        super(props);
        props.loadGame();
        window.setInterval(() => props.tick(), 100);
        window.setInterval(() => updateTitleTag(this.props.Bois.naniteHundredths), 5000);
        window.setInterval(() => props.saveGame(), 60000);
    }
    displayNaniteValue() {
        const wholeNanites = BigNumber(this.props.Bois.naniteHundredths).div(100);
        return prettifyNumber(wholeNanites, true);
    }
    render() {
        const tooltipBuilding = this.props.buildings.find(b => b.id === this.props.tooltipBuilding);
        const renderBuildings = () => {
            return this.props.buildings.map(b => {
                return (React.createElement(Building, { key: b.id, building: b, nanites: this.props.Bois.naniteHundredths, buyBuilding: this.props.buyBuilding, moveTooltip: this.props.moveTooltip }));
            });
        };
        const renderTooltip = () => {
            let tt = "";
            if (this.props.tooltipActive) {
                tt = (React.createElement(Tooltip, { tooltipTop: this.props.tooltipTop, tooltipBuilding: tooltipBuilding }));
            }
            return tt;
        };
        return (React.createElement("div", { style: {
                position: "relative",
                backgroundColor: "red",
                height: "100vh",
                width: "100vw"
            } },
            React.createElement("div", { style: { backgroundColor: "green", height: "8vh", width: "100%" } },
                React.createElement(Stats, { nanites: this.props.Bois.naniteHundredths, nanitesPerSecond: this.props.Bois.nanitesPerSecond, generatedNanites: this.props.Bois.nanitesGenerated, handGeneratedNanites: this.props.Bois.nanitesHandGenerated, buildingsOwned: this.props.buildingsOwned })),
            React.createElement("div", { style: {
                    backgroundColor: "yellow",
                    display: "block",
                    height: "84vh",
                    width: "100%"
                } },
                React.createElement("div", { style: {
                        display: "inline-block",
                        width: "50%",
                        backgroundColor: "blue",
                        verticalAlign: "middle",
                        fontSize: 0,
                        height: "100%"
                    } },
                    React.createElement("div", { id: "banner" },
                        React.createElement("h2", null,
                            this.displayNaniteValue(),
                            " st\u00E8res de bois"),
                        React.createElement("small", null,
                            prettifyNumber(BigNumber(this.props.Bois.nanitesPerSecond).div(10)),
                            " ",
                            "par seconde")),
                    React.createElement("div", { id: "bigNanite", style: { margin: "50px auto 0" }, onClick: () => this.props.addNanites(100) },
                        React.createElement("h1", { className: "text-center" }, "Imagine an image of a nanite here"))),
                React.createElement("div", { style: {
                        backgroundColor: "orange",
                        display: "inline-block",
                        width: "50%",
                        verticalAlign: "middle",
                        fontSize: 0,
                        height: "100%",
                        position: "relative"
                    } },
                    React.createElement("div", { style: { minHeight: "50%", fontSize: 0 } },
                        React.createElement("h2", { className: "text-center", style: { marginTop: 0 } }, "Buildings"),
                        React.createElement("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "black",
                                overflowY: "scroll"
                            }, onMouseLeave: () => this.props.hideTooltip() }, renderBuildings())),
                    React.createElement("div", { style: { minHeight: "50%", fontSize: 0 } },
                        React.createElement("h2", { className: "text-center", style: { marginTop: 0 } }, "Events"),
                        React.createElement("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "black",
                                overflowY: "scroll"
                            }, onMouseLeave: () => this.props.hideTooltip() }, renderBuildings())))),
            React.createElement("div", { style: { backgroundColor: "purple", width: "100%", height: "8vh" } })));
    }
}
const mapStateToProps = (state) => {
    return {
        // naniteHundredths: state.naniteHundredths,
        // nanitesPerSecond: state.nanitesPerSecond,
        // nanitesGenerated: state.nanitesGenerated,
        // nanitesHandGenerated: state.nanitesHandGenerated,
        // buildingsOwned: state.buildingsOwned,
        // buildings: state.buildings,
        Bois: state.Bois,
        Pierre: state.Pierre,
        Nourriture: state.Nourriture,
        buildings: state.currentEra.upgrades,
        buildingsOwned: state.buildingsOwned,
        tooltipActive: state.tooltipActive,
        tooltipTop: state.tooltipTop,
        tooltipBuilding: state.tooltipBuilding
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loadGame: () => dispatch(loadGame()),
        saveGame: () => dispatch(saveGame()),
        clearSave: () => {
            const confirm = window.confirm("Are you sure you want to delete all save data and start again?");
            if (confirm) {
                dispatch(clearSave());
            }
        },
        tick: () => dispatch(tick()),
        addNanites: (amountToAdd) => dispatch(addNanites(amountToAdd)),
        buyBuilding: (buildingId) => dispatch(buyBuilding(buildingId)),
        hideTooltip: () => dispatch(hideTooltip()),
        moveTooltip: (buildingId, mouseY) => dispatch(moveTooltip(buildingId, mouseY))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
