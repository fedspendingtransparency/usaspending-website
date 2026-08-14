/**
 * @jest-environment jsdom
 * 
 * explorerQuarters-test.js
 * Created by Kevin Li 2/16/18
 */

import * as explorerQuarters from 'containers/explorer/detail/helpers/explorerQuarters';
import { getPeriodsPerQuarterByFy } from '../../../../../src/js/containers/explorer/detail/helpers/explorerQuarters';

const nativeDate = Date.now;

afterAll(() => {
    // restore the original, native date function
    Date.now = nativeDate;
});

describe('explorerQuarters', () => {
    describe('handlePotentialStrings', () => {
        it('should convert its input to an integer if it is a string', () => {
            const output = explorerQuarters.handlePotentialStrings('12');
            expect(output).toEqual(12);
        });
        it('should return its input otherwise', () => {
            const output = explorerQuarters.handlePotentialStrings(12);
            expect(output).toEqual(12);
        });
    });
    describe('getPeriodsPerQuarterByFy', () => {
        it.each([
            [2019, 0, 1],
            [2020, 2, 3]
        ])('returns the correct array for fiscal year %i', (fy, resultIndex, expected) => {
            const result = getPeriodsPerQuarterByFy(fy);
            expect(result[resultIndex].length).toEqual(expected);
        });
    });
});
