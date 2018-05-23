/**
 * BaseStateLandingItem.js
 * Created by Kevin Li 5/23/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseStateLandingItem = {
    populate(data) {
        this.name = data.name || '';
        this.fips = data.fips || '';
        this.code = data.code || '';
        this._amount = data.amount || 0;
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
