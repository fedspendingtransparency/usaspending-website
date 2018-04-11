import { List } from 'immutable';
import { initialState } from 'redux/reducers/search/searchFiltersReducer';

export const mockActions = {
    setAppliedFilterCompletion: jest.fn()
};

export const mockRedux = {
    filters: initialState,
    subaward: false,
    noApplied: false
};


export const mockTabCount = {
    results: {
        loans: 2,
        other: 1,
        direct_payments: 3,
        contracts: 5,
        grants: 4
    }
};

export const mockApi = {
    page_metadata: {
        page: 1,
        has_next_page: true,
        has_previous_page: false,
        next: "https://spending-api-dev.us/api/v1/awards/?limit=60&page=2&req=0b48d0f0ec8",
        current: "https://spending-api-dev.us/api/v1/awards/?limit=60&page=1&req=0b48d0f0ec8",
        previous: null
    },
    req: "0b48d0f0ec8",
    results: [{
        id: 52316,
        type_description: "Purchase Order",
        piid: "HHSD200201689086I",
        fain: null,
        uri: null,
        total_obligation: "557839339.28",
        description: "IGF::OT::IGF 2016 VFC MERCK",
        period_of_performance_start_date: "2016-10-14",
        period_of_performance_current_end_date: null,
        funding_agency: {
            id: 795,
            toptier_flag: false,
            toptier_agency: {
                cgac_code: "075",
                fpds_code: "7500",
                abbreviation: "HHS",
                name: "Department of Health and Human Services"
            },
            subtier_agency: {
                subtier_code: "7523",
                abbreviation: "",
                name: "Centers for Disease Control and Prevention"
            },
            office_agency: null
        },
        recipient: {
            legal_entity_id: 1317601,
            parent_recipient_unique_id: null,
            recipient_name: "MERCK SHARP & DOHME CORP.",
            business_types: null,
            business_types_description: "Unknown Types",
            location: {
                country_name: "UNITED STATES",
                state_code: "NJ",
                state_name: null,
                city_name: "WHITEHOUSE STATION",
                address_line1: "ONE MERCK DRIVE",
                address_line2: null,
                address_line3: null,
                zip5: null,
                foreign_postal_code: null,
                foreign_province: "NOORD-HOLLAND",
                foreign_city_name: null,
                location_country_code: "USA"
            }
        }
    }]
};

export const mockV2TableApi = {
    limit: 60,
    page_metadata: {
        previous: null,
        hasNext: true,
        page: 1,
        next: 2,
        count: 120,
        hasPrevious: false
    },
    results: [
        {
            'Award ID': 'ABC123',
            'Award Amount': 123.45,
            'Awarding Agency': 'Department of Sandwiches',
            'Awarding Sub Agency': 'Office of Subs',
            'Contract Award Type': 'Tuna',
            'Recipient Name': 'Blerg',
            'Start Date': '2011-01-01',
            'End Date': '2011-12-31',
            internal_id: 1
        }
    ]
};
