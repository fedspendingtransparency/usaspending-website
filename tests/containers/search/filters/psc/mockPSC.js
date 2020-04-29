export const mockPSC = {
    results: [
        { product_or_service_code: "1375" },
        { product_or_service_code: "R415" },
        { product_or_service_code: "8415" },
        { product_or_service_code: "S215" },
        { product_or_service_code: "R615" },
        { product_or_service_code: "1190" },
        { product_or_service_code: "1367" },
        { product_or_service_code: "1305" },
        { product_or_service_code: "6515" },
        { product_or_service_code: "6015" }
    ]
};

export const defaultProps = {
    setPscNodes: () => {},
    setExpandedPsc: () => {},
    setCheckedPsc: () => {},
    setSearchedPsc: () => {},
    setPscCounts: () => {},
    // restoreHashedFilters: () => {},
    addCheckedPsc: () => {},
    showPscTree: () => {},
    setUncheckedPsc: () => {},
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
