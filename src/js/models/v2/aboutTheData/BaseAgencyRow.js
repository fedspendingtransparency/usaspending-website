/**
 * BaseAgencyRow.js
 * Created by Lizzie Salita 11/20/20
 */

import { formatMoney, formatNumber } from 'helpers/moneyFormatter';
import moment from 'moment';

const BaseAgencyRow = {
    populate(data) {
        this._name = data.name || '';
        this._abbreviation = data.abbreviation || '';
        this._code = data.code || '';
        this._budgetAuthority = data.current_total_budget_authority_amount || 0;
        this._discrepancyCount = data.discrepancy_count || 0;
        this._obligationDifference = data.obligation_difference || 0;
        this._publicationDate = data.recent_publication_date || null;
        this.certified = data.recent_publication_date_certified || false;
    },
    get name() {
        return `${this._name}${this._abbreviation && ` (${this._abbreviation})`}`;
    },
    get budgetAuthority() {
        return formatMoney(this._budgetAuthority);
    },
    get obligationDifference() {
        return formatMoney(this._obligationDifference);
    },
    get discrepancyCount() {
        return formatNumber(this._discrepancyCount);
    },
    get publicationDate() {
        if (this._publicationDate) return moment(this._publicationDate).format('MM/DD/YYYY');
        return '';
    }
    // TODO - calculate percentage
};

export default BaseAgencyRow;
