import { initialState } from 'redux/reducers/search/searchFiltersReducer';

export const mockHash = {
    hash: 'abcd1234'
};

export const mockFilters = {
    filter: {
        version: 1,
        filters: {
            locationDomesticForeign: "all",
            selectedAwardIDs: {},
            selectedRecipients: {},
            objectClasses: [],
            selectedFundingAgencies: {},
            federalAccounts: {},
            budgetFunctions: {},
            selectedLocations: {},
            recipientType: [],
            timePeriodFY: ["2017"],
            keyword: "",
            timePeriodType: "fy",
            timePeriodStart: null,
            selectedAwardingAgencies: {},
            awardType: [],
            recipientDomesticForeign: "all",
            selectedRecipientLocations: {},
            awardAmounts: {},
            timePeriodEnd: null
        }
    }
};

export const mockRedux = {
    filters: initialState,
    params: {
        hash: ''
    }
};

export const mockActions = {
    populateAllSearchFilters: jest.fn()
};
