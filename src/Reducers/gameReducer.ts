import BigNumber, { BigNumberInstance } from "big-number";
import { updateTitleTag } from "../Utilities/utilities";
import { eras, Eras, Era, Upgrade } from "../game-data";

type State = {
  lastTickTime: number | null;
  buildingsOwned: number;
  Bois: {
    naniteHundredths: BigNumberInstance;
    nanitesGenerated: BigNumberInstance;
    nanitesHandGenerated: BigNumberInstance;
    nanitesPerSecond: BigNumberInstance;
  };
  Pierre: {
    naniteHundredths: BigNumberInstance;
    nanitesGenerated: BigNumberInstance;
    nanitesHandGenerated: BigNumberInstance;
    nanitesPerSecond: BigNumberInstance;
  };
  Nourriture: {
    naniteHundredths: BigNumberInstance;
    nanitesGenerated: BigNumberInstance;
    nanitesHandGenerated: BigNumberInstance;
    nanitesPerSecond: BigNumberInstance;
  };
  eras: Eras;
  currentEra: Era;
  tooltipActive: boolean;
  tooltipTop: string;
  tooltipBuilding: number;
};

const defaultState: State = {
  lastTickTime: null,
  buildingsOwned: 0,
  Bois: {
    naniteHundredths: BigNumber(0),
    nanitesGenerated: BigNumber(0),
    nanitesHandGenerated: BigNumber(1000000),
    nanitesPerSecond: BigNumber(0)
  },
  Pierre: {
    naniteHundredths: BigNumber(0),
    nanitesGenerated: BigNumber(0),
    nanitesHandGenerated: BigNumber(0),
    nanitesPerSecond: BigNumber(0)
  },
  Nourriture: {
    naniteHundredths: BigNumber(0),
    nanitesGenerated: BigNumber(0),
    nanitesHandGenerated: BigNumber(0),
    nanitesPerSecond: BigNumber(0)
  },
  eras,
  currentEra: eras.StoneAge,
  tooltipActive: false,
  tooltipTop: "0px",
  tooltipBuilding: 1
};

function deepCloneBuildingObject(buildingObject: Upgrade): Upgrade {
  return {
    ...buildingObject,
    basePrice: BigNumber(buildingObject.basePrice),
    priceOfNext: BigNumber(buildingObject.priceOfNext),
    baseNHPT: BigNumber(buildingObject.baseNHPT)
  };
}

function deepCloneStateObject(stateObject: State): State {
  let upgrades: Upgrade[] = [];

  stateObject.currentEra.upgrades.forEach(b =>
    upgrades.push(deepCloneBuildingObject(b))
  );

  return {
    ...stateObject,
    Bois: {
      naniteHundredths: BigNumber(stateObject.Bois.naniteHundredths),
      nanitesGenerated: BigNumber(stateObject.Bois.nanitesGenerated),
      nanitesHandGenerated: BigNumber(stateObject.Bois.nanitesHandGenerated),
      nanitesPerSecond: BigNumber(stateObject.Bois.nanitesPerSecond)
    },
    currentEra: {
      ...stateObject.currentEra,
      upgrades: upgrades
    }
  };
}

export default (state = defaultState, action: any) => {
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
      state.currentEra.upgrades.forEach(b =>
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

      const timingMultiplier = Math.round(lapsedMicroseconds / 100);

      state.currentEra.upgrades.forEach(up => {
        const nanitesFromBuilding = BigNumber(up.baseNHPT)
          .mult(up.owned)
          .mult(timingMultiplier);

        stateClone[up.resourceType].naniteHundredths.plus(nanitesFromBuilding);
        stateClone[up.resourceType].nanitesGenerated.plus(nanitesFromBuilding);
      });

      stateClone.lastTickTime = tickTime;

      return stateClone;

    case "ADD_NANITES":
      const clickUpgrades = state.currentEra.upgrades.reduce((acc, bld) => {
        return acc + bld.baseUpgradeClick.val() * bld.owned;
      }, 0);

      action.payload += clickUpgrades;

      stateClone.Bois.naniteHundredths.plus(action.payload);
      stateClone.Bois.nanitesGenerated.plus(action.payload);
      stateClone.Bois.nanitesHandGenerated.plus(action.payload);

      return stateClone;

    case "BUY_BUILDING":
      let b = stateClone.currentEra.upgrades.find(
        bld => bld.id === action.payload
      )!;

      if (!b) {
        throw new Error("Could not find upgrade (gameReducer.ts:line 171)");
      }

      b.owned++;

      stateClone.buildingsOwned++;
      stateClone.Bois.nanitesPerSecond.plus(BigNumber(b.baseNHPT));

      stateClone.Bois.naniteHundredths.minus(
        BigNumber(b.priceOfNext).mult(100)
      );

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
