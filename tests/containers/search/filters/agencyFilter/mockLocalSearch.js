export const mockSecondaryResults = [
    {
        id: 14,
        toptier_flag: true,
        toptier_agency: {
            cgac_code: "004",
            fpds_code: "0400",
            abbreviation: "GPO",
            name: "Government Publishing Office"
        },
        subtier_agency: {
            subtier_code: "0400",
            abbreviation: "",
            name: "Government Publishing Office"
        },
        office_agency: null
    },
    {
        id: 1125,
        toptier_flag: true,
        toptier_agency: {
            cgac_code: "434",
            fpds_code: "9549",
            abbreviation: "OGE",
            name: "Office of Government Ethics"
        },
        subtier_agency: {
            subtier_code: "9549",
            abbreviation: "",
            name: "Office of Government Ethics"
        },
        office_agency: null
    }
];

export class Search {
    addIndex() {
        // do nothing
    }

    addDocuments() {
        // do nothing
    }

    search() {
        // do nothing
        return mockSecondaryResults;
    }
}
