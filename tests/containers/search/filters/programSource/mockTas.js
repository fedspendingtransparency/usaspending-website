export const agencyLevel = {
    results: [
        {
            "id": "1",
            "description": "Agency of XYZ",
            "ancestors": [],
            "count": "100",
            "children": null
        },
        {
            "id": "2",
            "description": "Agency of ABC",
            "ancestors": [],
            "count": "92",
            "children": null
        },
        {
            "id": "3",
            "description": "Agency of EDF",
            "ancestors": [],
            "count": "500",
            "children": null
        },
        {
            "id": "4",
            "description": "Agency of HIJK",
            "ancestors": [],
            "count": "200",
            "children": null
        },
        {
            "id": "5",
            "description": "Agency of LMNOP",
            "ancestors": [],
            "count": "23",
            "children": null
        },
        {
            "id": "6",
            "description": "Agency of QRS",
            "ancestors": [],
            "count": "11",
            "children": null
        },
        {
            "id": "7",
            "description": "Agency of TUV",
            "ancestors": [],
            "count": "55",
            "children": null
        },
        {
            "id": "8",
            "description": "Agency of W",
            "ancestors": [],
            "count": "44",
            "children": null
        },
        {
            "id": "9",
            "description": "Agency of 123",
            "ancestors": [],
            "count": "22",
            "children": null
        },
        {
            "id": "10",
            "description": "Agency of 456",
            "ancestors": [],
            "count": "3",
            "children": null
        }
    ]
};

export const federalAccountLevel = {
    results: [
        {
            "id": "11",
            "description": "Federal Account of Donald Trump",
            "ancestors": ["1"],
            "count": "100",
            "children": null
        },
        {
            "id": "12",
            "description": "Federal Account of Donald Trump II",
            "ancestors": ["1"],
            "count": "100",
            "children": null
        }
    ]
};

export const tasLevel = {
    results: [
        {
            "id": "1111",
            "description": "Treasury Account of Donald Trump",
            "ancestors": ["1", "11"],
            "count": "100"
        },
        {
            "id": "12211",
            "description": "Treasury Account of Donald Trump II",
            "ancestors": ["1", "11"],
            "count": "100"
        },
    ]
};

export const treePopulatedToFederalAccountLevel = [
    {
        "value": "012",
        "ancestors": [],
        "description": "Department of Agriculture",
        "count": 129,
        "children": [
            {
                "value": "012-8226",
                "ancestors": [
                    "012"
                ],
                "description": "Miscellaneous Contributed Funds, Animal and Plant Health Inspection Service, Agriculture",
                "count": 1,
                "children": null
            },
            {
                "value": "012-8214",
                "ancestors": [
                    "012"
                ],
                "description": "Miscellaneous Contributed Funds, Agricultural Research Service, Agriculture",
                "count": 1,
                "children": null
            }
        ]
    }
];

export const fullTree = [
    {
        "value": "012",
        "ancestors": [],
        "description": "Department of Agriculture",
        "count": 129,
        "children": [
            {
                "value": "012-8226",
                "ancestors": [
                    "012"
                ],
                "description": "Miscellaneous Contributed Funds, Animal and Plant Health Inspection Service, Agriculture",
                "count": 1,
                "children": [
                    {
                        "value": "012-X-8226-000",
                        "id": "012-X-8226-000",
                        "ancestors": [
                            "012",
                            "012-8226"
                        ],
                        "description": "Miscellaneous Contributed Funds, Animal and Plant Health Inspection Service, Agriculture",
                        "count": 0,
                        "children": null
                    }
                ]
            },
            {
                "value": "012-8214",
                "ancestors": [
                    "012"
                ],
                "description": "Miscellaneous Contributed Funds, Agricultural Research Service, Agriculture",
                "count": 1,
                "children": null
            }
        ]
    }
];

export const hashUrlWithFederalAccountSelected = [
    ["012", "012-8226"],
    ["012", "012-8214"]
];
export const hashUrlWithTasSelected = [
    ["012", "012-8226", "012-X-8226-000"],
    ["012", "012-8226", "012-X-8226-001"],
    ["012", "012-8226", "012-X-8226-002"],
    ["012", "012-8226", "012-X-8226-003"],
    ["012", "012-8226", "012-X-8226-004"],
    ["012", "012-8226", "012-X-8226-005"],
    ["012", "012-8226", "012-X-8226-006"],
    ["012", "012-8226", "012-X-8226-000"]
];

export const defaultProps = {
    setTasNodes: () => {},
    setExpandedTas: () => {},
    setCheckedTas: () => {},
    setSearchedTas: () => {},
    setTasCounts: () => {},
    addCheckedTas: () => {},
    showTasTree: () => {},
    setUncheckedTas: () => {},
    stageTas: () => {},
    expanded: [],
    checked: [],
    unchecked: [],
    checkedFromHash: [],
    uncheckedFromHash: [],
    nodes: [],
    searchExpanded: [],
    counts: []
};
