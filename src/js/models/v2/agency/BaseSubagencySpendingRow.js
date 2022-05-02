import { formatMoney, formatNumber } from 'helpers/moneyFormatter';

const BaseSubagencySpendingRow = {
    populateCore(data) {
        this.name = data?.name || '--';
        // eslint-disable-next-line camelcase
        this._newAwardCount = data?.new_award_count || 0;
        // eslint-disable-next-line camelcase
        this._transactionCount = data?.transaction_count || 0;
        // eslint-disable-next-line camelcase
        this._totalObligations = data?.total_obligations || 0;
    },
    get totalObligations() {
        return formatMoney(this._totalObligations);
    },
    get newAwardCount() {
        return formatNumber(this._newAwardCount);
    },
    get transactionCount() {
        return formatNumber(this._transactionCount);
    }
};

export default BaseSubagencySpendingRow;
