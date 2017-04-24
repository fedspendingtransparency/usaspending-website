/**
* KeywordQuery.js
* Created by Emily Gullo
**/

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules

import * as FilterFields from 'dataMapping/search/filterFields';

export const buildKeywordQuery = (value, searchContext = 'award') => {
    const keyword = value;

    const keywordField = FilterFields[`${searchContext}Fields`].keyword;

    const filter = {
        field: keywordField,
        operation: "search",
        value: keyword
    };

    return filter;
};
/* eslint-enable import/prefer-default-export */
