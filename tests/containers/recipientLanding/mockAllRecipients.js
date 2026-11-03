export const mockData = {
    data: {
        page_metadata: {
            page: 1,
            total: 4,
            limit: 50,
            next: null,
            previous: null,
            hasNext: false,
            hasPrev: false
        },
        results: [
            {
                id: 'R1',
                duns: '111111111',
                uei: 'UEI111',
                name: 'Alpha Corp',
                recipient_level: 'R',
                amount: 1000000
            },
            {
                id: 'R2',
                duns: '222222222',
                uei: 'UEI222',
                name: 'Beta LLC',
                recipient_level: 'P',
                amount: 2500000
            },
            {
                // name and duns both omitted -> both default to placeholder values -> filtered out
                id: 'R3',
                recipient_level: 'C'
            },
            {
                // duns omitted -> defaults to placeholder, but name is real -> kept
                id: 'R4',
                name: 'Gamma Inc',
                recipient_level: 'R',
                amount: 500000
            }
        ]
    }
};

export const mockParsed = [
    {
        recipientLevel: 'R',
        name: 'Alpha Corp',
        duns: '111111111',
        uei: 'UEI111',
        id: 'R1',
        _amount: 1000000
    },
    {
        recipientLevel: 'P',
        name: 'Beta LLC',
        duns: '222222222',
        uei: 'UEI222',
        id: 'R2',
        _amount: 2500000
    },
    {
        recipientLevel: 'R',
        name: 'Gamma Inc',
        duns: 'DUNS not provided',
        uei: 'UEI not provided',
        id: 'R4',
        _amount: 500000
    }
];

export const mockTotal = 4;
