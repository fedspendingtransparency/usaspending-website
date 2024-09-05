/**
 * BaseStateCategoryResult.jsx
 * Created by Kevin Li 5/16/18
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

export const defaultNameTemplate = (code, name) => {
    if (code) {
        return `${code} - ${name}`;
    }
    return name;
};

const BaseStateCategoryResult = {
    populate(data, index) {
        this.id = data.id;
        this.index = index;
        this._name = data.name || '--';
        this._code = data.code || '';
        this._slug = data.agency_slug;
        this._amount = data.amount || 0;
        this._category = data.category || '';
        this.agency_name = data.agency_name || '--';
        this.agency_id = data.agency_id;
        this.agency_code = data.agency_code || '--';
        this.agency_slug = data.agency_slug;
        this.subagency_slug = data.subagency_slug;
        this._nameTemplate = defaultNameTemplate;
    },
    set nameTemplate(template) {
        this._nameTemplate = template;
    },
    get amount() {
        if (this._amount >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._amount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._amount / units.unit, 2)}${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    },
    get combinedName() {
        return this._nameTemplate(this._code, this._name, this._slug);
    },
    get name() {
        return `${this.index}. ${this.combinedName}`;
    },
    get linkedName() {
        if (this._category === 'awards') {
            return <a href={`/award/${this._slug}`}>{this.name}</a>;
        }

        return <a href={`/agency/${this._slug}`}>{this.name}</a>;
    }
};

export default BaseStateCategoryResult;
