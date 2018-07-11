/**
 * BaseRecipientLandingRow.js
 * Created by David Trinh on 7/3/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

/* eslint-disable object-shorthand */
const BaseRecipientLandingRow = {
    parse: function (data) {
        this.recipientLevel = data.recipient_level || '';
        this.name = data.name || '';
        this.duns = data.duns || '';
        this.id = data.id || '';
        this._amount = data.amount || 0;
    },
    get amount() {
        return formatMoney(this._amount);
    }
};
/* eslint-enable object-shorthand */

export default BaseRecipientLandingRow;
