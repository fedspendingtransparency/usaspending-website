/**
 * BaseChildRecipient.js
 * Created by Lizzie Salita 6/20/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseChildRecipient = {
    populate(data) {
        this.name = data.name || '';
        this.duns = data.duns || null;
        this._amount = parseFloat(data.total_amount) || 0;
        this.stateProvince = data.state_province || '';
    },
    get amount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    }
};

export default BaseChildRecipient;
