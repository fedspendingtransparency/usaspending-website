/**
 * CoreSpendingTableRow.js
 * Created by Lizzie Salita 7/8/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const CoreSpendingTableRow = {
    populateCore(data) {
        this._id = data.id || '';
        this.code = data.code || '';
        this.name = data.name || '';
        this.description = data.description || '';
        this._awardCount = isNaN(data.award_count) ? '--' : data.award_count || 0;
        this._obligation = isNaN(data.obligation) ? '--' : data.obligation || 0;
        this._outlay = isNaN(data.outlay) ? '--' : data.outlay || 0;
        this._faceValueOfLoan = isNaN(data.face_value_of_loan) ? '--' : data.face_value_of_loan || 0;
    },
    get obligation() {
        if (this._obligation === null) {
            return null;
        }
        else if (this._obligation === '--') {
            return "--";
        }
        return formatMoney(this._obligation);
    },
    get outlay() {
        if (this._outlay === null) {
            return null;
        }
        else if (this._outlay === '--') {
            return "--";
        }
        return formatMoney(this._outlay);
    },
    get awardCount() {
        if (this._awardCount === '--') {
            return "--";
        }
        return formatNumber(this._awardCount);
    },
    get faceValueOfLoan() {
        if (this._faceValueOfLoan === '--') {
            return "--";
        }
        return formatMoney(this._faceValueOfLoan);
    },
    set outlay(val) {
        this._outlay = val;
    },
    set obligation(val) {
        this._obligation = val;
    }
};

export default CoreSpendingTableRow;
