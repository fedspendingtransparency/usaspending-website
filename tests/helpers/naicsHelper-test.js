/**
 * @jest-environment jsdom
 */
import {
    getNaicsNodeFromTree,
    getHighestAncestorNaicsCode,
    getImmediateAncestorNaicsCode
} from 'helpers/naicsHelper';

import * as mockData from '../containers/search/filters/naics/mockNAICS';

describe('naicsHelper', () => {
    describe('getNaicsNodeFromTree', () => {
        it('grabs the correct node from the tree at every level', () => {
            // parent
            const parent = getNaicsNodeFromTree(mockData.reallyBigTree, '21', 'naics');
            expect(parent.naics_description).toEqual("Mining, Quarrying, and Oil and Gas Extraction");
            // child
            const child = getNaicsNodeFromTree(mockData.reallyBigTree, '1113', 'naics');
            expect(child.naics_description).toEqual("Fruit and Tree Nut Farming");

            // grandchild
            const granchild = getNaicsNodeFromTree(mockData.reallyBigTree, '115310', 'naics');
            expect(granchild.naics_description).toEqual("Support Activities for Forestry");
        });
    });
    describe('getHighestAncestorNaicsCode', () => {
        it('gets the highest ancestor and accepts string or an object', () => {
            const result = getHighestAncestorNaicsCode('111111');
            const objResult = getHighestAncestorNaicsCode({ value: '111111' });
            expect(result).toEqual('11');
            expect(objResult).toEqual('11');
        });
    });
    describe('getImmediateAncestorNaicsCode', () => {
        it('gets the immediate ancestor and accepts string or an object', () => {
            const result = getImmediateAncestorNaicsCode('111111');
            const objResult = getImmediateAncestorNaicsCode({ value: '111111' });
            expect(result).toEqual('1111');
            expect(objResult).toEqual('1111');
        });
    });
});
