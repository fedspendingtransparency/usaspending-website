/**
  * SearchSortOrder.js
  * Created by Kevin Li 1/6/17
  **/

import TableSearchFields from 'dataMapping/search/tableSearchFields';

class SearchOperation {
    constructor() {
        this.sortOrder = [];
    }

    parseReduxState(tableType, state) {
        const orderValue = [];
        const field = TableSearchFields[tableType]._mapping[state.field];

        let prefix = '';
        if (state.direction === 'desc') {
            // descending order
            prefix = '-';
        }
        orderValue.push(`${prefix}${field}`);

        this.sortOrder = orderValue;
    }

    toParams() {
        return this.sortOrder;
    }
}

export default SearchOperation;
