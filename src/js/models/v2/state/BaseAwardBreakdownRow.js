/**
 * BaseAwardBreakdownRow.js
 * Created by Lizzie Salita 5/17/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';

const BaseAwardBreakdownRow = {
    populate(data) {
        this.type = data.type || null;
        this.name = awardTypeGroupLabels[data.type] || '';
        this._amount = data.amount || 0;
        this._count = data.count || 0;
    },
    get amount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 2);
    },
    get count() {
        return MoneyFormatter.formatNumberWithPrecision(this._count, 0);
    }
};

export default BaseAwardBreakdownRow;
