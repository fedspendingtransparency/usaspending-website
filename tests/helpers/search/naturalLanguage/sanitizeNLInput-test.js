/**
 * sanitizeNLInput-test.js
 *
 * @jest-environment jsdom
 */

import { sanitizeNLInput } from '../../../../src/js/helpers/search/naturalLanguage/sanitizeNLInput';

// Built via fromCharCode (rather than pasted glyphs) so the invisible/control
// characters under test are unambiguous in source and in diffs.
const ZERO_WIDTH_SPACE = String.fromCharCode(0x200B);
const RTL_OVERRIDE = String.fromCharCode(0x202E);
const WORD_JOINER = String.fromCharCode(0x2060);
const INVISIBLE_SEPARATOR = String.fromCharCode(0x2064);
const BYTE_ORDER_MARK = String.fromCharCode(0xFEFF);
const BELL_CONTROL_CHAR = String.fromCharCode(0x0007);
const COMBINING_ACUTE_ACCENT = String.fromCharCode(0x0301);
const DECOMPOSED_E_ACUTE = `e${COMBINING_ACUTE_ACCENT}`; // "e" + combining acute accent
const COMPOSED_E_ACUTE = String.fromCharCode(0x00E9); // single "e with acute" codepoint

describe('sanitizeNLInput', () => {
    it('returns plain text unchanged', () => {
        expect(sanitizeNLInput('What agencies received funding in Maryland?'))
            .toBe('What agencies received funding in Maryland?');
    });

    it('returns an empty string when given an empty string', () => {
        expect(sanitizeNLInput('')).toBe('');
    });

    it('strips HTML tags but keeps their text content', () => {
        expect(sanitizeNLInput('<b>bold</b> text')).toBe('bold text');
    });

    it('drops the content of dangerous elements like script tags entirely', () => {
        expect(sanitizeNLInput('<script>alert(1)</script>hello')).toBe('hello');
    });

    it('strips disallowed attributes such as inline event handlers', () => {
        expect(sanitizeNLInput('<img src="x" onerror="alert(1)">hello')).toBe('hello');
    });

    it('strips zero-width space characters', () => {
        expect(sanitizeNLInput(`hel${ZERO_WIDTH_SPACE}lo`)).toBe('hello');
    });

    it('strips right-to-left override characters', () => {
        expect(sanitizeNLInput(`hel${RTL_OVERRIDE}lo`)).toBe('hello');
    });

    it('strips word-joiner and other invisible separator characters', () => {
        expect(sanitizeNLInput(`hel${WORD_JOINER}${INVISIBLE_SEPARATOR}lo`)).toBe('hello');
    });

    it('strips a leading byte order mark', () => {
        expect(sanitizeNLInput(`${BYTE_ORDER_MARK}hello`)).toBe('hello');
    });

    it('strips ASCII control characters', () => {
        expect(sanitizeNLInput(`hel${BELL_CONTROL_CHAR}lo`)).toBe('hello');
    });

    it('preserves tabs and newlines used as normal whitespace', () => {
        expect(sanitizeNLInput('hello\tworld\nagain')).toBe('hello\tworld\nagain');
    });

    it('does not trim leading or trailing spaces', () => {
        expect(sanitizeNLInput('  hello  ')).toBe('  hello  ');
    });

    it('normalizes decomposed unicode characters into their composed form', () => {
        expect(sanitizeNLInput(`${DECOMPOSED_E_ACUTE}clair`)).toBe(`${COMPOSED_E_ACUTE}clair`);
    });

    it('handles markup, invisible characters, and decomposed unicode together', () => {
        const input = `<script>alert(1)</script>${DECOMPOSED_E_ACUTE}${ZERO_WIDTH_SPACE}clair <b>funding</b>`;
        expect(sanitizeNLInput(input)).toBe(`${COMPOSED_E_ACUTE}clair funding`);
    });
});
