/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import BaseFinancialAssistance from '../../../src/js/models/v2/awardsV2/BaseFinancialAssistance';

import { mockAwardAmounts, mockContract, mockGrant, mockLoan } from './mockAwardApi';

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
    describe('IDV Award Type', () => {
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
    /*
      * IDVs/Contracts/Grants all share the same getters tested above.
      * The only difference is when an IDV Award is passed to BaseAwardAmounts.populate(awardType, data) fn
      * The data parameter is coming straight from the api and so is snake_cased_like_this.
      * For the Contract/FinancialAssistance award types, on the other hand, the data is expected to be in the camelCase
      * prepended with an underscore _likeThis because the data parameter in this context has already been parsed by the CoreAward
      * Model.
    */
    describe('Contract Award Amounts', () => {
        const contractAwardAmounts = Object.create(BaseAwardAmounts);
        contractAwardAmounts.populate(mockContract, "contract");
        const arrayOfObjectProperties = Object.keys(contractAwardAmounts);
        it('does not create IDV specific properties', () => {
            expect(arrayOfObjectProperties.includes("childIDVCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardCount")).toEqual(false);
        });
    });
    describe('Grant Award Amounts', () => {
        const grantAwardAmounts = Object.create(BaseAwardAmounts);
        grantAwardAmounts.populate(mockGrant, "grant");
        const arrayOfObjectProperties = Object.keys(grantAwardAmounts);

        it('does not create IDV specific properties', () => {
            expect(arrayOfObjectProperties.includes("childIDVCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardCount")).toEqual(false);
        });
        it('creates grant specific properties w/ correct formatting', () => {
            expect(grantAwardAmounts._nonFederalFunding).toEqual(1130000);
            expect(grantAwardAmounts.nonFederalFundingFormatted).toEqual("$1,130,000.00");
            expect(grantAwardAmounts.nonFederalFundingAbbreviated).toEqual("$1.1 M");
            expect(grantAwardAmounts._totalFunding).toEqual(1130000000);
            expect(grantAwardAmounts.totalFundingFormatted).toEqual("$1,130,000,000.00");
            expect(grantAwardAmounts.totalFundingAbbreviated).toEqual("$1.1 B");
        });
    });
    describe('Loan Award Amounts', () => {
        const parsedLoan = Object.create(BaseFinancialAssistance);
        parsedLoan.populate(mockLoan);
        const loanAwardAmounts = Object.create(BaseAwardAmounts);
        loanAwardAmounts.populate(parsedLoan, "loan");
        it('creates loan specific properties w/ correct formatting', () => {
            expect(loanAwardAmounts._subsidy).toEqual(1290000.00);
            expect(loanAwardAmounts.subsidyFormatted).toEqual("$1,290,000.00");
            expect(loanAwardAmounts.subsidyAbbreviated).toEqual("$1.3 M");
            expect(loanAwardAmounts._faceValue).toEqual(2497000000.00);
            expect(loanAwardAmounts.faceValueFormatted).toEqual("$2,497,000,000.00");
            expect(loanAwardAmounts.faceValueAbbreviated).toEqual("$2.5 B");
        });
    });
});
