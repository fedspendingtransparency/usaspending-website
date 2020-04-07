/**
 * tasHelper-test.js
 * Created by Max Kendall on 07/10/2017
*/

import {
    getHighestTasAncestorCode,
    getImmediateTasAncestorCode
} from 'helpers/tasHelper';

describe('tasHelper', () => {
    describe('getHighestTasAncestorCode', () => {
        it('gets the highest ancestor code for a TAS', () => {
            const result = getHighestTasAncestorCode({ ancestors: [], value: '123' });
            expect(result).toEqual('123');
        });
        it('gets the highest ancestor code for a Federal Account', () => {
            const result = getHighestTasAncestorCode({ ancestors: ['1'], value: '123' });
            expect(result).toEqual('1');
        });
        it('gets the highest ancestor code for an Agency', () => {
            const result = getHighestTasAncestorCode({ ancestors: ['0', '12'], value: '123' });
            expect(result).toEqual('0');
        });
    });
    describe('getImmediateTasAncestorCode', () => {
        it('gets the highest ancestor code for a TAS', () => {
            const result = getImmediateTasAncestorCode({ ancestors: [], value: '123' });
            expect(result).toEqual('123');
        });
        it('gets the highest ancestor code for a Federal Account', () => {
            const result = getImmediateTasAncestorCode({ ancestors: ['1'], value: '123' });
            expect(result).toEqual('1');
        });
        it('gets the highest ancestor code for an Agency', () => {
            const result = getImmediateTasAncestorCode({ ancestors: ['0', '12'], value: '123' });
            expect(result).toEqual('12');
        });
    });
});
