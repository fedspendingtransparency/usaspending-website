import React from "react";
export const encodedAwardId = encodeURIComponent('123/456');
export const decodedAwardId = decodeURIComponent(encodedAwardId);

export const RESPONSE_TYPE = {
    SEARCH_START: 'search_start',
    SEARCH_COMPLETE: 'search_complete',
    SEARCH_ERROR: 'search_error',
    TOOL_START: 'tool_start',
    TOOL_COMPLETE: 'tool_complete',
    TOOL_ERROR: 'tool_error' 
};

export const OPERATION = {
    SEARCH: 'search',
    TOOL: 'tool'
};

export const VARIANT = {
    START: 'start',
    COMPLETE: 'complete',
    ERROR: 'error'
};

export const mockGlossary = {
    data: {
        page_metadata: {
            page: 1,
            count: 132,
            next: null,
            previous: null,
            hasNext: false,
            hasPrevious: false
        },
        results: [
            {
                term: "Acquisition of Assets",
                slug: "acquisition-of-assets",
                data_act_term: "Acquisition of Assets",
                plain: "This major object class includes an agency’s procurement of assets, including those that have lost value (depreciated). Some examples of assets, according to this definition, include equipment, land, physical structures, investments, and loans.",
                official: "This major object class covers object classes 31.0 through 33.0. Include\ncapitalized (depreciated) assets and non-capitalized assets. This includes:\n31.0 Equipment\n32.0 Land and structures\n33.0 Investments and loans\n\nEach specific object class is defined in OMB Circular A-11 Section 83.6.",
                resources: "Learn More: [Circular No. A-11](https://www.whitehouse.gov/sites/whitehouse.gov/files/omb/assets/a11_current_year/a11_2017.pdf)"
            }
        ]
    }
};

export const mockComboBox = [
    { value: "apple", text: "Apple" },
    { value: "apricot", text: "Apricot" },
    { value: "avocado", text: "Avocado" },
    { value: "banana", text: "Banana" },
    { value: "blackberry", text: "Blackberry" },
    { value: "blood-orange", text: "Blood orange" },
    { value: "blueberry", text: "Blueberry" },
    { value: "boysenberry", text: "Boysenberry" },
    { value: "breadfruit", text: "Breadfruit" },
    { value: "buddhas-hand-citron", text: "Buddha's hand citron" },
    { value: "cantaloupe", text: "Cantaloupe" },
    { value: "clementine", text: "Clementine" },
    { value: "crab-apple", text: "Crab apple" },
    { value: "currant", text: "Currant" },
    { value: "cherry", text: "Cherry" },
    { value: "custard-apple", text: "Custard apple" },
    { value: "coconut", text: "Coconut" },
    { value: "cranberry", text: "Cranberry" },
    { value: "date", text: "Date" },
    { value: "dragonfruit", text: "Dragonfruit" },
    { value: "durian", text: "Durian" },
    { value: "elderberry", text: "Elderberry" },
    { value: "fig", text: "Fig" },
    { value: "gooseberry", text: "Gooseberry" },
    { value: "grape", text: "Grape" },
    { value: "grapefruit", text: "Grapefruit" },
    { value: "guava", text: "Guava" },
    { value: "honeydew-melon", text: "Honeydew melon" },
    { value: "jackfruit", text: "Jackfruit" },
    { value: "kiwifruit", text: "Kiwifruit" },
    { value: "kumquat", text: "Kumquat" },
    { value: "lemon", text: "Lemon" },
    { value: "lime", text: "Lime" },
    { value: "lychee", text: "Lychee" },
    { value: "mandarine", text: "Mandarine" },
    { value: "mango", text: "Mango" },
    { value: "mangosteen", text: "Mangosteen" },
    { value: "marionberry", text: "Marionberry" },
    { value: "nectarine", text: "Nectarine" },
    { value: "orange", text: "Orange" },
    { value: "papaya", text: "Papaya" },
    { value: "passionfruit", text: "Passionfruit" },
    { value: "peach", text: "Peach" },
    { value: "pear", text: "Pear" },
    { value: "persimmon", text: "Persimmon" },
    { value: "plantain", text: "Plantain" },
    { value: "plum", text: "Plum" },
    { value: "pineapple", text: "Pineapple" },
    { value: "pluot", text: "Pluot" },
    { value: "pomegranate", text: "Pomegranate" },
    { value: "pomelo", text: "Pomelo" },
    { value: "quince", text: "Quince" },
    { value: "raspberry", text: "Raspberry" },
    { value: "rambutan", text: "Rambutan" },
    { value: "soursop", text: "Soursop" },
    { value: "starfruit", text: "Starfruit" },
    { value: "strawberry", text: "Strawberry" },
    { value: "tamarind", text: "Tamarind" },
    { value: "tangelo", text: "Tangelo" },
    { value: "tangerine", text: "Tangerine" },
    { value: "ugli-fruit", text: "Ugli fruit" },
    { value: "watermelon", text: "Watermelon" },
    { value: "white-current", text: "White currant" },
    { value: "yuzu", text: "Yuzu" }
];

const {SEARCH, TOOL} = OPERATION;
const {START, COMPLETE, ERROR} = VARIANT;

const responseLookup = {
    [RESPONSE_TYPE.SEARCH_START]: {
        operation: SEARCH,
        variant: COMPLETE,
        icon: ['far', 'circle-check']
    },

    [RESPONSE_TYPE.SEARCH_COMPLETE]: {
        operation: SEARCH,
        variant: COMPLETE
    },

    [RESPONSE_TYPE.SEARCH_ERROR]: {
        operation: SEARCH,
        variant: ERROR, 
        icon: ['far','circle-xmark']
    },

    [RESPONSE_TYPE.TOOL_START]: {
        operation: TOOL,
        variant: START, 
        icon: ['far', 'sparkles']
    },

    [RESPONSE_TYPE.TOOL_COMPLETE]: {
        operation: TOOL,
        variant: COMPLETE, 
        icon: ['far','circle-check']
    },

    [RESPONSE_TYPE.TOOL_ERROR]: {
        operation: TOOL,
        variant: ERROR,
        icon: ['far', 'circle-xmark']
    }
};

export const buildSearchTestState = (data = []) => {
    const state = {
        search: null,
        tools: {} 
    };

    data.forEach((event) => {
        const {
            search_id, 
            tool_use_id, 
            type, 
            message, 
            result
        } = event ?? {};
       
        const response = responseLookup[type];

        if (!response) {
            return;
        }

        if (response.operation === SEARCH) {
            state.search = {
                ...state.search,
                searchId: search_id,
                ...response,
                ...(message && {
                    label: response.variant ? message : ''
                }),
                result
            };
            return;
        }

        const toolId = tool_use_id;

        if (!toolId) {
            return;
        }

        const existingTool = state.tools[tool_use_id];

        state.tools[toolId] = {
            ...existingTool,
            searchId: search_id,
            toolId,
            ...response,
            ...(message && {
                label: message
            })
        }
    });

    return state;
}

export const searchTestData = [
    {
        search_id: '502',
        type: RESPONSE_TYPE.SEARCH_START,
        message: "Thinking..."
    },
    {   
        search_id: '502',
        tool_use_id: 1522,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting Anne Arundel, MD'
    },
    {
        search_id: '502',
        tool_use_id: 1522,
        type: RESPONSE_TYPE.TOOL_COMPLETE
    },
    {
        search_id: '502',
        tool_use_id: 1523,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting funding over $500,000'
    },
    {
        search_id: '502',
        tool_use_id: 1523,
        type: RESPONSE_TYPE.TOOL_ERROR  
    },
    {
        search_id: '502',
        tool_use_id: 1524,
        type: RESPONSE_TYPE.TOOL_START,
        message: 'Selecting higher education and public schools'
    },
    {
        search_id: '502',
        tool_use_id: 1524,
        type: RESPONSE_TYPE.TOOL_COMPLETE
    },
    {
        search_id: '502',
        type: RESPONSE_TYPE.SEARCH_COMPLETE,
        message: (
            <>
                Applying filters based on grants and loans that went <br /> 
                to schools in Anne Arundel county, <br />
                Maryland
            </>
        )
    }

];