import { geo } from '../../mockVisualizations';

// Fetch Transactions Total for Geo
export const performSpendingByGeographySearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: geo
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const mockReduxFilters = {
    keyword: {},
    defCodes: {
        require: [],
        exclude: [],
        counts: []
    },
    pscCodes: {
        require: [],
        exclude: [],
        counts: []
    },
    setAside: [],
    tasCodes: {
        require: [],
        exclude: [],
        counts: []
    },
    awardType: [],
    naicsCodes: {
        require: [],
        exclude: [],
        counts: []
    },
    pricingType: [],
    awardAmounts: {},
    selectedCFDA: {},
    timePeriodFY: [
        2023
    ],
    newAwardsOnly: false,
    recipientType: [],
    timePeriodEnd: null,
    extentCompeted: [],
    timePeriodType: 'fy',
    timePeriodStart: null,
    selectedAwardIDs: {},
    treasuryAccounts: {},
    selectedLocations: {},
    selectedRecipients: [],
    locationDomesticForeign: 'all',
    selectedFundingAgencies: {},
    recipientDomesticForeign: 'all',
    selectedAwardingAgencies: {},
    selectedRecipientLocations: {}
};
