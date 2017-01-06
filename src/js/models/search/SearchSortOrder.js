/**
  * SearchSortOrder.js
  * Created by Kevin Li 1/6/17
  **/

class SearchOperation {
    constructor() {
        this.sortOrder = [];
    }

    parseReduxState(state) {
        const orderValue = [];
        const field = state.field;

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
