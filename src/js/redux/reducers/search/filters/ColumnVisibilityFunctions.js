
/**
 * columnVisibilityFunctions.js
 * Created by Lizzie Salita on 5/5/17.
 */

export const toggleItem = (selected, item) => {
    if (selected.includes(item)) {
        return selected.delete(item);
    }

    return selected.add(item);
};
