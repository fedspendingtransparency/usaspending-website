/**
 * @jest-environment jsdom
 * 
 * BaseChildRecipient-test.js
 * Created by Lizzie Salita 6/26/18
 */

import BaseChildRecipient from 'models/v2/recipient/BaseChildRecipient';
import { mockChildRecipients } from './mockRecipientApi';

const recipient = Object.create(BaseChildRecipient);
recipient.populate(mockChildRecipients[0]);

describe('BaseChildRecipient', () => {
    it('should format the amount', () => {
        expect(recipient.amount).toEqual('$30,020,000');
    });
    it('calculate and format the percentage for a given total', () => {
        expect(recipient.percentage(100000000)).toEqual('30.02%');
    });
});
