/**
 * Created By Jonathan Hill 03/26/20
 */

import { isAwardFinancialAssistance } from 'helpers/awardSummaryHelper';

/**
 * isBadData
 * - determines if we do not have suitable data to draw the chart based on dates,
 * award type and transactions
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Boolean} - is the data suitable for charting
 */
export const isBadData = (dates, awardType, transactions) => {
    const {
        _startDate: startDate,
        _endDate: currentEndDate,
        _potentialEndDate: potentialEndDate
    } = dates;
    /**
     * handles null, '', or 'random string' passed to moment
     */
    const badStart = isNaN(startDate.valueOf());
    const badCurrent = isNaN(currentEndDate.valueOf());
    const badEnd = isNaN(potentialEndDate.valueOf());
    const noTransactionHasDates = transactions.every((t) => isNaN(t.action_date.valueOf()));
    const onlyOneTransaction = transactions.length === 1;
    if (isAwardFinancialAssistance(awardType)) { // grant
        // 3
        if (noTransactionHasDates) return true;
        if (badStart && badCurrent && onlyOneTransaction) return true;
        // 4.b and 5.b
        if (onlyOneTransaction) {
            // 4.b
            if ((badStart && !badCurrent)) {
                if (transactions[0].action_date.valueOf() > currentEndDate.valueOf()) return true;
            }
            // 5.b
            if (badCurrent && !badStart) {
                if (transactions[0].action_date.valueOf() < startDate.valueOf()) return true;
            }
        }
        return false;
    }
    // contract
    // 3
    if (noTransactionHasDates) return true;
    if (badStart && badCurrent && badEnd && onlyOneTransaction) return true;
    // 4.b and 5.b
    if (onlyOneTransaction) {
        // 4.b
        if ((badStart && (!badCurrent || !badEnd))) {
            // since contracts could have current or potential we test both - potential first
            if (potentialEndDate.valueOf() && (transactions[0].action_date.valueOf() > potentialEndDate.valueOf())) return true;
            if (currentEndDate.valueOf() && (transactions[0].action_date.valueOf() > currentEndDate.valueOf())) return true;
        }
        // 5.b
        if ((badCurrent && badEnd) && !badStart) {
            if (transactions[0].action_date.valueOf() < startDate.valueOf()) return true;
        }
    }
    return false;
};
/**
 * xDomain
 * - Determines the xDomain based on dates, award type and transactions for a given award.
 * @param {Object} dates - award dates
 * @param {string} awardType - award type
 * @param {Object[]} transactions - array of transaction objects
 * @returns {Number[]} - array with a min and max value, e.g. [min, max]
 */
export const xDomain = (dates, awardType, transactions) => {
    return null;
};

export const yDomain = () => {
    return null;
};

// Cases for Bad Data and the X Domain

// 1.	Given we have any PoP end date exists, the last PoP date used for the end of the x domain.
//    a.	If the last transaction action date > the end date.
//        i.	We will use the last transaction action date and the end of the x domain.
// 2.	Given we have a PoP start date.
//    a.	If the first transaction action date is < the start date.
//        i.	We will use the first transaction action date as the start of the x domain.
// 3.	No PoP start and end date and only one transaction, or no transactions have dates.
//    a.	Display data is not suitable for charting message.
// 4.	No PoP start date, do have a PoP end date and only one transaction.
//    a.	Draw chart as normal, with no start date line.
//    b.	If transaction action_date > end date, Display data is not suitable for charting message.
// 5.	No PoP end date, do have a PoP start date and only one transaction
//    a.	Draw chart as normal, but no end date line.
//    b.	If transaction action_date < start date, Display data is not suitable for charting message.
// 6.	No PoP start and PoP end date when we have transaction data.
//    a.	We will use the transaction data start and end dates (meaning action date for earliest transaction (based on action_date) and latest (same)) and will not show the start and end lines.
// 7.	No PoP start date when we have a PoP end date.
//    a.	We will use the first transaction date as the start and will not show the start line and we will show the end date line.
// 8.	No PoP end date (for grants) and No PoP current or potential end date (for contracts ) when we have the start date.
//    a.	We will use the last transaction date as the end and will not show the end line and we will show the start line.
// 9.	No PoP potential end date but there is a current end date (for contracts ).
//    a.	We will use the current end date as the end and will not show the potential end date line and will show the start line.
// 10.	The PoP start date is less than the first transaction date.
//    a.	Draw the chart normally—meaning beginning at the start date in this case.
// 11.	The PoP start date is greater than the first transaction date.
//    a.	We will use the first transaction date for the start and show the start date line.
// 12.	The PoP end date is less than the last transaction.
//    a.	We will use the last transaction date for the end and will show the end date line.
// 13.	If a date line’s underlying data is absent. Or the “potential award amount” data is not present
//    a.	We will not show any start/end/current/potential date line or ‘potential award amount’ line without underlying data to support it.
// 14.	No transaction data when we have a start and end date.
//    a.	No situation where we don’t have transaction data
