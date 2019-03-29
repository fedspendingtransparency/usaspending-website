/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import { mockAwardAmounts } from './mockAwardApi';

const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts);

describe('BaseAwardAmounts', () => {
    it('should have an empty string as a unique generated id if the field is null or undefined', () => {
        expect(awardAmounts.generatedId).toEqual('');
    });
    it('should format the rolled base exercised options', () => {
        expect(awardAmounts.combinedPotentialAwardAmounts).toEqual('$10,000,000.00');
    });
    it('should format the rolled base exercised options with units', () => {
        expect(awardAmounts.combinedPotentialAwardAmountsFormatted).toEqual('$10.0 M');
    });
    it('should format the obligated amount', () => {
        expect(awardAmounts.obligation).toEqual('$1,623,321.02');
    });
    it('should format the obligation options with units', () => {
        expect(awardAmounts.obligationFormatted).toEqual('$1.6 M');
    });
    // TODO - Lizzie: test negative obligated amounts
    it('should format the rolled base and all options', () => {
        expect(awardAmounts.combinedCurrentAwardAmounts).toEqual('$106,987,321.10');
    });
    it('should format the rolled base and all options with units', () => {
        expect(awardAmounts.combinedCurrentAwardAmountsFormatted).toEqual('$107.0 M');
    });
    it('should calculate the right obligated percentage', () => {
        expect(awardAmounts.obligatedPercentage).toEqual(2);
    });
    it('should calculate the right exercised percentage', () => {
        expect(awardAmounts.exercisedPercentage).toEqual(7);
    });
});
