/**
 * @jest-environment jsdom
 */


import { transformString, transformDate } from "../../src/js/helpers/featuredContent/featuredContentHelper";

describe('featuredContentHelper', () => {
    describe('transform string', () => {
        it('turns spaces into - and makes the text lowercase', () => {
            const input = "Title for impressive article";
            const expected = transformString(input);
            expect(expected).toEqual('title-for-impressive-article');
        });
    });

    describe('transform date', () => {
        it('takes date and reformats it', () => {
            const input = "9/1/2025";
            const expected = transformDate(input);
            expect(expected).toEqual('Sep 1, 2025');
        });
    });
});
