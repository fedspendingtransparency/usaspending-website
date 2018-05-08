/**
 * downloadAnalytics.js
 * Created by Kevin Li 2/8/18
 */

import Analytics from 'helpers/analytics/Analytics';

const categoryPrefix = 'Download Center - Download';

export const logDownloadType = (type) => {
    Analytics.event({
        category: `${categoryPrefix} Type`,
        action: type
    });
};

// convert an object whose truthy keys are all selected field values
export const convertKeyedField = (field) => (
    Object.keys(field).reduce((values, key) => {
        if (field[key]) {
            values.push(key);
        }
        return values;
    }, [])
);

export const convertDateRange = (dates) => {
    if (dates.startDate && dates.endDate) {
        return `${dates.startDate} - ${dates.endDate}`;
    }
    else if (dates.startDate) {
        return `${dates.startDate} - present`;
    }
    else if (dates.endDate) {
        return `... - ${dates.endDate}`;
    }
    return null;
};

export const logSingleDownloadField = (type, name, value) => {
    Analytics.event({
        category: `${categoryPrefix} - ${type}`,
        action: name,
        label: value
    });
};

export const logDownloadFields = (type, filters) => {
    const keyedFields = ['awardLevels', 'awardTypes'];
    const keyedLabels = ['Award Level', 'Award Type'];
    keyedFields.forEach((field, i) => {
        const values = convertKeyedField(filters[field]);
        values.forEach((value) => {
            logSingleDownloadField(type, keyedLabels[i], value);
        });
    });

    // log the agency fields
    logSingleDownloadField(type, 'Agency', filters.agency.name);
    if (filters.subAgency.id) {
        logSingleDownloadField(type, 'Sub Agency', filters.subAgency.name);
    }

    // log the date fields
    const dates = convertDateRange(filters.dateRange);
    if (dates) {
        logSingleDownloadField(type, 'Date Type', filters.dateType);
        logSingleDownloadField(type, 'Date Range', dates);
    }
};

export const logAccountDownloadFields = (type, filters) => {
    // log the agency fields
    logSingleDownloadField(type, 'Agency', filters.agency.name);

    // log the file type
    logSingleDownloadField(type, 'File Type', filters.submissionType);

    // log the fiscal year and quarter
    const timePeriod = `${filters.fy} - Q${filters.quarter}`;
    logSingleDownloadField(type, 'Time Period', timePeriod);
};

export const logAwardDownload = (redux) => {
    logDownloadType('award');
    logDownloadFields('award', redux);
};

export const logAccountDownload = (redux) => {
    logDownloadType('account');
    logAccountDownloadFields('account', redux);
};
