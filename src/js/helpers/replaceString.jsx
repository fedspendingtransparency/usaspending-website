/**
 * reactStringReplace.js
 * created by Jonathan Hill 10/13/20
 */

import React from 'react';
import reactStringReplace from 'react-string-replace';

const replaceString = (data, query, className) => (
    reactStringReplace(data, query, (match, i) => (
        <span
            className={className}
            key={match + i}>
            {match}
        </span>
    ))
);

export default replaceString;
