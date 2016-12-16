/**
* LocationQuery.js
* Created by Emily Gullo
**/


// build query (concat?)
const buildLocationQuery = (values) => {
    // concat arrays
    const valueSet = [];
    values.forEach((locArray) => {
        valueSet.join(locArray);
    });

// put query in filter
    const filter = {
        field: "recipient__location__location_id",
        operation: "in",
        value: valueSet
    };

    return filter;
};
