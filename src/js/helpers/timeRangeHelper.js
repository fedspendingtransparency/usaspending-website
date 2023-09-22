/**
 * timeRangeHelper.js
 * Created by Lizzie Salita 3/8/18
 */

const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);
// eslint-disable-next-line import/prefer-default-export
export const convertDatesToRange = (startDate, endDate) => {
    if ((startDate && endDate) && (dayjs(startDate).isValid() && dayjs(endDate).isValid())) {
        const durationValue = dayjs.duration(endDate.diff(startDate));
        const years = durationValue.years();
        const months = durationValue.months();
        const days = durationValue.days();
        let yearString = '';
        let monthString = '';
        let dayString = '';
        if (months > 0) {
            monthString = `${months} ${(months === 1) ? 'month' : 'months'}`;
        }
        if (years > 0) {
            yearString = `${years} ${(years === 1) ? 'year' : 'years'}`;
        }
        if (days > 0 && (!yearString && !monthString)) {
            dayString = `${days} ${(days === 1) ? 'day' : 'days'}`;
        }
        const yearComma = (yearString !== '' && monthString !== '') ? ', ' : '';
        const monthComma = (monthString !== '' && dayString !== '') ? ', ' : '';
        return `${yearString}${yearComma}${monthString}${monthComma}${dayString}`;
    }
    return '';
};
