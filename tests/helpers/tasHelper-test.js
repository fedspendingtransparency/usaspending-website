/**
 * @jest-environment jsdom
 * 
 * tasHelper-test.js
 * Created by Max Kendall on 07/10/2017
*/

import {
    getHighestTasAncestorCode,
    getImmediateTasAncestorCode,
    getTasNodeFromTree
} from 'helpers/tasHelper';

import { treePopulatedToFederalAccountLevel } from '../containers/search/filters/programSource/mockTas';

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
    describe('getTasNodeFromTree', () => {
        it('handles case where node is not defined', () => {
            const result = getTasNodeFromTree(treePopulatedToFederalAccountLevel, '011');
            expect(result).toEqual(null);
        });
        it('gets the appropriate node', () => {
            const agency = getTasNodeFromTree(treePopulatedToFederalAccountLevel, '012');
            expect(agency.description).toEqual("Department of Agriculture");
            const fa = getTasNodeFromTree(treePopulatedToFederalAccountLevel, '012-8226');
            expect(fa.description).toEqual("Miscellaneous Contributed Funds, Animal and Plant Health Inspection Service, Agriculture");
        });
    });
});
