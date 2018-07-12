/**
 * BaseChildRecipient.js
 * Created by Lizzie Salita 6/20/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseChildRecipient = {
    populate(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.duns = data.duns || 'Not provided';
        this._amount = parseFloat(data.amount) || 0;
        this.stateProvince = data.state_province || '--';
    },
    get amount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    },
    percentage(total) {
        const decimal = this._amount / total;
        if (isNaN(decimal)) {
            return '--%';
        }
        const rounded = Math.round(decimal * 10000) / 100;
        return `${rounded}%`;
    }
};

export default BaseChildRecipient;
