export const mockSecondaryResults = [
    {
        name: 'ZZZZZZ',
        code: 'ZZ',
        fips: '99',
        amount: 123.45,
        type: 'state'
    }
];

export class Search {
    constructor() {
        this.search = jest.fn(() => mockSecondaryResults);
    }
    addIndex() {
        // do nothing
    }

    addDocuments() {
        // do nothing
    }
}
