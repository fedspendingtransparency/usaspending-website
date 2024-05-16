/**
 * BaseSpendingByTimeResult.js
 * Created by Andrea Blackwell 05/15/2024
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseSpendingByTimeResult = {
    populate(data) {
        this.aggregated_amount = data.aggregated_amount;
        this.formatted_aggregated_amount = MoneyFormatter.formatMoneyWithPrecision(data.aggregated_amount, 0);
        this.fiscal_year = data.fiscal_year;
        this.time_period = data.time_period;
    }
};

export default BaseSpendingByTimeResult;
