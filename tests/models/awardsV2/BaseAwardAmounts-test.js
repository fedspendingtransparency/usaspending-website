/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/awardsV2/BaseAwardAmounts';
import BaseFinancialAssistance from '../../../src/js/models/v2/awardsV2/BaseFinancialAssistance';

import { mockAwardAmounts, mockContract, mockGrant, mockLoan } from './mockAwardApi';
import { decodedAwardId, encodedAwardId } from '../../mockData';

const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts, "idv_aggregated");

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

const nonAggregateIdvNormal = Object.create(BaseAwardAmounts);
const nonAggregateIdvOverspent = Object.create(BaseAwardAmounts);
const nonAggregateIdvExtremeOverspent = Object.create(BaseAwardAmounts);
const normalIdv = {
    _baseExercisedOptions: 0.0,
    _baseAndAllOptions: 0.0,
    _totalObligation: 0.0
};
const overspentIdv = {
    _baseExercisedOptions: 10.0,
    _baseAndAllOptions: 0.0,
    _totalObligation: 0.0

};
const extremeOverspentIdv = {
    _baseExercisedOptions: 0.0,
    _baseAndAllOptions: 10.0,
    _totalObligation: 0.0
};

awardAmountsNeg.populate(negativeObligation, "idv_aggregated");
awardAmountsOverspent.populate(overspending, "idv_aggregated");
awardAmountsExtremeOverspent.populate(extremeOverspending, "idv_aggregated");

nonAggregateIdvNormal.populate(normalIdv, 'idv');
nonAggregateIdvOverspent.populate(overspentIdv, 'idv');
nonAggregateIdvExtremeOverspent.populate(extremeOverspentIdv, 'idv');

describe('BaseAwardAmounts', () => {
    describe('All Award Types', () => {
        const awardAmountsWithId = Object.create(BaseAwardAmounts);
        awardAmountsWithId.populate({ ...mockContract, generated_unique_award_id: decodedAwardId }, 'grant');
        it('should encode the generated_unique_award_id when it is defined', () => {
            expect(awardAmountsWithId.generatedId).toEqual(encodedAwardId);
        });
        it('should handle case where the generatedId is undefined by making it an empty string', () => {
            const noId = Object.create(BaseAwardAmounts);
            noId.populate({ ...mockContract, generated_unique_award_id: null }, 'grant');
            expect(noId.generatedId).toEqual('');
        });
    });
    describe('IDV Award Type -- Aggregate Amounts', () => {
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
    describe('IDVs - Non Aggregated Award Amounts', () => {
        it('should successfully return spending data for the IDV itself (non-combined)', () => {
            expect(nonAggregateIdvNormal.baseExercisedOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.baseAndAllOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.overspendingFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.extremeOverspendingFormatted).toEqual('$0.00');
        });
        it('should handle overspending', () => {
            expect(nonAggregateIdvOverspent.baseExercisedOptionsFormatted).toEqual('$10.00');
            expect(nonAggregateIdvOverspent.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvOverspent.baseAndAllOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvOverspent.overspendingFormatted).toEqual('-$10.00');
            expect(nonAggregateIdvOverspent.extremeOverspendingFormatted).toEqual('$0.00');
        });
        it('should handle extremeOverspending', () => {
            expect(nonAggregateIdvExtremeOverspent.baseExercisedOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvExtremeOverspent.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvExtremeOverspent.baseAndAllOptionsFormatted).toEqual('$10.00');
            expect(nonAggregateIdvExtremeOverspent.overspendingFormatted).toEqual('$0.00');
            expect(nonAggregateIdvExtremeOverspent.extremeOverspendingFormatted).toEqual('-$10.00');
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
