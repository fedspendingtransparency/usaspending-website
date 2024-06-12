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
    },
    get month_year() {
        // this date needs to be fiscal year
        const date = new Date(`${this.month}/01/${this.fiscal_year}`);
        return date;
    },
    get quarter_year() {
        // this date needs to be fiscal year
        let quarter_start = '01';

        if (this.quarter === 1) {
            quarterStart = `10`;
        } else if (this.quarter === 2) {
            quarterStart = `01`;
        } else if (this.quarter === 3) {
            quarterStart = `04`;
        } else if (this.quarter === 4) {
            quarterStart = `07`;
        }


        const date = new Date(`${quarter_start}/01/${this.fiscal_year}`);
        return date;
    }
};

export default BaseSpendingOverTimeRow;
