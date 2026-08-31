export const encodedAwardId = encodeURIComponent('123/456');
export const decodedAwardId = decodeURIComponent(encodedAwardId);
export const START = 'tool_start';
export const COMPLETE = 'tool_complete';
export const ERROR = 'tool_error';


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

export const searchTestData = [
    {
        type: [COMPLETE],
        message: "Thinking..."
    },
    {   
        type: [ERROR],
        message: 'Selecting Anne Arundel, MD'
    },
    {
        type: [COMPLETE],
        message: 'Selecting higher education and public schools'
    },
    {
        type: [START],
        message: 'Selecting funding over $500,000'
    },
    {
        type: [COMPLETE],
        message: `Applying filters based on grants and loans that went
            to schools in Anne Arundel county, Maryland`
    }
];