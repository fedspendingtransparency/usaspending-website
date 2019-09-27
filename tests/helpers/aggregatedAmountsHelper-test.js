/**
 * aggregatedAmountsHelper-test.js
 * Created by Lizzie Salita 4/1/19
 */

import * as AggregatedAmountsHelper from 'helpers/aggregatedAmountsHelper';

describe('Aggregated Amounts helper functions', () => {
    describe('determineSpendingScenario', () => {
        it('should return "normal" when obligated amount is less than current and potential', () => {
            const _totalObligation = 50;
            const _baseExercisedOptions = 75;
            const _baseAndAllOptions = 100;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("normal");
        });

        it('should return "exceedsBigger" for overspending', () => {
            const _totalObligation = 75;
            const _baseExercisedOptions = 50;
            const _baseAndAllOptions = 100;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("exceedsBigger");
        });

        it('should return "exceedsBiggest" for extreme overspending', () => {
            const _totalObligation = 100;
            const _baseExercisedOptions = 50;
            const _baseAndAllOptions = 75;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("exceedsBiggest");
        });

        it('should return "insufficientData" for negative obligations', () => {
            const _totalObligation = -55;
            const _baseExercisedOptions = 75;
            const _baseAndAllOptions = 100;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("insufficientData");
        });

        it('should return null when all values are zero', () => {
            const _totalObligation = 0;
            const _baseExercisedOptions = 0;
            const _baseAndAllOptions = 0;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual(null);
        });

        it('should return "insufficientData" when current amount exceeds potential amount', () => {
            const _totalObligation = 50;
            const _baseExercisedOptions = 100;
            const _baseAndAllOptions = 75;

            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(_totalObligation, _baseExercisedOptions, _baseAndAllOptions);
            expect(mockedScenario).toEqual("insufficientData");
        });
    });
    describe('generatePercentage', () => {
        it('should format the given value as a percentage, rounded to 2 decimal places', () => {
            expect(AggregatedAmountsHelper.generatePercentage(0.23456)).toEqual('23.46%');
        });
    });
});
