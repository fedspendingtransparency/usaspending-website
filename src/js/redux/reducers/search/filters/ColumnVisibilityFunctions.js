/**
 * columnVisibilityFunctions.js
 * Created by Lizzie Salita on 5/5/17.
 */

import { List, Map } from 'immutable';

export const toggleItem = (selected, item) => {
    if (selected.includes(item)) {
        return selected.delete(selected.indexOf(item));
    }

    return selected.push(item);
};

export const spliceColumnOrder = (currentSet, dragIndex, hoverIndex) => {
    // Convert the "before" Ordered Set to an Array
    const visibleArray = currentSet.toArray();

    // Get the column that is being moved
    const col = visibleArray[dragIndex];

    // Move the column to its new position in the array
    visibleArray.splice(dragIndex, 1);
    visibleArray.splice(hoverIndex, 0, col);

    // Convert the Array back to an Ordered Set
    return new List(visibleArray);
};

export const convertDataSetToImmutable = (inbound) => {
    const immutableSet = {};
    const data = inbound;
    Object.keys(data).forEach((key) => {
        immutableSet[key] = {
            visibleOrder: new List(data[key].visibleOrder),
            hiddenOrder: new List(data[key].hiddenOrder),
            data: new Map(data[key].data)
        };
    });

    return immutableSet;
};
