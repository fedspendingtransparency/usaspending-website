/**
 * BaseRecipientLandingRow.js
 * Created by David Trinh on 7/3/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

/* eslint-disable object-shorthand */
const BaseRecipientLandingRow = {
    populate(data) {
        this.recipientLevel = data.recipient_level || '';
        this.name = data.name || 'Not provided in source system';
        this.duns = data.duns || 'DUNS not provided';
        this.uei = data.uei || 'UEI not provided';
        this.id = data.id || '';
        this._amount = data.amount || 0;
    },
    get amount() {
        return formatMoney(this._amount);
    }
};
/* eslint-enable object-shorthand */

export default BaseRecipientLandingRow;
