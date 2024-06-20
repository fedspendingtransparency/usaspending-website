/**
 * aboutTheDataSidebarHelper.js
 * Created by Andrea Blackwell 12/07/2022
 */
import React from 'react';
import AboutTheDataLink from '../components/sharedComponents/AboutTheDataLink';

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

export const getAtdDefcText = (isDefCodeInFilter, newSearch = false) => {
    if (isDefCodeInFilter && newSearch) {
        // added 8px bottom margin for styling
        return (
            <p className="award-search__body-text">
                Because you selected at least one Disaster Emergency Fund Code (DEFC) filter, your results were
                filtered by the earliest relevant public law that funded awards in your search.&nbsp;
                <AboutTheDataLink
                    slug="start-date-for-defc-tracking">Read more about this date filter.
                </AboutTheDataLink>
            </p>
        );
    }
    else if (isDefCodeInFilter && !newSearch) {
        return (
            <p>
                Because you selected at least one Disaster Emergency Fund Code (DEFC) filter, your results were
                filtered by the earliest relevant public law that funded awards in your search.&nbsp;
                <AboutTheDataLink
                    slug="start-date-for-defc-tracking">Read more about this date filter.
                </AboutTheDataLink>
            </p>
        );
    }
    return '';
};

