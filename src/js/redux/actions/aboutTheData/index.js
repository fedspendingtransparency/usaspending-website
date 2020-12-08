export const setTableData = (activeTable, payload, append = false) => {
    if (activeTable === 'dates') {
        return {
            type: "SET_ABOUT_THE_DATA_DATES",
            payload,
            append
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_DETAILS",
        payload,
        append
    };
};

export const setTableSort = (activeTable, payload) => {
    if (activeTable === 'dates') {
        return {
            type: "SET_ABOUT_THE_DATA_DATES_SORT",
            payload
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_DETAILS_SORT",
        payload
    };
};

export const setTotals = (payload) => ({
    type: "SET_ABOUT_THE_DATA_TOTALS",
    payload
});
