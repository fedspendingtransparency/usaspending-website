export const placeholderNodes = [
    {
        value: '11',
        label: 'Agriculture, Forestry, Fishing and Hunting',
        count: 64,
        children: [
            {
                isPlaceHolder: true,
                label: "Placeholder Value",
                value: "children_of_11"
            }
        ]
    },
    {
        value: '21',
        label: 'Mining, Quarrying, and Oil and Gas Extraction',
        count: 7,
        children: [
            {
                isPlaceHolder: true,
                label: "Placeholder Value",
                value: "children_of_21"
            }
        ]
    },
    {
        value: '54',
        label: 'Professional, Scientific, and Technical Services',
        count: 2,
        children: [
            {
                isPlaceHolder: true,
                label: "Placeholder Value",
                value: "children_of_54"
            }
        ]
    },
    {
        value: '71',
        label: 'Arts, Entertainment, and Recreation',
        count: 5,
        children: [
            {
                isPlaceHolder: true,
                label: "Placeholder Value",
                value: "children_of_71"
            }
        ]
    }
];

export const searchResults = [{
    value: '11',
    naics: '11',
    label: 'Agriculture, Forestry, Fishing and Hunting',
    count: 64,
    children: [
        {
            value: "1111",
            naics: "1111",
            naics_description: "Oilseed and Grain Farming",
            count: 8,
            children: [
                {
                    value: "111110",
                    naics: "111110",
                    naics_description: "Soybean Farming",
                    count: 0
                }
            ]
        }
    ]
}];

export const treeWithPlaceholdersAndRealData = [
    {
        value: '11',
        naics: '11',
        naics_description: 'Agriculture, Forestry, Fishing and Hunting',
        count: 64,
        children: [
            {
                value: "1111",
                naics: "1111",
                naics_description: "Oilseed and Grain Farming",
                count: 8,
                children: [
                    {
                        value: "111110",
                        naics: "111110",
                        naics_description: "Soybean Farming",
                        count: 0
                    },
                    {
                        value: "111120",
                        naics: "111120",
                        naics_description: "Oilseed (except Soybean) Farming",
                        count: 0
                    },
                    {
                        value: "children_of_1111",
                        naics: "children_of_1111",
                        isPlaceHolder: true,
                        count: 0
                    }
                ]
            }
        ]
    }
];

export const reallyBigTree = [
    {
        naics: "11",
        naics_description: "Agriculture, Forestry, Fishing and Hunting",
        count: 64,
        children: [
            {
                naics: "1111",
                naics_description: "Oilseed and Grain Farming",
                count: 8
            },
            {
                naics: "1112",
                naics_description: "Vegetable and Melon Farming",
                count: 2
            },
            {
                naics: "1113",
                naics_description: "Fruit and Tree Nut Farming",
                count: 9
            },
            {
                naics: "1114",
                naics_description: "Greenhouse, Nursery, and Floriculture Production",
                count: 4
            },
            {
                naics: "1119",
                naics_description: "Other Crop Farming",
                count: 7
            },
            {
                naics: "1121",
                naics_description: "Cattle Ranching and Farming",
                count: 4
            },
            {
                naics: "1122",
                naics_description: "Hog and Pig Farming",
                count: 1
            },
            {
                naics: "1123",
                naics_description: "Poultry and Egg Production",
                count: 5
            },
            {
                naics: "1124",
                naics_description: "Sheep and Goat Farming",
                count: 2
            },
            {
                naics: "1125",
                naics_description: "Aquaculture",
                count: 3
            },
            {
                naics: "1129",
                naics_description: "Other Animal Production",
                count: 4
            },
            {
                naics: "1131",
                naics_description: "Timber Tract Operations",
                count: 1
            },
            {
                naics: "1132",
                naics_description: "Forest Nurseries and Gathering of Forest Products",
                count: 1
            },
            {
                naics: "1133",
                naics_description: "Logging",
                count: 1
            },
            {
                naics: "1141",
                naics_description: "Fishing",
                count: 3
            },
            {
                naics: "1142",
                naics_description: "Hunting and Trapping",
                count: 1
            },
            {
                naics: "1151",
                naics_description: "Support Activities for Crop Production",
                count: 6
            },
            {
                naics: "1152",
                naics_description: "Support Activities for Animal Production",
                count: 1
            },
            {
                naics: "1153",
                naics_description: "Support Activities for Forestry",
                count: 1,
                children: [
                    {
                        naics: "115310",
                        naics_description: "Support Activities for Forestry",
                        count: 0
                    }
                ]
            }
        ]
    },
    {
        naics: "21",
        naics_description: "Mining, Quarrying, and Oil and Gas Extraction",
        count: 32
    },
    {
        naics: "22",
        naics_description: "Utilities",
        count: 15
    },
    {
        naics: "23",
        naics_description: "Construction",
        count: 31
    },
    {
        naics: "31",
        naics_description: "Manufacturing",
        count: 133
    },
    {
        naics: "32",
        naics_description: "Manufacturing",
        count: 136
    },
    {
        naics: "33",
        naics_description: "Manufacturing",
        count: 269
    },
    {
        naics: "42",
        naics_description: "Wholesale Trade",
        count: 71
    },
    {
        naics: "44",
        naics_description: "Retail Trade",
        count: 50
    },
    {
        naics: "45",
        naics_description: "Retail Trade",
        count: 33
    },
    {
        naics: "48",
        naics_description: "Transportation and Warehousing",
        count: 50
    },
    {
        naics: "49",
        naics_description: "Transportation and Warehousing",
        count: 7
    },
    {
        naics: "51",
        naics_description: "Information",
        count: 43
    },
    {
        naics: "52",
        naics_description: "Finance and Insurance",
        count: 42
    },
    {
        naics: "53",
        naics_description: "Real Estate and Rental and Leasing",
        count: 29
    },
    {
        naics: "54",
        naics_description: "Professional, Scientific, and Technical Services",
        count: 52
    },
    {
        naics: "55",
        naics_description: "Management of Companies and Enterprises",
        count: 3
    },
    {
        naics: "56",
        naics_description: "Administrative and Support and Waste Management and Remediation Services",
        count: 45
    },
    {
        naics: "61",
        naics_description: "Educational Services",
        count: 17
    },
    {
        naics: "62",
        naics_description: "Health Care and Social Assistance",
        count: 39
    },
    {
        naics: "71",
        naics_description: "Arts, Entertainment, and Recreation",
        count: 25
    },
    {
        naics: "72",
        naics_description: "Accommodation and Food Services",
        count: 19
    },
    {
        naics: "81",
        naics_description: "Other Services (except Public Administration)",
        count: 49
    },
    {
        naics: "92",
        naics_description: "Public Administration",
        count: 29
    }
]

export const defaultProps = {
    expanded: [],
    checked: [],
    nodes: placeholderNodes,
    searchExpanded: [],
    updateNaics: () => {},
    setNaics: () => {},
    setExpanded: () => {},
    setChecked: () => {},
    removeNAICS: () => {},
    setSearchedNaics: () => {},
    addChecked: () => {},
    showNaicsTree: () => {}
};
