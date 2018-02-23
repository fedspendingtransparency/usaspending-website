/**
 * CoreAward.js
 * Created by Kevin Li 2/22/18
 */

import moment from 'moment';

export const parseDate = (string) => moment(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const CoreAward = {
    populateCore(data) {
        this.category = data.category || 'idv'; // IDVs have null values
        this.id = data.id || '';
        this.internalId = data.internalId || '';
        this._startDate = (
            (data.startDate && parseDate(data.startDate)) || null
        );
        this._endDate = (
            (data.endDate && parseDate(data.endDate)) || null
        );
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

export default CoreAward;
