/**
 * BaseSpendingOverTimeRow.js
 * Created by Andrea Blackwell 05/15/2024
 */

const BaseSpendingOverTimeRow = {
    populate(data) {
        this.month = Object.prototype.hasOwnProperty.call(data.time_period, 'month') ? data.time_period.month : false;
        this.quarter = Object.prototype.hasOwnProperty.call(data.time_period, 'quarter') ? data.time_period.quarter : false;
        this.fiscal_year = data.time_period?.fiscal_year;
        this.aggregated_amount = data.aggregated_amount;
    }
};

export default BaseSpendingOverTimeRow;
