/**
 *
 * @jest-environment jsdom
 */


import {
    truncateItemCount,
    checkInView
} from '../../src/js/helpers/search/collapsiblesidebarHelper';

describe('collapsiblesidebarHelper', () => {
    describe('truncateItemCount', () => {
        it('should return itemCount as is', () => {
            const itemCount = truncateItemCount(11);
            expect(itemCount).toBe(11);
        });
        it('should return itemCount as condensed to 999+', () => {
            const itemCount = truncateItemCount(1000);
            expect(itemCount).toBe('999+');
        });
    });

    describe('checkInView', () => {
        it('should return element in view', () => {
            const mockElement = document.createElement('div');

            expect(checkInView(mockElement)).toBe(0);
        });

        it('should return element not in view', async () => {
            const mockElement = document.createElement('div');

            jest.spyOn(mockElement, "getBoundingClientRect").mockImplementation(() => ({
                top: 1,
                bottom: 0,
                right: 0,
                left: 0,
                height: 0,
                width: 0
            }));

            expect(checkInView(mockElement)).toBe(-1);
        });
    });
});
