/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import { mockAwardAmounts } from './mockAwardApi';

const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts, "idv");

const awardAmountsNeg = Object.create(BaseAwardAmounts);
const negativeObligation = {
    child_award_total_obligation: -811660.51,
    grandchild_award_total_obligation: -811660.51
};

const awardAmountsOverspent = Object.create(BaseAwardAmounts);
const overspending = {
    child_award_base_exercised_options_val: 2500000,
    grandchild_award_base_exercised_options_val: 2500000,
    child_award_base_and_all_options_value: 5000000,
    grandchild_award_base_and_all_options_value: 5000000,
    child_award_total_obligation: 3750000,
    grandchild_award_total_obligation: 3750000
};

const awardAmountsExtremeOverspent = Object.create(BaseAwardAmounts);
const extremeOverspending = {
    child_award_base_exercised_options_val: 1250000,
    grandchild_award_base_exercised_options_val: 1250000,
    child_award_base_and_all_options_value: 2500000,
    grandchild_award_base_and_all_options_value: 2500000,
    child_award_total_obligation: 5000000,
    grandchild_award_total_obligation: 5000000
};

awardAmountsNeg.populate(negativeObligation, "idv");
awardAmountsOverspent.populate(overspending, "idv");
awardAmountsExtremeOverspent.populate(extremeOverspending, "idv");

describe('BaseAwardAmounts', () => {
    describe('IDV Award Amounts', () => {
        it('should have an empty string as a unique generated id if the field is null or undefined', () => {
            expect(awardAmounts.generatedId).toEqual('');
        });
        it('should format the combined current award amounts amounts', () => {
            expect(awardAmounts.baseExercisedOptionsFormatted).toEqual('$10,000,000.00');
        });
        it('should format the combined current award amounts amounts with units', () => {
            expect(awardAmounts.baseExercisedOptionsAbbreviated).toEqual('$10.0 M');
        });
        it('should format the obligated amount', () => {
            expect(awardAmounts.totalObligationFormatted).toEqual('$1,623,321.02');
        });
        it('should format the totalObligation options with units', () => {
            expect(awardAmounts.totalObligationAbbreviated).toEqual('$1.6 M');
        });
        it('should format negative obligations', () => {
            expect(awardAmountsNeg.totalObligationAbbreviated).toEqual('($1.6 M)');
        });
        it('should format the combined potential award amounts amounts', () => {
            expect(awardAmounts.baseAndAllOptionsFormatted).toEqual('$106,987,321.10');
        });
        it('should format the combined potential award amounts amounts with units', () => {
            expect(awardAmounts.baseAndAllOptionsAbbreviated).toEqual('$107.0 M');
        });
        it('should format the amount by which obligations exceed the current amounts', () => {
            expect(awardAmountsOverspent.overspendingFormatted).toEqual('$2,500,000.00');
        });
        it('should format the amount by which obligations exceed the current amounts with units', () => {
            expect(awardAmountsOverspent.overspendingAbbreviated).toEqual('$2.5 M');
        });
        it('should format the amount by which obligations exceed the potential amounts', () => {
            expect(awardAmountsExtremeOverspent.extremeOverspendingFormatted).toEqual('$5,000,000.00');
        });
        it('should format the amount by which obligations exceed the potential amounts with units', () => {
            expect(awardAmountsExtremeOverspent.extremeOverspendingAbbreviated).toEqual('$5.0 M');
        });
        it('should format the amount overspent', () => {
            expect(awardAmountsOverspent.overspendingFormatted).toEqual('$2,500,000.00');
        });
        it('should format the amount overspent with units', () => {
            expect(awardAmountsOverspent.overspendingAbbreviated).toEqual('$2.5 M');
        });
    });
    describe('Non-IDV Award Amounts', () => {
        const nonIdvAwardAmounts = Object.create(BaseAwardAmounts);
        nonIdvAwardAmounts.populate(mockAwardAmounts, "contract");
        it('does not create IDV specific properties', () => {
            const arrayOfObjectProperties = Object.keys(nonIdvAwardAmounts);
            expect(arrayOfObjectProperties.includes("childIDVCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("_baseAndAllOptions")).toEqual(false);
            expect(arrayOfObjectProperties.includes("_totalObligation")).toEqual(false);
            expect(arrayOfObjectProperties.includes("_baseExercisedOptions")).toEqual(false);
        });
    });
});
