/**
 * accountProgramActivityFunctions.js
 * Created by michaelbray on 4/14/17.
 */

export const toggleItem = (selected, item) => {
    if (selected.includes(item)) {
        return selected.delete(item);
    }

    return selected.add(item);
};
