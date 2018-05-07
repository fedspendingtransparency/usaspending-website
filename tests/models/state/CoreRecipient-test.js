/**
 * CoreRecipient-test.js
 * Created by Lizzie Salita 5/7/18
 */

import CoreRecipient from 'models/v2/state/CoreRecipient';

const recipientData = {
    name: 'Virginia',
    id: 1,
    totalAmount: 1234500,
    totalAwards: 98765,
    fy: 1987
};

const recipient = Object.create(CoreRecipient);
recipient.populateCore(recipientData);

describe('Core Award getter functions', () => {
    it('should format the award total', () => {
        expect(recipient.totalAmount).toEqual('$1.2 million');
    });
    it('should format the total awards', () => {
        expect(recipient.totalAwards).toEqual('98,765');
    });
    it('should store fiscal year as a string', () => {
        expect(recipient.fy).toEqual('1987');
    });
});
