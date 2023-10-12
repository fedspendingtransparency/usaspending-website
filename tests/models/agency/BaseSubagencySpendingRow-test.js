/**
 * @jest-environment jsdom
 */
import BaseSubagencySpendingRow from 'models/v2/agency/BaseSubagencySpendingRow';

// eslint-disable-next-line import/prefer-default-export
export const mockAwardSpendingRow = {
    name: "Small Business Administration",
    abbreviation: "SBA",
    total_obligations: 553748221.72,
    transaction_count: 14358,
    new_award_count: 13266,
    children: [
        {
            name: "OFC OF CAPITAL ACCESS",
            total_obligations: 549195419.92,
            transaction_count: 13410,
            new_award_count: 12417
        },
        {
            name: "OFC OF DISASTER ASSISTANCE",
            total_obligations: 4577429.17,
            transaction_count: 943,
            new_award_count: 576
        }
    ]
};


const awardSpendingRow = Object.create(BaseSubagencySpendingRow);
awardSpendingRow.populateCore(mockAwardSpendingRow);

describe('BaseSubagencySpendingRow', () => {
    it('should store the name', () => {
        expect(awardSpendingRow.name).toEqual('Small Business Administration');
    });
    it('should store the formatted obligation amount', () => {
        expect(awardSpendingRow.totalObligations).toEqual('$553,748,222');
    });
    it('should store the formatted transaction count', () => {
        expect(awardSpendingRow.transactionCount).toEqual('14,358');
    });
    it('should store the formatted award count', () => {
        expect(awardSpendingRow.newAwardCount).toEqual('13,266');
    });
});
