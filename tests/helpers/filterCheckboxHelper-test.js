/**
 * @jest-environment jsdom
 */

import {
    characteristicsCount,
    excludeIDVB,
    generateCount,
    sourcesCount
} from "../../src/js/helpers/search/filterCheckboxHelper";

describe('filterCheckboxHelper tests', () => {
    describe('generateCount', () => {
        it('generates a proper count', () => {
            const data = new Map();

            data.set('counts', [
                { count: 10 },
                { count: 20 },
                { count: 30 },
                { count: 40 }
            ]);
            data.set('require', [10, 20]);
            data.set('exclude', []);

            const dataCount = generateCount(data);

            expect(dataCount).toBe(100);
        });
    });

    describe('excludeIDVB', () => {
        it('removes IDVB', () => {
            const test = new Set(["IDV_B", 'test 1']);

            expect(excludeIDVB(test)).toBe(1);
            expect(excludeIDVB(test)).toBe(1);
        });
    });

    describe('characteristicsCount', () => {
        it('counts up the characteristics filters', () => {
            const data = new Map();

            data.set('counts', [
                { count: 10 },
                { count: 20 },
                { count: 30 },
                { count: 40 }
            ]);

            const test1 = {
                selectedAwardIDs: new Set(['selectedAwardIDs']),
                awardAmounts: new Set(['awardAmounts']),
                contractAwardType: new Set([["IDV_B", 'test 1']]),
                financialAssistanceAwardType: new Set(['financialAssistanceAwardType']),
                naicsCodes: data,
                pscCodes: data,
                pricingType: new Set(['pricingType']),
                setAside: new Set(['setAside']),
                extentCompeted: new Set(['extentCompeted']),
                selectedCFDA: new Set(['selectedCFDA']),
                awardDescription: 'awardDescription'
            };

            const test2 = {
                selectedAwardIDs: new Set(['selectedAwardIDs']),
                awardAmounts: new Set(['awardAmounts']),
                contractAwardType: new Set([["IDV_B", 'test 1']]),
                financialAssistanceAwardType: new Set(['financialAssistanceAwardType']),
                naicsCodes: data,
                pscCodes: data,
                pricingType: new Set(['pricingType']),
                setAside: new Set(['setAside']),
                extentCompeted: new Set(['extentCompeted']),
                selectedCFDA: new Set(['selectedCFDA']),
                awardDescription: null
            };

            expect(characteristicsCount(test1)).toBe(209);
            expect(characteristicsCount(test2)).toBe(208);
        });
    });

    describe('sourcesCount', () => {
        it('counts up the sources filters', () => {
            const data = new Map();

            data.set('counts', [
                { count: 10 },
                { count: 20 },
                { count: 30 },
                { count: 40 }
            ]);

            const test = {
                selectedAwardingAgencies: new Set(['selectedAwardingAgencies']),
                selectedFundingAgencies: new Set(['selectedFundingAgencies']),
                tasCodes: data,
                defCode: new Set(['defCode'])
            };

            expect(sourcesCount(test)).toBe(104);
        });
    });
});
