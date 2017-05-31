import { List } from 'immutable';
import { OrderRecord } from 'redux/reducers/search/searchOrderReducer';
import { MetaRecord } from 'redux/reducers/resultsMeta/resultsMetaReducer';
import { BatchRecord } from 'redux/reducers/resultsMeta/resultsBatchReducer';

import { initialState } from 'redux/reducers/search/searchFiltersReducer';

export const mockActions = {
    setSearchTableType: jest.fn(),
    setSearchPageNumber: jest.fn(),
    setSearchOrder: jest.fn(),
    clearRecords: jest.fn(),
    bulkInsertRecordSet: jest.fn(),
    setSearchResultMeta: jest.fn(),
    setSearchInFlight: jest.fn(),
    triggerBatchSearchUpdate: jest.fn(),
    triggerBatchQueryUpdate: jest.fn()
};

export const mockRedux = {
    filters: initialState,
    rows: new List(),
    meta: new MetaRecord(),
    batch: new BatchRecord(),
    searchOrder: new OrderRecord()
};


export const mockTabCount = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        current: "blerg",
        previous: null
    },
    req: "ab71bbda468",
    results: [{
        item: null,
        aggregate: "0.00",
        type: null
    }, {
        item: "04",
        aggregate: "8614.00",
        type: "04"
    }, {
        item: "05",
        aggregate: "2809.00",
        type: "05"
    }, {
        item: "02",
        aggregate: "1107.00",
        type: "02"
    }, {
        item: "09",
        aggregate: "2.00",
        type: "09"
    }, {
        item: "C",
        aggregate: "7751.00",
        type: "C"
    }, {
        item: "D",
        aggregate: "1682.00",
        type: "D"
    }, {
        item: "03",
        aggregate: "10000.00",
        type: "03"
    }, {
        item: "08",
        aggregate: "6047.00",
        type: "08"
    }, {
        item: "B",
        aggregate: "6404.00",
        type: "B"
    }, {
        item: "07",
        aggregate: "3669.00",
        type: "07"
    }, {
        item: "06",
        aggregate: "1034.00",
        type: "06"
    }, {
        item: "A",
        aggregate: "3225.00",
        type: "A"
    }, {
        item: "E",
        aggregate: "585.00",
        type: "E"
    }, {
        item: "11",
        aggregate: "2.00",
        type: "11"
    }]
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
