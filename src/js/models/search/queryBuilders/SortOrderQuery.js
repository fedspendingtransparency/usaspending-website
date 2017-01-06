/**
 * SortOrderQuery.js
 * Created by Kevin Li 1/6/17
 */

export const parseReduxState = (state) => {
    const orderValue = [];
    const field = state.field;

    let prefix = '';
    if (state.direction === 'desc') {
        // descending order
        prefix = '-';
    }

    orderValue.push(`${prefix}${field}`);

    return orderValue;
}
