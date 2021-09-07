const BaseSubagencySpendingRow = {
    populate(data) {
        this.name = data.name || '';
        this._transactions = data.transaction_count || 0;
        this._newAwards = data.new_award_count || 0;
        this._totalObligations = data.total_obligations || 0;
    }
};

export default BaseSubagencySpendingRow;
