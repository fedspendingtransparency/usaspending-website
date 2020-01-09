import { includes, isEqual } from 'lodash';
import {
    createCheckboxTreeDataStrucure,
    updateValueAndLabel,
    updatePath,
    updateChildren,
    pathToNode,
    buildNodePath
} from 'helpers/checkboxTreeHelper';
import {
    naicsMockCleanDataInitialLoad,
    naicsMockInitialLoadApiResponse,
    naicsMockAPIResponse,
    naicsMockAPIResponseClean,
    naicsMockDataDeepDirty,
    naicsMockDataDeepClean
} from '../containers/search/filters/naics/mockNAICS';

describe('CheckboxTreeHelper', () => {
    const keysToBeMapped = {
        value: 'naics',
        label: 'naics_description'
    };
    describe('Update Value And Label', () => {
        it('should convert keys to value and label properties', () => {
            const updatedData = updateValueAndLabel(naicsMockInitialLoadApiResponse, keysToBeMapped);
            const keys = Object.keys(updatedData);
            expect(includes(keys, 'value'));
            expect(includes(keys, 'label'));
            expect(!includes(keys, 'naics'));
            expect(!includes(keys, 'naics_description'));
        });
    });
    describe('Update Path', () => {
        it('should update path to index when no parent node', () => {
            const { path } = updatePath({
                node: naicsMockCleanDataInitialLoad[0],
                parentNode: null,
                index: 0,
                isChildren: false
            });
            expect(path).toEqual([0]);
        });
        it('should update path to parent node path when parent node and no children', () => {
            const { path } = updatePath({
                node: naicsMockCleanDataInitialLoad[0],
                parentNode: naicsMockCleanDataInitialLoad[0],
                index: 0,
                isChildren: false
            });
            expect(path).toEqual([0]);
        });
        it('should update path to include parent node path', () => {
            const { path } = updatePath({
                node: naicsMockCleanDataInitialLoad[0],
                parentNode: naicsMockCleanDataInitialLoad[0],
                index: 0,
                isChildren: true
            });
            expect(path).toEqual([0, 0]);
        });
    });
    describe('Update Children', () => {
        it('should not update children property when at the end of the limit', () => {
            const { children } = updateChildren({
                isChildren: true,
                node: {
                    value: '11',
                    label: 'Agriculture, Forestry, Fishing and Hunting',
                    count: 1,
                    path: [0, 0, 0]
                },
                limit: 3
            });
            expect(children).toEqual(undefined);
        });
        it('should update children to an array with an empty object on initial load', () => {
            const { children } = updateChildren({
                isChildren: false,
                node: {
                    value: '11',
                    label: 'Agriculture, Forestry, Fishing and Hunting',
                    count: 1,
                    path: [0, 0, 0]
                },
                limit: 3
            });
            expect(children).toEqual([{}]);
        });
    });
    describe('Create Checkbox Tree Data Strucure', () => {
        it('should update array of nodes with no children', () => {
            const nodes = createCheckboxTreeDataStrucure(
                3, // limit
                keysToBeMapped,
                naicsMockInitialLoadApiResponse, // nodes
                false, // isChildren
                null // parentNode
            );
            expect(isEqual(naicsMockCleanDataInitialLoad, nodes));
        });
        it('should update array of nodes with children', () => {
            const nodes = createCheckboxTreeDataStrucure(
                3, // limit
                keysToBeMapped,
                naicsMockAPIResponse, // nodes
                false, // isChildren
                naicsMockCleanDataInitialLoad[0] // parentNode
            );
            expect(isEqual(naicsMockAPIResponseClean, nodes));
        });
        it('should update array of nodes with deeply nested children', () => {
            const nodes = createCheckboxTreeDataStrucure(
                3, // limit
                keysToBeMapped,
                naicsMockDataDeepDirty, // nodes
                false, // isChildren
                naicsMockCleanDataInitialLoad[0] // parentNode
            );
            expect(isEqual(naicsMockDataDeepClean, nodes));
        });
    });
    describe('Path To Node', () => {
        it('should return a path array based on data and value', () => {
            const path = pathToNode(naicsMockDataDeepClean, '1121112111');
            expect(path).toEqual([0, 1, 0, 2, 0]);
        });
    });
    describe('Build Node Path', () => {
        it('should return a path string based on a path array', () => {
            const path = buildNodePath([0, 1, 0, 2, 0]);
            expect(path).toEqual('data[0].children[1].children[0].children[2].children[0]');
        });
    });
});
