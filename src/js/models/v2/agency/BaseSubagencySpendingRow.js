
const BaseSubagencySpendingRow = {
    populateCore(data) {
        this.name = data?.name || '--';
        // eslint-disable-next-line camelcase
        this.newAwardCount = data?.new_award_count || 0;
        // eslint-disable-next-line camelcase
        this.transactionCount = data?.transaction_count || 0;
        // eslint-disable-next-line camelcase
        this.totalObligations = data?.total_obligations || 0;
    }
};

export default BaseSubagencySpendingRow;
