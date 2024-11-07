/**
 * timePeriodFilterFunctions.js
 * Created by Nick Torres 11/7/2024
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other query modules
export const updateSelectedDates = (currentDates, date) => {
    let updatedSet = currentDates;

    if (date.start || date.end) {
        currentDates.push({
            start_date: date.start,
            end_date: date.end
        });
    }

    return currentDates;
};
/* eslint-enable import/prefer-default-export */
