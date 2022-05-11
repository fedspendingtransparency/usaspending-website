/**
 * TotalObligationsOverTimeVisualizationHelper.js
 * Created by Jonathan Hill 04/09/2021
 */

import { normalStoppingPoints } from 'dataMapping/agency/visualizations/totalObligationsOverTime';

export const getYDomain = (data, agencyBudget) => {
    const obligatedAmounts = data.map((x) => x.obligated);
    if (agencyBudget) obligatedAmounts.push(agencyBudget);
    return [Math.min(...obligatedAmounts), Math.max(...obligatedAmounts)];
};

export const getMilliseconds = (date) => date.getTime();

const converISODateToDate = (date) => {
    const dateString = date.split('T')[0].split('-');
    const newDate = new Date(parseInt(dateString[0], 10), parseInt(dateString[1], 10) - 1, parseInt(dateString[2], 10));
    return newDate;
};

export const addSubmissionEndDatesToBudgetaryResources = (budgetaryResources, submissionPeriods, fy) => {
    const yearlySubmissions = submissionPeriods.filter((period) => `${period.submission_fiscal_year}` === fy);
    return budgetaryResources
        .map((budgetaryResource) => {
            /* eslint-disable camelcase */
            const yearlySubmissionEndDateByPeriod = yearlySubmissions.find((submission) => submission.submission_fiscal_month === budgetaryResource.period)?.period_end_date;
            if (yearlySubmissionEndDateByPeriod) {
                return {
                    ...budgetaryResource,
                    /* eslint-disable camelcase */
                    endDate: getMilliseconds(new Date(converISODateToDate(yearlySubmissionEndDateByPeriod)))
                };
            }
            return null;
        })
        .filter((budgetaryResource) => budgetaryResource);
};

export const exceedsMaxPercentDifference = (agencyBudget, data, maxAndMin) => {
    const maxObligation = Math.max(...data.map((x) => x.obligated));
    if (maxAndMin) {
        const minObligation = Math.min(...data.map((x) => x.obligated));
        const diff = maxObligation - agencyBudget;
        const total = maxObligation + Math.abs(minObligation);
        /**
         * Exceeds max and min only
         * the percent difference between the agency budget and the max obligation
         * with the total being the sum of the max and min obligations.
         */
        return `${((diff / total) * 100)}%`;
    }
    const difference = maxObligation - agencyBudget;
    /**
     * Exceeds max only
     * the percent difference between the agency budget and max obligation.
     */
    return `${((difference / maxObligation) * 100)}%`;
};

export const exceedsMinPercentDifference = (agencyBudget, data) => {
    const minObligation = Math.abs(Math.min(...data.map((x) => x.obligated)));
    const totalAmountOfMoney = minObligation + Math.max(...data.map((x) => x.obligated));
    const difference = totalAmountOfMoney - minObligation;
    /**
     * the stopping point between gradient colors equates to the percent difference between
     * the absolute total (from min - max) and agency budget
     */
    return `${((difference / totalAmountOfMoney) * 100)}%`;
};

export const exceedsMaxAndMinStoppingPoints = (agencyBudget, data) => {
    const maxPercentDifference = exceedsMaxPercentDifference(agencyBudget, data, true);
    const minPercentDifference = exceedsMinPercentDifference(agencyBudget, data);
    return [
    // start red for exceeding max
        { offset: '0%', stopColor: 'red' },
        { offset: maxPercentDifference, stopColor: 'red' },
        // go to blue for normal
        { offset: maxPercentDifference, stopColor: 'blue' },
        { offset: minPercentDifference, stopColor: 'blue' },
        // go back to red for exceeding min
        { offset: minPercentDifference, stopColor: 'red' },
        { offset: '100%', stopColor: 'red' }
    ];
};

export const exceedsMaxStoppingPoints = (agencyBudget, data) => {
    const percentDifference = exceedsMaxPercentDifference(agencyBudget, data);
    return [
        { offset: '0%', stopColor: 'red' },
        { offset: percentDifference, stopColor: 'red' },
        { offset: percentDifference, stopColor: 'blue' },
        { offset: '100%', stopColor: 'blue' }
    ];
};

export const exceedsMinStoppingPoints = (agencyBudget, data) => {
    const percentDifference = exceedsMinPercentDifference(agencyBudget, data);
    return [
        { offset: '0%', stopColor: 'blue' },
        { offset: percentDifference, stopColor: 'blue' },
        { offset: percentDifference, stopColor: 'red' },
        { offset: '100%', stopColor: 'red' }
    ];
};

export const stoppingPointsByScenario = (scenario, agencyBudget, data) => {
    if (scenario === 'exceedsMaxAndMin') return exceedsMaxAndMinStoppingPoints(agencyBudget, data);
    if (scenario === 'exceedsMax') return exceedsMaxStoppingPoints(agencyBudget, data);
    if (scenario === 'exceedsMin') return exceedsMinStoppingPoints(agencyBudget, data);
    return normalStoppingPoints;
};

export const determineScenario = (agencyBudget, data) => {
    if (agencyBudget && data.length) {
        const obligations = data.map((x) => x.obligated);
        const exceedsMax = Math.max(...obligations) > agencyBudget;
        const exceedsMin = Math.min(...obligations) < 0;
        if (exceedsMax && exceedsMin) return 'exceedsMaxAndMin';
        if (exceedsMax) return 'exceedsMax';
        if (exceedsMin) return 'exceedsMin';
        return 'normal';
    }
    return 'normal';
};

export const stoppingPoints = (agencyBudget, data) => stoppingPointsByScenario(determineScenario(agencyBudget, data), agencyBudget, data);

export const pathDefinition = (data, xScale, xProperty, padding, yScale, yProperty, height, close, areaPath) => data.reduce((path, currentItem, i, originalArray) => {
    if (i === 0) {
        const updatedPath = `M${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}`;
        return updatedPath;
    }
    /**
     * When adding an area path we must close at a certain height.
     * With a normal area path that is usually the height of the graph.
     * When using a negative scenario we want to close the graph at 0.
     */
    if ((originalArray.length === i + 1) && areaPath) {
        const updatedPath = `${path}L${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}L${xScale(currentItem[xProperty]) + padding.left},${(close === null) ? (height - padding.bottom) : (height - yScale(close) - padding.bottom)}Z`;
        return updatedPath;
    }

    const updatedPath = `${path}L${xScale(currentItem[xProperty]) + padding.left},${height - yScale(currentItem[yProperty]) - padding.bottom}`;
    return updatedPath;
}, '');
