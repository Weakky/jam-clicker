import BigNumber from "big-number";

export const resourcesTypes = {
  Bois: {
    name: "Bois",
    image: "<static_url>"
  },
  Pierre: {
    name: "Pierre",
    image: "<static_url>"
  },
  Fer: {
    name: "Fer",
    image: "<static_url>"
  }
};

export const upgradesPerEras = {
  StoneAge: [
    {
      id: 1,
      name: "Hache",
      plural: "Haches",
      description: "Outil pour couper du bois",
      owned: 0,
      basePrice: BigNumber(15),
      priceOfNext: BigNumber(15),
      baseNHPT: BigNumber(1), //NHPT = Nanite Hundreths Per Tick
      baseUpgradeClick: BigNumber(1)
    },
    {
      id: 2,
      name: "Scie",
      plural: "Scies",
      description:
        "Nanites infect a humanoid host, overpowering will and creating new nanites",
      owned: 0,
      basePrice: BigNumber(100),
      priceOfNext: BigNumber(100),
      baseNHPT: BigNumber(10),
      baseUpgradeClick: BigNumber(2)
    },
    {
      id: 3,
      name: "Cabane en bois",
      plural: "Cabanes en bois",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      basePrice: BigNumber(1100),
      priceOfNext: BigNumber(1100),
      baseNHPT: BigNumber(80)
    }
  ],
  MiddleAge: [
    {
      id: 1,
      name: "Château",
      plural: "Châteaux",
      description: "Outil pour couper du bois",
      owned: 0,
      basePrice: BigNumber(15),
      priceOfNext: BigNumber(15),
      baseNHPT: BigNumber(1)
    },
    {
      id: 2,
      name: "Mine",
      plural: "Mines",
      description:
        "Nanites infect a humanoid host, overpowering will and creating new nanites",
      owned: 0,
      basePrice: BigNumber(100),
      priceOfNext: BigNumber(100),
      baseNHPT: BigNumber(10)
    },
    {
      id: 3,
      name: "Scierie",
      plural: "Scieries",
      description:
        "An entire manufactoring facility devoted to creation of new nanites",
      owned: 0,
      basePrice: BigNumber(1100),
      priceOfNext: BigNumber(1100),
      baseNHPT: BigNumber(80)
    }
  ]
};

export const eras = {
  StoneAge: {
    name: "Age de Pierre",
    resources: [resourcesTypes.Bois, resourcesTypes.Pierre],
    buildings: upgradesPerEras.StoneAge,
    resourcesToUpgrade: {
      [resourcesTypes.Bois.name]: 1000,
      [resourcesTypes.Pierre.name]: 50
    },
    getNextEra: () => eras.MiddleAge
  },
  MiddleAge: {
    name: "Moyen-Âge",
    resources: [resourcesTypes.Bois, resourcesTypes.Pierre, resourcesTypes.Fer],
    resourcesToUpgrade: {
      [resourcesTypes.Bois.name]: 1000,
      [resourcesTypes.Pierre.name]: 200,
      [resourcesTypes.Fer.name]: 50
    }
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
