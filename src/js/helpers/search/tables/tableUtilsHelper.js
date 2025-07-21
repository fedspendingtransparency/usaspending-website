/**
 * tableUtilsHelper.js
 * Created by JD House on 7/17/2025.
 */

export const twoVariableFormat = (object, key1, key2) => {
    if (object?.[key1] && object?.[key2]) {
        return `${object[key1]} - ${object[key2]}`;
    }

    return "--";
};
