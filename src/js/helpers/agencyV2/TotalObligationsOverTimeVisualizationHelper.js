/**
 * TotalObligationsOverTimeVisualization.js
 * Created by Jonathan Hill 04/09/2021
 */

export const getYDomain = (data) => {
    const obligatedAmounts = data.map((x) => x.obligated);
    return [Math.min(...obligatedAmounts), Math.max(...obligatedAmounts)];
};
