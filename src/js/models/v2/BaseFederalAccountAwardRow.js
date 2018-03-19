/**
 * BaseFederalAccountAwardRow.js
 * Created by michaelbray on 1/19/18.
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { parseDate } from './utils';

/* eslint-disable object-shorthand */
const BaseFederalAccountAwardRow = {
    parse(data) {
        this.internalId = data.id || null;
        this.awardId = data.piid || data.fain || data.uri || '';
        this.recipientName = data.recipient.recipient_name || '';
        this._startDate = parseDate(data.period_of_performance_start_date || null);
        this._endDate = parseDate(data.period_of_performance_current_end_date || null);
        this._awardAmount = data.total_obligation || 0;
        this.awardType = data.type_description || '';
        this.awardingToptierAgency = data.awarding_agency.toptier_agency.name || '';
        this.awardingSubtierAgency = data.awarding_agency.subtier_agency.name || '';
        this._issuedDate = parseDate(data.date_signed) || '';
        this._subsidyCost = (data.latest_transaction
            && data.latest_transaction.assistance_data
            && parseFloat(data.latest_transaction.assistance_data.original_loan_subsidy_cost)) || 0;
        this._loanValue = parseFloat(data.total_loan_value) || 0;
    },
    get startDate() {
        if (!this._startDate) {
            return '';
        }
        return this._startDate.format('MM/DD/YYYY');
    },
    get endDate() {
        if (!this._endDate) {
            return '';
        }
        return this._endDate.format('MM/DD/YYYY');
    },
    get awardAmount() {
        return formatMoney(this._awardAmount);
    },
    get issuedDate() {
        if (!this._issuedDate) {
            return '';
        }
        return this._issuedDate.format('MM/DD/YYYY');
    },
    get loanValue() {
        return formatMoney(this._loanValue);
    },
    get subsidyCost() {
        return formatMoney(this._subsidyCost);
    }
};
/* eslint-enable object-shorthand */

export default BaseFederalAccountAwardRow;
