import BigNumber from "big-number";
export const resourcesTypes = {
    Bois: {
        name: "Bois",
        image: "Ressources/primary/wood.svg"
    },
    Pierre: {
        name: "Pierre",
        image: "Ressources/primary/stone.svg"
    },
    Nourriture: {
        name: "Nourriture",
        image: "Ressources/primary/food.svg"
    },
    Or: {
        name: "Or",
        image: "Ressources/primary/stone.svg"
    },
    Population: {
        name: "Population",
        image: "Ressources/primary/stone.svg"
    }
};
export const upgradesPerEras = {
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
                    basePrice: BigNumber(10),
                    priceOfNext: BigNumber(10),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000)
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
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0)
                },
                Pierre: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000)
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
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0),
                    basePrice: BigNumber(15),
                    priceOfNext: BigNumber(15)
                },
                Nourriture: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000)
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
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 8,
            type: "event",
            name: "Travail du fer",
            plural: "Travails du fer",
            description: "Travail du fer",
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
                }
            }
        },
        {
            id: 9,
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
            info: {
                Bois: {
                    basePrice: BigNumber(50),
                    priceOfNext: BigNumber(50),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(5000)
                }
            }
        },
        {
            id: 2,
            type: "tool",
            name: "Pioches en métal",
            plural: "Piches en métal",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Bois: {
                    basePrice: BigNumber(50),
                    priceOfNext: BigNumber(50),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0)
                },
                Pierre: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(5000)
                }
            }
        },
        {
            id: 3,
            type: "tool",
            name: "Arc",
            plural: "Arcs",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Bois: {
                    basePrice: BigNumber(50),
                    priceOfNext: BigNumber(50),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0)
                },
                Nourriture: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(5000)
                }
            }
        },
        {
            id: 5,
            name: "Scierie",
            plural: "Scieries",
            type: "tool",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Bois: {
                    basePrice: BigNumber(2100),
                    priceOfNext: BigNumber(1100),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 4,
            name: "Armurerie",
            plural: "Armureries",
            type: "tool",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Pierre: {
                    basePrice: BigNumber(2100),
                    priceOfNext: BigNumber(1100),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 6,
            name: "Boucherie",
            plural: "Boucheries",
            type: "tool",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Nourriture: {
                    basePrice: BigNumber(2100),
                    priceOfNext: BigNumber(1100),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 7,
            name: "Artisanat",
            plural: "Artisanats",
            type: "event",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Bois: {
                    basePrice: BigNumber(50000),
                    priceOfNext: BigNumber(50000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                },
                Pierre: {
                    basePrice: BigNumber(50000),
                    priceOfNext: BigNumber(50000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                },
                Nourriture: {
                    basePrice: BigNumber(50000),
                    priceOfNext: BigNumber(50000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 8,
            name: "Decouverte de l'acier",
            plural: "Decouvertes de l'acier",
            type: "event",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Bois: {
                    basePrice: BigNumber(75000),
                    priceOfNext: BigNumber(75000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                },
                Pierre: {
                    basePrice: BigNumber(75000),
                    priceOfNext: BigNumber(75000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                },
                Nourriture: {
                    basePrice: BigNumber(75000),
                    priceOfNext: BigNumber(75000),
                    baseHundredthsPerTick: BigNumber(1000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 9,
            name: "Monnaie",
            plural: "Monnaies",
            type: "event",
            description: "An entire manufactoring facility devoted to creation of new nanites",
            owned: 0,
            info: {
                Bois: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                },
                Pierre: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                },
                Nourriture: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(5000),
                    baseUpgradeClick: BigNumber(0)
                }
            },
            getNextEra: () => eras.IndustrialAge
        }
    ],
    IndustrialAge: [
        {
            id: 1,
            type: "event",
            name: "Immeuble",
            plural: "Immeubles",
            description: "Outil pour couper du bois",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(1000001),
                    priceOfNext: BigNumber(1000001),
                    baseHundredthsPerTick: BigNumber(1000000),
                    baseUpgradeClick: BigNumber(0)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(10000000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 2,
            type: "event",
            name: "Publicité",
            plural: "Publicités",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(1000001),
                    priceOfNext: BigNumber(1000001),
                    baseHundredthsPerTick: BigNumber(1000000),
                    baseUpgradeClick: BigNumber(0)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(10000000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 3,
            type: "event",
            name: "Internet",
            plural: "Internets",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(1000001),
                    priceOfNext: BigNumber(1000001),
                    baseHundredthsPerTick: BigNumber(1000000),
                    baseUpgradeClick: BigNumber(0)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(10000000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 4,
            type: "event",
            name: "Balistique",
            plural: "Balistiqes",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(10000000),
                    priceOfNext: BigNumber(10000000),
                    baseHundredthsPerTick: BigNumber(10000000),
                    baseUpgradeClick: BigNumber(0)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(-10000000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 5,
            type: "event",
            name: "Programme Spatial",
            plural: "Programme Spatiaux",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(40000000),
                    priceOfNext: BigNumber(40000000),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(5000000000)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(-5000000000)
                }
            }
        },
        {
            id: 6,
            type: "event",
            name: "Projet Yggdrasil",
            plural: "Projets Ygggrasils",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(10000000000),
                    priceOfNext: BigNumber(10000000000),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(0)
                    // buyOnlyOnce: true
                },
                Population: {
                    basePrice: BigNumber(0),
                    priceOfNext: BigNumber(0),
                    baseHundredthsPerTick: BigNumber(-10000000000000000),
                    baseUpgradeClick: BigNumber(-10000000000000000)
                    // buyOnlyOnce: true
                }
            }
        },
        {
            id: 7,
            type: "tool",
            name: "Tronçonneuse",
            plural: "Tronçonneuses",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000000)
                }
            }
        },
        {
            id: 8,
            type: "tool",
            name: "Foreuse",
            plural: "Foreuses",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000000)
                }
            }
        },
        {
            id: 9,
            type: "tool",
            name: "Fusil",
            plural: "Fusils",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(100000),
                    priceOfNext: BigNumber(100000),
                    baseHundredthsPerTick: BigNumber(0),
                    baseUpgradeClick: BigNumber(1000000)
                }
            }
        },
        {
            id: 10,
            type: "tool",
            name: "Fonderie",
            plural: "Fonderies",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(200000),
                    priceOfNext: BigNumber(200000),
                    baseHundredthsPerTick: BigNumber(100000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 11,
            type: "tool",
            name: "Exploitation forestière",
            plural: "Exploitation forestières",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(200000),
                    priceOfNext: BigNumber(200000),
                    baseHundredthsPerTick: BigNumber(100000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        },
        {
            id: 12,
            type: "tool",
            name: "Abattoir",
            plural: "Abattoirs",
            description: "Nanites infect a humanoid host, overpowering will and creating new nanites",
            owned: 0,
            // resourceType: "Bois",
            info: {
                Or: {
                    basePrice: BigNumber(200000),
                    priceOfNext: BigNumber(200000),
                    baseHundredthsPerTick: BigNumber(100000),
                    baseUpgradeClick: BigNumber(0)
                }
            }
        }
    ]
};
export const eras = {
    StoneAge: {
        name: "Age de Pierre",
        resources: [
            resourcesTypes.Bois,
            resourcesTypes.Pierre,
            resourcesTypes.Nourriture
        ],
        upgrades: upgradesPerEras.StoneAge,
        backgroundSoundPath: "/Stone_Age.wav",
        quotes: [
            "Pierre ?.. - Présent ! - Pierre ?.. - Présent...",
            "Pierre qui roule amasse le bois… Non attends c’est pas ça !",
            "Un homme s’est écrié “YABADABADOU !” avant de partir à dos de dinosaures, nous sommes toujours à se recherche…",
            "Dernier le Dinosaure a été retrouvé hier, vous gagnez 1200 de nourriture (mais personne n’osera en manger)",
            "Je vois une porte rouge et je veux la peindre en noir… Plus aucune couleur, je les veux en noir…",
            "Vos villageois ont érigés un cercle de pierre en hommage à une divinité, elle vous ressemble étrangement d’ailleurs..."
        ],
        earthImagePath: ""
    },
    MiddleAge: {
        name: "Moyen-Âge",
        resources: [
            resourcesTypes.Bois,
            resourcesTypes.Pierre,
            resourcesTypes.Nourriture
        ],
        upgrades: upgradesPerEras.MiddleAge,
        backgroundSoundPath: "/Medieval_Age.wav",
        quotes: [
            "Le nouveau morceau du barde “La complainte de la serveuse” fait un tabac, il sera à Chnafon dans 2 jours",
            "Une OVNI (Oiseau Volant non identifié) a été aperçu non loin des côtes Sud, il cracherait du feu et serait accompagné d’un âne et d’un ogre...",
            'Les athéistes du monde entier ont trouvés une religion à base de diamant: "Nous avions tort depuis le début !"',
            "Un aventurier simule une fausse blessure par flèche au genou",
            "C’est pas faux"
        ],
        earthImagePath: ""
    },
    IndustrialAge: {
        name: "Âge de l'industrialisation",
        resources: [resourcesTypes.Or, resourcesTypes.Population],
        upgrades: upgradesPerEras.IndustrialAge,
        backgroundSoundPath: "/Industrial_Age.wav",
        quotes: [
            "Vous venez de rencontrer un drôle de bonhomme avec un monocle et un haut de forme… Il a l’air sympathique après tout !",
            "Je sors d’une réunion avec un certain Ronald… Sa sandwicherie a l’air d’avoir de l’avenir !",
            "L’acier va révolutionner le monde de l’industrie” s’exclame un économiste connu.",
            "Afin de protéger le monde de la dévastation !” s’exprime le 1er ministre sur la construction d’une usine d’armes.",
            "Mon clavir st foutu, la touche ntr “z” t “r” n fonctionn plus, aidz moi svp !"
        ],
        earthImagePath: ""
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
