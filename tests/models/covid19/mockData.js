/**
 * mockData
 * Created by Jonathan Hill 06/18/20
 */


export const overviewAPIResponse = {
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

export const overviewAPIResponseWithAdditional = {
    ...overviewAPIResponse,
    additional: {
        spending: {
            total_obligations: 125577301932.14,
            total_outlays: 122452932988.65
        },
        total_budget_authority: 209686263108.51
    }
};

export const defCodes = [
    {
        code: 'L',
        public_law: 'Emergency P.L. 116-123',
        title: 'Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020',
        urls: [
            'https://www.congress.gov/116/plaws/publ123/PLAW-116publ123.pdf'
        ],
        disaster: 'covid_19'
    },
    {
        code: 'M',
        public_law: 'Emergency P.L. 116-127',
        title: 'Families First Coronavirus Response Act',
        urls: [
            'https://www.congress.gov/116/plaws/publ127/PLAW-116publ127.pdf'
        ],
        disaster: 'covid_19'
    },
    {
        code: 'N',
        public_law: 'Emergency P.L. 116-136',
        title: 'Coronavirus Aid, Relief, and Economic Security Act or the CARES Act',
        urls: [
            'https://www.congress.gov/116/bills/hr748/BILLS-116hr748enr.pdf'
        ],
        disaster: 'covid_19'
    },
    {
        code: 'O',
        public_law: 'Nonemergency P.L. 116-136',
        title: 'Coronavirus Aid, Relief, and Economic Security Act or the CARES Act',
        urls: [
            'https://www.congress.gov/116/bills/hr748/BILLS-116hr748enr.pdf',
            'https://www.congress.gov/116/plaws/publ139/PLAW-116publ139.pdf'
        ],
        disaster: 'covid_19'
    },
    {
        code: 'P',
        public_law: 'Emergency P.L. 116-139',
        title: 'Paycheck Protection Program and Health Care Enhancement Act)',
        urls: [
            'https://www.congress.gov/116/plaws/publ139/PLAW-116publ139.pdf'
        ],
        disaster: 'covid_19'
    }
];

export const mockCfdaData = {
    code: '43.090',
    description: 'Description text',
    children: [],
    award_count: 5400,
    obligation: 89000000.01,
    outlay: 70000000.98,
    resource_link: 'https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view',
    face_value_of_loan: 56000001.02
};

export const mockRowData = {
    id: '43',
    code: '090',
    description: 'Description text',
    award_count: 5400,
    obligation: 89000000.01,
    outlay: 70000000.98,
    face_value_of_loan: 56000001.02
};

export const mockRecipientData = {
    id: ['hash-R', 'hash-C'],
    code: '090',
    description: 'Description text',
    award_count: 5400,
    obligation: 89000000.01,
    outlay: 70000000.98,
    face_value_of_loan: 56000001.02
};
