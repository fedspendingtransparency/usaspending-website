/**
 * timePeriodFilterFunctions.js
 * Created by Nick Torres 11/7/2024
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateDRs = (currentDates, date) => {
    let updatedSet = currentDates;
    // remove clicked index
    if (date.removeFilter === true && (date.event.target.getAttribute("data-index"))) {
        let i = 0;
        for (const item of updatedSet) {
            if (i === parseInt(date.event.target.getAttribute("data-index"), 10)) {
                updatedSet = currentDates.delete(item);
            }
            i++;
        }
    } else if (date.removeFilter === true && date.event.target.parentNode.getAttribute("data-index")) {
        let i = 0;
        for (const item of updatedSet) {
            if (i === parseInt(date.event.target.parentNode.getAttribute("data-index"), 10)) {
                updatedSet = currentDates.delete(item);
            }
            i++;
        }
    } else if (date.start || date.end) {
        updatedSet = updatedSet.add({
            start_date: date.start,
            end_date: date.end
        });
    }

    return updatedSet;
};

export const setDR = (newDR) => newDR;
/* eslint-enable import/prefer-default-export */
