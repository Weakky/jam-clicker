import BigNumber, { BigNumberInstance } from "big-number";

export type ResourceType = {
  name: string;
  image: string;
};

export type ResourceTypes = "Bois" | "Pierre" | "Nourriture";

export const resourcesTypes: Record<ResourceTypes, ResourceType> = {
  Bois: {
    name: "Bois",
    image: "<static_url>"
  },
  Pierre: {
    name: "Pierre",
    image: "<static_url>"
  },
  Nourriture: {
    name: "Nourriture",
    image: "<static_url>"
  }
};

type ErasType = "StoneAge" | "MiddleAge";

export type UpgradeType = "tool" | "event";

type Cost = {
  basePrice: BigNumberInstance;
  priceOfNext: BigNumberInstance;
  baseHundredthsPerTick: BigNumberInstance; //NHPT = Nanite Hundreths Per Tick
  baseUpgradeClick: BigNumberInstance;
};

type CostPerResource = {
  [P in ResourceTypes]?: Cost;
};

export type Upgrade = {
  id: number;
  type: UpgradeType;
  name: string;
  plural: string;
  description: string;
  owned: number;
  info: CostPerResource;
  getNextEra?: () => Era;
};
export type UpgradesPerEras = Record<ErasType, Upgrade[]>;

export const upgradesPerEras: UpgradesPerEras = {
  StoneAge: [
    {
      id: 1,
      type: "tool",
      name: "Hache",
      plural: "Haches",
      description: "Outil pour couper du bois",
      owned: 0,
      // resourceType: "Bois",
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(0), //NHPT = Nanite Hundreths Per Tick
          baseUpgradeClick: BigNumber(100)
        }
      }
    },
    {
      id: 2,
      type: "tool",
      name: "Pioche",
      plural: "Pioches",
      description: "Outil pour récolter de la pierre",
      owned: 0,
      // resourceType: "Pierre",
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(0), //NHPT = Nanite Hundreths Per Tick
          baseUpgradeClick: BigNumber(0)
        },
        Pierre: {
          basePrice: BigNumber(0),
          priceOfNext: BigNumber(0),
          baseHundredthsPerTick: BigNumber(0), //NHPT = Nanite Hundreths Per Tick
          baseUpgradeClick: BigNumber(100)
        }
      }
    },
    {
      id: 3,
      type: "tool",
      name: "Lance",
      plural: "Lances",
      description: "Outil pour récolter de la nourriture",
      owned: 0,
      // resourceType: "Nourriture",
      info: {
        Bois: {
          baseHundredthsPerTick: BigNumber(0), //NHPT = Nanite Hundreths Per Tick
          baseUpgradeClick: BigNumber(0),
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15)
        },
        Nourriture: {
          basePrice: BigNumber(0),
          priceOfNext: BigNumber(0),
          baseHundredthsPerTick: BigNumber(0), //NHPT = Nanite Hundreths Per Tick
          baseUpgradeClick: BigNumber(100)
        }
      }
    },
    {
      id: 4,
      type: "event",
      name: "Cabane en bois",
      plural: "Cabane en bois",
      description: "Récolte de bois automatisée",
      owned: 0,
      // resourceType: "Bois",
      info: {
        Bois: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 8,
      type: "event",
      name: "Château",
      plural: "Châteaux",
      description: "Passage au Moyen-Âge",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        },
        Pierre: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        },
        Nourriture: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        }
      },
      getNextEra() {
        return eras.MiddleAge;
      }
    },
    {
      id: 5,
      type: "tool",
      name: "Mine",
      plural: "Mines",
      description: "Récolte de pierre automatisée",
      owned: 0,
      // resourceType: "Pierre",
      info: {
        Pierre: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 6,
      type: "tool",
      name: "Camp de bûcheron",
      plural: "Camp de bûcherons",
      description: "Récolte de bois automatisée",
      owned: 0,
      // resourceType: "Bois",
      info: {
        Bois: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 7,
      type: "tool",
      name: "Elevage",
      plural: "Elevages",
      description: "Récolte de nourriture automatisée",
      owned: 0,
      // resourceType: "Nourriture",
      info: {
        Nourriture: {
          basePrice: BigNumber(1100),
          priceOfNext: BigNumber(1100),
          baseHundredthsPerTick: BigNumber(80),
          baseUpgradeClick: BigNumber(0)
        }
      }
    }
  ],
  MiddleAge: [
    {
      id: 1,
      type: "tool",
      name: "Scies à main",
      plural: "Scies à main",
      description: "Outil pour couper du bois",
      owned: 0,
      // resourceType: "Bois",
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 2,
      type: "tool",
      name: "Pioches en métal",
      plural: "Piches en métal",
      description:
        "Nanites infect a humanoid host, overpowering will and creating new nanites",
      owned: 0,
      // resourceType: "Bois",
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 3,
      type: "tool",
      name: "Arc",
      plural: "Arcs",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 4,
      name: "Armurerie",
      plural: "Armureries",
      type: "tool",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 5,
      name: "Scierie",
      plural: "Scieries",
      type: "tool",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 6,
      name: "Boucherie",
      plural: "Boucheries",
      type: "tool",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 7,
      name: "Artisanat",
      plural: "Artisanats",
      type: "event",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    },
    {
      id: 8,
      name: "Decouverte de l'acier",
      plural: "Decouvertes de l'acier",
      type: "event",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      info: {
        Bois: {
          basePrice: BigNumber(15),
          priceOfNext: BigNumber(15),
          baseHundredthsPerTick: BigNumber(1),
          baseUpgradeClick: BigNumber(0)
        }
      }
    }
  ]
};

export type Era = {
  name: string;
  resources: ResourceType[];
  upgrades: Upgrade[];
  resourcesToUpgrade: Record<string, number>;
  getNextEra: () => Era | undefined;
};

export type Eras = Record<ErasType, Era>;

export const eras: Eras = {
  StoneAge: {
    name: "Age de Pierre",
    resources: [resourcesTypes.Bois, resourcesTypes.Pierre],
    upgrades: upgradesPerEras.StoneAge,
    resourcesToUpgrade: {
      [resourcesTypes.Bois.name]: 1000,
      [resourcesTypes.Pierre.name]: 50
    },
    getNextEra: () => eras.MiddleAge
  },
  MiddleAge: {
    name: "Moyen-Âge",
    resources: [
      resourcesTypes.Bois,
      resourcesTypes.Pierre,
      resourcesTypes.Nourriture
    ],
    upgrades: upgradesPerEras.MiddleAge,
    resourcesToUpgrade: {
      [resourcesTypes.Bois.name]: 10000000,
      [resourcesTypes.Pierre.name]: 20000,
      [resourcesTypes.Nourriture.name]: 50
    },
    getNextEra: () => undefined
  }
};

// {
//   id: 4,
//   name: "Colony",
//   plural: "Colonies",
//   description:
//     "A city-sized amalgamation of nanite-generating production line",
//   owned: 0,
//   basePrice: BigNumber(12000),
//   priceOfNext: BigNumber(12000),
//   baseNHPT: BigNumber(470)
// },
// {
//   id: 5,
//   name: "Space Station",
//   plural: "Stations",
//   description:
//     "A massive structure in orbit that solely exists to create more nanites",
//   owned: 0,
//   basePrice: BigNumber(130000),
//   priceOfNext: BigNumber(130000),
//   baseNHPT: BigNumber(2600)
// },
// {
//   id: 6,
//   name: "Planet",
//   plural: "Planets",
//   description:
//     "Your nanites take over an entire world and slowly convert all its natural resources into nanites",
//   owned: 0,
//   basePrice: BigNumber(1400000),
//   priceOfNext: BigNumber(1400000),
//   baseNHPT: BigNumber(14000)
// },
// {
//   id: 7,
//   name: "Nebula",
//   plural: "Nebulae",
//   description:
//     "A star-system's worth of space gas, providing a base material for the generation of nanites",
//   owned: 0,
//   basePrice: BigNumber(20000000),
//   priceOfNext: BigNumber(20000000),
//   baseNHPT: BigNumber(78000)
// },
// {
//   id: 8,
//   name: "Galaxy",
//   plural: "Galaxies",
//   description:
//     "A collection of billions of stars, completely overrun with self-replicating nanites",
//   owned: 0,
//   basePrice: BigNumber(330000000),
//   priceOfNext: BigNumber(330000000),
//   baseNHPT: BigNumber(440000)
// },
// {
//   id: 9,
//   name: "Alternate Dimension",
//   plural: "Dimensions",
//   description:
//     'Your nanites have ripped through the very fabric of space-time itself and consumed all that exists on the "other side"',
//   owned: 0,
//   basePrice: BigNumber(5100000000),
//   priceOfNext: BigNumber(5100000000),
//   baseNHPT: BigNumber(2600000)
// }
