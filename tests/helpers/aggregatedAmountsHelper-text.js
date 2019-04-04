/**
 * aggregatedAmountsHelper-test.js
 * Created by Lizzie Salita 4/1/19
 */

import * as AggregatedAmountsHelper from 'helpers/aggregatedAmountsHelper';

describe('Aggregated Amounts helper functions', () => {
    describe('determineScenario', () => {
        it('should return "normal" when obligated amount is less than current and potential', () => {
            const mockAmounts = {
                _obligation: 50,
                _combinedCurrentAwardAmounts: 75,
                _combinedPotentialAwardAmounts: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineScenario(mockAmounts);
            expect(mockedScenario).toEqual("normal");
        });

        it('should return "exceedsCurrent" for overspending', () => {
            const mockAmounts = {
                _obligation: 75,
                _combinedCurrentAwardAmounts: 50,
                _combinedPotentialAwardAmounts: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineScenario(mockAmounts);
            expect(mockedScenario).toEqual("exceedsCurrent");
        });

        it('should return "exceedsPotential" for extreme overspending', () => {
            const mockAmounts = {
                _obligation: 100,
                _combinedCurrentAwardAmounts: 50,
                _combinedPotentialAwardAmounts: 75
            };
            const mockedScenario = AggregatedAmountsHelper.determineScenario(mockAmounts);
            expect(mockedScenario).toEqual("exceedsPotential");
        });

        it('should return "insufficientData" for negative obligations', () => {
            const mockAmounts = {
                _obligation: -55,
                _combinedCurrentAwardAmounts: 75,
                _combinedPotentialAwardAmounts: 100
            };
            const mockedScenario = AggregatedAmountsHelper.determineScenario(mockAmounts);
            expect(mockedScenario).toEqual("insufficientData");
        });

        it('should return "insufficientData" when current amount exceeds potential amount', () => {
            const mockAmounts = {
                _obligation: 50,
                _combinedCurrentAwardAmounts: 100,
                _combinedPotentialAwardAmounts: 75
            };
            const mockedScenario = AggregatedAmountsHelper.determineScenario(mockAmounts);
            expect(mockedScenario).toEqual("insufficientData");
        });
    });
});
