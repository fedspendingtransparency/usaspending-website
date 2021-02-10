/* eslint-disable quote-props */
import { cleanPscData } from "../../../../../src/js/helpers/pscHelper";

export const defaultProps = {
    setPscNodes: () => {},
    setExpandedPsc: () => {},
    setCheckedPsc: () => {},
    setSearchedPsc: () => {},
    setPscCounts: () => {},
    addCheckedPsc: () => {},
    showPscTree: jest.fn(),
    setUncheckedPsc: () => {},
    stagePsc: () => {},
    expanded: [],
    checked: [],
    unchecked: [],
    checkedFromHash: [],
    uncheckedFromHash: [],
    nodes: [],
    searchExpanded: [],
    counts: []
};

export const topTierResponse = {
    "results": [
        {
            "id": "Research and Development",
            "value": "Research and Development",
            "ancestors": [],
            "description": "",
            "count": 815,
            "children": null
        },
        {
            "id": "Service",
            "ancestors": [],
            "description": "",
            "count": 2017,
            "children": null
        },
        {
            "id": "Product",
            "ancestors": [],
            "description": "",
            "count": 687,
            "children": null
        }
    ]
};

export const secondTierResponse = {
    "results": [
        {
            "id": "B",
            "ancestors": [
                "Service"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS, NOT R&D",
            "count": 48,
            "children": null
        },
        {
            "id": "C",
            "ancestors": [
                "Service"
            ],
            "description": "ARCHITECT/ENGINEER SERVICES",
            "count": 101,
            "children": null
        },
        {
            "id": "D",
            "ancestors": [
                "Service"
            ],
            "description": "ADP AND TELECOMMUNICATIONS",
            "count": 25,
            "children": null
        },
        {
            "id": "E",
            "ancestors": [
                "Service"
            ],
            "description": "PURCHASE OF STRUCTURES/FACILITIES",
            "count": 145,
            "children": null
        },
        {
            "id": "F",
            "ancestors": [
                "Service"
            ],
            "description": "NATURAL RESOURCES MANAGEMENT",
            "count": 42,
            "children": null
        },
        {
            "id": "G",
            "ancestors": [
                "Service"
            ],
            "description": "SOCIAL SERVICES",
            "count": 11,
            "children": null
        },
        {
            "id": "H",
            "ancestors": [
                "Service"
            ],
            "description": "QUALITY CONTROL, TEST, INSPECTION",
            "count": 312,
            "children": null
        },
        {
            "id": "J",
            "ancestors": [
                "Service"
            ],
            "description": "MAINT, REPAIR, REBUILD EQUIPMENT",
            "count": 80,
            "children": null
        },
        {
            "id": "K",
            "ancestors": [
                "Service"
            ],
            "description": "MODIFICATION OF EQUIPMENT",
            "count": 78,
            "children": null
        },
        {
            "id": "L",
            "ancestors": [
                "Service"
            ],
            "description": "TECHNICAL REPRESENTATIVE SVCS.",
            "count": 78,
            "children": null
        },
        {
            "id": "M",
            "ancestors": [
                "Service"
            ],
            "description": "OPERATION OF GOVT OWNED FACILITY",
            "count": 145,
            "children": null
        },
        {
            "id": "N",
            "ancestors": [
                "Service"
            ],
            "description": "INSTALLATION OF EQUIPMENT",
            "count": 78,
            "children": null
        },
        {
            "id": "P",
            "ancestors": [
                "Service"
            ],
            "description": "SALVAGE SERVICES",
            "count": 6,
            "children": null
        },
        {
            "id": "Q",
            "ancestors": [
                "Service"
            ],
            "description": "MEDICAL SERVICES",
            "count": 41,
            "children": null
        },
        {
            "id": "R",
            "ancestors": [
                "Service"
            ],
            "description": "SUPPORT SVCS (PROF, ADMIN, MGMT)",
            "count": 142,
            "children": null
        },
        {
            "id": "S",
            "ancestors": [
                "Service"
            ],
            "description": "UTILITIES AND HOUSEKEEPING",
            "count": 27,
            "children": null
        },
        {
            "id": "T",
            "ancestors": [
                "Service"
            ],
            "description": "PHOTO, MAP, PRINT, PUBLICATION",
            "count": 17,
            "children": null
        },
        {
            "id": "U",
            "ancestors": [
                "Service"
            ],
            "description": "EDUCATION AND TRAINING",
            "count": 15,
            "children": null
        },
        {
            "id": "V",
            "ancestors": [
                "Service"
            ],
            "description": "TRANSPORT, TRAVEL, RELOCATION",
            "count": 37,
            "children": null
        },
        {
            "id": "W",
            "ancestors": [
                "Service"
            ],
            "description": "LEASE/RENT EQUIPMENT",
            "count": 78,
            "children": null
        },
        {
            "id": "X",
            "ancestors": [
                "Service"
            ],
            "description": "LEASE/RENT FACILITIES",
            "count": 145,
            "children": null
        },
        {
            "id": "Y",
            "ancestors": [
                "Service"
            ],
            "description": "CONSTRUCT OF STRUCTURES/FACILITIES",
            "count": 146,
            "children": null
        },
        {
            "id": "Z",
            "ancestors": [
                "Service"
            ],
            "description": "MAINT, REPAIR, ALTER REAL PROPERTY",
            "count": 220,
            "children": null
        }
    ]
};

export const thirdTierResponse = {
    "results": [
        {
            "id": "B5",
            "ancestors": [
                "Service",
                "B"
            ],
            "description": "SPECIAL STUDIES - NOT R and D",
            "count": 48,
            "children": null
        }
    ]
};

export const fourthTierResponse = {
    "results": [
        {
            "id": "B502",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- AIR QUALITY",
            "count": 0,
            "children": null
        },
        {
            "id": "B503",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ARCHEOLOGICAL/PALEONTOLOGICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B504",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- CHEMICAL/BIOLOGICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B505",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- COST BENEFIT",
            "count": 0,
            "children": null
        },
        {
            "id": "B506",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- DATA (OTHER THAN SCIENTIFIC)",
            "count": 0,
            "children": null
        },
        {
            "id": "B507",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ECONOMIC",
            "count": 0,
            "children": null
        },
        {
            "id": "B509",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ENDANGERED SPECIES: PLANT/ANIMAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B510",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ENVIRONMENTAL ASSESSMENTS",
            "count": 0,
            "children": null
        },
        {
            "id": "B511",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "",
            "count": 0,
            "children": null
        },
        {
            "id": "B512",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "",
            "count": 0,
            "children": null
        },
        {
            "id": "B513",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- FEASIBILITY (NON-CONSTRUCTION)",
            "count": 0,
            "children": null
        },
        {
            "id": "B516",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ANIMAL/FISHERIES",
            "count": 0,
            "children": null
        },
        {
            "id": "B517",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- GEOLOGICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B518",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- GEOPHYSICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B519",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- GEOTECHNICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B520",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- GRAZING/RANGE",
            "count": 0,
            "children": null
        },
        {
            "id": "B521",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- HISTORICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B522",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- LEGAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B524",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- MATHEMATICAL/STATISTICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B525",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- NATURAL RESOURCE",
            "count": 0,
            "children": null
        },
        {
            "id": "B526",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- OCEANOLOGICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B527",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- RECREATION",
            "count": 0,
            "children": null
        },
        {
            "id": "B528",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- REGULATORY",
            "count": 0,
            "children": null
        },
        {
            "id": "B529",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- SCIENTIFIC DATA",
            "count": 0,
            "children": null
        },
        {
            "id": "B530",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- SEISMOLOGICAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B532",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- SOIL",
            "count": 0,
            "children": null
        },
        {
            "id": "B533",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- WATER QUALITY",
            "count": 0,
            "children": null
        },
        {
            "id": "B534",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- WILDLIFE",
            "count": 0,
            "children": null
        },
        {
            "id": "B537",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- MEDICAL/HEALTH",
            "count": 0,
            "children": null
        },
        {
            "id": "B538",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- INTELLIGENCE",
            "count": 0,
            "children": null
        },
        {
            "id": "B539",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- AERONAUTICAL/SPACE",
            "count": 0,
            "children": null
        },
        {
            "id": "B540",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- BUILDING TECHNOLOGY",
            "count": 0,
            "children": null
        },
        {
            "id": "B541",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- DEFENSE",
            "count": 0,
            "children": null
        },
        {
            "id": "B542",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- EDUCATIONAL",
            "count": 0,
            "children": null
        },
        {
            "id": "B543",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ENERGY",
            "count": 0,
            "children": null
        },
        {
            "id": "B544",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- TECHNOLOGY",
            "count": 0,
            "children": null
        },
        {
            "id": "B545",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- HOUSING/COMMUNITY DEVELOPMENT",
            "count": 0,
            "children": null
        },
        {
            "id": "B546",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- SECURITY (PHYSICAL/PERSONAL)",
            "count": 0,
            "children": null
        },
        {
            "id": "B547",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ACCOUNTING/FINANCIAL MANAGEMENT",
            "count": 0,
            "children": null
        },
        {
            "id": "B548",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- TRADE ISSUE",
            "count": 0,
            "children": null
        },
        {
            "id": "B549",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- FOREIGN/NATIONAL SECURITY POLICY",
            "count": 0,
            "children": null
        },
        {
            "id": "B550",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ORGANIZATION/ADMINISTRATIVE/PERSONNEL",
            "count": 0,
            "children": null
        },
        {
            "id": "B551",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- MOBILIZATION/PREPAREDNESS",
            "count": 0,
            "children": null
        },
        {
            "id": "B552",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- MANPOWER",
            "count": 0,
            "children": null
        },
        {
            "id": "B553",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- COMMUNICATIONS",
            "count": 0,
            "children": null
        },
        {
            "id": "B554",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ACQUISITION POLICY/PROCEDURES",
            "count": 0,
            "children": null
        },
        {
            "id": "B555",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- ELDERLY/HANDICAPPED",
            "count": 0,
            "children": null
        },
        {
            "id": "B599",
            "ancestors": [
                "Service",
                "B",
                "B5"
            ],
            "description": "SPECIAL STUDIES/ANALYSIS- OTHER",
            "count": 0,
            "children": null
        }
    ]
};

export const reallyBigTree = cleanPscData([
    {
        "id": "Research and Development",
        "ancestors": [],
        "description": "",
        "count": 815,
        "children": [
            {
                "id": "AA",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "AGRICULTURE R&D",
                "count": 32,
                "children": null
            },
            {
                "id": "AB",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "COMMUNITY SERVICE/DEVELOPMENT R&D",
                "count": 40,
                "children": null
            },
            {
                "id": "AC",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "DEFENSE SYSTEMS R&D",
                "count": 56,
                "children": [
                    {
                        "id": "AC2",
                        "ancestors": [
                            "Research and Development",
                            "AC"
                        ],
                        "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS",
                        "count": 8,
                        "children": [
                            {
                                "id": "AC21",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (BASIC RESEARCH)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC23",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (ADVANCED DEVELOPMENT)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC24",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (ENGINEERING DEVELOPMENT)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC25",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (OPERATIONAL SYSTEMS DEVELOPMENT)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC26",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (MANAGEMENT/SUPPORT)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC27",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D- DEFENSE SYSTEM: MISSILE/SPACE SYSTEMS (COMMERCIALIZED)",
                                "count": 0,
                                "children": []
                            },
                            {
                                "id": "AC20",
                                "ancestors": [
                                    "Research and Development",
                                    "AC",
                                    "AC2"
                                ],
                                "description": "R&D-MISSILE & SPACE SYS",
                                "count": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "id": "AD",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "DEFENSE (OTHER) R&D",
                "count": 56,
                "children": null
            },
            {
                "id": "AE",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "ECONOMIC GROWTH/PRODUCTIVITY R&D",
                "count": 32,
                "children": null
            },
            {
                "id": "AF",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "EDUCATION R and D",
                "count": 8,
                "children": null
            },
            {
                "id": "AG",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "ENERGY R&D",
                "count": 72,
                "children": null
            },
            {
                "id": "AH",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "ENVIRONMENTAL PROTECTION R&D",
                "count": 40,
                "children": null
            },
            {
                "id": "AJ",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "GEN. SCIENCE/TECHNOLOGY R&D",
                "count": 58,
                "children": null
            },
            {
                "id": "AK",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "HOUSING R&D",
                "count": 8,
                "children": null
            },
            {
                "id": "AL",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "INCOME SECURITY R&D",
                "count": 24,
                "children": null
            },
            {
                "id": "AM",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "INTERNATIONAL AFFAIR/COOPERAT R&D",
                "count": 8,
                "children": null
            },
            {
                "id": "AN",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "MEDICAL R&D",
                "count": 71,
                "children": null
            },
            {
                "id": "AP",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "NATURAL RESOURCES R&D",
                "count": 54,
                "children": null
            },
            {
                "id": "AQ",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "SOCIAL SERVICES R&D",
                "count": 16,
                "children": null
            },
            {
                "id": "AR",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "SPACE R&D",
                "count": 56,
                "children": null
            },
            {
                "id": "AS",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "TRANSPORTATION (MODAL) R&D",
                "count": 40,
                "children": null
            },
            {
                "id": "AT",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "TRANSPORTATION (OTHER) R&D",
                "count": 71,
                "children": null
            },
            {
                "id": "AU",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "TRANSPORTATION (OBSOLETE GROUP)",
                "count": 0,
                "children": null
            },
            {
                "id": "AV",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "MINING R&D",
                "count": 64,
                "children": null
            },
            {
                "id": "AZ",
                "ancestors": [
                    "Research and Development"
                ],
                "description": "OTHER RESEARCH/DEVELOPMENT",
                "count": 8,
                "children": null
            }
        ]
    },
    {
        "id": "Product",
        "ancestors": [],
        "description": "",
        "count": 687,
        "children": [
            {
                "id": "10",
                "ancestors": [
                    "Product"
                ],
                "description": "WEAPONS",
                "count": 16,
                "children": null
            },
            {
                "id": "11",
                "ancestors": [
                    "Product"
                ],
                "description": "NUCLEAR ORDNANCE",
                "count": 12,
                "children": null
            },
            {
                "id": "12",
                "ancestors": [
                    "Product"
                ],
                "description": "FIRE CONTROL EQPT.",
                "count": 12,
                "children": null
            },
            {
                "id": "26",
                "ancestors": [
                    "Product"
                ],
                "description": "TIRES AND TUBES",
                "count": 4,
                "children": null
            },
            {
                "id": "13",
                "ancestors": [
                    "Product"
                ],
                "description": "AMMUNITION AND EXPLOSIVES",
                "count": 32,
                "children": null
            },
            {
                "id": "14",
                "ancestors": [
                    "Product"
                ],
                "description": "GUIDED MISSLES",
                "count": 7,
                "children": null
            },
            {
                "id": "15",
                "ancestors": [
                    "Product"
                ],
                "description": "AEROSPACE CRAFT AND STRUCTURAL COMPONENTS",
                "count": 6,
                "children": null
            },
            {
                "id": "16",
                "ancestors": [
                    "Product"
                ],
                "description": "AEROSPACE CRAFT COMPONENTS AND ACCESSORIES",
                "count": 11,
                "children": null
            },
            {
                "id": "17",
                "ancestors": [
                    "Product"
                ],
                "description": "AEROSPACE CRAFT LAUNCHING, LANDING, GROUND HANDLING AND SERVICING EQUIPMENT",
                "count": 6,
                "children": null
            },
            {
                "id": "19",
                "ancestors": [
                    "Product"
                ],
                "description": "SHIPS, SMALL CRAFT, PONTOON, DOCKS",
                "count": 30,
                "children": null
            },
            {
                "id": "20",
                "ancestors": [
                    "Product"
                ],
                "description": "SHIP AND MARINE EQUIPMENT",
                "count": 7,
                "children": null
            },
            {
                "id": "22",
                "ancestors": [
                    "Product"
                ],
                "description": "RAILWAY EQUIPMENT",
                "count": 5,
                "children": null
            },
            {
                "id": "23",
                "ancestors": [
                    "Product"
                ],
                "description": "MOTOR VEHICLES, CYCLES, TRAILERS",
                "count": 7,
                "children": null
            },
            {
                "id": "24",
                "ancestors": [
                    "Product"
                ],
                "description": "TRACTORS",
                "count": 3,
                "children": null
            },
            {
                "id": "25",
                "ancestors": [
                    "Product"
                ],
                "description": "VEHICULAR EQUIPMENT COMPONENTS",
                "count": 6,
                "children": null
            },
            {
                "id": "28",
                "ancestors": [
                    "Product"
                ],
                "description": "ENGINES AND TURBINES AND COMPONENT",
                "count": 11,
                "children": null
            },
            {
                "id": "29",
                "ancestors": [
                    "Product"
                ],
                "description": "ENGINE ACCESSORIES",
                "count": 11,
                "children": null
            },
            {
                "id": "30",
                "ancestors": [
                    "Product"
                ],
                "description": "MECHANICAL POWER TRANSMISSION EQPT",
                "count": 4,
                "children": null
            },
            {
                "id": "31",
                "ancestors": [
                    "Product"
                ],
                "description": "BEARINGS",
                "count": 3,
                "children": null
            },
            {
                "id": "32",
                "ancestors": [
                    "Product"
                ],
                "description": "WOODWORKING MACHINERY AND EQPT",
                "count": 3,
                "children": null
            },
            {
                "id": "34",
                "ancestors": [
                    "Product"
                ],
                "description": "METALWORKING MACHINERY",
                "count": 37,
                "children": null
            },
            {
                "id": "35",
                "ancestors": [
                    "Product"
                ],
                "description": "SERVICE AND TRADE EQPT",
                "count": 6,
                "children": null
            },
            {
                "id": "36",
                "ancestors": [
                    "Product"
                ],
                "description": "SPECIAL INDUSTRY MACHINERY",
                "count": 20,
                "children": null
            },
            {
                "id": "37",
                "ancestors": [
                    "Product"
                ],
                "description": "AGRICULTURAL MACHINERY AND EQPT",
                "count": 7,
                "children": null
            },
            {
                "id": "38",
                "ancestors": [
                    "Product"
                ],
                "description": "CONSTRUCT/MINE/EXCAVATE/HIGHWY EQPT",
                "count": 8,
                "children": null
            },
            {
                "id": "39",
                "ancestors": [
                    "Product"
                ],
                "description": "MATERIALS HANDLING EQPT",
                "count": 8,
                "children": null
            },
            {
                "id": "40",
                "ancestors": [
                    "Product"
                ],
                "description": "ROPE, CABLE, CHAIN, FITTINGS",
                "count": 3,
                "children": null
            },
            {
                "id": "73",
                "ancestors": [
                    "Product"
                ],
                "description": "FOOD PREPARATION/SERVING EQPT",
                "count": 6,
                "children": null
            },
            {
                "id": "41",
                "ancestors": [
                    "Product"
                ],
                "description": "REFRIG, AIR CONDIT/CIRCULAT EQPT",
                "count": 5,
                "children": null
            },
            {
                "id": "42",
                "ancestors": [
                    "Product"
                ],
                "description": "FIRE/RESCUE/SAFETY; ENVIRO PROTECT",
                "count": 6,
                "children": null
            },
            {
                "id": "43",
                "ancestors": [
                    "Product"
                ],
                "description": "PUMPS AND COMPRESSORS",
                "count": 3,
                "children": null
            },
            {
                "id": "44",
                "ancestors": [
                    "Product"
                ],
                "description": "FURNACE/STEAM/DRYING; NUCL REACTOR",
                "count": 6,
                "children": null
            },
            {
                "id": "45",
                "ancestors": [
                    "Product"
                ],
                "description": "PLUMBING, HEATING, WASTE DISPOSAL",
                "count": 4,
                "children": null
            },
            {
                "id": "46",
                "ancestors": [
                    "Product"
                ],
                "description": "WATER PURIFICATION/SEWAGE TREATMENT",
                "count": 3,
                "children": null
            },
            {
                "id": "47",
                "ancestors": [
                    "Product"
                ],
                "description": "PIPE, TUBING, HOSE, AND FITTINGS",
                "count": 3,
                "children": null
            },
            {
                "id": "48",
                "ancestors": [
                    "Product"
                ],
                "description": "VALVES",
                "count": 2,
                "children": null
            },
            {
                "id": "49",
                "ancestors": [
                    "Product"
                ],
                "description": "MAINT/REPAIR SHOP EQPT",
                "count": 13,
                "children": null
            },
            {
                "id": "51",
                "ancestors": [
                    "Product"
                ],
                "description": "HAND TOOLS",
                "count": 7,
                "children": null
            },
            {
                "id": "52",
                "ancestors": [
                    "Product"
                ],
                "description": "MEASURING TOOLS",
                "count": 3,
                "children": null
            },
            {
                "id": "53",
                "ancestors": [
                    "Product"
                ],
                "description": "HARDWARE AND ABRASIVES",
                "count": 18,
                "children": null
            },
            {
                "id": "54",
                "ancestors": [
                    "Product"
                ],
                "description": "PREFAB STRUCTURES/SCAFFOLDING",
                "count": 8,
                "children": null
            },
            {
                "id": "55",
                "ancestors": [
                    "Product"
                ],
                "description": "LUMBER, MILLWORK, PLYWOOD, VENEER",
                "count": 3,
                "children": null
            },
            {
                "id": "56",
                "ancestors": [
                    "Product"
                ],
                "description": "CONSTRUCTION AND BUILDING MATERIAL",
                "count": 9,
                "children": null
            },
            {
                "id": "58",
                "ancestors": [
                    "Product"
                ],
                "description": "COMM/DETECT/COHERENT RADIATION",
                "count": 20,
                "children": null
            },
            {
                "id": "59",
                "ancestors": [
                    "Product"
                ],
                "description": "ELECTRICAL/ELECTRONIC EQPT COMPNTS",
                "count": 26,
                "children": null
            },
            {
                "id": "63",
                "ancestors": [
                    "Product"
                ],
                "description": "ALARM, SIGNAL, SECURITY DETECTION",
                "count": 5,
                "children": null
            },
            {
                "id": "60",
                "ancestors": [
                    "Product"
                ],
                "description": "FIBER OPTIC",
                "count": 24,
                "children": null
            },
            {
                "id": "61",
                "ancestors": [
                    "Product"
                ],
                "description": "ELECTRIC WIRE, POWER DISTRIB EQPT",
                "count": 13,
                "children": null
            },
            {
                "id": "62",
                "ancestors": [
                    "Product"
                ],
                "description": "LIGHTING FIXTURES, LAMPS",
                "count": 6,
                "children": null
            },
            {
                "id": "65",
                "ancestors": [
                    "Product"
                ],
                "description": "MEDICAL/DENTAL/VETERINARY EQPT/SUPP",
                "count": 14,
                "children": null
            },
            {
                "id": "66",
                "ancestors": [
                    "Product"
                ],
                "description": "INSTRUMENTS AND LABORATORY EQPT",
                "count": 19,
                "children": null
            },
            {
                "id": "67",
                "ancestors": [
                    "Product"
                ],
                "description": "PHOTOGRAPHIC EQPT",
                "count": 8,
                "children": null
            },
            {
                "id": "68",
                "ancestors": [
                    "Product"
                ],
                "description": "CHEMICALS AND CHEMICAL PRODUCTS",
                "count": 5,
                "children": null
            },
            {
                "id": "69",
                "ancestors": [
                    "Product"
                ],
                "description": "TRAINING AIDS AND DEVICES",
                "count": 4,
                "children": null
            },
            {
                "id": "70",
                "ancestors": [
                    "Product"
                ],
                "description": "INFORMATION TECHNOLOGY EQUIPMENT (INCLD FIRMWARE) SOFTWARE,SUPPLIES& SUPPORT EQUIPMENT",
                "count": 11,
                "children": null
            },
            {
                "id": "71",
                "ancestors": [
                    "Product"
                ],
                "description": "FURNITURE",
                "count": 4,
                "children": null
            },
            {
                "id": "72",
                "ancestors": [
                    "Product"
                ],
                "description": "HOUSEHOLD/COMMERC FURNISH/APPLIANCE",
                "count": 5,
                "children": null
            },
            {
                "id": "74",
                "ancestors": [
                    "Product"
                ],
                "description": "OFFICE MACH/TEXT PROCESS/VISIB REC",
                "count": 6,
                "children": null
            },
            {
                "id": "75",
                "ancestors": [
                    "Product"
                ],
                "description": "OFFICE SUPPLIES AND DEVICES",
                "count": 4,
                "children": null
            },
            {
                "id": "76",
                "ancestors": [
                    "Product"
                ],
                "description": "BOOKS, MAPS, OTHER PUBLICATIONS",
                "count": 11,
                "children": null
            },
            {
                "id": "77",
                "ancestors": [
                    "Product"
                ],
                "description": "MUSICAL INST/PHONOGRAPH/HOME RADIO",
                "count": 5,
                "children": null
            },
            {
                "id": "78",
                "ancestors": [
                    "Product"
                ],
                "description": "RECREATIONAL/ATHLETIC EQPT",
                "count": 3,
                "children": null
            },
            {
                "id": "79",
                "ancestors": [
                    "Product"
                ],
                "description": "CLEANING EQPT AND SUPPLIES",
                "count": 3,
                "children": null
            },
            {
                "id": "80",
                "ancestors": [
                    "Product"
                ],
                "description": "BRUSHES, PAINTS, SEALERS, ADHESIVES",
                "count": 4,
                "children": null
            },
            {
                "id": "81",
                "ancestors": [
                    "Product"
                ],
                "description": "CONTAINERS/PACKAGING/PACKING SUPPL",
                "count": 10,
                "children": null
            },
            {
                "id": "83",
                "ancestors": [
                    "Product"
                ],
                "description": "TEXTILE/LEATHER/FUR; TENT; FLAG",
                "count": 9,
                "children": null
            },
            {
                "id": "84",
                "ancestors": [
                    "Product"
                ],
                "description": "CLOTHING, INDIVIDUAL EQUIPMENT, INSIGNA, AND JEWELRY",
                "count": 16,
                "children": null
            },
            {
                "id": "85",
                "ancestors": [
                    "Product"
                ],
                "description": "TOILETRIES",
                "count": 4,
                "children": null
            },
            {
                "id": "87",
                "ancestors": [
                    "Product"
                ],
                "description": "AGRICULTURAL SUPPLIES",
                "count": 3,
                "children": null
            },
            {
                "id": "88",
                "ancestors": [
                    "Product"
                ],
                "description": "LIVE ANIMALS",
                "count": 2,
                "children": null
            },
            {
                "id": "89",
                "ancestors": [
                    "Product"
                ],
                "description": "SUBSISTENCE",
                "count": 17,
                "children": null
            },
            {
                "id": "91",
                "ancestors": [
                    "Product"
                ],
                "description": "FUELS, LUBRICANTS, OILS, WAXES",
                "count": 6,
                "children": null
            },
            {
                "id": "93",
                "ancestors": [
                    "Product"
                ],
                "description": "NONMETALLIC FABRICATED MATERIALS",
                "count": 6,
                "children": null
            },
            {
                "id": "94",
                "ancestors": [
                    "Product"
                ],
                "description": "NONMETALLIC CRUDE MATERIALS",
                "count": 5,
                "children": null
            },
            {
                "id": "95",
                "ancestors": [
                    "Product"
                ],
                "description": "METAL BARS, SHEETS, SHAPES",
                "count": 9,
                "children": null
            },
            {
                "id": "96",
                "ancestors": [
                    "Product"
                ],
                "description": "ORES, MINERALS AND PRIMARY PRODUCTS",
                "count": 8,
                "children": null
            },
            {
                "id": "99",
                "ancestors": [
                    "Product"
                ],
                "description": "MISCELLANEOUS",
                "count": 8,
                "children": null
            }
        ]
    },
    {
        "id": "Service",
        "ancestors": [],
        "description": "",
        "count": 2017,
        "children": [
            {
                "id": "B",
                "ancestors": [
                    "Service"
                ],
                "description": "SPECIAL STUDIES/ANALYSIS, NOT R&D",
                "count": 48,
                "children": null
            },
            {
                "id": "C",
                "ancestors": [
                    "Service"
                ],
                "description": "ARCHITECT/ENGINEER SERVICES",
                "count": 101,
                "children": null
            },
            {
                "id": "E",
                "ancestors": [
                    "Service"
                ],
                "description": "PURCHASE OF STRUCTURES/FACILITIES",
                "count": 145,
                "children": null
            },
            {
                "id": "F",
                "ancestors": [
                    "Service"
                ],
                "description": "NATURAL RESOURCES MANAGEMENT",
                "count": 42,
                "children": null
            },
            {
                "id": "G",
                "ancestors": [
                    "Service"
                ],
                "description": "SOCIAL SERVICES",
                "count": 11,
                "children": null
            },
            {
                "id": "H",
                "ancestors": [
                    "Service"
                ],
                "description": "QUALITY CONTROL, TEST, INSPECTION",
                "count": 312,
                "children": null
            },
            {
                "id": "J",
                "ancestors": [
                    "Service"
                ],
                "description": "MAINT, REPAIR, REBUILD EQUIPMENT",
                "count": 80,
                "children": null
            },
            {
                "id": "K",
                "ancestors": [
                    "Service"
                ],
                "description": "MODIFICATION OF EQUIPMENT",
                "count": 78,
                "children": null
            },
            {
                "id": "L",
                "ancestors": [
                    "Service"
                ],
                "description": "TECHNICAL REPRESENTATIVE SVCS.",
                "count": 78,
                "children": null
            },
            {
                "id": "M",
                "ancestors": [
                    "Service"
                ],
                "description": "OPERATION OF GOVT OWNED FACILITY",
                "count": 145,
                "children": null
            },
            {
                "id": "N",
                "ancestors": [
                    "Service"
                ],
                "description": "INSTALLATION OF EQUIPMENT",
                "count": 78,
                "children": null
            },
            {
                "id": "P",
                "ancestors": [
                    "Service"
                ],
                "description": "SALVAGE SERVICES",
                "count": 6,
                "children": null
            },
            {
                "id": "Q",
                "ancestors": [
                    "Service"
                ],
                "description": "MEDICAL SERVICES",
                "count": 41,
                "children": null
            },
            {
                "id": "R",
                "ancestors": [
                    "Service"
                ],
                "description": "SUPPORT SVCS (PROF, ADMIN, MGMT)",
                "count": 142,
                "children": null
            },
            {
                "id": "S",
                "ancestors": [
                    "Service"
                ],
                "description": "UTILITIES AND HOUSEKEEPING",
                "count": 27,
                "children": null
            },
            {
                "id": "T",
                "ancestors": [
                    "Service"
                ],
                "description": "PHOTO, MAP, PRINT, PUBLICATION",
                "count": 17,
                "children": null
            },
            {
                "id": "U",
                "ancestors": [
                    "Service"
                ],
                "description": "EDUCATION AND TRAINING",
                "count": 15,
                "children": null
            },
            {
                "id": "V",
                "ancestors": [
                    "Service"
                ],
                "description": "TRANSPORT, TRAVEL, RELOCATION",
                "count": 37,
                "children": null
            },
            {
                "id": "W",
                "ancestors": [
                    "Service"
                ],
                "description": "LEASE/RENT EQUIPMENT",
                "count": 78,
                "children": null
            },
            {
                "id": "X",
                "ancestors": [
                    "Service"
                ],
                "description": "LEASE/RENT FACILITIES",
                "count": 145,
                "children": null
            },
            {
                "id": "Y",
                "ancestors": [
                    "Service"
                ],
                "description": "CONSTRUCT OF STRUCTURES/FACILITIES",
                "count": 146,
                "children": null
            },
            {
                "id": "Z",
                "ancestors": [
                    "Service"
                ],
                "description": "MAINT, REPAIR, ALTER REAL PROPERTY",
                "count": 220,
                "children": null
            },
            {
                "id": "D",
                "ancestors": [
                    "Service"
                ],
                "description": "ADP AND TELECOMMUNICATIONS",
                "count": 25,
                "children": [
                    {
                        "id": "D301",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- FACILITY OPERATION AND MAINTENANCE",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D302",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- SYSTEMS DEVELOPMENT",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D303",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- DATA ENTRY",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D304",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- TELECOMMUNICATIONS AND TRANSMISSION",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D305",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM – TELEPROCESSING, TIMESHARE, CLOUD COMPUTING, AND HIGH PERFORMANCE COMPUTING",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D306",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- SYSTEMS ANALYSIS",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D307",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- IT STRATEGY AND ARCHITECTURE",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D308",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- PROGRAMMING",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D309",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- INFORMATION AND DATA BROADCASTING OR DATA DISTRIBUTION",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D310",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- CYBER SECURITY AND DATA BACKUP",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D311",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- DATA CONVERSION",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D312",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- OPTICAL SCANNING",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D313",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- COMPUTER AIDED DESIGN/COMPUTER AIDED MANUFACTURING (CAD/CAM)",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D314",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- SYSTEM ACQUISITION SUPPORT",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D315",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- DIGITIZING",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D316",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- TELECOMMUNICATIONS NETWORK MANAGEMENT",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D317",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- WEB-BASED SUBSCRIPTION",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D318",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- INTEGRATED HARDWARE/SOFTWARE/SERVICES SOLUTIONS, PREDOMINANTLY SERVICES",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D319",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- ANNUAL SOFTWARE MAINTENANCE SERVICE PLANS",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D320",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- ANNUAL HARDWARE MAINTENANCE SERVICE PLANS",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D321",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- HELP DESK",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D322",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- INTERNET",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D324",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- BUSINESS CONTINUITY",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D325",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- DATA CENTERS AND STORAGE",
                        "count": 0,
                        "children": null
                    },
                    {
                        "id": "D399",
                        "ancestors": [
                            "Service",
                            "D",
                            "D3"
                        ],
                        "description": "IT AND TELECOM- OTHER IT AND TELECOMMUNICATIONS",
                        "count": 0,
                        "children": null
                    }
                ]
            }
        ]
    }]);

export const partialSearchResults = {
    results: [
        {
            "id": "Service",
            "ancestors": [],
            "description": "",
            "count": 2028,
            "children": [
                {
                    "id": "G",
                    "ancestors": ["Service"],
                    "description": "SOCIAL SERVICES",
                    "count": 11,
                    "children": [
                        {
                            "id": "G0",
                            "ancestors": ["Service", "G"],
                            "description": "SOCIAL SERVICES",
                            "count": 11,
                            "children": null
                        }
                    ]
                }
            ]
        }
    ]
};
