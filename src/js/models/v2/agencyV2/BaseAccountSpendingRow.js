/**
 * BaseAccountSpendingRow.js
 * Created by James Lee 5/27/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { generatePercentage } from 'helpers/awardAmountHelper';

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
            const percentage = generatePercentage(this._obligatedAmount / this._totalObligatedAmount);
            if (percentage === '0.00%') return 'Less than 0.01%';
            if (percentage === '-0.00%') return 'Less than -0.01%';
            return percentage;
        }
        return '0.00%';
    }
};

export default BaseAccountSpendingRow;
