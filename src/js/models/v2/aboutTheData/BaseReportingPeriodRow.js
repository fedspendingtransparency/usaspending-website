/**
 * BaseReportingPeriodRow.js
 * Created by Lizzie Salita 12/8/20
 */

import { formatMoneyWithPrecision, formatNumber, calculatePercentage } from 'helpers/moneyFormatter';
import { dateFormattedMonthDayYear, showQuarterText } from 'helpers/aboutTheDataHelper';

const BaseReportingPeriodRow = {
    populate(data, federalBudget) {
        this._fiscalYear = parseInt(data.fiscal_year, 10) || 0;
        this._fiscalPeriod = parseInt(data.fiscal_period, 10) || 0;
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
    },
    get reportingPeriod() {
        // Add a leading a zero to single-digit periods
        const paddedPeriod = `${this._fiscalPeriod}`.padStart(2, '0');
        let period = `P${paddedPeriod}`;
        if (showQuarterText(this._fiscalPeriod)) {
            // Indicate the fiscal quarter for periods 3, 6, 9, and 12
            period = `Q${this._fiscalPeriod / 3} / P${paddedPeriod}`;
        }
        else if (this._fiscalPeriod === 2) {
            // P01 isn't reported, so P02 is cumulative P01 - P02
            period = 'P01 - P02';
        }
        return `FY ${this._fiscalYear}: ${period}`;
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
    },
    get unlinkedContracts() {
        return formatNumber(this._unlinkedContracts);
    },
    get unlinkedAssistance() {
        return formatNumber(this._unlinkedContracts);
    }
};

export default BaseReportingPeriodRow;
