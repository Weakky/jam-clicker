import BigNumber from "big-number";
import { eras } from "../game-data";
const defaultState = {
    lastTickTime: null,
    buildingsOwned: 0,
    Bois: {
        hundredths: BigNumber(0),
        generated: BigNumber(0),
        handGenerated: BigNumber(1000000),
        perSecond: BigNumber(0)
    },
    Pierre: {
        hundredths: BigNumber(0),
        generated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    Nourriture: {
        hundredths: BigNumber(0),
        generated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    eras,
    currentEra: eras.StoneAge,
    tooltipActive: false,
    tooltipTop: "0px",
    tooltipBuilding: 1
};
function deepCloneBuildingObject(buildingObject) {
    return Object.assign(Object.assign({}, buildingObject), { basePrice: BigNumber(buildingObject.basePrice), priceOfNext: BigNumber(buildingObject.priceOfNext), baseNHPT: BigNumber(buildingObject.baseNHPT) });
}
function deepCloneStateObject(stateObject) {
    let upgrades = [];
    stateObject.currentEra.upgrades.forEach(b => upgrades.push(deepCloneBuildingObject(b)));
    return Object.assign(Object.assign({}, stateObject), { Bois: {
            hundredths: BigNumber(stateObject.Bois.hundredths),
            generated: BigNumber(stateObject.Bois.generated),
            handGenerated: BigNumber(stateObject.Bois.handGenerated),
            perSecond: BigNumber(stateObject.Bois.perSecond)
        }, currentEra: Object.assign(Object.assign({}, stateObject.currentEra), { upgrades: upgrades }) });
}
export default (state = defaultState, action) => {
    let stateClone = deepCloneStateObject(state);
    switch (action.type) {
        case "LOAD_GAME":
            let savedState = localStorage.naniteSavedGame;
            if (savedState == null) {
                return state;
            }
            // savedState = JSON.parse(savedState) as State;
            // stateClone.currentEra.buildings.forEach(b => {
            //   let saved = (savedState as State).currentEra.buildings.find(
            //     s => s.id === b.id
            //   );
            //   if (saved) {
            //     Object.assign(b, {
            //       ...saved,
            //       basePrice: BigNumber(saved.basePrice),
            //       priceOfNext: BigNumber(saved.priceOfNext),
            //       baseNHPT: BigNumber(saved.baseNHPT)
            //     });
            //   }
            // });
            // stateClone = {
            //   ...stateClone,
            //   lastTickTime: null,
            //   naniteHundredths: BigNumber(savedState.naniteHundredths),
            //   nanitesGenerated: BigNumber(savedState.nanitesGenerated),
            //   nanitesHandGenerated: BigNumber(savedState.nanitesHandGenerated),
            //   buildingsOwned: savedState.buildingsOwned
            //     ? parseInt(savedState.buildingsOwned, 10)
            //     : 0,
            //   nanitesPerSecond: BigNumber(savedState.nanitesPerSecond)
            // };
            // updateTitleTag(savedState.naniteHundredths);
            return stateClone;
        case "SAVE_GAME":
            let simplifiedBuildings = [];
            state.currentEra.upgrades.forEach(b => simplifiedBuildings.push(Object.assign(Object.assign({}, b), { basePrice: b.basePrice.val(), priceOfNext: b.priceOfNext.val(), baseNHPT: b.baseNHPT.val() })));
            // TODO: Save to localstorage
            // localStorage.naniteSavedGame = JSON.stringify({
            //   naniteHundredths: state.naniteHundredths.val(),
            //   nanitesGenerated: state.nanitesGenerated.val(),
            //   nanitesHandGenerated: state.nanitesHandGenerated.val(),
            //   buildingsOwned: state.buildingsOwned,
            //   nanitesPerSecond: state.nanitesPerSecond.val(),
            //   buildings: simplifiedBuildings
            // });
            console.info("Game Saved");
            return state;
        case "CLEAR_SAVE":
            localStorage.removeItem("naniteSavedGame");
            return deepCloneStateObject(defaultState);
        case "TICK":
            const tickTime = Date.now();
            let lapsedMicroseconds = 100;
            if (state.lastTickTime) {
                lapsedMicroseconds = tickTime - state.lastTickTime;
            }
            const timingMultiplier = Math.round(lapsedMicroseconds / 100);
            state.currentEra.upgrades.forEach(up => {
                const nanitesFromBuilding = BigNumber(up.baseNHPT)
                    .mult(up.owned)
                    .mult(timingMultiplier);
                stateClone[up.resourceType].hundredths.plus(nanitesFromBuilding);
                stateClone[up.resourceType].generated.plus(nanitesFromBuilding);
            });
            stateClone.lastTickTime = tickTime;
            return stateClone;
        case "ADD_NANITES":
            const clickUpgrades = state.currentEra.upgrades.reduce((acc, bld) => {
                return acc + bld.baseUpgradeClick.val() * bld.owned;
            }, 0);
            action.payload += clickUpgrades;
            stateClone.Bois.hundredths.plus(action.payload);
            stateClone.Bois.generated.plus(action.payload);
            stateClone.Bois.handGenerated.plus(action.payload);
            return stateClone;
        case "BUY_BUILDING":
            let b = stateClone.currentEra.upgrades.find(bld => bld.id === action.payload);
            if (!b) {
                throw new Error("Could not find upgrade (gameReducer.ts:line 171)");
            }
            b.owned++;
            stateClone.buildingsOwned++;
            stateClone.Bois.perSecond.plus(BigNumber(b.baseNHPT));
            stateClone.Bois.hundredths.minus(BigNumber(b.priceOfNext).mult(100));
            const multiplier = Math.floor(Math.pow(1.15, b.owned) * 100);
            b.priceOfNext = BigNumber(b.basePrice)
                .mult(multiplier)
                .div(100);
            return stateClone;
        case "HIDE_TOOLTIP":
            stateClone.tooltipActive = false;
            return stateClone;
        case "MOVE_TOOLTIP":
            stateClone.tooltipActive = true;
            stateClone.tooltipBuilding = action.payload.buildingId;
            stateClone.tooltipTop = action.payload.mouseY;
            return stateClone;
        default:
            return state;
    }
};
