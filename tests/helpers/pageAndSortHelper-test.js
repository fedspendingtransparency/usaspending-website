/**
 * @jest-environment jsdom
 * 
 * pageAndSortHelper-test.js
 * created by Jonathan Hill 01/07/2020
 */

import { pageAndSort } from 'helpers/pageAndSortHelper';

const mockData = () => {
    const data = [];
    for (let i = 0; i <= 35; i++) {
        data.push({ first: i + 1, second: i + 2 });
    }
    return data;
};

describe('Page And Sort Helper', () => {
    it('should page and sort', () => {
        const data = pageAndSort(mockData(), null, 1, 10, 'asc', 'first');
        expect(data[0].first).toEqual(1);
    });
    it('should sort desc', () => {
        const data = pageAndSort(mockData(), null, 1, 10, 'desc', 'first');
        expect(data[0].first).toEqual(36);
    });
    it('should page', () => {
        const data = pageAndSort(mockData(), null, 2, 10, 'asc', 'first');
        expect(data[0].first).toEqual(11);
    });
    it('should limit', () => {
        const data = pageAndSort(mockData(), null, 1, 20, 'asc', 'first');
        expect(data.length).toEqual(20);
    });
    it('should page & limit', () => {
        const data = pageAndSort(mockData(), null, 2, 20, 'asc', 'first');
        expect(data[0].first).toEqual(21);
    });
    it('should handle edge case no data', () => {
        const data = pageAndSort(null, null, 1, 10, 'asc', 'first');
        expect(data.length).toEqual(0);
    });
    it('should handle edge case no limit', () => {
        const data = pageAndSort(mockData(), null, 1, null, 'asc', 'first');
        expect(data.length).toEqual(0);
    });
    it('should handle edge case no page', () => {
        const data = pageAndSort(mockData(), null, 0, 10, 'asc', 'first');
        expect(data.length).toEqual(0);
    });
    it('should handle edge case no sortDirection', () => {
        const data = pageAndSort(mockData(), () => {}, 0, 10, '', 'first');
        expect(data.length).toEqual(0);
    });
    it('should handle edge case no sortProperty', () => {
        const data = pageAndSort(mockData(), () => {}, 0, 10, 'desc', '');
        expect(data.length).toEqual(0);
    });
});
