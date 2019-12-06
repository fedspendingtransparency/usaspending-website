/**
 * downloadAnalytics.js
 * Created by Kevin Li 2/8/18
 */
import { startCase } from 'lodash';
import Analytics from 'helpers/analytics/Analytics';

const categoryPrefix = 'Download Center - Download';

export const logDownloadType = (type) => {
    Analytics.event({
        category: `${categoryPrefix} Type`,
        action: type
    });
};

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

// returns a function that accesses the value selected by the user for a given filter
const awardDownloadAccessorByFilterType = {
    awardLevels: (obj) => Object.keys(obj)
        .map((key) => startCase(key))
        .find((key) => obj[key] === true),
    awardTypes: (obj) => Object.keys(obj)
        .filter((key) => obj[key] === true)
        .map((key) => startCase(key))
        .join(", "),
    agency: (obj) => obj.name,
    // eslint-disable-next-line no-confusing-arrow
    subAgency: (obj) => obj.id !== "" ? obj.name : '',
    // eslint-disable-next-line no-confusing-arrow
    location: (obj) => obj.state.code !== ""
        ? `${obj.country.name}, ${obj.state.name}`
        : obj.country.name,
    dateType: (string) => startCase(string),
    dateRange: (obj) => convertDateRange(obj),
    fileFormat: (string) => string
};

export const logAwardDownloadFields = (type, filterObj) => {
    Object.keys(filterObj)
        .filter((key) => Object.keys(awardDownloadAccessorByFilterType).includes(key))
        .forEach((filter) => {
            const selectedValueObj = filterObj[filter];
            const accessorFn = awardDownloadAccessorByFilterType[filter];
            const selectedValue = accessorFn(selectedValueObj);

            logSingleDownloadField(type, startCase(filter), selectedValue);
        });
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
    logAwardDownloadFields('award', redux);
};

export const logAccountDownload = (redux) => {
    logDownloadType('account');
    logAccountDownloadFields('account', redux);
};
