/**
 * @jest-environment jsdom
 * 
 * paginationHelper-test.js
 * Created by Lizzie Salita 6/13/19
 */

import * as PaginationHelper from 'helpers/paginationHelper';

describe('Pagination helper functions', () => {
    it('should calculate the start range for a page number, given page size and number of results', () => {
        // The 3rd page of 111 items with a page size of 10 should start at item 21
        const range = PaginationHelper.calculatePageRange(3, 10, 111);
        expect(range.start).toEqual(21);
    });
    it('should calculate the end range for a page number, given page size and number of results', () => {
        // The 4th page of 111 items with a page size of 10 should end with item 40
        const range = PaginationHelper.calculatePageRange(4, 10, 111);
        expect(range.end).toEqual(40);
    });
    it('should handle the last page when the number of items left is less than the limit', () => {
        // The 12th (last) page of 111 items with a page size of 10 should end at the last item
        const range = PaginationHelper.calculatePageRange(12, 10, 111);
        expect(range.end).toEqual(111);
    });
});
