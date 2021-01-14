/**
 * BaseReportingPeriodRow.js
 * Created by Lizzie Salita 12/8/20
 */

import { formatMoneyWithPrecision, formatNumber, calculatePercentage } from 'helpers/moneyFormatter';
import { dateFormattedMonthDayYear, getPeriodWithTitleById } from 'helpers/aboutTheDataHelper';

const BaseReportingPeriodRow = {
    populate(data, federalBudget) {
        this._fiscalYear = data.fiscal_year || 0;
        this._fiscalPeriod = parseInt(data.fiscal_period, 10) || 0;
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._mostRecentPublicationDate = data.recent_publication_date || null;
        /* eslint-disable camelcase */
        this._missingTASCount = data.tas_account_discrepancies_totals?.missing_tas_accounts_count || 0;
        this._gtasObligationTotal = data.tas_account_discrepancies_totals?.gtas_obligation_total || 0;
        /* eslint-enable camelcase */
        this._obligationDifference = data.obligation_difference || 0;
        this._federalBudget = federalBudget;
    },
    get reportingPeriod() {
        return `FY ${this._fiscalYear}: ${getPeriodWithTitleById(`${this._fiscalPeriod}`).title}`;
    },
    get percentOfBudget() {
        return calculatePercentage(this._budgetAuthority, this._federalBudget);
    },
    get mostRecentPublicationDate() {
        return dateFormattedMonthDayYear(this._mostRecentPublicationDate);
    },
    get missingTASCount() {
        return formatNumber(this._missingTASCount);
    },
    get obligationDifference() {
        return formatMoneyWithPrecision(this._obligationDifference, 2);
    }
};

export default BaseReportingPeriodRow;
