/**
 * accountObjectClassFunctions.js
 * Created by Kevin Li 3/31/17
 */

export const toggleItem = (selected, item) => {
    if (selected.includes(item)) {
        return selected.delete(item);
    }

    return selected.add(item);
};

export const bulkObjectClassesChange = (state, values, direction) => {
    let updatedSet = state;

    values.forEach((value) => {
        if (updatedSet.includes(value) && direction === 'remove') {
            // item exists but we want to deselect everything
            // so remove it
            updatedSet = updatedSet.delete(value);
        }
        else if (!updatedSet.includes(value) && direction === 'add') {
            // item doesn't exist but we want to add everything
            // so include it
            updatedSet = updatedSet.add(value);
        }
    });

    return updatedSet;
};
