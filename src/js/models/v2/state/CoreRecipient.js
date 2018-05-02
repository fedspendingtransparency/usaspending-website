/**
 * CoreRecipient.js
 * Created by Lizzie Salita 5/1/18
 */

import { formatMoney, formatNumberWithPrecision } from 'helpers/moneyFormatter';

const CoreRecipient = {
    populateCore(data) {
        this.id = data.id || '';
        this.name = data.name || '';
        this._awardedAmount = parseFloat(data.awardedAmount) || 0;
        this._totalAwards = parseFloat(data.totalAwards) || 0;
        this.fy = data.fy || '';
    },
    get awardedAmount() {
        return formatMoney(this._awardedAmount);
    },
    get totalAwards() {
        return formatNumberWithPrecision(this._totalAwards);
    }
};

export default CoreRecipient;
