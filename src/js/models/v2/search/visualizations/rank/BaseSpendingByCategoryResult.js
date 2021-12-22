/**
 * BaseSpendingByCategoryResult.js
 * Created by Lizzie Salita 5/30/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';


export const defaultNameTemplate = (code, name) => {
    if (code) {
        return `${code} - ${name}`;
    }
    return name;
};

const BaseSpendingByCategoryResult = {
    populate(data) {
        this.id = data.id;
        this._name = data.name || '--';
        this._code = data.code || '';
        this._amount = data.amount || 0;
        this.recipientId = data.recipient_id || '';
        this._agencySlug = data.agency_slug || '';

        this._nameTemplate = defaultNameTemplate;
    },
    set nameTemplate(template) {
        this._nameTemplate = template;
    },
    get amount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    },
    get name() {
        return this._nameTemplate(this._code, this._name);
    }
};

export default BaseSpendingByCategoryResult;
