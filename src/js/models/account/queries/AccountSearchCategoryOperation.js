/**
 * AccountSearchCategoryOperation.js
 * Created by Lizzie Salita 4/14/17
 */

import AccountSearchOperation from './AccountSearchOperation';
import * as ObjectClassQuery from './queryBuilders/ObjectClassQuery';
import * as ProgramActivityQuery from './queryBuilders/ProgramActivityQuery';

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
            const ocFilter = ObjectClassQuery.buildCategoriesObjectClassQuery(this.objectClass);
            filters.push(ocFilter);
        }

        if (this.programActivity.length > 0) {
            const paFilter = ProgramActivityQuery.buildCategoriesProgramActivityQuery(this.programActivity);
            filters.push(paFilter);
        }

        return filters;
    }
}

export default AccountSearchCategoryOperation;
