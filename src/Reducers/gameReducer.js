import BigNumber from "big-number";
import { eras } from "../game-data";
const defaultState = {
    lastTickTime: null,
    buildingsOwned: 0,
    Bois: {
        hundredths: BigNumber(10000000),
        totalGenerated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    Pierre: {
        hundredths: BigNumber(10000000),
        totalGenerated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    Nourriture: {
        hundredths: BigNumber(10000000),
        totalGenerated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    Or: {
        hundredths: BigNumber(10000000),
        totalGenerated: BigNumber(0),
        handGenerated: BigNumber(0),
        perSecond: BigNumber(0)
    },
    eras,
    oldUpgrades: [],
    currentEra: eras.StoneAge,
    tooltipActive: false,
    tooltipTop: "0px",
    tooltipBuilding: 1
};
function deepCloneBuildingObject(buildingObject) {
    return Object.assign(Object.assign({}, buildingObject), { info: Object.assign(Object.assign({}, buildingObject.info), { Bois: buildingObject.info.Bois
                ? Object.assign(Object.assign({}, buildingObject.info.Bois), { basePrice: BigNumber(buildingObject.info.Bois.basePrice), priceOfNext: BigNumber(buildingObject.info.Bois.priceOfNext), baseHundredthsPerTick: BigNumber(buildingObject.info.Bois.baseHundredthsPerTick) }) : undefined, Pierre: buildingObject.info.Pierre
                ? Object.assign(Object.assign({}, buildingObject.info.Pierre), { basePrice: BigNumber(buildingObject.info.Pierre.basePrice), priceOfNext: BigNumber(buildingObject.info.Pierre.priceOfNext), baseHundredthsPerTick: BigNumber(buildingObject.info.Pierre.baseHundredthsPerTick) }) : undefined, Nourriture: buildingObject.info.Nourriture
                ? Object.assign(Object.assign({}, buildingObject.info.Nourriture), { basePrice: BigNumber(buildingObject.info.Nourriture.basePrice), priceOfNext: BigNumber(buildingObject.info.Nourriture.priceOfNext), baseHundredthsPerTick: BigNumber(buildingObject.info.Nourriture.baseHundredthsPerTick) }) : undefined }) });
}
function deepCloneStateObject(stateObject) {
    let upgrades = [];
    stateObject.currentEra.upgrades.forEach(b => upgrades.push(deepCloneBuildingObject(b)));
    const oldUpgrades = [];
    stateObject.oldUpgrades.forEach(u => {
        oldUpgrades.push(deepCloneBuildingObject(u));
    });
    return Object.assign(Object.assign({}, stateObject), { Bois: {
            hundredths: BigNumber(stateObject.Bois.hundredths),
            totalGenerated: BigNumber(stateObject.Bois.totalGenerated),
            handGenerated: BigNumber(stateObject.Bois.handGenerated),
            perSecond: BigNumber(stateObject.Bois.perSecond)
        }, Pierre: {
            hundredths: BigNumber(stateObject.Pierre.hundredths),
            totalGenerated: BigNumber(stateObject.Pierre.totalGenerated),
            handGenerated: BigNumber(stateObject.Pierre.handGenerated),
            perSecond: BigNumber(stateObject.Pierre.perSecond)
        }, Nourriture: {
            hundredths: BigNumber(stateObject.Nourriture.hundredths),
            totalGenerated: BigNumber(stateObject.Nourriture.totalGenerated),
            handGenerated: BigNumber(stateObject.Nourriture.handGenerated),
            perSecond: BigNumber(stateObject.Nourriture.perSecond)
        }, currentEra: Object.assign(Object.assign({}, stateObject.currentEra), { upgrades: upgrades }), oldUpgrades });
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
            // let simplifiedBuildings = [];
            // state.currentEra.upgrades.forEach(b =>
            //   simplifiedBuildings.push({
            //     ...b,
            //     basePrice: b.basePrice.val(),
            //     priceOfNext: b.priceOfNext.val(),
            //     baseNHPT: b.baseHundredthsPerTick.val()
            //   })
            // );
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
            const allUpgrades = [...state.currentEra.upgrades, ...state.oldUpgrades];
            allUpgrades.forEach(up => {
                Object.entries(up.info)
                    .filter(([, value]) => value !== undefined)
                    .forEach(([resourceType, value]) => {
                    const gainFromUpgrades = BigNumber(value.baseHundredthsPerTick)
                        .mult(up.owned)
                        .mult(timingMultiplier);
                    stateClone[resourceType].hundredths.plus(gainFromUpgrades);
                    stateClone[resourceType].totalGenerated.plus(gainFromUpgrades);
                });
            });
            stateClone.lastTickTime = tickTime;
            return stateClone;
        case "ADD_NANITES":
            const resourcesNames = state.currentEra.resources.map(r => r.name);
            resourcesNames.forEach(resourceName => {
                const clickUpgrades = state.currentEra.upgrades
                    .filter(u => u.info[resourceName] !== undefined)
                    .reduce((acc, u) => {
                    return acc + u.info[resourceName].baseUpgradeClick.val() * u.owned;
                }, 0);
                // const stoneClickUpgrade = state.currentEra.upgrades
                //   .filter(u => u.info.Pierre !== undefined)
                //   .reduce((acc, u) => {
                //     return acc + u.info.Pierre!.baseUpgradeClick.val() * u.owned;
                //   }, 0);
                // const foodClickUpgrade = state.currentEra.upgrades
                //   .filter(u => u.info.Nourriture !== undefined)
                //   .reduce((acc, u) => {
                //     return acc + u.info.Nourriture!.baseUpgradeClick.val() * u.owned;
                //   }, 0);
                // Add to Bois
                if (resourceName === "Bois") {
                    stateClone.Bois.hundredths.plus(action.payload).plus(clickUpgrades);
                    stateClone.Bois.totalGenerated
                        .plus(action.payload)
                        .plus(clickUpgrades);
                    stateClone.Bois.handGenerated
                        .plus(action.payload)
                        .plus(clickUpgrades);
                }
                else {
                    // Add to Pierre
                    stateClone[resourceName].hundredths.plus(clickUpgrades);
                    stateClone[resourceName].totalGenerated.plus(clickUpgrades);
                    stateClone[resourceName].handGenerated.plus(clickUpgrades);
                }
            });
            return stateClone;
        case "BUY_BUILDING":
            let upgrade = stateClone.currentEra.upgrades.find(u => u.id === action.payload);
            if (!upgrade) {
                throw new Error("Could not find upgrade (gameReducer.ts:line 171)");
            }
            upgrade.owned++;
            stateClone.buildingsOwned++;
            Object.entries(upgrade.info)
                .filter(([, value]) => value !== undefined)
                .forEach(([resourceType, value]) => {
                // Add to click per seconds
                stateClone[resourceType].perSecond.plus(BigNumber(value.baseHundredthsPerTick));
                // Remove from total resources
                stateClone[resourceType].hundredths.minus(BigNumber(value.priceOfNext).mult(100));
                const multiplier = Math.floor(Math.pow(1.15, upgrade.owned) * 100);
                value.priceOfNext = BigNumber(value.basePrice)
                    .mult(multiplier)
                    .div(100);
            });
            if (upgrade.getNextEra) {
                const oldEra = stateClone.currentEra;
                stateClone.oldUpgrades = [
                    ...stateClone.oldUpgrades,
                    ...oldEra.upgrades
                ];
                stateClone.currentEra = upgrade.getNextEra();
            }
            console.log(stateClone);
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
