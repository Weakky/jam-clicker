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
    window.setInterval(() => updateTitleTag(this.props.Bois.hundredths), 5000);
    window.setInterval(() => props.saveGame(), 60000);
  }

  displayNaniteValue() {
    const wholeNanites = BigNumber(this.props.Bois.hundredths).div(100);
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
            nanites={this.props.Bois.hundredths}
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
        <div id="upperPanel">
          <Stats
            bois={this.props.Bois}
            pierre={this.props.Pierre}
            nourriture={this.props.Nourriture}/>
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
              background: 'linear-gradient(#37418a, #9198e5,#37418a)',
              verticalAlign: "middle",
              fontSize: 0,
              height: "100%"
            }}
          >
            <div id="banner">
              <h2>{this.displayNaniteValue()} stères de bois</h2>
              <small>
                {prettifyNumber(BigNumber(this.props.Bois.perSecond).div(10))}{" "}
                par seconde
              </small>
            </div>
            <div
              id="bigNanite"
              style={{ margin: "50px auto 0" }}
              onClick={() => this.props.addNanites(100)}>''</div>
          </div>
          <div
            style={{
              backgroundColor: "orange",
              display: "inline-block",
              width: "50%",
              verticalAlign: "middle",
              height: "100%",
              position: "relative"
            }}
          >
            <div style={{ minHeight: "50%" }}>
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
            {renderTooltip()}
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
