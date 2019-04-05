/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import { mockAwardAmounts } from './mockAwardApi';

const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts);

const awardAmountsNeg = Object.create(BaseAwardAmounts);
const negativeObligation = {
    rollup_total_obligation: -1623321.02
};

const awardAmountsOverspent = Object.create(BaseAwardAmounts);
const overspending = {
    rollup_base_exercised_options_val: 5000000.00,
    rollup_base_and_all_options_value: 10000000.00,
    rollup_total_obligation: 7500000.00
};

const awardAmountsExtremeOverspent = Object.create(BaseAwardAmounts);
const extremeOverspending = {
    rollup_base_exercised_options_val: 2500000.00,
    rollup_base_and_all_options_value: 5000000.00,
    rollup_total_obligation: 10000000.00
};

awardAmountsNeg.populate(negativeObligation);
awardAmountsOverspent.populate(overspending);
awardAmountsExtremeOverspent.populate(extremeOverspending);

describe('BaseAwardAmounts', () => {
    it('should have an empty string as a unique generated id if the field is null or undefined', () => {
        expect(awardAmounts.generatedId).toEqual('');
    });
    it('should format the combined current award amounts amounts', () => {
        expect(awardAmounts.combinedCurrentAwardAmounts).toEqual('$10,000,000.00');
    });
    it('should format the combined current award amounts amounts with units', () => {
        expect(awardAmounts.combinedCurrentAwardAmountsFormatted).toEqual('$10.0 M');
    });
    it('should format the obligated amount', () => {
        expect(awardAmounts.obligation).toEqual('$1,623,321.02');
    });
    it('should format the obligation options with units', () => {
        expect(awardAmounts.obligationFormatted).toEqual('$1.6 M');
    });
    it('should format negative obligations', () => {
        expect(awardAmountsNeg.obligationFormatted).toEqual('($1.6 M)');
    });
    it('should format the combined potential award amounts amounts', () => {
        expect(awardAmounts.combinedPotentialAwardAmounts).toEqual('$106,987,321.10');
    });
    it('should format the combined potential award amounts amounts with units', () => {
        expect(awardAmounts.combinedPotentialAwardAmountsFormatted).toEqual('$107.0 M');
    });
    it('should format the amount by which obligations exceed the current amounts', () => {
        expect(awardAmountsOverspent.overspending).toEqual('$2,500,000.00');
    });
    it('should format the amount by which obligations exceed the current amounts with units', () => {
        expect(awardAmountsOverspent.overspendingFormatted).toEqual('$2.5 M');
    });
    it('should format the amount by which obligations exceed the potential amounts', () => {
        expect(awardAmountsExtremeOverspent.extremeOverspending).toEqual('$5,000,000.00');
    });
    it('should format the amount by which obligations exceed the potential amounts with units', () => {
        expect(awardAmountsExtremeOverspent.extremeOverspendingFormatted).toEqual('$5.0 M');
    });
});
