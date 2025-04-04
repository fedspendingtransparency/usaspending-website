/**
 *
 * @jest-environment jsdom
 */


import * as collapsiblesidebarHelper from '../../src/js/helpers/search/collapsiblesidebarHelper';

describe('collapsiblesidebarHelper', () => {
    describe('truncateItemCount', () => {
        it('should return itemCount as is', () => {
            const itemCount = collapsiblesidebarHelper.truncateItemCount(11);
            expect(itemCount).toBe(11);
        });
        it('should return itemCount as condensed to 999+', () => {
            const itemCount = collapsiblesidebarHelper.truncateItemCount(1000);
            expect(itemCount).toBe('999+');
        });
    });
});
