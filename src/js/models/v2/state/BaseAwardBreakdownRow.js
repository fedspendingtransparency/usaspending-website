/**
 * BaseAwardBreakdownRow.js
 * Created by Lizzie Salita 5/17/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import { awardTypeLabels } from 'dataMapping/state/awardTypes';

const BaseAwardBreakdownRow = {
    populate(data) {
        this.type = data.type || null;
        this.name = awardTypeLabels[data.type] || '';
        this._amount = data.amount || 0;
        this._count = data.count || 0;
    },
    get amount() {
        if (Math.abs(this._amount) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._amount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._amount / units.unit, 1)}${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    },
    get count() {
        return MoneyFormatter.formatNumberWithPrecision(this._count, 0);
    }
};

export default BaseAwardBreakdownRow;
