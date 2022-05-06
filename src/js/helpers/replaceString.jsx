/**
 * reactStringReplace.js
 * created by Jonathan Hill 10/13/20
 */

import React from 'react';
import { uniqueId } from 'lodash';
import reactStringReplace from 'react-string-replace';

const replaceString = (data, query, className) => (
    reactStringReplace(data, query, (match) => (
        <span
            className={className}
            key={uniqueId()}>
            {match}
        </span>
    ))
);

export default replaceString;
