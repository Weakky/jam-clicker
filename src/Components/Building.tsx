import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";
import { Upgrade, ResourceTypes } from "../game-data";
import { State } from "../Reducers/gameReducer";
import { mapDispatchToProps } from "./Game";

const Building: React.FC<Props> = props => {
  const building = props.building;

  let canBuy =
    props.building.type === "event" && props.building.owned > 0
      ? false
      : Object.entries(props.building.info)
          .filter(([, value]) => value !== undefined)
          .every(([resourceType, value]) => {
            return BigNumber(value!.priceOfNext).lte(
              BigNumber(
                props.state[resourceType as ResourceTypes].hundredths
              ).div(100)
            );
          });

  // Débloque les mines si Cabane en bois
  if (
    [5, 6, 7].includes(props.building.id) &&
    props.state.currentEra.name === "Age de Pierre"
  ) {
    if (props.state.currentEra.upgrades.find(u => u.id === 4)!.owned === 0) {
      canBuy = false;
    }
  }

  if (
    props.building.id === 8 &&
    props.state.currentEra.name === "Age de Pierre"
  ) {
    if (props.state.currentEra.upgrades.find(u => u.id === 4)!.owned === 0) {
      canBuy = false;
    }
  }

  if (
    props.building.id === 9 &&
    props.state.currentEra.name === "Age de Pierre"
  ) {
    if (
      props.state.currentEra.upgrades.find(u => u.id === 8)!.owned === 0 ||
      props.state.currentEra.upgrades.find(u => u.id === 4)!.owned === 0
    ) {
      canBuy = false;
    }
  }

  if (props.building.id === 8 && props.state.currentEra.name === "Moyen-Âge") {
    if (props.state.currentEra.upgrades.find(u => u.id === 7)!.owned === 0) {
      canBuy = false;
    }
  }

  if (props.building.id === 9 && props.state.currentEra.name === "Moyen-Âge") {
    if (props.state.currentEra.upgrades.find(u => u.id === 8)!.owned === 0) {
      canBuy = false;
    }
  }

  // const overlay = canBuy ? null : <div className="overlay"></div>;

  return (
    <div id={'test'}
      style={{
        cursor: canBuy ? "pointer" : "default",
          backgroundColor: canBuy ? "black" : "rgba(255, 255, 255, 0.5)",
        border: '1px solid #999'
      }}
      onClick={canBuy ? () => props.buyBuilding(building.id) : () => null}
      onMouseMove={$event =>
        props.moveTooltip(building.id, $event.pageY - 50 + "px")
      }
    >
      <div id={'dsp'}>{building.plural}
        <div id={building.name} style={{ display: "inline-block", 'vertical-align': "middle", 'margin-right': '50px' }}/></div>

      <div style={{ display: "inline-block", 'vertical-align': "middle", 'margin-right': '260px'}}>{building.owned}</div>
        {
            Object.entries(building.info)
                .filter(([, value]) => value !== undefined && value.priceOfNext.val() !== '0')
                .map(([resourceType, value]) => (
                <div style={{ display: "inline-block", 'vertical-align': "middle", 'margin-right': '10px' }}>

                    <div style={{ display: "inline-block", 'vertical-align': "middle" }}>
                        {prettifyNumber(value!.priceOfNext)}
                      <div id={resourceType}/>
                    </div>

                </div>
            ))
        }
      {/* <div style={{ textAlign: "center" }}>
        {prettifyNumber(building.priceOfNext)}
      </div> */}
      {/* {overlay} */}
    </div>
  );
};

// Building.propTypes = {
//   building: PropTypes.object.isRequired,
//   upgrades: PropTypes.arrayOf(object).isRequired,
//   nanites: PropTypes.object.isRequired,
//   buyBuilding: PropTypes.func.isRequired,
//   moveTooltip: PropTypes.func.isRequired
// };

type Props = {
  building: Upgrade;
  buyBuilding: ReturnType<typeof mapDispatchToProps>["buyBuilding"];
  moveTooltip: ReturnType<typeof mapDispatchToProps>["moveTooltip"];
  state: State;
};

export default Building;
