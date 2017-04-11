/**
 * mockAccount.js
 * Created by Kevin Li 3/27/17
 */

export const mockAccount = {
    id: 2507,
    agency_identifier: "089",
    main_account_code: "0208",
    account_title: "Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy"
};

export const mockReduxAccount = {
    id: 2507,
    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
    agency_identifier: '089',
    main_account_code: '0208',
    description: 'Not available',
    totals: {
        outlay: {
            2016: '-5505246.42'
        },
        budgetAuthority: {
            2016: '201404661.47'
        },
        obligated: {
            2016: '2696684.86'
        },
        unobligated: {
            2016: '198707976.61'
        }
    }
};

export const mockBalances = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "198707976.61"
        }],
        total_metadata: {
            count: 1
        }
    },
    obligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "2696684.86"
        }],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "201404661.47"
        }],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "-5505246.42"
        }],
        total_metadata: {
            count: 1
        }
    }
};

export const mockCategories = {
    req: 'abc',
    page_metadata: {
        page: 1,
        current: 'blerg',
        next: 'blerg',
        previous: 'blerg',
        has_next_page: true,
        has_previous_page: false
    },
    results: [{
        program_activity__program_activity_name: "Program Name",
        aggregate: "2696684.86"
    }]
};
