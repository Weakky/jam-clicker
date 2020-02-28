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
        window.setInterval(() => updateTitleTag(this.props.Bois.hundredths), 5000);
        window.setInterval(() => props.saveGame(), 60000);
    }
    displayNaniteValue() {
        const resource = this.props.state.currentEra.resources[0]
            .name;
        const wholeNanites = BigNumber(this.props.state[resource].hundredths).div(100);
        return prettifyNumber(wholeNanites, true);
    }
    render() {
        let tooltipBuilding = this.props.buildings.find(b => b.id === this.props.tooltipBuilding);
        if (!tooltipBuilding) {
            tooltipBuilding = this.props.buildings[0];
        }
        const renderTools = () => {
            return this.props.buildings
                .filter(b => b.type === "tool")
                .map(b => {
                return (React.createElement(Building, { key: b.id, building: b, state: this.props.state, buyBuilding: this.props.buyBuilding, moveTooltip: this.props.moveTooltip }));
            });
        };
        const renderEnhancements = () => {
            return this.props.buildings
                .filter(b => b.type === "event")
                .map(b => {
                return (React.createElement(Building, { key: b.id, building: b, state: this.props.state, buyBuilding: this.props.buyBuilding, moveTooltip: this.props.moveTooltip }));
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
            React.createElement("div", { id: "upperPanel" },
                React.createElement(Stats, { state: this.props.state })),
            React.createElement("div", { style: {
                    backgroundColor: "yellow",
                    display: "block",
                    height: "92vh",
                    width: "100%"
                } },
                React.createElement("div", { style: {
                        display: "inline-block",
                        width: "50%",
                        background: "linear-gradient(#37418a, #9198e5,#37418a)",
                        verticalAlign: "middle",
                        height: "100%"
                    } },
                    React.createElement("div", { id: "banner" },
                        React.createElement("h2", null,
                            this.displayNaniteValue(),
                            " ",
                            this.props.state.currentEra.name === "Age de Pierre" ||
                                this.props.state.currentEra.name === "Moyen-Âge"
                                ? "stères de bois"
                                : "Or"),
                        React.createElement("small", null,
                            prettifyNumber(BigNumber(this.props.Bois.perSecond).div(10)),
                            " ",
                            "par seconde")),
                    React.createElement("div", { id: "bigNanite", style: { margin: "50px auto 0" }, onClick: () => this.props.addNanites(100) }, "''")),
                React.createElement("div", { style: {
                        backgroundColor: "orange",
                        display: "inline-block",
                        width: "50%",
                        verticalAlign: "middle",
                        height: "100%",
                        position: "relative"
                    } },
                    React.createElement("div", { style: { minHeight: "50%" } },
                        React.createElement("h2", { className: "text-center", style: { marginTop: 0 } }, "Outils"),
                        React.createElement("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "black",
                                overflowY: "scroll"
                            }, onMouseLeave: () => this.props.hideTooltip() }, renderTools())),
                    renderTooltip(),
                    React.createElement("div", { style: { minHeight: "50%" } },
                        React.createElement("h2", { className: "text-center", style: { marginTop: 0 } }, "Am\u00E9liorations"),
                        React.createElement("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "black",
                                overflowY: "scroll"
                            }, onMouseLeave: () => this.props.hideTooltip() }, renderEnhancements())))),
            React.createElement("audio", { src: this.props.state.currentEra.backgroundSoundPath, autoPlay: true, loop: true })));
    }
}
const mapStateToProps = (state) => {
    return {
        Bois: state.Bois,
        Pierre: state.Pierre,
        Nourriture: state.Nourriture,
        buildings: state.currentEra.upgrades,
        buildingsOwned: state.buildingsOwned,
        tooltipActive: state.tooltipActive,
        tooltipTop: state.tooltipTop,
        tooltipBuilding: state.tooltipBuilding,
        state
    };
};
export const mapDispatchToProps = (dispatch) => {
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
