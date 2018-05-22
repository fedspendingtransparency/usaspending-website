/**
 * BaseStateCategoryResult.js
 * Created by Kevin Li 5/16/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';


export const defaultNameTemplate = (code, name) => {
    if (code) {
        return `${code} - ${name}`;
    }
    return name;
}

const BaseStateCategoryResult = {
    populate(data, index) {
        this.id = data.id;
        this.index = index;
        this._name = data.name || '--';
        this._code = data.code || '';
        this._amount = data.amount || 0;

        this._nameTemplate = defaultNameTemplate;
    },
    set nameTemplate(template) {
        this._nameTemplate = template;
    },
    get amount() {
        return MoneyFormatter.formatMoney(this._amount);
    },
    get combinedName() {
        return this._nameTemplate(this._code, this._name);
    },
    get name() {
        return `${this.index}. ${this.combinedName}`;
    }
};

export default BaseStateCategoryResult;
