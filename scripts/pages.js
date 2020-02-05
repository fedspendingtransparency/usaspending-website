const moment = require('moment');
const Routes = require('../src/js/containers/router/RouterRoutes.js');

const recipientRequestObject = {
    name: 'recipient',
    updatedFrequency: 'daily',
    priority: '0.8',
    isAsync: true,
    url: 'https://api.usaspending.gov/api/v2/recipient/duns/',
    method: 'post',
    requestObject: {
        name: 'recipient',
        order: "desc",
        sort: "amount",
        page: 1,
        limit: 100,
        award_type: "all"
    },
    accessor: 'id',
    clientRoute: 'https://www.usaspending.gov/#/recipient'
};

const awardPageInfo = {
    name: 'awards',
    updatedFrequency: 'daily',
    priority: '0.9',
    isAsync: true,
    url: 'https://api.usaspending.gov/api/v2/search/spending_by_award/',
    method: 'post',
    requestObject: {
        filters: {
            time_period: [{
                start_date: `${moment().subtract(1, 'y').year()}-10-01`,
                end_date: moment().add(10, "y").format("YYYY-MM-DD")
            }],
            award_type_codes: ["A", "B", "C", "D"],
            page: 1,
            limit: 100,
            sort: "Award Amount",
            order: "desc",
            subawards: false
        },
        fields: [
            "Award ID",
            "Award Amount"
        ],
        page: 1,
        limit: 100,
        sort: "Award Amount",
        order: "desc",
        subawards: false
    },
    accessor: 'generated_internal_id',
    clientRoute: 'https://www.usaspending.gov/#/award'
};

const federalAccountPageInfo = {
    name: 'federal_account',
    updatedFrequency: 'daily',
    priority: '0.7',
    isAsync: true,
    url: 'https://api.usaspending.gov/api/v2/federal_accounts/',
    method: 'post',
    accessor: 'account_number',
    requestObject: {
        sort: { field: "budgetary_resources", direction: "desc" },
        page: 1,
        limit: 100,
        filters: { fy: "2019" }
    },
    clientRoute: 'https://www.usaspending.gov/#/federal_account'
};

const createPaginatedPages = (defaultObj, numberOfPages) => {
    const rtrn = [];
    for (let index = 1; index <= numberOfPages; index++) {
        rtrn.push({
            ...defaultObj,
            requestObject: {
                ...defaultObj.requestObject,
                page: index
            }
        });
    }
    return rtrn;
};

const pages = [
    {
        name: 'static-routes',
        isAsync: false,
        routes: Routes.routes
    },
    [
        // 1K awards
        ...createPaginatedPages(awardPageInfo, 10)
    ],
    {
        name: 'state',
        isAsync: true,
        updatedFrequency: 'daily',
        priority: '0.5',
        // all states
        url: 'https://api.usaspending.gov/api/v2/recipient/state/',
        method: 'get',
        accessor: 'fips',
        clientRoute: 'https://www.usaspending.gov/#/state'
    },
    {
        name: 'agency',
        isAsync: true,
        updatedFrequency: 'monthly',
        priority: '0.5',
        // all agencies
        url: 'https://api.usaspending.gov/api/v2/references/toptier_agencies/',
        method: 'get',
        accessor: 'agency_id',
        clientRoute: 'https://www.usaspending.gov/#/agency'
    },
    [
        // all federal accounts
        ...createPaginatedPages(federalAccountPageInfo, 18)
    ],
    [
        // 1K recipients
        ...createPaginatedPages(recipientRequestObject, 10)
    ]
];

module.exports = pages;
