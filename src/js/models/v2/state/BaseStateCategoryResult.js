/**
 * BaseStateCategoryResult.js
 * Created by Kevin Li 5/16/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseStateCategoryResult = {
    populate(data, index) {
        this.id = data.id;
        this.index = index;
        this._name = data.name || '--';
        this._code = data.code || '';
        this._amount = data.amount || 0;
    },
    get amount() {
        return MoneyFormatter.formatMoney(this._amount);
    },
    get combinedName() {
        if (this._code) {
            return `${this._code} - ${this._name}`;
        }
        return this._name;
    },
    get name() {
        return `${this.index}. ${this.combinedName}`;
    }
};

export default BaseStateCategoryResult;
