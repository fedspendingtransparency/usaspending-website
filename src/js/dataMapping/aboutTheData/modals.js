/**
 * modals.js
 * Created by Jonathan Hill 11/19/20
 */


export const modalTitles = {
    publicationDates: 'Publication and Certification History',
    missingAccountBalance: 'Number of TASs Missing from Account Balance Data',
    reportingDifferences: 'Reporting Difference in Obligations'
};

export const modalClassNames = {
    publicationDates: 'publication-dates-modal',
    missingAccountBalance: 'missing-account-balance-modal',
    reportingDifferences: 'reporting-differences-modal'
};

export const publicationDatesColumns = [
    { displayName: 'Publication Dates', title: 'publication_date' },
    { displayName: 'Certification Dates', title: 'certification_date' }
];

export const missingAccountBalanceColumns = [
    { displayName: 'Treasury Account Symbol (TAS)', title: 'tas' },
    { displayName: 'Obligated Amount', title: 'amount' },
    { displayName: '% of Agency Total in GTAS', title: 'amount' }
];

export const reportingDifferencesColumns = [
    { displayName: 'Treasury Account Symbol (TAS)', title: 'tas' },
    { displayName: 'Account Balance Obligations', title: 'file_a_obligations' },
    { displayName: 'Account Spending Obligations', title: 'file_b_obligations' },
    { displayName: 'Difference', title: 'difference' }
];

const mockDataPublicationDates = [
    {
        publication_date: "2020-12-11T11:59:21Z",
        certification_date: "2020-12-22T11:59:21Z"
    },
    {
        publication_date: null,
        certification_date: "2020-11-11T11:59:21Z"
    },
    {
        publication_date: "2020-10-11T11:59:21Z",
        certification_date: "2020-10-22T11:59:21Z"
    },
    {
        publication_date: "2020-09-10T11:59:21Z",
        certification_date: null
    },
    {
        publication_date: "2020-08-11T11:59:21Z",
        certification_date: "2020-08-22T11:59:21Z"
    },
    {
        publication_date: null,
        certification_date: null
    },
    {
        publication_date: "2020-06-11T11:59:21Z",
        certification_date: "2020-06-22T11:59:21Z"
    },
    {
        publication_date: "2020-05-10T11:59:21Z",
        certification_date: "2020-05-11T11:59:21Z"
    },
    {
        publication_date: "2020-04-11T11:59:21Z",
        certification_date: "2020-04-22T11:59:21Z"
    },
    {
        publication_date: "2020-03-10T11:59:21Z",
        certification_date: "2020-03-11T11:59:21Z"
    },
    {
        publication_date: "2020-02-11T11:59:21Z",
        certification_date: "2020-02-22T11:59:21Z"
    },
    {
        publication_date: "2020-01-10T11:59:21Z",
        certification_date: "2020-01-11T11:59:21Z"
    },
    {
        publication_date: "2019-12-11T11:59:21Z",
        certification_date: "2019-12-22T11:59:21Z"
    },
    {
        publication_date: "2019-11-10T11:59:21Z",
        certification_date: "2019-11-11T11:59:21Z"
    },
    {
        publication_date: "2019-10-11T11:59:21Z",
        certification_date: "2019-10-22T11:59:21Z"
    },
    {
        publication_date: "2019-09-10T11:59:21Z",
        certification_date: "2019-09-11T11:59:21Z"
    }
];

const mockDataMissingAccountBalances = [
    {
        tas: "123-X-3409/3490-456",
        amount: 12
    },
    {
        tas: "123-X-3409",
        amount: "2020-11-11T11:59:21Z"
    },
    {
        tas: "234-X-3409/45-456",
        amount: 123
    },
    {
        tas: "123-34-3409/324-456",
        amount: 543
    },
    {
        tas: "123-3434-3409",
        amount: 789
    },
    {
        tas: "123-X-35/22-456",
        amount: 23
    },
    {
        tas: "123-096-3409/22-456",
        amount: 234
    },
    {
        tas: "123-X-00/3490-456",
        amount: 56
    },
    {
        tas: "007-X-3409/3490-456",
        amount: 754
    },
    {
        tas: "008-X-3409/3490-456",
        amount: 345
    },
    {
        tas: "009-X-3409/3490-456",
        amount: 765
    },
    {
        tas: "200-X-3409/3490-456",
        amount: 758
    },
    {
        tas: "444-X-3409/3490-456",
        amount: 234
    }
];

const mockDataReportingDifferences = [
    {
        tas: "123-X-3409/3490-456",
        file_a_obligation: 87654345,
        file_b_obligation: 2323,
        difference: 12
    },
    {
        tas: "123-X-3409",
        file_a_obligation: 765,
        file_b_obligation: 2323,
        difference: 12
    },
    {
        tas: "234-X-3409/45-456",
        file_a_obligation: 765,
        file_b_obligation: 2323,
        difference: 123
    },
    {
        tas: "123-34-3409/324-456",
        file_a_obligation: 76543,
        file_b_obligation: 2323,
        difference: 543
    },
    {
        tas: "123-3434-3409",
        file_a_obligation: 87654,
        file_b_obligation: 2323,
        difference: 789
    },
    {
        tas: "123-X-35/22-456",
        file_a_obligation: 98765,
        file_b_obligation: 2323,
        difference: 23
    },
    {
        tas: "123-096-3409/22-456",
        file_a_obligation: 956764,
        file_b_obligation: 2323,
        difference: 234
    },
    {
        tas: "123-X-00/3490-456",
        file_a_obligation: 34565,
        file_b_obligation: 2323,
        difference: 56
    },
    {
        tas: "007-X-3409/3490-456",
        file_a_obligation: 232,
        file_b_obligation: 2323,
        difference: 754
    },
    {
        tas: "008-X-3409/3490-456",
        file_a_obligation: 3434,
        file_b_obligation: 2323,
        difference: 345
    },
    {
        tas: "009-X-3409/3490-456",
        file_a_obligation: 1234567,
        file_b_obligation: 2323,
        difference: 765
    },
    {
        tas: "200-X-3409/3490-456",
        file_a_obligation: 23456,
        file_b_obligation: 2323,
        difference: 758
    },
    {
        tas: "444-X-3409/3490-456",
        file_a_obligation: 2345678,
        file_b_obligation: 2323,
        difference: 234
    }
];

// TODO - delete this when API is integrated
export const mockAPIPublicationDates = (params) => {
    const pageMetaData = {
        page: 1,
        next: 2,
        previous: 0,
        hasNext: false,
        hasPrevious: false,
        total: 16,
        limit: 10
    };
    pageMetaData.page = params.page;
    pageMetaData.next = params.next;
    pageMetaData.previous = params.page - 1;
    pageMetaData.hasNext = params.page === 1;
    pageMetaData.hasPrevious = params.page === 2;
    pageMetaData.limite = params.limit;

    return {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                if (params.page === 1) {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataPublicationDates.slice(0, params.limit)
                    };
                    resolve({ data });
                }
                else {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataPublicationDates.slice(params.limit, params.limit * 2)
                    };
                    resolve({ data });
                }
            }, 1000);
        }),
        cancel: () => console.log(' :wave: ')
    };
};

// TODO - delete this when API is integrated
export const mockAPIMissingAccountBalances = (params) => {
    const pageMetaData = {
        page: 1,
        next: 2,
        previous: 0,
        hasNext: false,
        hasPrevious: false,
        total: 16,
        limit: 10
    };
    pageMetaData.page = params.page;
    pageMetaData.next = params.next;
    pageMetaData.previous = params.page - 1;
    pageMetaData.hasNext = params.page === 1;
    pageMetaData.hasPrevious = params.page === 2;
    pageMetaData.limite = params.limit;

    return {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                if (params.page === 1) {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataMissingAccountBalances.slice(0, params.limit)
                    };
                    resolve({ data });
                }
                else {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataMissingAccountBalances.slice(params.limit, params.limit * 2)
                    };
                    resolve({ data });
                }
            }, 1000);
        }),
        cancel: () => console.log(' :wave: ')
    };
};

// TODO - delete this when API is integrated
export const mockAPIReportingDifferences = (params) => {
    const pageMetaData = {
        page: 1,
        next: 2,
        previous: 0,
        hasNext: false,
        hasPrevious: false,
        total: 16,
        limit: 10
    };
    pageMetaData.page = params.page;
    pageMetaData.next = params.next;
    pageMetaData.previous = params.page - 1;
    pageMetaData.hasNext = params.page === 1;
    pageMetaData.hasPrevious = params.page === 2;
    pageMetaData.limite = params.limit;

    return {
        promise: new Promise((resolve) => {
            setTimeout(() => {
                if (params.page === 1) {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataReportingDifferences.slice(0, params.limit)
                    };
                    resolve({ data });
                }
                else {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataReportingDifferences.slice(params.limit, params.limit * 2)
                    };
                    resolve({ data });
                }
            }, 1000);
        }),
        cancel: () => console.log(' :wave: ')
    };
};
