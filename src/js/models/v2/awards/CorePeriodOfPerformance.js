/**
 * CorePeriodOfPerformance.js
 * Created by David Trinh 10/5/18
 */

import moment from 'moment';

export const parseDate = (string) => moment(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const CorePeriodOfPerformance = {
    populateCore(data) {
        this._startDate = parseDate(data.startDate) || null;
        this._endDate = parseDate(data.endDate) || null;
    },
    get startDate() {
        if (this._startDate) {
            return formatDate(this._startDate);
        }
        return '';
    },
    get endDate() {
        if (this._endDate) {
            return formatDate(this._endDate);
        }
        return '';
    }
};

export default CorePeriodOfPerformance;
