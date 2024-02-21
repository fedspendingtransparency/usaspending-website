import { Set } from 'immutable';
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

export const mockApiRequestResponse = [{
    data: {
        scope: 'place_of_performance',
        geo_layer: 'state',
        results: [
            {
                shape_code: 'WA',
                display_name: 'Washington',
                aggregated_amount: 30156667064.89,
                population: 7705281,
                per_capita: 3913.77
            },
            {
                shape_code: 'OR',
                display_name: 'Oregon',
                aggregated_amount: 15524756948.4,
                population: 4237256,
                per_capita: 3663.87
            },
            {
                shape_code: 'WI',
                display_name: 'Wisconsin',
                aggregated_amount: 30938682711.23,
                population: 5893718,
                per_capita: 5249.43
            }
        ],
        messages: [
            'For searches, time period start and end dates are currently limited to an earliest date of 2007-10-01.  For data going back to 2000-10-01, use either the Custom Award Download feature on the website or one of our download or bulk_download API endpoints as listed on https://api.usaspending.gov/docs/endpoints.'
        ]
    },
    status: 200,
    statusText: 'OK',
    headers: {
        contentLength: '6433',
        contentType: 'application/json'
    },
    config: {
        transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false
        },
        adapter: [
            'xhr',
            'http'
        ],
        transformRequest: [
            null
        ],
        transformResponse: [
            null
        ],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {},
        headers: {
            Accept: 'application/json, text/plain, */*',
            ContentType: 'application/json',
            XRequestedWith: 'USASpendingFrontend'
        },
        baseURL: 'https://api.usaspending.gov/api/',
        cancelToken: {
            promise: {},
            _listeners: []
        },
        url: 'v2/search/spending_by_geography/',
        method: 'post',
        data: '{\'scope\':\'place_of_performance\',\'geo_layer\':\'state\',\'geo_layer_filters\':[\'WI\',\'WA\',\'OR\'],\'filters\':{\'time_period\':[{\'start_date\':\'2023-10-01\',\'end_date\':\'2024-09-30\'}]},\'subawards\':false,\'auditTrail\':\'Map Visualization\'}'
    },
    request: {}
}, {
    scope: "place_of_performance",
    geo_layer: "state",
    results: [
        {
            shape_code: "MO",
            display_name: "Missouri",
            aggregated_amount: 21934426457.11,
            population: 6154913,
            per_capita: 3563.73
        },
        {
            shape_code: "KS",
            display_name: "Kansas",
            aggregated_amount: 7039995133.96,
            population: 2937880,
            per_capita: 2396.28
        },
        {
            shape_code: "OK",
            display_name: "Oklahoma",
            aggregated_amount: 12702545145.61,
            population: 3959353,
            per_capita: 3208.24
        }
    ],
    messages: [
        "For searches, time period start and end dates are currently limited to an earliest date of 2007-10-01.  For data going back to 2000-10-01, use either the Custom Award Download feature on the website or one of our download or bulk_download API endpoints as listed on https://api.usaspending.gov/docs/endpoints."
    ]
}];

export const mockReduxFilters = {
    filters: {
        awardAmounts: Set([]),
        awardType: Set([]),
        defCodes: Set([
            ['require', []],
            ['exclude', []],
            ['counts', []]
        ]),
        extentCompeted: Set([]),
        keyword: Set([]),
        locationDomesticForeign: 'all',
        naicsCodes: Set([
            ['require', []],
            ['exclude', []],
            ['counts', []]
        ]),
        newAwardsOnly: false,
        pscCodes: Set([
            ['require', []],
            ['exclude', []],
            ['counts', []]
        ]),
        pricingType: Set([]),
        recipientDomesticForeign: 'all',
        recipientType: Set([]),
        selectedAwardIDs: Set([]),
        selectedAwardingAgencies: Set([]),
        selectedCFDA: Set([]),
        selectedFundingAgencies: Set([]),
        selectedLocations: {
            USA_WY: {
                identifier: "USA_WY",
                filter: {
                    country: "USA",
                    state: "WY"
                },
                display: {
                    entity: "State",
                    standalone: "Wyoming",
                    title: "Wyoming"
                }
            },
            USA_WI: {
                identifier: "USA_WI",
                filter: {
                    country: "USA",
                    state: "WI"
                },
                display: {
                    entity: "State",
                    standalone: "Wisconsin",
                    title: "Wisconsin"
                }
            },
            USA_OR: {
                identifier: "USA_OR",
                filter: {
                    country: "USA",
                    state: "OR"
                },
                display: {
                    entity: "State",
                    standalone: "Oregon",
                    title: "Oregon"
                }
            }
        },
        selectedRecipientLocations: Set([]),
        selectedRecipients: Set([]),
        setAside: Set([]),
        tasCodes: Set([
            ['require', []],
            ['exclude', []],
            ['counts', []]
        ]),
        timePeriodEnd: null,
        timePeriodFY: Set([
            2023
        ]),
        timePeriodStart: null,
        timePeriodType: 'fy',
        treasuryAccounts: Set([])
    }
};

