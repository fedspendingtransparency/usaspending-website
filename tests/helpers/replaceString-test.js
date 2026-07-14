/**
 * @jest-environment jsdom
 */
import replaceString from 'helpers/replaceString';

describe('replaceString', () => {
    it('should not replace part of a string with a span with a classname', () => {
        expect(replaceString('sample text', 'hi', "matched")).toStrictEqual(['sample text']);
    });
    it('should replace part of a string with a span with a classname', () => {
        console.log(' ttttt', replaceString('sample text', 'te', "matched"));
        expect(replaceString('sample text', 'te', "matched")[0]).toStrictEqual('sample ');
        expect(replaceString('sample text', 'te', "matched")[1].props.className).toStrictEqual('matched');
        expect(replaceString('sample text', 'te', "matched")[2]).toStrictEqual('xt');
    });
});
