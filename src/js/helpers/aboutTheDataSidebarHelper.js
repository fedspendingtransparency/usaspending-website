/**
 * aboutTheDataSidebarHelper.js
 * Created by Andrea Blackwell 12/07/2022
 */

// eslint-disable-next-line consistent-return
export const getDrilldownEntry = (schema, termFromUrl) => {
    for (let i = 0; i < Object.keys(schema).length; i++) {
        const sectionName = Object.keys(schema)[i];
        for (let j = 0; j < schema[sectionName].fields.length; j++) {
            if (schema[sectionName].fields[j].slug === termFromUrl) {
                return schema[sectionName].fields[j];
            }
        }
    }
};

export const getNewUrlForATD = (existingUrl, atdFragment, existingQueryParams = '') => {
    if (existingUrl === '/' && !existingQueryParams) return atdFragment;
    if (existingUrl[existingUrl.length - 1] === '/' && !existingQueryParams) {
        return `${existingUrl.substr(0, existingUrl.length - 1)}${atdFragment}`;
    }
    if (existingQueryParams && existingUrl[existingUrl.length - 1] === '/') {
        const cleanQueryParams = existingQueryParams[0] === '?'
            ? existingQueryParams.substr(1)
            : existingQueryParams;
        return `${existingUrl.substr(0, existingUrl.length - 1)}${atdFragment}&${cleanQueryParams}`;
    }
    if (existingQueryParams) {
        const cleanQueryParams = existingQueryParams[0] === '?'
            ? existingQueryParams.substr(1)
            : existingQueryParams;
        return `${existingUrl}${atdFragment}&${cleanQueryParams}`;
    }
    return `${existingUrl}${atdFragment}`;
};
