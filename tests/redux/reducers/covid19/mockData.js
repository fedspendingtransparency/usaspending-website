/**
 * @jest-environment jsdom
 * 
 * mockData.js
 * Created by Jonathan Hill 06/11/20
 */

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

export const overview = {
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

export const defcParams = ['A', 'B', 'C'];
