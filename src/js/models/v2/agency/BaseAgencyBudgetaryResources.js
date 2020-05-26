/**
 * BaseAgencyBudgetaryResources.js
 * Created by Lizzie Salita 5/26/20
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const BaseAgencyBudgetaryResources = {
    populate(data) {
        this._agencyTotalObligated = data.agency_total_obligated || 0;
    },
    get agencyTotalObligated() {
        if (this._agencyTotalObligated >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._agencyTotalObligated);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._agencyTotalObligated / units.unit, 1)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._agencyTotalObligated, 0);
    }
};

export default BaseAgencyBudgetaryResources;
