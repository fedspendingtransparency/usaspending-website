/**
 * BaseSpendingByCfdaRow.js
 * Created by Lizzie Salita 6/24/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const BaseSpendingByCfdaRow = {
    populate(data) {
        this._id = data.id || '';
        this._code = data.code || '';
        this._description = data.description || '';
        this._count = data.count || 0;
        this._obligation = data.obligation || 0;
        this._outlay = data.outlay || 0;
        this._link = data.sam_website || '';
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
    get _number() {
        return (this._id && this._code) ? `${this._id}.${this._code}` : '';
    },
    get name() {
        if (this._number && this._description) {
            return `${this._number}: ${this._description}`;
        }
        return `${this._number}${this.description}` || '--';
    }
};

export default BaseSpendingByCfdaRow;
