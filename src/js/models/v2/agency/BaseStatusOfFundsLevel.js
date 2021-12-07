/**
 * BaseStatusOfFundsLevel.js
 * Created by Lizzie Salita 11/23/21
 */

import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const BaseStatusOfFundsLevel = {
    populate(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this._budgetaryResources = data.total_budgetary_resources;
        this._obligations = data.total_obligations;
    },
    get budgetaryResources() {
        return formatMoneyWithUnitsShortLabel(this._budgetaryResources, 2);
    },
    get obligations() {
        return formatMoneyWithUnitsShortLabel(this._obligations, 2);
    }
};

export default BaseStatusOfFundsLevel;
