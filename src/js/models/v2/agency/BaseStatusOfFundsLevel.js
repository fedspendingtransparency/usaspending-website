/**
 * BaseStatusOfFundsLevel.js
 * Created by Lizzie Salita 11/23/21
 */

import { formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const BaseStatusOfFundsLevel = {
    populate(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this._budgetaryResources = formatMoneyWithUnitsShortLabel(data._budgetaryResources, 2) || '--';
        this._obligations = formatMoneyWithUnitsShortLabel(data._obligations, 2) || '--';
        this._outlays = formatMoneyWithUnitsShortLabel(data._outlays, 2) || '--';
    }
};

export default BaseStatusOfFundsLevel;
