/**
 * BaseAccountSpendingRow.js
 * Created by James Lee 5/27/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { generatePercentage } from '../../../helpers/awardAmountHelper';

const BaseAccountSpendingRow = {
    populate(data) {
        this.name = data.name || '';
        this._grossOutlayAmount = data.gross_outlay_amount || 0;
        this._obligatedAmount = data.obligated_amount || 0;
        this._totalObligatedAmount = data.total_obligated_amount || 0;
    },
    get grossOutlayAmount() {
        return formatMoney(this._grossOutlayAmount);
    },
    get obligatedAmount() {
        return formatMoney(this._obligatedAmount);
    },
    get percentOfTotalObligations() {
        if (this._totalObligatedAmount > 0) {
            return generatePercentage(this._obligatedAmount / this._totalObligatedAmount);
        }
        return '0%';
    }
};

export default BaseAccountSpendingRow;
