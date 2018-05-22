/**
 * BaseAwardBreakdownRow-test.js
 * Created by Lizzie Salita 5/22/18
 */

import BaseAwardBreakdownRow from 'models/v2/state/BaseAwardBreakdownRow';
import { mockBreakdownApi } from './mockStateApi';

const breakdown = Object.create(BaseAwardBreakdownRow);
breakdown.populate(mockBreakdownApi[0]);

describe('BaseAwardBreakdownRow', () => {
    it('should format the amount', () => {
        expect(breakdown.amount).toEqual('$50,654.19');
    });
    it('should format the count', () => {
        expect(breakdown.count).toEqual('5,012');
    });
    it('should lookup the corresponding label', () => {
        expect(breakdown.name).toEqual('Contracts');
    });
});
