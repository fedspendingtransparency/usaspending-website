/**
 * BaseAwardSpendingByAgencyRow.js
 * Created by James Lee 6/25/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const BaseAwardSpendingByAgencyRow = {
    populateBase(data) {
        this.name = data.description || '';
        this.code = data.code || 0;
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._count = data.count || 0;
        this._face_value_of_loan = data.face_value_of_loan || 0;
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
    },
    get faceValueOfLoan() {
        return formatMoney(this._face_value_of_loan);
    }
};

export default BaseAwardSpendingByAgencyRow;
