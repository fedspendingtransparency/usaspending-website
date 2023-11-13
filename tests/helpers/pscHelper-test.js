/**
 * @jest-environment jsdom
 */
import {
    deducePscType,
    getPscNodeFromTree,
    shouldPscNodeHaveChildren,
    getImmediatePscAncestor,
    getHighestPscAncestor
} from 'helpers/pscHelper';
import { reallyBigTree } from "../containers/search/filters/psc/mockPSC";

describe('pscHelper', () => {
    describe('deducePscType', () => {
        it.each([
            ['RESEARCH AND DEVELOPMENT', 'A'],
            ['SERVICES', 'Z'],
            ['PRODUCTS', '1'],
        ])(
            ('psc.toptier_code.description should be %s when %s is the psc.toptier_code.code'),
            (result, code) => {
                const pscObj = deducePscType({}, ['toptier_code', { code }])
                expect(pscObj.pscType.description).toEqual(result);
            }
        );
        it('RESEARCH AND DEVELOPMENT PSC types do not display their toptier_code', () => {
            const rAndDPsc = deducePscType({}, ['toptier_code', { code: 'A' }]);
            const nonRandDPsc = deducePscType({}, ['toptier_code', { code: 'Z' }]);
            expect(rAndDPsc.pscType.description).toEqual('RESEARCH AND DEVELOPMENT');
            expect(nonRandDPsc.pscType.description).not.toEqual('RESEARCH AND DEVELOPMENT');
            expect(Object.keys(rAndDPsc).some((el) => el === 'toptier_code')).toEqual(false);
            expect(Object.keys(nonRandDPsc).some((el) => el === 'toptier_code')).toEqual(true);
        });
    });
    describe('getPscNodeFromTree', () => {
        it('gets the right node', async () => {
            const result = getPscNodeFromTree(reallyBigTree, 'D325');
            expect(result.description).toEqual('IT AND TELECOM- DATA CENTERS AND STORAGE');
        });
    });
    describe('shouldPscNodeHaveChildren', () => {
        it('returns true/false correctly', async () => {
            const leaf = getPscNodeFromTree(reallyBigTree, 'D325');
            let result = shouldPscNodeHaveChildren(leaf);
            expect(result).toEqual(false);

            const branch = getPscNodeFromTree(reallyBigTree, 'B');
            result = shouldPscNodeHaveChildren(branch);
            expect(result).toEqual(true);
        });
    });
    describe('getHighestPscAncestor', () => {
        it('returns the highest ancestor code', async () => {
            const leaf = getPscNodeFromTree(reallyBigTree, 'D325');
            const ancestor = getHighestPscAncestor(leaf);
            expect(ancestor).toEqual('Service');
        });
    });
    describe('getImmediatePscAncestor', () => {
        it('returns the immediate ancestor code', async () => {
            const leaf = getPscNodeFromTree(reallyBigTree, 'D325');
            const ancestor = getImmediatePscAncestor(leaf);
            expect(ancestor).toEqual('D3');
        });
    });
});
