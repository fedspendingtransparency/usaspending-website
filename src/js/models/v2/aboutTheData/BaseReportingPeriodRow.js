/**
 * BaseReportingPeriodRow.js
 * Created by Lizzie Salita 12/8/20
 */

import { formatMoneyWithPrecision, formatNumber, formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { dateFormattedMonthDayYear, getPeriodWithTitleById } from 'helpers/aboutTheDataHelper';

const BaseReportingPeriodRow = {
    populate(data, federalBudget) {
        this.fiscalYear = parseInt(data.fiscal_year, 10) || 0;
        this.fiscalPeriod = parseInt(data.fiscal_period, 10) || 0;
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._mostRecentPublicationDate = data.recent_publication_date || null;
        /* eslint-disable camelcase */
        this._missingTASCount = data.tas_account_discrepancies_totals?.missing_tas_accounts_count || 0;
        this._gtasObligationTotal = data.tas_account_discrepancies_totals?.gtas_obligation_total || 0;
        /* eslint-enable camelcase */
        this._obligationDifference = data.obligation_difference || 0;
        this._federalBudget = federalBudget;
        this._unlinkedContracts = data.unlinked_contract_award_count || 0;
        this._unlinkedAssistance = data.unlinked_assistance_award_count || 0;
        this._percentOfBudget = data.percent_of_total_budgetary_resources || 0;
    },
    get reportingPeriod() {
        return `FY ${this.fiscalYear}: ${getPeriodWithTitleById(`${this.fiscalPeriod}`).title}`;
    },
    get percentOfBudget() {
        return `${formatNumberWithPrecision(this._percentOfBudget, 2)}%`;
    },
    get mostRecentPublicationDate() {
        return dateFormattedMonthDayYear(this._mostRecentPublicationDate);
    },
    get missingTASCount() {
        return formatNumber(this._missingTASCount);
    },
    get obligationDifference() {
        return formatMoneyWithPrecision(this._obligationDifference, 2);
    },
    get unlinkedContracts() {
        return formatNumber(this._unlinkedContracts);
    },
    get unlinkedAssistance() {
        return formatNumber(this._unlinkedContracts);
    }
};

export default BaseReportingPeriodRow;
