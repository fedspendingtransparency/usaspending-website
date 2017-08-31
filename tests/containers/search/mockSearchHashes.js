import { initialState } from 'redux/reducers/search/searchFiltersReducer';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

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
            selectedFundingAgencies: {},
            selectedLocations: {},
            recipientType: [],
            timePeriodFY: [`${FiscalYearHelper.currentFiscalYear()}`],
            keyword: "",
            timePeriodType: "fy",
            timePeriodStart: null,
            selectedAwardingAgencies: {},
            awardType: [],
            recipientDomesticForeign: "all",
            selectedRecipientLocations: {},
            awardAmounts: {},
            selectedCFDA: {},
            selectedNAICS: {},
            selectedPSC: {},
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
