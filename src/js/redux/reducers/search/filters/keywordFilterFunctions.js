/**
 * Created by David Trinh on 5/2/18.
 */

/* eslint-disable import/prefer-default-export */
export const updateTextSearchInput = (state, keyword) => {
    let updatedSet = state;

    const text = `${keyword}`;

    if (updatedSet.has(text)) {
        updatedSet = updatedSet.delete(text);
    }
    else {
        // allows for multiple text
        updatedSet = updatedSet.set(text, text);
    }

    return updatedSet;
};
/* eslint-enable import/prefer-default-export */
