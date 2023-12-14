/**
 * BaseSpendingByGeographyResult.js
 * Created by Andrea Blackwell 12/14/2023
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseSpendingByGeographyResult = {
    populate(data) {
        this.shape_code = data.shape_code;
        this.display_name = data.display_name || '--';
        this._aggregated_amount = data.aggregated_amount || 0;
        this.population = data.population || 0;
        this._per_capita = data.per_capita || 0;
    },
    get _aggregated_amount() {
        return MoneyFormatter.formatMoneyWithPrecision(this._aggregated_amount, 0);
    },
    get _per_capita() {
        return MoneyFormatter.formatMoneyWithPrecision(this._per_capita, 0);
    }
};

export default BaseSpendingByGeographyResult;