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
