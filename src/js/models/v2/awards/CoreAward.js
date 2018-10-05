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
        this._category = data.category || 'idv'; // IDVs have null values
        this.id = data.id || '';
        this.type = data.type || '';
        this.typeDescription = data.typeDescription || '';
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
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
