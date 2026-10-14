/**
 * sanitizeNLInput.js
 * Created by Nick Torres 9/29/2026
 */

import DOMPurify from 'dompurify';

// Zero-width spaces, bidi overrides, and other non-printing control characters.
// DOMPurify only strips markup, so these need a separate pass - left in place they
// can spoof displayed text or smuggle hidden content into the LLM prompt.
const INVISIBLE_CHARS_REGEX = new RegExp(
    '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F' +
    '\\u200B-\\u200F\\u202A-\\u202E\\u2060-\\u2064\\uFEFF]',
    'g'
);

// eslint-disable-next-line import/prefer-default-export
export const sanitizeNLInput = (value) => DOMPurify
    .sanitize(value.normalize(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
    .replace(INVISIBLE_CHARS_REGEX, '');
