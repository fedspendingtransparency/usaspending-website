/**
 * @jest-environment jsdom
 */

import { generateCount } from "../../src/js/helpers/search/filterCheckboxHelper";

describe('generateCount test', () => {
    it('generates a proper count', () => {
        const data = new Map();

        data.set('counts', [
            { count: 10 },
            { count: 20 },
            { count: 30 },
            { count: 40 }
        ]);
        data.set('require', [10, 20]);
        data.set('exclude', []);

        const dataCount = generateCount(data);

        expect(dataCount).toBe(100);
    });
});
