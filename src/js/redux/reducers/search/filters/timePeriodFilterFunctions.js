/**
 * timePeriodFilterFunctions.js
 * Created by Nick Torres 11/7/2024
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateDRs = (currentDates, date) => {
    let updatedSet = currentDates;
    console.debug("updated DRS: ", date);
    // remove clicked index
    if (date.removeFilter && date.event.target.getAttribute("index")) {
        console.debug("making it here: ", date, updatedSet, currentDates, date.event.target.getAttribute("index"));
        let i = 0;
        for (const item of updatedSet) {
            console.debug("in for loop ", i, date.event.target.getAttribute("index"));
            if (i === parseInt(date.event.target.getAttribute("index"), 10)) {
                console.debug("i and date index are the same: ", i, item);
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

    console.debug("after logic: ", updatedSet);
    return updatedSet;
};

export const setDR = (newDR) => newDR;
/* eslint-enable import/prefer-default-export */
