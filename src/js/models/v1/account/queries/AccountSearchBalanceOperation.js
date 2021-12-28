/**
 * AccountSearchBalanceOperation.js
 * Created by Kevin Li 3/24/17
 */

import AccountSearchOperation from './AccountSearchOperation';
import * as ObjectClassQuery from './queryBuilders/ObjectClassQuery';
import * as ProgramActivityQuery from './queryBuilders/ProgramActivityQuery';

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

        if (this.objectClass.length > 0) {
            filters.push(ObjectClassQuery
                .buildBalancesObjectClassQuery(this.objectClass));
        }

        if (this.programActivity.length > 0) {
            filters.push(ProgramActivityQuery
                .buildBalancesProgramActivityQuery(this.programActivity));
        }

        return filters;
    }
}

export default AccountSearchBalanceOperation;
