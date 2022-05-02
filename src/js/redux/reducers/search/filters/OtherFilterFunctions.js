/**
 * Created by Emily Gullo 07/18/2017
 */

import {
    getImmediateAncestorNaicsCode,
    getHighestAncestorNaicsCode
} from "helpers/naicsHelper";

export const updateSelectedCFDA = (state, value) => {
    let updatedSet = state;

    const cfdaIdentifier = value.program_number;

    if (updatedSet.has(cfdaIdentifier)) {
        updatedSet = updatedSet.delete(cfdaIdentifier);
    }
    else {
        const cfdaObject = Object.assign({}, value, {
            identifier: cfdaIdentifier
        });
        updatedSet = updatedSet.set(cfdaIdentifier, cfdaObject);
    }

    return updatedSet;
};

export const updateNaics = ({ require, exclude, counts }) => require
    .filter((naicsCode) => naicsCode.length > 2)
    .reduce((acc, naicsCode) => {
        const parentKey = getHighestAncestorNaicsCode(naicsCode);
        const ancestorKey = getImmediateAncestorNaicsCode(naicsCode);
        const isAncestorInRequire = (
            require.includes(parentKey) ||
            require.includes(ancestorKey)
        );
        const isAncestorInExclude = (
            exclude.includes(parentKey) ||
            exclude.includes(ancestorKey)
        );
        if (isAncestorInRequire) {
            // Don't send the api both an ancestor and it's children...
            if (isAncestorInExclude) {
                // unless they have an ancestor in the excluded array;
                // then, we send both the ancestor and one of its descendants to override the ancestor's
                // exclusion;
                return acc;
            }
            // otherwise, don't!
            return {
                ...acc,
                require: acc.require.filter((code) => code !== naicsCode)
            };
        }
        return acc;
    }, { require, exclude, counts });
