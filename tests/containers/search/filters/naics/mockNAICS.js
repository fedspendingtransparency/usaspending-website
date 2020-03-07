import { List } from 'immutable';

export const mockNAICS = {
    results: [
        {
            naics: "332993",
            naics_description: "AMMUNITION (EXCEPT SMALL ARMS) MANUFACTURING"
        },
        {
            naics: "333293",
            naics_description: "PRINTING MACHINERY AND EQUIPMENT MANUFACTURING"
        },
        {
            naics: "333313",
            naics_description: "OFFICE MACHINERY MANUFACTURING"
        },
        {
            naics: "333314",
            naics_description: "OPTICAL INSTRUMENT AND LENS MANUFACTURING"
        },
        {
            naics: "333315",
            naics_description: "PHOTOGRAPHIC AND PHOTOCOPYING EQUIPMENT MANUFACTURING"
        },
        {
            naics: "333316",
            naics_description: "PHOTOGRAPHIC AND PHOTOCOPYING EQUIPMENT MANUFACTURING"
        },
        {
            naics: "333318",
            naics_description: "OTHER COMMERCIAL AND SERVICE INDUSTRY MACHINERY MANUFACTURING"
        },
        {
            naics: "336111",
            naics_description: "AUTOMOBILE MANUFACTURING"
        },
        {
            naics: "339944",
            naics_description: "CARBON PAPER AND INKED RIBBON MANUFACTURING"
        },
        {
            naics: "339999",
            naics_description: "ALL OTHER MISCELLANEOUS MANUFACTURING"
        }
    ]
};

export const naicsMock2 = [
    {
        naics: '11',
        naics_description: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        children: [
            {
                naics: '1111',
                naics_description: 'Oilseed and Grain Farming',
                count: 2,
                children: [
                    {
                        naics: '111111',
                        naics_description: 'More Oilseed Stuff and Grain Farming',
                        count: 0
                    },
                    {
                        naics: '111112',
                        naics_description: 'Even More Oilseed Stuff and Grain Farming',
                        count: 0
                    }
                ]
            },
            {
                naics: '1112',
                naics_description: 'Vegetable and Melon Farming',
                count: 2,
                children: [
                    {
                        naics: '111211',
                        naics_description: 'Potato Farming',
                        count: 0
                    },
                    {
                        naics: '111219',
                        naics_description: 'Other Vegetable (except Potato) and Melon Farming',
                        count: 0
                    }
                ]
            }
        ]
    },
    {
        naics: '21',
        naics_description: 'Mining, Quarrying, and Oil and Gas Extraction',
        count: 7,
        children: [
            {
                naics: '2111',
                naics_description: 'Oil and Gas Extraction',
                count: 2,
                children: [
                    {
                        naics: '211120',
                        naics_description: 'Crude Petroleum Extraction',
                        count: 0
                    },
                    {
                        naics: '211130',
                        naics_description: 'Natural Gas Extraction',
                        count: 0
                    }
                ]
            },
            {
                naics: '2121',
                naics_description: 'Coal Mining',
                count: 3,
                children: [
                    {
                        naics: '212111',
                        naics_description: 'Bituminous Coal and Lignite Surface Mining',
                        count: 0
                    },
                    {
                        naics: '212112',
                        naics_description: 'Bituminous Coal Underground Mining',
                        count: 0
                    },
                    {
                        naics: '212113',
                        naics_description: 'Anthracite Mining',
                        count: 0
                    }
                ]
            }
        ]
    },
    {
        naics: '54',
        naics_description: 'Professional, Scientific, and Technical Services',
        count: 2,
        children: [
            {
                naics: '5411',
                naics_description: 'Legal Services',
                count: 0
            },
            {
                naics: '5412',
                naics_description: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services',
                count: 0
            }
        ]
    },
    {
        naics: '71',
        naics_description: 'Arts, Entertainment, and Recreation',
        count: 5,
        children: [
            {
                naics: '7111',
                naics_description: 'Performing Arts Companies',
                count: 0
            },
            {
                naics: '7112',
                naics_description: 'Spectator Sports',
                count: 3,
                children: [
                    {
                        naics: '711211',
                        naics_description: 'Sports Teams and Clubs',
                        count: 0
                    },
                    {
                        naics: '711212',
                        naics_description: 'Racetracks',
                        count: 0
                    },
                    {
                        naics: '711219',
                        naics_description: 'Other Spectator Sports',
                        count: 0
                    }
                ]
            }
        ]
    }
];

export const naicsMockCleanData = [
    {
        value: '11',
        label: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        children: [
            {
                value: '1111',
                label: 'Oilseed and Grain Farming',
                count: 2,
                children: [
                    {
                        value: '111111',
                        label: 'More Oilseed Stuff and Grain Farming',
                        count: 0
                    },
                    {
                        value: '111112',
                        label: 'Even More Oilseed Stuff and Grain Farming',
                        count: 0
                    }
                ]
            },
            {
                value: '1112',
                label: 'Vegetable and Melon Farming',
                count: 2,
                children: [
                    {
                        value: '111211',
                        label: 'Potato Farming',
                        count: 0
                    },
                    {
                        value: '111219',
                        label: 'Other Vegetable (except Potato) and Melon Farming',
                        count: 0
                    }
                ]
            }
        ]
    },
    {
        value: '21',
        label: 'Mining, Quarrying, and Oil and Gas Extraction',
        count: 7,
        children: [
            {
                value: '2111',
                label: 'Oil and Gas Extraction',
                count: 2,
                children: [
                    {
                        value: '211120',
                        label: 'Crude Petroleum Extraction',
                        count: 0
                    },
                    {
                        value: '211130',
                        label: 'Natural Gas Extraction',
                        count: 0
                    }
                ]
            },
            {
                value: '2121',
                label: 'Coal Mining',
                count: 3,
                children: [
                    {
                        value: '212111',
                        label: 'Bituminous Coal and Lignite Surface Mining',
                        count: 0
                    },
                    {
                        value: '212112',
                        label: 'Bituminous Coal Underground Mining',
                        count: 0
                    },
                    {
                        value: '212113',
                        label: 'Anthracite Mining',
                        count: 0
                    }
                ]
            }
        ]
    },
    {
        value: '54',
        label: 'Professional, Scientific, and Technical Services',
        count: 2,
        children: [
            {
                value: '5411',
                label: 'Legal Services',
                count: 0
            },
            {
                value: '5412',
                label: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services',
                count: 0
            }
        ]
    },
    {
        value: '71',
        label: 'Arts, Entertainment, and Recreation',
        count: 5,
        children: [
            {
                value: '7111',
                label: 'Performing Arts Companies',
                count: 0
            },
            {
                value: '7112',
                label: 'Spectator Sports',
                count: 3,
                children: [
                    {
                        value: '711211',
                        label: 'Sports Teams and Clubs',
                        count: 0
                    },
                    {
                        value: '711212',
                        label: 'Racetracks',
                        count: 0
                    },
                    {
                        value: '711219',
                        label: 'Other Spectator Sports',
                        count: 0
                    }
                ]
            }
        ]
    }
];

export const naicsMockInitialLoadApiResponse = [
    {
        naics: '11',
        naics_description: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20
    },
    {
        naics: '21',
        naics_description: 'Mining, Quarrying, and Oil and Gas Extraction',
        count: 7
    },
    {
        naics: '54',
        naics_description: 'Professional, Scientific, and Technical Services',
        count: 2
    },
    {
        naics: '71',
        naics_description: 'Arts, Entertainment, and Recreation',
        count: 5
    }
];

export const naicsMockCleanDataInitialLoad = [
    {
        value: '11',
        label: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        children: [{}],
        path: [0]
    },
    {
        value: '21',
        label: 'Mining, Quarrying, and Oil and Gas Extraction',
        count: 7,
        children: [{}],
        path: [1]
    },
    {
        value: '54',
        label: 'Professional, Scientific, and Technical Services',
        count: 2,
        children: [{}],
        path: [2]
    },
    {
        value: '71',
        label: 'Arts, Entertainment, and Recreation',
        count: 5,
        children: [{}],
        path: [3]
    }
];

export const naicsMockAPIResponse = [
    {
        naics: '11',
        naics_description: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        children: [
            {
                naics: '1111',
                naics_description: 'Agriculture, Fishing and Hunting',
                count: 20
            },
            {
                naics: '1121',
                naics_description: 'Mining, and Oil and Gas Extraction',
                count: 7
            },
            {
                naics: '1154',
                naics_description: 'Professional, and Technical Services',
                count: 2
            },
            {
                naics: '1171',
                naics_description: 'Arts, and Recreation',
                count: 5
            }
        ]
    }
];

export const naicsMockAPIResponseClean = [
    {
        value: '11',
        label: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        path: [0],
        children: [
            {
                value: '1111',
                label: 'Agriculture, Fishing and Hunting',
                count: 20,
                path: [0, 0],
                children: [{}]
            },
            {
                value: '1121',
                label: 'Mining, and Oil and Gas Extraction',
                count: 7,
                path: [0, 1],
                children: [{}]
            },
            {
                value: '1154',
                label: 'Professional, and Technical Services',
                count: 2,
                path: [0, 2],
                children: [{}]
            },
            {
                value: '1171',
                label: 'Arts, and Recreation',
                count: 5,
                path: [0, 3],
                children: [{}]
            }
        ]
    }
];

export const naicsMockDataDeepDirty = [
    {
        naics: '11',
        naics_description: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        children: [
            {
                naics: '1111',
                naics_description: 'Agriculture, Fishing and Hunting',
                count: 20,
                children: [
                    {
                        naics: '111111',
                        naics_description: 'Agriculture, Fishing',
                        count: 20,
                        children: [
                            {
                                naics: '11111111',
                                naics_description: 'Agriculture',
                                count: 20
                            },
                            {
                                naics: '11111121',
                                naics_description: 'Agricu',
                                count: 20
                            }
                        ]
                    },
                    {
                        naics: '111121',
                        naics_description: 'Agriculture, Fishing 2',
                        count: 20,
                        children: [
                            {
                                naics: '111111',
                                naics_description: 'Agriculture 2',
                                count: 20
                            },
                            {
                                naics: '111111',
                                naics_description: 'Agricu 2',
                                count: 20
                            }
                        ]
                    }
                ]
            },
            {
                naics: '1121',
                naics_description: 'Mining, and Oil and Gas Extraction',
                count: 7,
                children: [
                    {
                        naics: '112111',
                        naics_description: 'Mining, and Oil and Gas',
                        count: 7,
                        children: [
                            {
                                naics: '11211111',
                                naics_description: 'Mining, and Oil',
                                count: 7,
                                children: [
                                    {
                                        naics: '11211111',
                                        naics_description: 'Mining, and Oil',
                                        count: 7
                                    },
                                    {
                                        naics: '11211111',
                                        naics_description: 'Mining, and Oil',
                                        count: 7
                                    }
                                ]
                            },
                            {
                                naics: '11211121',
                                naics_description: 'Mining 3',
                                count: 7,
                                children: [
                                    {
                                        naics: '1121112111',
                                        naics_description: 'Mining Oil',
                                        count: 7
                                    },
                                    {
                                        naics: '1121112121',
                                        naics_description: 'Mining',
                                        count: 7
                                    }
                                ]
                            }
                        ]
                    },
                    {
                      
                    }
                ]
            }
        ]
    }
];

export const naicsMockDataDeepClean = [
    {
        value: '11',
        label: 'Agriculture, Forestry, Fishing and Hunting',
        count: 20,
        path: [0],
        children: [
            {
                value: '1111',
                label: 'Agriculture, Fishing and Hunting',
                count: 20,
                path: [0, 1],
                children: [
                    {
                        value: '111111',
                        label: 'Agriculture, Fishing',
                        count: 20,
                        path: [0, 1, 0],
                        children: [
                            {
                                value: '11111111',
                                label: 'Agriculture',
                                count: 20,
                                path: [0, 1, 0, 0]
                            },
                            {
                                value: '11111121',
                                label: 'Agricu',
                                count: 20,
                                path: [0, 1, 0, 1]
                            }
                        ]
                    },
                    {
                        value: '111121',
                        label: 'Agriculture, Fishing 2',
                        count: 20,
                        path: [0, 1, 1],
                        children: [
                            {
                                value: '111111',
                                label: 'Agriculture 2',
                                count: 20,
                                path: [0, 1, 1, 0]
                            },
                            {
                                value: '111111',
                                label: 'Agricu 2',
                                count: 20,
                                path: [0, 1, 1, 1]
                            }
                        ]
                    }
                ]
            },
            {
                value: '1121',
                label: 'Mining, and Oil and Gas Extraction',
                count: 7,
                path: [0, 1],
                children: [
                    {
                        value: '112111',
                        label: 'Mining, and Oil and Gas',
                        count: 7,
                        path: [0, 1, 0],
                        children: [
                            {
                                value: '11211111',
                                label: 'Mining, and Oil',
                                count: 7,
                                path: [0, 1, 0, 1],
                                children: [
                                    {
                                        value: '11211111',
                                        label: 'Mining, and Oil',
                                        count: 7,
                                        path: [0, 1, 0, 1, 0]
                                    },
                                    {
                                        value: '11211111',
                                        label: 'Mining, and Oil',
                                        count: 7,
                                        path: [0, 1, 0, 1, 1]
                                    }
                                ]
                            },
                            {
                                value: '11211121',
                                label: 'Mining 3',
                                count: 7,
                                path: [0, 1, 0, 2],
                                children: [
                                    {
                                        value: '1121112111',
                                        label: 'Mining Oil',
                                        count: 7,
                                        path: [0, 1, 0, 2, 0]
                                    },
                                    {
                                        value: '1121112121',
                                        label: 'Mining',
                                        count: 7,
                                        path: [0, 1, 0, 2, 1]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                      
                    }
                ]
            }
        ]
    }
];

export const emptyNAICSRedux = {
    naics: new List(),
    expanded: new List(),
    checked: new List()
};

export const populatedNAICSRedux = {
    naics: new List(naicsMockCleanData),
    expanded: new List(['11', '21']),
    checked: new List()
};

export const emptyNAICSProps = {
    updateSelectedNAICS: () => {},
    selectedNAICS: {},
    appliedNAICS: {},
    setNaics: () => {},
    setExpanded: () => {},
    nodes: new List(),
    expanded: new List(),
    checked: new List()
};

export const populatedState = {
    naics: naicsMockCleanData,
    expanded: ['11', '12'],
    checked: ['1111'],
    isError: false,
    errorMessage: '',
    isLoading: false,
    isSearch: false,
    requestType: '',
    fromRedux: false
};
