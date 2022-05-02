/**
 * BaseAgencyBudgetaryResources.js
 * Created by Lizzie Salita 5/26/20
 */

import { formatMoneyWithUnits, calculatePercentage, formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const BaseAgencyBudgetaryResources = {
    populate(data) {
        this._agencyBudget = data.agency_budgetary_resources || '--';
        this.agencyBudget = formatMoneyWithUnits(this._agencyBudget);
        this.agencyBudgetShort = formatMoneyWithUnitsShortLabel(this._agencyBudget, 2);
        this._agencyObligated = data.agency_total_obligated || '--';
        this.agencyObligated = formatMoneyWithUnits(this._agencyObligated);
        this.agencyObligatedShort = formatMoneyWithUnitsShortLabel(this._agencyObligated, 2);
        this.percentOfAgencyBudget = calculatePercentage(this._agencyObligated, this._agencyBudget);
        this._federalBudget = data.total_budgetary_resources || 0;
        this.obligationsByPeriod = data.agency_obligation_by_period || [];
        this.percentOfFederalBudget = calculatePercentage(this._agencyBudget, this._federalBudget);
    }
};

export default BaseAgencyBudgetaryResources;
