/**
 * utils.js
 * Created by michaelbray on 1/19/18.
 */

const dayjs = require('dayjs');

export const parseDate = (dateString, format = 'YYYY-MM-DD') => {
    if (dateString) {
        const date = dayjs(dateString, format);

        if (date.isValid()) {
            return date;
        }
    }

    return null;
};
