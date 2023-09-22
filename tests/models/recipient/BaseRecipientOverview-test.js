/**
 * @jest-environment jsdom
 * 
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
    it('should format the prime award total', () => {
        expect(recipient.totalLoanFaceValueAmount).toEqual('$123.1 million');
    });
    it('should format the total transactions', () => {
        expect(recipient.totalLoanTransactions).toEqual('2');
    });
    describe('location', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(recipient.location)).toEqual(CoreLocation);
        });
    });
    it('should indicate when the DUNS is not provided', () => {
        const updatedData = Object.assign(recipient, {}, {
            duns: null
        });
        const updatedRecipient = Object.create(BaseRecipientOverview);
        updatedRecipient.populate(updatedData);
        expect(updatedRecipient.duns).toBeNull();
    });
    it('should indicate when the recipient name is not provided', () => {
        const updatedData = Object.assign(recipient, {}, {
            name: null
        });
        const updatedRecipient = Object.create(BaseRecipientOverview);
        updatedRecipient.populate(updatedData);
        expect(updatedRecipient.name).toEqual('Name not provided');
    });
    it('should parse the business types into readable names', () => {
        const expected = [
            'Minority Owned Business',
            'Higher Education'
        ];
        expect(recipient.businessTypes).toEqual(expected);
    });
});
