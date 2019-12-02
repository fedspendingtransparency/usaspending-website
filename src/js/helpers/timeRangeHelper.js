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
        // console.log(' Years : ', years);
        // console.log(' Months : ', months);
        // console.log(' Days : ', duration.days());
        if (months > 0) {
            monthString = `${months} ${(months === 1) ? 'month' : 'months'}`;
        }
        if (years > 0) {
            yearString = `${years} ${(years === 1) ? 'year' : 'years'}`;
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
