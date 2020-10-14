import { shallow } from 'enzyme';
import React from 'react';
import replaceString from 'helpers/replaceString';

describe('replaceString', () => {
    it('should not replace part of a string with a span with a classname', () => {
        expect(replaceString('sample text', 'hi', "matched")).toStrictEqual(['sample text']);
    });
    it('should replace part of a string with a span with a classname', () => {
        const span = shallow(<span className="matched">te</span>);
        console.log(' ttttt', replaceString('sample text', 'te', "matched"));
        expect(replaceString('sample text', 'te', "matched")[0]).toStrictEqual('sample ');
        console.log(' type : ', replaceString('sample text', 'te', "matched")[1].toString());
        // expect(replaceString('sample text', 'te', "matched")).toStrictEqual('sample ');
        expect(replaceString('sample text', 'te', "matched")[2]).toStrictEqual('sample ');
    });
});
