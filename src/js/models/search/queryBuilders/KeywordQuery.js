/**
* KeywordQuery.js
* Created by Emily Gullo
**/

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
const keywordField = 'description';

export const buildKeywordQuery = (value) => {
    const keyword = value;

    const filter = {
        field: keywordField,
        operation: "search",
        value: keyword
    };

    return filter;
};
/* eslint-enable import/prefer-default-export */
