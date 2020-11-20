/**
 * modals.js
 * Created by Jonathan Hill 11/19/20
 */


export const modalTitles = {
    publicationDates: 'Publication and Certification History',
    missingAccountBalance: 'Number of TASs Missing from Account Balance Data'
};

const mockDataPublicationDates = [
    {
        publication_date: "2020-12-11T11:59:21Z",
        certification_date: "2020-12-22T11:59:21Z"
    },
    {
        publication_date: "2020-11-10T11:59:21Z",
        certification_date: "2020-11-11T11:59:21Z"
    },
    {
        publication_date: "2020-10-11T11:59:21Z",
        certification_date: "2020-10-22T11:59:21Z"
    },
    {
        publication_date: "2020-09-10T11:59:21Z",
        certification_date: "2020-09-11T11:59:21Z"
    },
    {
        publication_date: "2020-08-11T11:59:21Z",
        certification_date: "2020-08-22T11:59:21Z"
    },
    {
        publication_date: "2020-07-10T11:59:21Z",
        certification_date: "2020-07-11T11:59:21Z"
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
        promise: new Promise((resolve, reject) => {
            setTimeout(() => {
                if (params.page === 1) {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataPublicationDates.slice(0, params.limit)
                    };
                    // process.nextTick(() => {
                    //     resolve({ data });
                    // });
                    resolve({ data });
                }
                else {
                    const data = {
                        page_metadata: pageMetaData,
                        results: mockDataPublicationDates.slice(params.limit, params.limit * 2)
                    };
                    // process.nextTick(() => {
                    //     resolve({ data });
                    // });
                    resolve({ data });
                }
            }, 3000);
        }),
        cancel: () => console.log(' Cancelling Johnny Boi!!! ')
    };
};
