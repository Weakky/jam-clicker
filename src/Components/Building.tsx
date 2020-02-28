import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";
import { Upgrade, ResourceTypes } from "../game-data";
import { State } from "../Reducers/gameReducer";
import { mapDispatchToProps } from "./Game";

const Building: React.FC<Props> = props => {
  const building = props.building;

  let canBuy = Object.entries(props.building.info)
    .filter(([, value]) => value !== undefined)
    .every(([resourceType, value]) => {
      return BigNumber(value!.priceOfNext).lte(
        BigNumber(props.state[resourceType as ResourceTypes].hundredths).div(
          100
        )
      );
    });

  if (
    [5, 6, 7].includes(props.building.id) &&
    props.state.currentEra.name === "Age de Pierre"
  ) {
    if (props.state.currentEra.upgrades.find(u => u.id === 4)!.owned === 0) {
      canBuy = false;
    }
  }

  // const overlay = canBuy ? null : <div className="overlay"></div>;

  return (
    <div
      id="building"
      style={{
        cursor: canBuy ? "pointer" : "default",
        backgroundColor: canBuy ? "black" : "rgba(255, 255, 255, 0.5)"
      }}
      onClick={canBuy ? () => props.buyBuilding(building.id) : () => null}
      onMouseMove={$event =>
        props.moveTooltip(building.id, $event.pageY - 50 + "px")
      }
    >
      <h5 style={{ textAlign: "center" }}>{building.name}</h5>
      <div style={{ textAlign: "center" }}>{building.owned}</div>
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