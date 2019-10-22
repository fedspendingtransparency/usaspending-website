export const mockSecondaryResults = [
    {
        id: 14,
        toptier_flag: true,
        toptier_agency: {
            toptier_code: '004',
            abbreviation: 'GPO',
            name: 'Government Publishing Office'
        },
        subtier_agency: {
            subtier_code: '0400',
            abbreviation: '',
            name: 'Government Publishing Office'
        }
    },
    {
        id: 1125,
        toptier_flag: true,
        toptier_agency: {
            toptier_code: '434',
            abbreviation: 'OGE',
            name: 'Office of Government Ethics'
        },
        subtier_agency: {
            subtier_code: '9549',
            abbreviation: '',
            name: 'Office of Government Ethics'
        }
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

export const mockFemaResults = [
    {
        id: 13,
        toptier_flag: false,
        toptier_agency: {
            abbreviation: 'DHS',
            name: 'Department of Homeland Security'
        },
        subtier_agency: {
            abbreviation: 'FEMA',
            name: 'Federal Emergency Management Agency'
        }
    },
    {
        id: 10,
        toptier_flag: true,
        toptier_agency: {
            abbreviation: 'FEMA',
            name: 'Federal Emergency Management Agency'
        },
        subtier_agency: {
            abbreviation: 'FEMA',
            name: 'Federal Emergency Management Agency'
        }
    },
    {
        id: 11,
        toptier_flag: false,
        toptier_agency: {
            abbreviation: 'FEMA',
            name: 'Federal Emergency Management Agency'
        },
        subtier_agency: {
            abbreviation: '',
            name: 'FEMA Region IV'
        }
    }
];

export const mockResults = [
    {
        id: 11,
        toptier_flag: true,
        toptier_agency: {
            abbreviation: 'XYZ',
            name: 'Department XYZ'
        },
        subtier_agency: {
            abbreviation: 'XYZ',
            name: 'Department XYZ'
        }
    },
    {
        id: 13,
        toptier_flag: false,
        toptier_agency: {
            abbreviation: 'ABC',
            name: 'Department ABC'
        },
        subtier_agency: {
            abbreviation: 'DEF',
            name: 'DEF Agency'
        }
    },
    {
        id: 13,
        toptier_flag: true,
        toptier_agency: {
            abbreviation: 'ABC',
            name: 'Department ABC'
        },
        subtier_agency: {
            abbreviation: 'ABC',
            name: 'Department ABC'
        }
    }
];

export const mockNullAgencyResults = [
    {
        id: 14,
        toptier_flag: false,
        toptier_agency: {
            abbreviation: null,
            name: 'Department QQ'
        },
        subtier_agency: {
            abbreviation: null,
            name: 'QQ Agency'
        }
    }
];
