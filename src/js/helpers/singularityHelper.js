/**
 * singularityHelper.js
 * Created by michaelbray on 9/18/17.
 */

const vowels = ['a', 'e', 'i', 'o', 'u'];

export const generateSingular = (word, capitalization) => {
    const firstLetter = word.substring(0, 1).toLowerCase();

    let singular = 'An';

    if (vowels.indexOf(firstLetter) === -1) {
        singular = 'A';
    }

    if (capitalization) {
        return singular;
    }

    return singular.toLowerCase();
};
