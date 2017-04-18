/**
 * AccountSearchCategoryOperation.js
 * Created by Lizzie Salita 4/14/17
 */

import AccountSearchOperation from './AccountSearchOperation';
import * as ObjectClassQuery from './queryBuilders/ObjectClassQuery';

class AccountSearchCategoryOperation extends AccountSearchOperation {
    uniqueParams() {
        const filters = [];

        if (this.accountId) {
            filters.push({
                field: 'treasury_account__federal_account_id',
                operation: 'equals',
                value: this.accountId
            });
        }

        if (this.objectClass.length > 0) {
            const ocFilter = ObjectClassQuery.buildObjectClassQuery(this.objectClass);
            filters.push(ocFilter);
        }

        return filters;
    }
}

export default AccountSearchCategoryOperation;
