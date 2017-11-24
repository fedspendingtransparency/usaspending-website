import { initialState, filterStoreVersion } from 'redux/reducers/search/searchFiltersReducer';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

export const mockHash = {
    hash: 'abcd1234'
};

export const mockFilters = {
    filter: {
        version: filterStoreVersion,
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
            timePeriodEnd: null,
            selectedCFDA: {},
            selectedNAICS: {},
            selectedPSC: {},
            pricingType: [],
            setAside: [],
            extentCompeted: []
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
