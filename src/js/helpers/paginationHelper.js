/**
 * paginationHelper.js
 * Created by Lizzie Salita 6/13/19
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other files
export const calculatePageRange = (page, limit, count) => {
    const start = ((page - 1) * limit) + 1;
    let end = page * limit;
    const lastPage = Math.ceil(count / limit);
    if (page === lastPage) {
        end = count;
    }
    return {
        start,
        end
    };
};
/* eslint-enable import/prefer-default-export */
