/**
 * @jest-environment jsdom
 * 
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

const mockDefc = [{code: 'L', disaster: 'covid_19'}, {code: 'M', disaster: 'covid_19'}, {code: 'N', disaster: 'covid_19'}, {code: 'O', disaster: 'covid_19'}, {code: 'P', disaster: 'covid_19'}, {code: 'R', disaster: 'covid_19'}];
const awardAmounts = Object.create(BaseAwardAmounts);
awardAmounts.populate(mockAwardAmounts, "idv_aggregated", mockDefc);

const awardAmountsNeg = Object.create(BaseAwardAmounts);
const negativeObligationAgg = {
    child_account_obligations_by_defc: [],
    child_account_outlays_by_defc: [],
    child_award_total_obligation: -811660.51,
    grandchild_award_total_obligation: -811660.51
};

const awardAmountsOverspent = Object.create(BaseAwardAmounts);
const overspendingAgg = {
    child_account_obligations_by_defc: [],
    child_account_outlays_by_defc: [],
    child_award_base_exercised_options_val: 2500000,
    grandchild_award_base_exercised_options_val: 2500000,
    child_award_base_and_all_options_value: 5000000,
    grandchild_award_base_and_all_options_value: 5000000,
    child_award_total_obligation: 3750000,
    grandchild_award_total_obligation: 3750000
};

const awardAmountsExtremeOverspent = Object.create(BaseAwardAmounts);
const extremeOverspendingAgg = {
    child_account_obligations_by_defc: [],
    child_account_outlays_by_defc: [],
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

awardAmountsNeg.populate(negativeObligationAgg, "idv_aggregated", mockDefc);
awardAmountsOverspent.populate(overspendingAgg, "idv_aggregated", mockDefc);
awardAmountsExtremeOverspent.populate(extremeOverspendingAgg, "idv_aggregated", mockDefc);

nonAggregateIdvNormal.populate(normalIdv, 'idv', mockDefc);
nonAggregateIdvOverspent.populate(overspentIdv, 'idv', mockDefc);
nonAggregateIdvExtremeOverspent.populate(extremeOverspentIdv, 'idv', mockDefc);

describe('BaseAwardAmounts', () => {
    describe('All Award Types', () => {
        const awardAmountsWithId = Object.create(BaseAwardAmounts);
        awardAmountsWithId.populate({ ...mockContract, generated_unique_award_id: decodedAwardId }, 'grant', mockDefc);
        it('should encode the generated_unique_award_id when it is defined', () => {
            expect(awardAmountsWithId.generatedId).toEqual(encodedAwardId);
        });
        it('should handle case where the generatedId is undefined by making it an empty string', () => {
            const noId = Object.create(BaseAwardAmounts);
            noId.populate({ ...mockContract, generated_unique_award_id: null }, 'grant', mockDefc);
            expect(noId.generatedId).toEqual('');
        });
    });
    describe('IDV Award Type -- Aggregate Amounts', () => {
        it('should format the combined current award amounts amounts', () => {
            expect(awardAmounts.baseExercisedOptionsFormatted).toEqual('$10,000,000.00');
        });
        it('should format the combined current award amounts amounts with units', () => {
            expect(awardAmounts.baseExercisedOptionsAbbreviated).toEqual('$10.0 Million');
        });
        it('should format the obligated amount', () => {
            expect(awardAmounts.totalObligationFormatted).toEqual('$1,623,321.02');
        });
        it('should format the combined outlay amount', () => {
            expect(awardAmounts.combinedOutlayFormatted).toEqual('$2,222,222.22');
        });
        it('should format the totalObligation options with units', () => {
            expect(awardAmounts.totalObligationAbbreviated).toEqual('$1.6 Million');
        });
        it('should format negative obligations', () => {
            expect(awardAmountsNeg.totalObligationAbbreviated).toEqual('($1.6 Million)');
        });
        it('should format the combined potential award amounts amounts', () => {
            expect(awardAmounts.baseAndAllOptionsFormatted).toEqual('$106,987,321.10');
        });
        it('should format the combined potential award amounts amounts with units', () => {
            expect(awardAmounts.baseAndAllOptionsAbbreviated).toEqual('$107.0 Million');
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
        it('should aggregate child/grandchild file-c.md award amounts', () => {
            expect(awardAmounts._fileCObligated).toEqual(100);
            expect(awardAmounts._fileCOutlay).toEqual(100);
        });
    });
    describe('IDVs - Non Aggregated Award Amounts', () => {
        it('should successfully return spending data for the IDV itself (non-combined)', () => {
            expect(nonAggregateIdvNormal.baseExercisedOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.totalOutlayFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.baseAndAllOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.overspendingFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.extremeOverspendingFormatted).toEqual('$0.00');
        });
        it('should handle overspending', () => {
            expect(nonAggregateIdvOverspent.baseExercisedOptionsFormatted).toEqual('$10.00');
            expect(nonAggregateIdvOverspent.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.totalOutlayFormatted).toEqual('$0.00');
            expect(nonAggregateIdvOverspent.baseAndAllOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvOverspent.overspendingFormatted).toEqual('-$10.00');
            expect(nonAggregateIdvOverspent.extremeOverspendingFormatted).toEqual('$0.00');
        });
        it('should handle extremeOverspending', () => {
            expect(nonAggregateIdvExtremeOverspent.baseExercisedOptionsFormatted).toEqual('$0.00');
            expect(nonAggregateIdvExtremeOverspent.totalObligationFormatted).toEqual('$0.00');
            expect(nonAggregateIdvNormal.totalOutlayFormatted).toEqual('$0.00');
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
        contractAwardAmounts.populate(mockContract, "contract", mockDefc);
        const arrayOfObjectProperties = Object.keys(contractAwardAmounts);
        it('does not create IDV specific properties', () => {
            expect(arrayOfObjectProperties.includes("childIDVCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardTotalOutlay")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardTotalOutlay")).toEqual(false);
        });
    });
    describe('Grant Award Amounts', () => {
        const grantAwardAmounts = Object.create(BaseAwardAmounts);
        grantAwardAmounts.populate(mockGrant, "grant", mockDefc);
        const arrayOfObjectProperties = Object.keys(grantAwardAmounts);

        it('does not create IDV specific properties', () => {
            expect(arrayOfObjectProperties.includes("childIDVCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardCount")).toEqual(false);
            expect(arrayOfObjectProperties.includes("childAwardTotalOutlay")).toEqual(false);
            expect(arrayOfObjectProperties.includes("grandchildAwardTotalOutlay")).toEqual(false);
        });
        it('creates grant specific properties w/ correct formatting', () => {
            expect(grantAwardAmounts._nonFederalFunding).toEqual(1130000);
            expect(grantAwardAmounts.nonFederalFundingFormatted).toEqual("$1,130,000.00");
            expect(grantAwardAmounts.nonFederalFundingAbbreviated).toEqual("$1.1 Million");
            expect(grantAwardAmounts._totalFunding).toEqual(1130000000);
            expect(grantAwardAmounts.totalFundingFormatted).toEqual("$1,130,000,000.00");
            expect(grantAwardAmounts.totalFundingAbbreviated).toEqual("$1.1 Billion");
        });
    });
    describe('Loan Award Amounts', () => {
        const loanAwardAmounts = Object.create(BaseAwardAmounts);
        loanAwardAmounts.populate(mockLoan, "loan", mockDefc);
        it('creates loan specific properties w/ correct formatting', () => {
            expect(loanAwardAmounts._subsidy).toEqual(1290000.00);
            expect(loanAwardAmounts.subsidyFormatted).toEqual("$1,290,000.00");
            expect(loanAwardAmounts.subsidyAbbreviated).toEqual("$1.3 Million");
            expect(loanAwardAmounts._faceValue).toEqual(2497000000.00);
            expect(loanAwardAmounts.faceValueFormatted).toEqual("$2,497,000,000.00");
            expect(loanAwardAmounts.faceValueAbbreviated).toEqual("$2.5 Billion");
        });
    });
    describe('fileC getters', () => {
        const addCovidSpending = (obj, obligated, outlayed, isAgg = false) => {
            if (isAgg) {
                return {
                    ...obj,
                    child_account_outlays_by_defc: [{ amount: 1, code: 'not-covid' }, { amount: outlayed, code: 'M' }],
                    child_account_obligations_by_defc: [{ amount: 1, code: 'not-covid' }, { amount: obligated, code: 'M' }]
                };
            }
            return {
                ...obj,
                fileC: {
                    obligations: [{ amount: 1, code: 'not-covid' }, { amount: obligated, code: 'M' }],
                    outlays: [{ amount: 1, code: 'not-covid' }, { amount: outlayed, code: 'M' }]
                }
            };
        };

        it.each([
            ['contract', 'CONT_AWD_N0001917C0001_9700_-NONE-_-NONE-', addCovidSpending(mockContract, 5000000, 2500000)],
            ['idv', 'CONT_IDV_EDFSA09D0012_9100', addCovidSpending(mockIdv, 5000000, 2500000)],
            ['idv_aggregated', 'CONT_IDV_EDFSA09D0012_9100', addCovidSpending(mockIdv, 5000000, 2500000, true)],
            ['grant', 'ASST_NON_1905CA5MAP_7530', addCovidSpending(mockGrant, 5000000, 2500000)],
            ['loan', 'ASST_NON_13789835_12D2', addCovidSpending(mockLoan, 5000000, 2500000)]
        ])('For %s awards, get formatted and get abbreviated file c data returns as expected', (
            awardType,
            id,
            mockAward
        ) => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({ ...mockAward, generatedId: id }, awardType, mockDefc);
            expect(mockAwardAmount.fileCObligatedFormatted).toEqual("$5,000,000.00");
            expect(mockAwardAmount.fileCObligatedAbbreviated).toEqual("$5.0 M");

            expect(mockAwardAmount.fileCOutlayFormatted).toEqual("$2,500,000.00");
            expect(mockAwardAmount.fileCOutlayAbbreviated).toEqual("$2.5 M");
        });
    });
    describe('fileCObligated and fileCOutlay only represent COVID spending', () => {
        it('does not include non-covid amounts', () => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({
                ...mockContract,
                // not using white listed formulaic way of populating file c data
                generatedId: 'test',
                fileC: {
                    obligations: [{ amount: 1, code: 'not-covid' }, { amount: 10, code: 'M' }],
                    outlays: [{ amount: 1, code: 'not-covid' }, { amount: 10, code: 'M' }]
                }
            }, 'contract', mockDefc);
            expect(mockAwardAmount._fileCObligated).toEqual(10);
            expect(mockAwardAmount._fileCOutlay).toEqual(10);
        });
        it('provides aggregate amount of all covid codes amounts', () => {
            const mockAwardAmount = Object.create(BaseAwardAmounts);
            mockAwardAmount.populate({
                ...mockContract,
                // not using white listed formulaic way of populating file c data
                generatedId: 'test',
                fileC: {
                    obligations: [{ amount: 1, code: 'N' }, { amount: 10, code: 'M' }],
                    outlays: [{ amount: 1, code: 'N' }, { amount: 10, code: 'M' }]
                }
            }, 'contract', mockDefc);
            expect(mockAwardAmount._fileCObligated).toEqual(11);
            expect(mockAwardAmount._fileCOutlay).toEqual(11);
        });
    });
});
