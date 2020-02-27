import BigNumber from "big-number";
import { updateTitleTag } from "../Utilities/utilities";
import { eras } from "../game-data";

const defaultState = {
  lastTickTime: null,
  naniteHundredths: BigNumber(1000000),
  nanitesGenerated: BigNumber(0),
  nanitesHandGenerated: BigNumber(1000000),
  buildingsOwned: 0,
  nanitesPerSecond: BigNumber(0),
  eras,
  currentEra: eras.StoneAge,
  tooltipActive: false,
  tooltipTop: "0px",
  tooltipBuilding: 1
};

function deepCloneBuildingObject(buildingObject) {
  return {
    ...buildingObject,
    basePrice: BigNumber(buildingObject.basePrice),
    priceOfNext: BigNumber(buildingObject.priceOfNext),
    baseNHPT: BigNumber(buildingObject.baseNHPT)
  };
}

function deepCloneStateObject(stateObject) {
  console.log(stateObject);
  let buildings = [];
  stateObject.currentEra.buildings.forEach(b =>
    buildings.push(deepCloneBuildingObject(b))
  );

  return {
    ...stateObject,
    naniteHundredths: BigNumber(stateObject.naniteHundredths),
    nanitesGenerated: BigNumber(stateObject.nanitesGenerated),
    nanitesHandGenerated: BigNumber(stateObject.nanitesHandGenerated),
    nanitesPerSecond: BigNumber(stateObject.nanitesPerSecond),
    buildings
  };
}

export default (state = defaultState, action) => {
  let stateClone = deepCloneStateObject(state);

  switch (action.type) {
    case "LOAD_GAME":
      let savedState = localStorage.naniteSavedGame;
      if (savedState == null) {
        return state;
      }

      savedState = JSON.parse(savedState);

      stateClone.buildings.forEach(b => {
        let saved = savedState.buildings.find(s => s.id === b.id);
        if (saved) {
          Object.assign(b, {
            ...saved,
            basePrice: BigNumber(saved.basePrice),
            priceOfNext: BigNumber(saved.priceOfNext),
            baseNHPT: BigNumber(saved.baseNHPT)
          });
        }
      });

      stateClone = {
        ...stateClone,
        lastTickTime: null,
        naniteHundredths: BigNumber(savedState.naniteHundredths),
        nanitesGenerated: BigNumber(savedState.nanitesGenerated),
        nanitesHandGenerated: BigNumber(savedState.nanitesHandGenerated),
        buildingsOwned: savedState.buildingsOwned
          ? parseInt(savedState.buildingsOwned, 10)
          : 0,
        nanitesPerSecond: BigNumber(savedState.nanitesPerSecond)
      };

      updateTitleTag(savedState.naniteHundredths);

      return stateClone;

    case "SAVE_GAME":
      let simplifiedBuildings = [];
      state.currentEra.buildings.forEach(b =>
        simplifiedBuildings.push({
          ...b,
          basePrice: b.basePrice.val(),
          priceOfNext: b.priceOfNext.val(),
          baseNHPT: b.baseNHPT.val()
        })
      );

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

      const timeingMultiplier = Math.round(lapsedMicroseconds / 100);

      state.currentEra.buildings.forEach(bld => {
        const nanitesFromBuilding = BigNumber(bld.baseNHPT)
          .mult(bld.owned)
          .mult(timeingMultiplier);
        stateClone.naniteHundredths.plus(nanitesFromBuilding);
        stateClone.nanitesGenerated.plus(nanitesFromBuilding);
      });

      stateClone.lastTickTime = tickTime;

      if (state.currentEra.resourcesToUpgrade)

      return stateClone;

    case "ADD_NANITES":
      stateClone.naniteHundredths.plus(action.payload);
      stateClone.nanitesGenerated.plus(action.payload);
      stateClone.nanitesHandGenerated.plus(action.payload);

      return stateClone;

    case "BUY_BUILDING":
      let b = stateClone.currentEra.buildings.find(
        bld => bld.id === action.payload
      );
      b.owned++;

      stateClone.buildingsOwned++;
      stateClone.nanitesPerSecond.plus(BigNumber(b.baseNHPT));

      stateClone.naniteHundredths.minus(BigNumber(b.priceOfNext).mult(100));

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
