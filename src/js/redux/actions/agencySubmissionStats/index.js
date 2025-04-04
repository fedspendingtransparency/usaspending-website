export const setTableData = (activeTable, payload, append = false) => {
    if (activeTable === 'publications') {
        return {
            type: "SET_ABOUT_THE_DATA_ALL_PUBLICATIONS",
            payload,
            append
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_ALL_SUBMISSIONS",
        payload,
        append
    };
};

export const setTableSort = (activeTable, field, direction) => {
    if (activeTable === 'publications') {
        return {
            type: "SET_ABOUT_THE_DATA_ALL_PUBLICATIONS_SORT",
            payload: [field, direction]
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_ALL_SUBMISSIONS_SORT",
        payload: [field, direction]
    };
};

export const setTotals = (payload) => ({
    type: "SET_ABOUT_THE_DATA_TOTALS",
    payload
});

export const setSearchTerm = (term) => ({
    type: "SET_ABOUT_THE_DATA_SEARCH_TERM",
    payload: term
});

export const setSearchResults = (results, table = 'submissions') => {
    if (table === 'submissions') {
        return {
            type: "SET_ABOUT_THE_DATA_SEARCH_RESULTS_SUBMISSIONS",
            payload: results
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_SEARCH_RESULTS_PUBLICATIONS",
        payload: results
    };
};
