import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";

import { prettifyNumber } from "../Utilities/utilities";

function Building(props) {
  const building = props.building;
  const canBuy = BigNumber(building.priceOfNext).lte(
    BigNumber(props.nanites).div(100)
  );
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
      <h5 style={{textAlign: 'center'}} >{building.name}</h5>
      <div style={{textAlign: 'center'}} >{building.owned}</div>
      <div style={{textAlign: 'center'}} >{prettifyNumber(building.priceOfNext)}</div>
      {/* {overlay} */}
    </div>
  );
}

Building.propTypes = {
  building: PropTypes.object.isRequired,
  nanites: PropTypes.object.isRequired,
  buyBuilding: PropTypes.func.isRequired,
  moveTooltip: PropTypes.func.isRequired
};

export default Building;
