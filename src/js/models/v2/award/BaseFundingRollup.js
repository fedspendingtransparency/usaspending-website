/**
 * BaseFundingRollup.js
 * Created by Lizzie Salita 8/16/19
 */

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const BaseFundingRollup = {
    populate(data) {
        this._obligatedAmount = data.total_transaction_obligated_amount || 0;
        this.awardingAgencyCount = data.awarding_agency_count || 'N/A';
        this.fundingAgencyCount = data.funding_agency_count || 'N/A';
        this.federalAccountCount = data.federal_account_count || 'N/A';
    },
    get obligatedAmount() {
        return this._obligatedAmount ? formatMoneyWithPrecision(this._obligatedAmount, 2) : 'N/A';
    }
};

export default BaseFundingRollup;
