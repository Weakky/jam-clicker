import React, { Component } from "react";
import { connect } from "react-redux";
import BigNumber from "big-number";

import Building from "./Building";
import Stats from "./Stats";
import Tooltip from "./Tooltip";
import {
  loadGame,
  saveGame,
  clearSave,
  tick,
  addNanites,
  buyBuilding,
  hideTooltip,
  moveTooltip
} from "../Actions/gameActions";
import { prettifyNumber, updateTitleTag } from "../Utilities/utilities";
import { State } from "../Reducers/gameReducer";

class Game extends Component<Props> {
  constructor(props: any) {
    super(props);

    props.loadGame();
    window.setInterval(() => props.tick(), 100);
    window.setInterval(
      () => updateTitleTag(this.props.Bois.naniteHundredths),
      5000
    );
    window.setInterval(() => props.saveGame(), 60000);
  }

  displayNaniteValue() {
    const wholeNanites = BigNumber(this.props.Bois.naniteHundredths).div(100);
    return prettifyNumber(wholeNanites, true);
  }

  render() {
    const tooltipBuilding = this.props.buildings.find(
      b => b.id === this.props.tooltipBuilding
    );
    const renderBuildings = () => {
      return this.props.buildings.map(b => {
        return (
          <Building
            key={b.id}
            building={b}
            nanites={this.props.Bois.naniteHundredths}
            buyBuilding={this.props.buyBuilding}
            moveTooltip={this.props.moveTooltip}
          />
        );
      });
    };
    const renderTooltip = () => {
      let tt: any = "";
      if (this.props.tooltipActive) {
        tt = (
          <Tooltip
            tooltipTop={this.props.tooltipTop}
            tooltipBuilding={tooltipBuilding}
          />
        );
      }

      return tt;
    };

    return (
      <div
        style={{
          position: "relative",
          backgroundColor: "red",
          height: "100vh",
          width: "100vw"
        }}
      >
        <div style={{ backgroundColor: "green", height: "8vh", width: "100%" }}>
          <Stats
            nanites={this.props.Bois.naniteHundredths}
            nanitesPerSecond={this.props.Bois.nanitesPerSecond}
            generatedNanites={this.props.Bois.nanitesGenerated}
            handGeneratedNanites={this.props.Bois.nanitesHandGenerated}
            buildingsOwned={this.props.buildingsOwned}
          />
        </div>
        <div
          style={{
            backgroundColor: "yellow",
            display: "block",
            height: "84vh",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "50%",
              backgroundColor: "blue",
              verticalAlign: "middle",
              fontSize: 0,
              height: "100%"
            }}
          >
            <div id="banner">
              <h2>{this.displayNaniteValue()} stères de bois</h2>
              <small>
                {prettifyNumber(
                  BigNumber(this.props.Bois.nanitesPerSecond).div(10)
                )}{" "}
                par seconde
              </small>
            </div>

            <div
              id="bigNanite"
              style={{ margin: "50px auto 0" }}
              onClick={() => this.props.addNanites(100)}
            >
              <h1 className="text-center">Imagine an image of a nanite here</h1>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "orange",
              display: "inline-block",
              width: "50%",
              verticalAlign: "middle",
              fontSize: 0,
              height: "100%",
              position: "relative"
            }}
          >
            <div style={{ minHeight: "50%", fontSize: 0 }}>
              <h2 className="text-center" style={{ marginTop: 0 }}>
                Buildings
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "black",
                  overflowY: "scroll"
                }}
                onMouseLeave={() => this.props.hideTooltip()}
              >
                {renderBuildings()}
              </div>
            </div>
            {
              <div style={{ minHeight: "50%", fontSize: 0 }}>
                <h2 className="text-center" style={{ marginTop: 0 }}>
                  Events
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "black",
                    overflowY: "scroll"
                  }}
                  onMouseLeave={() => this.props.hideTooltip()}
                >
                  {renderBuildings()}
                </div>
              </div>
            }
          </div>
        </div>
        <div
          style={{ backgroundColor: "purple", width: "100%", height: "8vh" }}
        />
      </div>
    );
  }
}

// Game.propTypes = {
//   naniteHundredths: PropTypes.object.isRequired,
//   nanitesPerSecond: PropTypes.object.isRequired,
//   nanitesGenerated: PropTypes.object.isRequired,
//   nanitesHandGenerated: PropTypes.object.isRequired,
//   buildingsOwned: PropTypes.number.isRequired,
//   buildings: PropTypes.arrayOf(PropTypes.object).isRequired,
//   tooltipActive: PropTypes.bool.isRequired,
//   tooltipTop: PropTypes.string.isRequired,
//   tooltipBuilding: PropTypes.number.isRequired,
//   loadGame: PropTypes.func.isRequired,
//   saveGame: PropTypes.func.isRequired,
//   clearSave: PropTypes.func.isRequired,
//   tick: PropTypes.func.isRequired,
//   addNanites: PropTypes.func.isRequired,
//   buyBuilding: PropTypes.func.isRequired,
//   hideTooltip: PropTypes.func.isRequired,
//   moveTooltip: PropTypes.func.isRequired
// };

type Props = {
  Bois: State["Bois"];
  Pierre: State["Pierre"];
  Nourriture: State["Nourriture"];
  buildings: State["currentEra"]["upgrades"];
  buildingsOwned: State["buildingsOwned"];
  tooltipActive: State["tooltipActive"];
  tooltipTop: State["tooltipTop"];
  tooltipBuilding: State["tooltipBuilding"];
} & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: State) => {
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadGame: () => dispatch(loadGame()),
    saveGame: () => dispatch(saveGame()),
    clearSave: () => {
      const confirm = window.confirm(
        "Are you sure you want to delete all save data and start again?"
      );
      if (confirm) {
        dispatch(clearSave());
      }
    },
    tick: () => dispatch(tick()),
    addNanites: (amountToAdd: any) => dispatch(addNanites(amountToAdd)),
    buyBuilding: (buildingId: any) => dispatch(buyBuilding(buildingId)),
    hideTooltip: () => dispatch(hideTooltip()),
    moveTooltip: (buildingId: any, mouseY: any) =>
      dispatch(moveTooltip(buildingId, mouseY))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
