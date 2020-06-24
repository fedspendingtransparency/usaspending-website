/**
 * mockData
 * Created by Jonathan Hill 06/18/20
 */

export const mockOverviewData = {
    funding: [
        {
            def_code: 'L',
            amount: 7410000000
        },
        {
            def_code: 'M',
            amount: 11230000000
        }
    ],
    total_budget_authority: 2300000000000,
    spending: {
        award_obligations: 866700000000,
        award_outlays: 413100000000,
        total_obligations: 963000000000,
        total_outlays: 459000000000
    }
};

export const mockCfdaData = {
    id: '43',
    code: '090',
    description: 'Description text',
    children: [],
    count: 5400,
    obligation: 89000000.01,
    outlay: 70000000.98,
    total_budgetary_resources: null,
    sam_website: 'https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view'
};
