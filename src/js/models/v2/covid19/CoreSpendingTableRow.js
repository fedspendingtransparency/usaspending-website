/**
 * CoreSpendingTableRow.js
 * Created by Lizzie Salita 7/8/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const CoreSpendingTableRow = {
    populateCore(data) {
        this._id = data.id || '';
        this._code = data.code || '';
        this.description = data.description || '';
        this._count = data.count || 0;
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._faceValue = data.face_value_of_loan || 0;
    },
    get obligation() {
        return formatMoney(this._obligation);
    },
    get outlay() {
        return formatMoney(this._outlay);
    },
    get count() {
        return formatNumber(this._count);
    },
    get faceValue() {
        return formatMoney(this._faceValue);
    }
};

export default CoreSpendingTableRow;
