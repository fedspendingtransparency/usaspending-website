/**
 * @jest-environment jsdom
 * 
 * BaseAwardBreakdownRow-test.js
 * Created by Lizzie Salita 5/22/18
 */

import BaseAwardBreakdownRow from 'models/v2/state/BaseAwardBreakdownRow';
import { mockBreakdownApi } from './mockStateApi';

const breakdown = Object.create(BaseAwardBreakdownRow);
breakdown.populate(mockBreakdownApi[0]);

describe('BaseAwardBreakdownRow', () => {
    describe('format amount', () => {
        it('should use unit labels for amounts with an absolute value of $1M or more', () => {
            expect(breakdown.amount).toEqual('$1.5M');
        });
        it('should round to the nearest dollar for amounts with an absolute value of $1,000 or more', () => {
            const grantBreakdown = Object.create(BaseAwardBreakdownRow);
            grantBreakdown.populate(mockBreakdownApi[1]);

            expect(grantBreakdown.amount).toEqual('-$50,654');
        });
    });
    it('should format the count', () => {
        expect(breakdown.count).toEqual('5,012');
    });
    it('should lookup the corresponding label', () => {
        expect(breakdown.name).toEqual('Contracts');
    });
});
