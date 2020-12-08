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

export const setTableSort = (activeTable, field, direction) => {
    if (activeTable === 'dates') {
        return {
            type: "SET_ABOUT_THE_DATA_DATES_SORT",
            payload: [field, direction]
        };
    }
    return {
        type: "SET_ABOUT_THE_DATA_DETAILS_SORT",
        payload: [field, direction]
    };
};

export const setTotals = (payload) => ({
    type: "SET_ABOUT_THE_DATA_TOTALS",
    payload
});
