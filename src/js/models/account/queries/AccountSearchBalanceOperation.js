/**
 * AccountSearchBalanceOperation.js
 * Created by Kevin Li 3/24/17
 */

import AccountSearchOperation from './AccountSearchOperation';

class AccountSearchBalanceOperation extends AccountSearchOperation {
    uniqueParams() {
        const filters = [];

        if (this.accountId) {
            filters.push({
                field: 'treasury_account_identifier__federal_account_id',
                operation: 'equals',
                value: this.accountId
            });
        }

        return filters;
    }
}

export default AccountSearchBalanceOperation;
