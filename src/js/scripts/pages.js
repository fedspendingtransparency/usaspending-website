const moment = require('moment');
const Routes = require('../containers/router/RouterRoutes.js').routes;


const pages = [
    {
        name: 'routes_from_router',
        isAsync: false,
        routes: Routes.routes
    },
    {
        name: 'awards',
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
                limit: 60,
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
    },
    {
        name: 'state',
        isAsync: true,
        url: 'https://api.usaspending.gov/api/v2/recipient/state/',
        method: 'get',
        accessor: 'fips',
        clientRoute: 'https://www.usaspending.gov/#/state'
    },
    {
        name: 'agency',
        isAsync: true,
        url: 'https://api.usaspending.gov/api/v2/references/toptier_agencies/',
        method: 'get',
        accessor: 'agency_id',
        clientRoute: 'https://www.usaspending.gov/#/agency'
    },
    {
        name: 'federal_account',
        isAsync: true,
        url: 'https://api.usaspending.gov/api/v2/federal_accounts/',
        method: 'post',
        accessor: 'account_number',
        requestObject: {
            sort: { field: "budgetary_resources", direction: "desc" },
            page: 1,
            limit: 50,
            filters: { fy: "2019" }
        },
        clientRoute: 'https://www.usaspending.gov/#/federal_account'
    }
];

module.exports = pages;
