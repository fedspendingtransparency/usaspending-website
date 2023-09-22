/**
 * @jest-environment jsdom
 * 
 * CoreAward-test.js
 * Created by David Trinh 10/10/18
 */

import CoreAward from 'models/v2/award/CoreAward';
import { each, upperFirst } from 'lodash';
import { descriptionsForAwardTypes }
    from 'dataMapping/award/descriptionsForAwardTypes';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { decodedAwardId, encodedAwardId } from "../../mockData";

const awardData = {
    subawardTotal: 12004.75,
    baseExercisedOptions: 2342342.32,
    totalObligation: 12345678.00,
    baseAndAllOptions: 20100.00
};

const fileCData = {
    outlays: [{ code: 'M', amount: 5 }],
    obligations: [{ code: 'L', amount: 4 }]
};

const award = Object.create(CoreAward);
award.populateCore(awardData);

describe('Core Award Model', () => {
    it('should encode the generatedId and return empty string when null', () => {
        const withId = Object.create(CoreAward);
        withId.populateCore({ ...awardData, generatedId: decodedAwardId });
        expect(withId.generatedId).toEqual(encodedAwardId);

        const noId = Object.create(CoreAward);
        noId.populateCore({ ...awardData, generatedId: null });
        expect(noId.generatedId).toEqual('');
    });
    it('should store file c obligations and outlays and return empty array when null', () => {
        const withFileC = Object.create(CoreAward);
        withFileC.populateCore({ ...awardData, fileC: fileCData });
        expect(withFileC.fileC.obligations.length).toEqual(1);

        const withoutFileC = Object.create(CoreAward);
        withoutFileC.populateCore({ ...awardData, account_obligations_by_def_code: [], account_outlays_by_def_code: [] });
        expect(withoutFileC.fileC.obligations).toEqual([]);
    });
    it('should populate DefCodes', () => {
        const withFileC = Object.create(CoreAward);
        withFileC.populateCore({
            ...awardData,
            fileC: {
                ...fileCData,
                outlays: fileCData.outlays.concat([{ code: 'N', amount: 0 }])
            }
        });
        expect(withFileC.defCodes.includes('N')).toEqual(false);

        const withoutFileC = Object.create(CoreAward);
        withoutFileC.populateCore(awardData);
        expect(withoutFileC.defCodes).toEqual([]);
    });
    describe('Getter functions', () => {
        it('should format the subaward total', () => {
            expect(award.subawardTotal).toEqual('$12,005');
        });
        it('should derive the subawardedPercent', () => {
            expect(award.subAwardedPercent)
                .toEqual(`${formatNumberWithPrecision(((
                    awardData.subawardTotal / awardData.totalObligation
                ) * 100), 1)}%`);
        });
        it('should handle zero subawardedPercent', () => {
            const zeroSubtotalAward = Object.create(CoreAward);
            const data = { ...award, _subawardTotal: 0 };
            zeroSubtotalAward.populateCore(data);
            expect(zeroSubtotalAward.subAwardedPercent).toEqual('0%');
        });
        describe('Test the title method', () => {
            describe('Case where Award Type Exists', () => {
                each(descriptionsForAwardTypes, (value, key) => {
                    const fakeAwardData = { type: key };
                    const fakeAward = Object.create(CoreAward);
                    fakeAward.populateCore(fakeAwardData);
                    it(`should map Award Type [${key}] to an Award Title ${value}`, () => {
                        expect(fakeAward.title).toEqual(value);
                    });
                });
            });
            describe('Case where Award Type does not exist, use category', () => {
                each(['idv', 'contract', 'grant', 'loan', 'other'], (category) => {
                    const fakeAwardData = { type: '', category };
                    const fakeAward = Object.create(CoreAward);
                    fakeAward.populateCore(fakeAwardData);
                    it(`should map Award Category [${category}] to an Award Title`, () => {
                        if (category !== 'idv') {
                            expect(fakeAward.title).toEqual(upperFirst(category));
                        }
                        else {
                            expect(fakeAward.title).toEqual('IDV');
                        }
                    });
                });
            });
            describe('Case where Award Type and Category do not exist', () => {
                each(descriptionsForAwardTypes, () => {
                    const fakeAwardData = { type: '', category: '' };
                    const fakeAward = Object.create(CoreAward);
                    fakeAward.populateCore(fakeAwardData);
                    it(`should map Award with no type or category to --`, () => {
                        expect(fakeAward.title).toEqual('--');
                    });
                });
            });
        });
    });

});
