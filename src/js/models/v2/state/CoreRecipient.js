/**
 * CoreRecipient.js
 * Created by Lizzie Salita 5/1/18
 */

import { formatNumberWithPrecision, calculateUnitForSingleValue, formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const CoreRecipient = {
    populateCore(data) {
        this._id = data.id || null;
        this.name = data.name || '';
        this._totalAmount = parseFloat(data.totalAmount) || 0;
        this._totalAwards = parseFloat(data.totalAwards) || 0;
    },
    get id() {
        return (this._id && `${this._id}`) || '';
    },
    get totalAmount() {
        const units = calculateUnitForSingleValue(this._totalAmount);
        return `${formatMoneyWithPrecision(this._totalAmount / units.unit, 1)} ${units.longLabel}`;
    },
    get totalAwards() {
        return formatNumberWithPrecision(this._totalAwards, 0);
    }
};

export default CoreRecipient;
