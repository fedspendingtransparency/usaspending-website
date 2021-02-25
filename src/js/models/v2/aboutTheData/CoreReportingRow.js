/**
 * CoreReportingRow.js
 * Created by Lizzie Salita 1/12/21
 */

import { formatNumber, formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { format } from 'date-fns';

const CoreReportingRow = {
    populateCore(data) {
        this._budgetAuthority = data.current_total_budget_authority_amount;
        this._mostRecentPublicationDate = data.recent_publication_date || null;
        /* eslint-disable camelcase */
        this._gtasObligationTotal = data.tas_account_discrepancies_totals?.gtas_obligation_total;
        this._discrepancyCount = data.tas_account_discrepancies_totals?.missing_tas_accounts_count || 0;
        /* eslint-enable camelcase */
        this._obligationDifference = data.obligation_difference;
        this._unlinkedContracts = data.unlinked_contract_award_count || 0;
        this._unlinkedAssistance = data.unlinked_assistance_award_count || 0;
        this.assuranceStatement = data.assurance_statement_url || '';
    },
    get budgetAuthority() {
        return formatMoneyWithPrecision(this._budgetAuthority, 2, '--');
    },
    get mostRecentPublicationDate() {
        return this._mostRecentPublicationDate ? format(new Date(this._mostRecentPublicationDate), 'MM/dd/yyyy') : '--';
    },
    get obligationDifference() {
        return formatMoneyWithPrecision(this._obligationDifference, 2, '--');
    },
    get discrepancyCount() {
        return formatNumber(this._discrepancyCount);
    },
    get unlinkedContracts() {
        return formatNumber(this._unlinkedContracts);
    },
    get unlinkedAssistance() {
        return formatNumber(this._unlinkedAssistance);
    }
};

export default CoreReportingRow;
