/**
 * BaseAwardRecipient-test.js
 * Created by Lizzie Salita 3/20/18
 */

import BaseAwardRecipient from 'models/v2/awards/BaseAwardRecipient';
import CoreLocation from 'models/v2/CoreLocation';
import { mockContract, mockAwardV1Api } from './mockAwardApi';

const recipient = Object.create(BaseAwardRecipient);
recipient.populate(mockContract.recipient);

describe('BaseAwardRecipient', () => {
    it('should parse the business types', () => {
        const recipientV1 = Object.create(BaseAwardRecipient);
        recipientV1.populate(mockAwardV1Api.recipient);
        expect(recipientV1.businessTypes).toEqual([
            'Minority Owned Business',
            'Nonprofit Organization'
        ]);
    });
    it('should parse the business categories', () => {
        expect(recipient.businessCategories).toEqual([
            'Testing 1',
            'Testing 2'
        ]);
    });
    it('should have a location property with CoreLocation in its prototype chain', () => {
        expect(Object.getPrototypeOf(recipient.location)).toEqual(CoreLocation);
    });
});
