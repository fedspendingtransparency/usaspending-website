/**
 * timeRangeHelper.js
 * Created by Lizzie Salita 3/8/18
 */

import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const convertDatesToRange = (startDate, endDate) => {
    if ((startDate && endDate) && (moment.isMoment(startDate) && moment.isMoment(endDate))) {
        const duration = moment.duration(endDate.diff(startDate));
        const years = duration.years();
        const months = duration.months();
        let yearString = '';
        let monthString = '';

        if (months > 0) {
            if (months === 1) {
                monthString = `${months} month`;
            }
            else {
                monthString = `${months} months`;
            }
        }

        if (years > 0) {
            if (years === 1) {
                yearString = `${years} year`;
            }
            else {
                yearString = `${years} years`;
            }
        }

        if (monthString && yearString) {
            return `${yearString}, ${monthString}`;
        }
        else if (monthString || yearString) {
            return `${monthString}${yearString}`;
        }
        return '';
    }
    return '';
};
