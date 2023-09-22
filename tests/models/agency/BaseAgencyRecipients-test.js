/**
 * @jest-environment jsdom
 * 
 * BaseAgencyRecipients-test.js
 * Created by Lizzie Salita 7/1/21
 */

import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';

// eslint-disable-next-line import/prefer-default-export
export const mockRecipientDistribution = {
    count: 987654,
    total_federal_count: 1234567,
    maxRecipients: 117728237755.8,
    minRecipients: 0.01,
    pct25: 19984,
    pct50: 75740,
    pct75: 208522
};

const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate(mockRecipientDistribution);

describe('BaseAgencyRecipients', () => {
    it('should format the number of recipients', () => {
        expect(recipientDistribution.numberOfRecipients).toEqual('987,654');
    });
    it('should handle a null value for the count', () => {
        const missingAbbrev = {
            ...mockRecipientDistribution,
            count: null
        };
        const mod = Object.create(BaseAgencyRecipients);
        mod.populate(missingAbbrev);
        expect(mod.numberOfRecipients).toEqual('--');
    });
    it('should format the agency recipients as a percent of federal recipients', () => {
        expect(recipientDistribution.percentOfFederalRecipients).toEqual('80.0%');
    });
});
