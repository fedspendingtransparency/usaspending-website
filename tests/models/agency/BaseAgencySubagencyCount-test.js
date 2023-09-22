/**
 * @jest-environment jsdom
 * 
 * BaseAgencySubagencyCount-test.js
 */

import BaseAgencySubagencyCount from 'models/v2/agency/BaseAgencySubagencyCount';

// eslint-disable-next-line import/prefer-default-export
export const mockSubagencyCounts = {
    subagencyCount: 45,
    officeCount: 10,
    newAwardCount: 8445,
    transactionCount: 234567,
    obligations: 3000
};
const subagenciesData = Object.create(BaseAgencySubagencyCount);
subagenciesData.populate(mockSubagencyCounts);

describe('BaseAgencySubagencyCount', () => {
    it('should handle a null value for the count', () => {
        const missingAbbrev = {
            ...mockSubagencyCounts,
            obligations: null
        };
        const mod = Object.create(BaseAgencySubagencyCount);
        mod.populate(missingAbbrev);
        expect(mod.obligations).toEqual('--');
    });
    it('should return counts', () => {
        expect(subagenciesData.obligations).toEqual(3000);
    });
});
