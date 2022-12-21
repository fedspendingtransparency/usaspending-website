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

// eslint-disable-next-line consistent-return
export const getDrilldownEntrySectionAndId = (schema, slug) => {
    for (let i = 0; i < Object.keys(schema).length; i++) {
        const sectionName = Object.keys(schema)[i];
        for (let j = 0; j < schema[sectionName].fields.length; j++) {
            if (schema[sectionName].fields[j].slug === slug) {
                return ({
                    section: schema[sectionName],
                    entryId: j
                });
            }
        }
    }
};

export const escapeRegExp = (stringToGoIntoTheRegex) => stringToGoIntoTheRegex.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

