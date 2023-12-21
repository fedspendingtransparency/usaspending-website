/**
 * BaseSpendingByGeographyResult.js
 * Created by Andrea Blackwell 12/14/2023
 */

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const BaseSpendingByGeographyResult = {
    populate(data) {
        this.shape_code = data.shape_code;
        this.display_name = data.display_name || '--';
        this.aggregated_amount = data.aggregated_amount || 0;
        this.population = data.population || 0;
        this.per_capita = data.per_capita || 0;
    },
    get aggregatedAmountFormatted() {
        return formatMoneyWithPrecision(this.aggregated_amount, 0);
    },
    get perCapitaAggregated() {
        return formatMoneyWithPrecision(this.per_capita, 0);
    }
};

export default BaseSpendingByGeographyResult;
