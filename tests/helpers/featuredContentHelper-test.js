/**
 * @jest-environment jsdom
 */


import { transformString } from "../../src/js/helpers/featuredContent/featuredContentHelper";

describe('featuredContentHelper', () => {
    describe('transform string', () => {
        it('turns spaces into - and makes the text lowercase', () => {
            const input = "Title for impressive article";
            const expected = transformString(input);
            expect(expected).toEqual('title-for-impressive-article');
        });
    });
});
