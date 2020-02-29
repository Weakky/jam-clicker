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
import { ResourceTypes } from "../game-data";

class Game extends Component<Props> {
  constructor(props: any) {
    super(props);

    props.loadGame();
    window.setInterval(() => props.tick(), 100);
    window.setInterval(() => updateTitleTag(this.props.Bois.hundredths), 5000);
    window.setInterval(() => props.saveGame(), 60000);
  }

  displayNaniteValue() {
    const resource = this.props.state.currentEra.resources[0]
      .name as ResourceTypes;

    const wholeNanites = BigNumber(this.props.state[resource].hundredths).div(
      100
    );
    return prettifyNumber(wholeNanites, true);
  }

  render() {
    if (this.props.state.done) {
      return (
        <iframe
          width="1920"
          height="1080"
          src="https://www.youtube.com/embed/6NWRSq3bIhE?start=79&autoplay=1&controls=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      );
    }

    let tooltipBuilding = this.props.buildings.find(
      b => b.id === this.props.tooltipBuilding
    );
    if (!tooltipBuilding) {
      tooltipBuilding = this.props.buildings[0];
    }

    const renderTools = () => {
      return this.props.buildings
        .filter(b => b.type === "tool")
        .map(b => {
          return (
            <Building
              key={b.id}
              building={b}
              state={this.props.state}
              buyBuilding={this.props.buyBuilding}
              moveTooltip={this.props.moveTooltip}
            />
          );
        });
    };

    const renderEnhancements = () => {
      return this.props.buildings
        .filter(b => b.type === "event")
        .map(b => {
          return (
            <Building
              key={b.id}
              building={b}
              state={this.props.state}
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
            tooltipBuilding={tooltipBuilding!}
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
          <Stats state={this.props.state} />
        </div>
        <div
          style={{
            backgroundColor: "yellow",
            display: "block",
            height: "92vh",
            width: "100%"
          }}
        >
          <div id={"backPlanet"}>
            <div id="banner">
              <h2 style={{ margin: "0 auto auto auto" }}>
                {this.displayNaniteValue()}{" "}
                {this.props.state.currentEra.name === "Age de Pierre" ||
                this.props.state.currentEra.name === "Moyen-Âge"
                  ? "stères de bois"
                  : "Or"}
              </h2>
              <small>
                {prettifyNumber(BigNumber(this.props.Bois.perSecond).div(10))}{" "}
                par seconde
              </small>
            </div>
            <div
              id={this.props.state.currentEra.earthImagePath}
              style={{ margin: "50px auto 0" }}
              onClick={() => this.props.addNanites(100)}
            ></div>
          </div>
          <div
            style={{
              backgroundColor: "#1A1C23",
              display: "inline-block",
              width: "50%",
              verticalAlign: "middle",
              height: "100%",
              position: "relative"
            }}
          >
            <div style={{ minHeight: "50%" }}>
              <h2 className="text-center" style={{ marginTop: 0 }}>
                Outils
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
                {renderTools()}
              </div>
            </div>
            {renderTooltip()}
            <div style={{ minHeight: "50%" }}>
              <h2 className="text-center" style={{ marginTop: 0 }}>
                Améliorations
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
                {renderEnhancements()}
              </div>
            </div>
          </div>
        </div>
        {/* <div
          style={{ backgroundColor: "purple", width: "100%", height: "8vh" }}
        >
          {this.props.state.currentEra.quotes[this.props.state.quoteIndex]}
        </div> */}
        <audio
          src={this.props.state.currentEra.backgroundSoundPath}
          autoPlay={true}
          loop={true}
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
  state: State;
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
    tooltipBuilding: state.tooltipBuilding,
    state
  };
};

export const mapDispatchToProps = (dispatch: any) => {
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
