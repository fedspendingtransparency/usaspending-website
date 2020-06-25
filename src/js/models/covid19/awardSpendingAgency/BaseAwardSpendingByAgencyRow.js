/**
 * BaseAwardSpendingByAgencyRow.js
 * Created by James Lee 6/25/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const BaseAwardSpendingByAgencyRow = {
    populateBase(data) {
        this.name = data.description || '';
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._count = data.count || 0;
    },
    populate(data) {
        this.populateBase(data);
    },
    get obligation() {
        return formatMoney(this._obligation);
    },
    get outlay() {
        return formatMoney(this._outlay);
    },
    get count() {
        return formatNumber(this._count);
    }
};

export default BaseAwardSpendingByAgencyRow;
