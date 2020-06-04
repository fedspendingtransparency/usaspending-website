import { initialState, filterStoreVersion } from 'redux/reducers/search/searchFiltersReducer';
import { initialState as initialApplied } from 'redux/reducers/search/appliedFiltersReducer';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

export const mockHash = {
    hash: 'abcd1234'
};

export const mockFilters = {
    filter: {
        version: filterStoreVersion,
        filters: {
            keyword: {},
            locationDomesticForeign: "all",
            selectedAwardIDs: {},
            selectedRecipients: [],
            selectedFundingAgencies: {},
            selectedLocations: {},
            recipientType: [],
            timePeriodFY: [`${FiscalYearHelper.currentFiscalYear()}`],
            timePeriodType: "fy",
            timePeriodStart: null,
            selectedAwardingAgencies: {},
            awardType: [],
            recipientDomesticForeign: "all",
            selectedRecipientLocations: {},
            awardAmounts: {},
            timePeriodEnd: null,
            selectedCFDA: {},
            pricingType: [],
            setAside: [],
            extentCompeted: [],
            federalAccounts: [],
            treasuryAccounts: [],
            naicsCodes: { require: [], exclude: [], counts: [] },
            tasCodes: { require: [], exclude: [], counts: [] },
            pscCodes: { require: [], exclude: [], counts: [] },
            defCodes: { require: [], exclude: [], counts: [] }
        }
    }
};

export const mockRedux = {
    filters: initialState,
    appliedFilters: initialApplied,
    params: {
        hash: ''
    }
};

export const mockActions = {
    restoreHashedFilters: jest.fn(),
    applyStagedFilters: jest.fn(),
    setAppliedFilterEmptiness: jest.fn(),
    setAppliedFilterCompletion: jest.fn()
};
