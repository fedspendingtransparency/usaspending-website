/**
 * CoreRecipient.js
 * Created by Lizzie Salita 5/1/18
 */

import { formatNumberWithPrecision, calculateUnitForSingleValue, formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const CoreRecipient = {
    populateCore(data) {
        this.id = `${data.id}` || '';
        this.name = data.name || '';
        this._totalPrimeAmount = parseFloat(data.totalPrimeAmount) || 0;
        this._totalPrimeAwards = parseFloat(data.totalPrimeAwards) || 0;
        this.fy = (data.year && `${data.fy} `) || '';
    },
    get totalPrimeAmount() {
        const units = calculateUnitForSingleValue(this._totalPrimeAmount);
        return `${formatMoneyWithPrecision(this._totalPrimeAmount / units.unit, 1)} ${units.longLabel}`;
    },
    get totalPrimeAwards() {
        return formatNumberWithPrecision(this._totalPrimeAwards, 0);
    }
};

export default CoreRecipient;
