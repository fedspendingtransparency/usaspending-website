/**
 * BaseReportingPeriodRow.js
 * Created by Lizzie Salita 12/8/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';
import moment from 'moment';

const BaseReportingPeriodRow = {
    populate(data) {
        this._fiscalYear = data.fiscal_year || 0;
        this._fiscalPeriod = data.fiscal_period || 0;
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._mostRecentUpdate = data.recent_publication_date || null;
        this._missingTAS = data.tas_account_discrepancies_totals?.missing_tas_accounts_count || 0;
        this._obligationDifference = data.obligation_difference || 0;
    },
    get reportingPeriod() {
        return `FY ${this._fiscalYear}: P${this._fiscalPeriod}`;
    },
    // TODO - calculate percentage
    get mostRecentUpdate() {
        // TODO - alternative to moment.js
        return moment(this._mostRecentUpdate).format('MM/DD/YYYY');
    },
    get missingTAS() {
        return formatNumber(this._missingTAS);
    },
    get obligationDifference() {
        return formatMoney(this._obligationDifference);
    }
};

export default BaseReportingPeriodRow;
