/**
 * BaseStateLandingItem.js
 * Created by Kevin Li 5/23/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseStateLandingItem = {
    populate(data) {
        this._name = data.name || '';
        this.fips = data.fips || '';
        this.code = data.code || '';
        this.type = data.type || '';
        this._amount = data.amount || 0;
    },
    get name() {
        return this.code ? `${this._name} (${this.code})` : this._name;
    },
    get amount() {
        return MoneyFormatter.formatMoney(this._amount);
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

export default BaseStateLandingItem;
