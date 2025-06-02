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

            console.log(mockElement.getBoundingClientRect());
            console.log(mockElement.getBoundingClientRect().top);
            console.log(window.innerHeight);

            expect(checkInView(mockElement)).toBe(0);
        });
    });
});
