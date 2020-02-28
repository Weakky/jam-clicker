import BigNumber, { BigNumberInstance } from "big-number";
import { updateTitleTag } from "../Utilities/utilities";
import { eras, Eras, Era, Upgrade, ResourceTypes } from "../game-data";

export type StateResource = {
  hundredths: BigNumberInstance;
  totalGenerated: BigNumberInstance;
  handGenerated: BigNumberInstance;
  perSecond: BigNumberInstance;
};

export type StateResources = Record<ResourceTypes, StateResource>;

export type State = {
  lastTickTime: number | null;
  buildingsOwned: number;
  eras: Eras;
  oldUpgrades: Upgrade[];
  currentEra: Era;
  tooltipActive: boolean;
  tooltipTop: string;
  tooltipBuilding: number;
} & StateResources;

const defaultState: State = {
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
  eras,
  oldUpgrades: [],
  currentEra: eras.StoneAge,
  tooltipActive: false,
  tooltipTop: "0px",
  tooltipBuilding: 1
};

function deepCloneBuildingObject(buildingObject: Upgrade): Upgrade {
  return {
    ...buildingObject,
    info: {
      ...buildingObject.info,
      Bois: buildingObject.info.Bois
        ? {
            ...buildingObject.info.Bois,
            basePrice: BigNumber(
              buildingObject.info.Bois.baseHundredthsPerTick
            ),
            priceOfNext: BigNumber(buildingObject.info.Bois.priceOfNext),
            baseHundredthsPerTick: BigNumber(
              buildingObject.info.Bois.baseHundredthsPerTick
            )
          }
        : undefined,
      Pierre: buildingObject.info.Pierre
        ? {
            ...buildingObject.info.Pierre,
            basePrice: BigNumber(
              buildingObject.info.Pierre.baseHundredthsPerTick
            ),
            priceOfNext: BigNumber(buildingObject.info.Pierre.priceOfNext),
            baseHundredthsPerTick: BigNumber(
              buildingObject.info.Pierre.baseHundredthsPerTick
            )
          }
        : undefined,
      Nourriture: buildingObject.info.Nourriture
        ? {
            ...buildingObject.info.Nourriture,
            basePrice: BigNumber(
              buildingObject.info.Nourriture.baseHundredthsPerTick
            ),
            priceOfNext: BigNumber(buildingObject.info.Nourriture.priceOfNext),
            baseHundredthsPerTick: BigNumber(
              buildingObject.info.Nourriture.baseHundredthsPerTick
            )
          }
        : undefined
    }
    // basePrice: BigNumber(buildingObject.basePrice),
    // priceOfNext: BigNumber(buildingObject.priceOfNext),
    // baseHundredthsPerTick: BigNumber(buildingObject.baseHundredthsPerTick)
  };
}

function deepCloneStateObject(stateObject: State): State {
  let upgrades: Upgrade[] = [];

  stateObject.currentEra.upgrades.forEach(b =>
    upgrades.push(deepCloneBuildingObject(b))
  );

  const oldUpgrades: Upgrade[] = [];

  stateObject.oldUpgrades.forEach(u => {
    oldUpgrades.push(deepCloneBuildingObject(u));
  });

  return {
    ...stateObject,
    Bois: {
      hundredths: BigNumber(stateObject.Bois.hundredths),
      totalGenerated: BigNumber(stateObject.Bois.totalGenerated),
      handGenerated: BigNumber(stateObject.Bois.handGenerated),
      perSecond: BigNumber(stateObject.Bois.perSecond)
    },
    Pierre: {
      hundredths: BigNumber(stateObject.Pierre.hundredths),
      totalGenerated: BigNumber(stateObject.Pierre.totalGenerated),
      handGenerated: BigNumber(stateObject.Pierre.handGenerated),
      perSecond: BigNumber(stateObject.Pierre.perSecond)
    },
    Nourriture: {
      hundredths: BigNumber(stateObject.Nourriture.hundredths),
      totalGenerated: BigNumber(stateObject.Nourriture.totalGenerated),
      handGenerated: BigNumber(stateObject.Nourriture.handGenerated),
      perSecond: BigNumber(stateObject.Nourriture.perSecond)
    },
    currentEra: {
      ...stateObject.currentEra,
      upgrades: upgrades
    },
    oldUpgrades
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
            const gainFromUpgrades = BigNumber(value!.baseHundredthsPerTick)
              .mult(up.owned)
              .mult(timingMultiplier);

            stateClone[resourceType as ResourceTypes].hundredths.plus(
              gainFromUpgrades
            );
            stateClone[resourceType as ResourceTypes].totalGenerated.plus(
              gainFromUpgrades
            );
          });
      });

      stateClone.lastTickTime = tickTime;

      return stateClone;

    case "ADD_NANITES":
      const woodClickUpgrade = state.currentEra.upgrades
        .filter(u => u.info.Bois !== undefined)
        .reduce((acc, u) => {
          return acc + u.info.Bois!.baseUpgradeClick.val() * u.owned;
        }, 0);

      const stoneClickUpgrade = state.currentEra.upgrades
        .filter(u => u.info.Pierre !== undefined)
        .reduce((acc, u) => {
          return acc + u.info.Pierre!.baseUpgradeClick.val() * u.owned;
        }, 0);

      const foodClickUpgrade = state.currentEra.upgrades
        .filter(u => u.info.Nourriture !== undefined)
        .reduce((acc, u) => {
          return acc + u.info.Nourriture!.baseUpgradeClick.val() * u.owned;
        }, 0);

      // Add to Bois
      stateClone.Bois.hundredths.plus(action.payload).plus(woodClickUpgrade);
      stateClone.Bois.totalGenerated
        .plus(action.payload)
        .plus(woodClickUpgrade);
      stateClone.Bois.handGenerated.plus(action.payload).plus(woodClickUpgrade);

      // Add to Pierre
      stateClone.Pierre.hundredths.plus(stoneClickUpgrade);
      stateClone.Pierre.totalGenerated.plus(stoneClickUpgrade);
      stateClone.Pierre.handGenerated.plus(stoneClickUpgrade);

      // Add to Nourriture
      stateClone.Nourriture.hundredths.plus(foodClickUpgrade);
      stateClone.Nourriture.totalGenerated.plus(foodClickUpgrade);
      stateClone.Nourriture.handGenerated.plus(foodClickUpgrade);

      return stateClone;

    case "BUY_BUILDING":
      let upgrade = stateClone.currentEra.upgrades.find(
        u => u.id === action.payload
      )!;

      if (!upgrade) {
        throw new Error("Could not find upgrade (gameReducer.ts:line 171)");
      }

      upgrade.owned++;

      stateClone.buildingsOwned++;

      Object.entries(upgrade.info)
        .filter(([, value]) => value !== undefined)
        .forEach(([resourceType, value]) => {
          // Add to click per seconds
          stateClone[resourceType as ResourceTypes].perSecond.plus(
            BigNumber(value!.baseHundredthsPerTick)
          );

          // Remove from total resources
          stateClone[resourceType as ResourceTypes].hundredths.minus(
            BigNumber(value!.priceOfNext).mult(100)
          );

          const multiplier = Math.floor(Math.pow(1.15, upgrade.owned) * 100);

          upgrade.info[resourceType as ResourceTypes]!.priceOfNext = BigNumber(
            value!.basePrice
          )
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
