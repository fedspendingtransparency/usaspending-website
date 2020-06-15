/**
 * BaseAwardAmounts-test.js
 * Created by David Trinh 2/11/19
 */

import BaseAwardAmounts from 'models/v2/award/BaseAwardAmounts';
import BaseContract from 'models/v2/award/BaseContract';
import BaseFinancialAssistance from 'models/v2/award/BaseFinancialAssistance';
import BaseIdv from 'models/v2/award/BaseIdv';

import * as mockApiData from './mockAwardApi';
import { decodedAwardId, encodedAwardId } from '../../mockData';

// For Aggregate IDVs, we pass to this model unparsed api data
const { mockAwardAmounts } = mockApiData;

// For every other award type, we pass the model data from the api that's already been parsed
const mockContract = Object.create(BaseContract);
mockContract.populate(mockApiData.mockContract);

const mockGrant = Object.create(BaseFinancialAssistance);
mockGrant.populate(mockApiData.mockGrant);

const mockIdv = Object.create(BaseIdv);
mockIdv.populate(mockApiData.mockIdv);

const mockLoan = Object.create(BaseFinancialAssistance);
mockLoan.populate(mockApiData.mockLoan);

const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts, "idv_aggregated");

const awardAmountsNeg = Object.create(BaseAwardAmounts);
const negativeObligationAgg = {
    account_obligations_by_defc: [],
    account_outlays_by_defc: [],
    child_award_total_obligation: -811660.51,
    grandchild_award_total_obligation: -811660.51
};

const awardAmountsOverspent = Object.create(BaseAwardAmounts);
const overspendingAgg = {
    account_obligations_by_defc: [],
    account_outlays_by_defc: [],
    child_award_base_exercised_options_val: 2500000,
    grandchild_award_base_exercised_options_val: 2500000,
    child_award_base_and_all_options_value: 5000000,
    grandchild_award_base_and_all_options_value: 5000000,
    child_award_total_obligation: 3750000,
    grandchild_award_total_obligation: 3750000
};

const awardAmountsExtremeOverspent = Object.create(BaseAwardAmounts);
const extremeOverspendingAgg = {
    account_obligations_by_defc: [],
    account_outlays_by_defc: [],
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
    fileC: {
        obligations: [],
        outlays: []
    },
    _baseExercisedOptions: 0.0,
    _baseAndAllOptions: 0.0,
    _totalObligation: 0.0
};
const overspentIdv = {
    fileC: {
        obligations: [],
        outlays: []
    },
    _baseExercisedOptions: 10.0,
    _baseAndAllOptions: 0.0,
    _totalObligation: 0.0

};
const extremeOverspentIdv = {
    fileC: {
        obligations: [],
        outlays: []
    },
    _baseExercisedOptions: 0.0,
    _baseAndAllOptions: 10.0,
    _totalObligation: 0.0
};

awardAmountsNeg.populate(negativeObligationAgg, "idv_aggregated");
awardAmountsOverspent.populate(overspendingAgg, "idv_aggregated");
awardAmountsExtremeOverspent.populate(extremeOverspendingAgg, "idv_aggregated");

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
        const loanAwardAmounts = Object.create(BaseAwardAmounts);
        loanAwardAmounts.populate(mockLoan, "loan");
        it('creates loan specific properties w/ correct formatting', () => {
            expect(loanAwardAmounts._subsidy).toEqual(1290000.00);
            expect(loanAwardAmounts.subsidyFormatted).toEqual("$1,290,000.00");
            expect(loanAwardAmounts.subsidyAbbreviated).toEqual("$1.3 M");
            expect(loanAwardAmounts._faceValue).toEqual(2497000000.00);
            expect(loanAwardAmounts.faceValueFormatted).toEqual("$2,497,000,000.00");
            expect(loanAwardAmounts.faceValueAbbreviated).toEqual("$2.5 B");
        });
    });
    describe('Mock Awards for Cares Act Release', () => {
        it.each([
            ['contract', 'CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-', mockContract, '_totalObligation', 100],
            ['idv', 'CONT_IDV_EDFSA09D0012_9100', mockIdv, '_totalObligation', 100],
            ['grant', 'ASST_NON_1905CA5MAP_7530', mockGrant, '_totalObligation', 100],
            ['loan', 'ASST_NON_13789835_12D2', mockLoan, '_subsidy', 100]
        ])('For %s awards, with whitelisted award id %s it adds mock file c data', (
            awardType,
            id,
            mockAward,
            denominatorKey,
            denominatorValue
        ) => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({ ...mockAward, generatedId: id, [denominatorKey]: denominatorValue }, awardType);
            expect(mockAwardAmount._showFileC).toEqual(true);
            expect(mockAwardAmount._fileCObligated > 0).toEqual(true);
            expect(mockAwardAmount._fileCOutlay > 0).toEqual(true);
            expect(mockAwardAmount._fileCOutlay < mockAwardAmount._fileCObligated).toEqual(true);
        });
        it.each([
            ['contract', 'CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-z', mockContract, '_totalObligation', 100],
            ['idv', 'CONT_IDV_EDFSA09D0012_9100-z', mockIdv, '_totalObligation', 100],
            ['grant', 'ASST_NON_1905CA5MAP_7530-z', mockGrant, '_totalObligation', 100],
            ['loan', 'ASST_NON_13789835_12D2-z', mockLoan, '_subsidy', 100]
        ])('For %s awards not whitelisted (%s) it does not add the mock file c data', (
            awardType,
            id,
            mockAward,
            denominatorKey,
            denominatorValue
        ) => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({ ...mockAward, generatedId: id, [denominatorKey]: denominatorValue }, awardType);
            expect(mockAwardAmount._showFileC).toEqual(false);
            expect(mockAwardAmount._fileCObligated > 0).toEqual(false);
            expect(mockAwardAmount._fileCOutlay > 0).toEqual(false);
            expect(mockAwardAmount._fileCOutlay < mockAwardAmount._fileCObligated).toEqual(false);
        });
    });
    describe('fileC getters', () => {
        it.each([
            ['contract', 'CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-', mockContract, '_totalObligation', 10000000],
            ['idv', 'CONT_IDV_EDFSA09D0012_9100', mockIdv, '_totalObligation', 10000000],
            ['grant', 'ASST_NON_1905CA5MAP_7530', mockGrant, '_totalObligation', 10000000],
            ['loan', 'ASST_NON_13789835_12D2', mockLoan, '_subsidy', 10000000]
        ])('For %s awards, get formatted and get abbreviated file c data returns as expected', (
            awardType,
            id,
            mockAward,
            denominatorKey,
            denominatorValue
        ) => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({ ...mockAward, generatedId: id, [denominatorKey]: denominatorValue }, awardType);
            expect(mockAwardAmount._showFileC).toEqual(true);
            expect(mockAwardAmount.fileCObligatedFormatted).toEqual("$5,000,000.00");
            expect(mockAwardAmount.fileCObligatedAbbreviated).toEqual("$5.0 M");

            expect(mockAwardAmount.fileCOutlayFormatted).toEqual("$2,500,000.00");
            expect(mockAwardAmount.fileCOutlayAbbreviated).toEqual("$2.5 M");
        });
    });
});
