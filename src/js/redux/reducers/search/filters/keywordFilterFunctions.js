/**
 * Created by David Trinh on 5/2/18.
 */

/* eslint-disable import/prefer-default-export */
export const updateTextSearchInput = (state, keyword) => {
    let updatedMap = state;

    const text = `${keyword}`;

    if (updatedMap.has(text)) {
        updatedMap = updatedMap.delete(text);
    }
    else {
    // allows for multiple text
        updatedMap = updatedMap.set(text, text);
    }

    return updatedMap;
};
/* eslint-enable import/prefer-default-export */
