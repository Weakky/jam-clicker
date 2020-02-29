import React from "react";
import PropTypes from "prop-types";
import BigNumber from "big-number";
import { prettifyNumber } from "../Utilities/utilities";
const Tooltip = props => {
    const b = props.tooltipBuilding;
    const ownedDetails = () => {
        var _a, _b, _c, _d;
        if (b.owned === 0) {
            return "";
        }
        let details = "";
        const value = Object.values(b.info).find(value => {
            return value !== undefined && value.baseHundredthsPerTick.val() !== 0;
        });
        if (b.owned > 1) {
            details = (React.createElement("p", null,
                b.owned,
                " ",
                b.plural,
                " produisent un total de",
                " ",
                prettifyNumber(BigNumber((_b = (_a = value) === null || _a === void 0 ? void 0 : _a.baseHundredthsPerTick, (_b !== null && _b !== void 0 ? _b : 0)))
                    .mult(b.owned)
                    .div(10)),
                " ",
                "ressource par seconde."));
        }
        return (React.createElement("div", null,
            React.createElement("p", null,
                "Chaque ",
                b.plural,
                " produisent",
                " ",
                prettifyNumber(BigNumber((_d = (_c = value) === null || _c === void 0 ? void 0 : _c.baseHundredthsPerTick, (_d !== null && _d !== void 0 ? _d : 0))).div(10)),
                " ",
                "ressource par seconde."),
            details));
    };
    return (React.createElement("div", { id: "tooltip", style: { top: props.tooltipTop } },
        React.createElement("h4", null, b.plural),
        React.createElement("p", { className: "description" }, b.description),
        ownedDetails()));
};
Tooltip.propTypes = {
    tooltipTop: PropTypes.string.isRequired,
    tooltipBuilding: PropTypes.object.isRequired
};
export default Tooltip;
