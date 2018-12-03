/**
 * CoreAward.js
 * Created by Kevin Li 2/22/18
 */

import moment from 'moment';
import { formatMoney } from 'helpers/moneyFormatter';

export const parseDate = (string) => moment(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const CoreAward = {
    populateCore(data) {
        this._category = data.category || '';
        this.id = data.id || '';
        this.internalId = data.internalId || '';
        this._startDate = (
            (data.startDate && parseDate(data.startDate)) || null
        );
        this._endDate = (
            (data.endDate && parseDate(data.endDate)) || null
        );
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
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
    },
    get subawardTotal() {
        return formatMoney(this._subawardTotal);
    },
    get category() {
        if (this._category === 'loans') {
            return 'loan';
        }
        return this._category;
    }
};

export default CoreAward;
