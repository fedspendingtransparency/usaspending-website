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
        this._awardCount = data.award_count || 0;
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._faceValueOfLoan = data.face_value_of_loan || 0;
    },
    get obligation() {
        return formatMoney(this._obligation);
    },
    get outlay() {
        return formatMoney(this._outlay);
    },
    get awardCount() {
        return formatNumber(this._awardCount);
    },
    get faceValueOfLoan() {
        return formatMoney(this._faceValueOfLoan);
    }
};

export default CoreSpendingTableRow;
