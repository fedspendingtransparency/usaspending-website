/**
 * utils.js
 * Created by michaelbray on 1/19/18.
 */

import moment from 'moment';

export const parseDate = (dateString, format = 'YYYY-MM-DD') => {
    if (dateString) {
        const date = moment(dateString, format);

        if (date.isValid()) {
            return date;
        }
    }

    return null;
};
