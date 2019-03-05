/**
 * BaseFederalAccount-test.js
 * Created by Kwadwo 04/04/19
 */

import BaseFederalAccount from 'models/v2/awardsV2/BaseFederalAccount';
import { mockSubmission } from './mockAwardApi';

const submission = Object.create(BaseFederalAccount);
submission.populate(mockSubmission);

describe('Base Financial Assistance', () => {
    describe('Submission Date', () => {
        it('should format the submission date', () => {
            expect(submission.submissionDate).toEqual('FY 2018 Q2');
        });
    });
    describe('Funding Obligated Amount', () => {
        it('should format the funding obligated amount', () => {
            expect(submission.fundingObligated).toEqual('$9,469');
        });
    });
    describe('Object Class', () => {
        it('should format the object class', () => {
            expect(submission.objectClass).toEqual('111 - Research Bread Types');
        });
    });
    describe('Program Activity', () => {
        it('should format the program activity', () => {
            expect(submission.programActivity).toEqual('1111 - Sandwich Logistics');
        });
    });
});
