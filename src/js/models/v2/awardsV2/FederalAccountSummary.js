/**
 * FederalAccountSummary.js
 * Created by Jonathan Hill 04/25/19
 */

import { formatMoney } from 'helpers/moneyFormatter';

const FederalAccountSummary = {
    populate(data, total) {
        this._federalAccountName = data.account_title || '';
        this._obligatedAmount = data.total_transaction_obligated_amount || 0;
        this.federalAccount = data.federal_account || '';
        this._percent = (data.total_transaction_obligated_amount / total) * 100;
        this.fundingAgency = data.funding_agency || '';
    },
    get federalAccountName() {
        const maxChars = 31;
        const upperName = this._federalAccountName.toUpperCase();
        if (upperName.length <= maxChars) return upperName;
        const truncated = upperName.substring(0, 31);
        return `${truncated}...`;
    },
    get obligatedAmount() {
        return formatMoney(this._obligatedAmount);
    },
    get percent() {
        const decimal = this._percent.toFixed(2);
        if (decimal === '0.00') return 'Less than 0.01%';
        if (decimal[0] !== '0') {
            const end = decimal.length - 3;
            return `${decimal.slice(0, end)}%`;
        }
        return `${decimal}%`;
    }
};

export default FederalAccountSummary;
