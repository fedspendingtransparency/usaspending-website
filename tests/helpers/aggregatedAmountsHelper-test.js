/**
 * aggregatedAmountsHelper-test.js
 * Created by Lizzie Salita 4/1/19
 */

import * as AggregatedAmountsHelper from 'helpers/aggregatedAmountsHelper';

describe('Aggregated Amounts helper functions', () => {
    describe('determineSpendingScenario', () => {
        it('should return "normal" when obligated amount is less than current and potential', () => {
            const mockAmounts = {
                _totalObligation: 50,
                _baseExercisedOptions: 75,
                _baseAndAllOptions: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual("normal");
        });

        it('should return "exceedsCurrent" for overspending', () => {
            const mockAmounts = {
                _totalObligation: 75,
                _baseExercisedOptions: 50,
                _baseAndAllOptions: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual("exceedsCurrent");
        });

        it('should return "exceedsPotential" for extreme overspending', () => {
            const mockAmounts = {
                _totalObligation: 100,
                _baseExercisedOptions: 50,
                _baseAndAllOptions: 75
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual("exceedsPotential");
        });

        it('should return "insufficientData" for negative obligations', () => {
            const mockAmounts = {
                _totalObligation: -55,
                _baseExercisedOptions: 75,
                _baseAndAllOptions: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual("insufficientData");
        });

        it('should return null when all values are zero', () => {
            const mockAmounts = {
                _totalObligation: 0,
                _baseExercisedOptions: 0,
                _baseAndAllOptions: 0
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual(null);
        });

        it('should return "insufficientData" when current amount exceeds potential amount', () => {
            const mockAmounts = {
                _totalObligation: 50,
                _baseExercisedOptions: 100,
                _baseAndAllOptions: 75
            };
            const mockedScenario = AggregatedAmountsHelper.determineSpendingScenario(mockAmounts);
            expect(mockedScenario).toEqual("insufficientData");
        });
    });
    describe('generatePercentage', () => {
        it('should format the given value as a percentage, rounded to 2 decimal places', () => {
            expect(AggregatedAmountsHelper.generatePercentage(0.23456)).toEqual('23.46%');
        });
    });
});
