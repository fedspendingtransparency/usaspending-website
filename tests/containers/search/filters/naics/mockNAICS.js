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
