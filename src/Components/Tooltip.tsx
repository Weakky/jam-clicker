import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";
import { prettifyNumber } from "../Utilities/utilities";
import { Upgrade } from "../game-data";

type Props = {
  tooltipBuilding: Upgrade;
  tooltipTop: number;
};

const Tooltip: React.FC<Props> = props => {
  const b = props.tooltipBuilding;
  const ownedDetails = () => {
    if (b.owned === 0) {
      return "";
    }

    let details: any = "";
    const value = Object.values(b.info).find(value => {
      return value !== undefined && value.baseHundredthsPerTick.val() !== 0;
    });

    if (b.owned > 1) {
      details = (
        <p>
          {b.owned} {b.plural} produisent un total de{" "}
          {prettifyNumber(
            BigNumber(value?.baseHundredthsPerTick ?? 0)
              .mult(b.owned)
              .div(10)
          )}{" "}
          ressource par seconde.
        </p>
      );
    }

    return (
      <div>
        <p>
          Chaque {b.plural} produisent{" "}
          {prettifyNumber(BigNumber(value?.baseHundredthsPerTick ?? 0).div(10))}{" "}
          ressource par seconde.
        </p>
        {details}
      </div>
    );
  };

  return (
    <div id="tooltip" style={{ top: props.tooltipTop }}>
      <h4>{b.plural}</h4>
      <p className="description">{b.description}</p>
      {ownedDetails()}
    </div>
  );
};

Tooltip.propTypes = {
  tooltipTop: PropTypes.string.isRequired,
  tooltipBuilding: PropTypes.object.isRequired
};

export default Tooltip;
