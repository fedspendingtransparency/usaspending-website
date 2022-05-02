/**
 * BaseChildRecipient.js
 * Created by Lizzie Salita 6/20/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseChildRecipient = {
    populate(data) {
        this.id = data.recipient_id || null;
        this.name = data.name || 'Name not provided';
        this.duns = data.duns || 'DUNS not provided';
        this.uei = data.uei || 'UEI not provided';
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
