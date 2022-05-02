/**
 * downloadAnalytics.js
 * Created by Kevin Li 2/8/18
 */
import { startCase, camelCase } from 'lodash';
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
const selectedValueByFilterType = {
    awardLevels: (obj) => Object.keys(obj)
        .map((key) => startCase(key))
        .find((key) => obj[camelCase(key)] === true),
    awardTypes: (obj) => Object.keys(obj)
        .filter((key) => obj[key] === true)
        .map((key) => startCase(key))
        .join(", "),
    agency: (obj) => startCase(obj.name),
    // eslint-disable-next-line no-confusing-arrow
    subAgency: (obj) => obj.id !== "" ? startCase(obj.name) : '',
    // eslint-disable-next-line no-confusing-arrow
    location: (obj) => obj.state.code !== ""
        ? `${obj.country.name}, ${obj.state.name}`
        : obj.country.name,
    dateType: (string) => startCase(string),
    dateRange: (obj) => convertDateRange(obj),
    fileFormat: (string) => string.toLowerCase(),
    accountLevel: (string) => startCase(string),
    budgetFunction: (obj) => startCase(obj.title),
    // eslint-disable-next-line no-confusing-arrow
    budgetSubfunction: (obj) => obj.code ? startCase(obj.title) : '',
    // eslint-disable-next-line no-confusing-arrow
    federalAccount: (obj) => obj.id ? startCase(obj.name) : '',
    submissionType: (string) => startCase(string),
    timePeriod: (string) => string
};

export const logDownloadFields = (type, filterObj) => {
    Object.keys(filterObj)
        .filter((key) => Object.keys(selectedValueByFilterType).includes(key))
        .forEach((filter) => {
            const selectedValueObj = filterObj[filter];
            const accessorFn = selectedValueByFilterType[filter];
            const selectedValue = accessorFn(selectedValueObj);
            logSingleDownloadField(type, startCase(filter), selectedValue);
        });
};

export const logAwardDownload = (redux) => {
    logDownloadType('award');
    logDownloadFields('award', redux);
};

export const logAccountDownload = (redux) => {
    logDownloadType('account');
    logDownloadFields('account', {
        ...redux,
        timePeriod: `${redux.fy} - Q${redux.quarter}`
    });
};
