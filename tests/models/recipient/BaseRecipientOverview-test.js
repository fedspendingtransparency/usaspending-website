/**
 * BaseRecipientOverview-test.js
 * Created by Lizzie Salita 6/26/18
 */

import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import CoreLocation from 'models/v2/CoreLocation';
import { mockRecipientOverview } from './mockRecipientApi';

const recipient = Object.create(BaseRecipientOverview);
recipient.populate(mockRecipientOverview);

describe('BaseRecipientOverview', () => {
    it('should format the prime award total', () => {
        expect(recipient.totalAmount).toEqual('$30.0 billion');
    });
    it('should format the total transactions', () => {
        expect(recipient.totalTransactions).toEqual('327,721');
    });
    describe('location', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(recipient.location)).toEqual(CoreLocation);
        });
    });
});
