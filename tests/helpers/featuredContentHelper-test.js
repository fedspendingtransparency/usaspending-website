/**
 * @jest-environment jsdom
 */


import { transformString } from "../../src/js/helpers/featuredContent/featuredContentHelper";


describe('featuredContentHelper', () => {
    describe('transform string', () => {
        it('turns spaces into - and makes the text lowercase', () => {
            const input = "tEsTING STRING";
            const expected = transformString(input);
            expect(input).toEqual(expected);
        });
    });
});
