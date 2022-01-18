/**
 * BaseFederalAccountFunding.js
 * Created by Kwadwo Opoku-Debrah 03/04/19
 */

import { formatMoney } from 'helpers/moneyFormatter';

const monthToPeriod = {
    1: 'P01/P02',
    2: 'P01/P02',
    3: 'P03',
    4: 'P04',
    5: 'P05',
    6: 'P06',
    7: 'P07',
    8: 'P08',
    9: 'P09',
    10: 'P10',
    11: 'P11',
    12: 'P12'
};

const BaseFederalAccount = {
    populateBase(data) {
        this.reportingFiscalYear = data.reporting_fiscal_year || null;
        this.reportingFiscalQuarter = data.reporting_fiscal_quarter || null;
        this.id = data.piid || 0;
        this.awardId = data.award_id || '';
        this.generatedId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '';
        this._mainAccountCode = data.main_account_code || 0;
        this.agency = data.funding_agency_name || '';
        this.fundingAgencyId = data.funding_agency_id || '';
        this.fundingAgencySlug = data.funding_agency_slug || '';
        this.awardingAgencyId = data.awarding_agency_id || '';
        this.awardingAgencySlug = data.awarding_agency_slug || '';
        this.awardingAgencyName = data.awarding_agency_name || '';
        this.fedAccount = data.account_title || '';
        this._programActivityCode = data.program_activity_code || '';
        this._programActivityName = data.program_activity_name || '';
        this._agencyId = data.agency_id || '';
        this._objectClassName = data.object_class_name || '';
        this._objectClass = data.object_class || '';
        this._fundingObligated = data.transaction_obligated_amount === null
            ? ''
            : parseFloat(data.transaction_obligated_amount);
        this._disasterEmergencyFundCode = data.disaster_emergency_fund_code || '';
        this._grossOutlayAmount = data.gross_outlay_amount || '';
        this._isQuarterlySubmission = data.is_quarterly_submission;
        this._reportingFiscalMonth = data.reporting_fiscal_month || null;
    },

    populate(data, category) {
        if (category === 'idv') {
            this.populateBase(data);
        }
        else {
            this.populateBase(data);
            /** TODO:
             * IMO we shouldn't have to do this.
             * The API should return consistent key/value pairs federal account code.
             * This was an oversight during API contract disucssions.
             */
            this.federalAccountCode = data.federal_account;
        }
    }
};

Object.defineProperty(BaseFederalAccount, 'fundingObligated', {
    get() {
        if (!this._fundingObligated && this._fundingObligated !== 0) return '--';
        return formatMoney(this._fundingObligated);
    }
});
Object.defineProperty(BaseFederalAccount, 'submissionDate', {
    get() {
        if (this._isQuarterlySubmission) {
            if (this.reportingFiscalYear && this.reportingFiscalQuarter) {
                return `FY ${this.reportingFiscalYear} Q${this.reportingFiscalQuarter}`;
            }
            return '--';
        }
        if (this.reportingFiscalYear && this._reportingFiscalMonth) {
            return `FY ${this.reportingFiscalYear} ${monthToPeriod[this._reportingFiscalMonth]}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'programActivity', {
    get() {
        if (this._programActivityCode && this._programActivityName) {
            return `${this._programActivityCode} - ${this._programActivityName}`;
        }
        else if (this._program_activityCode || this._programActivityName) {
            return `${this._programActivityCode}${this._programActivityName}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'objectClass', {
    get() {
        if (this._objectClassName && this._objectClass) {
            return `${this._objectClass} - ${this._objectClassName}`;
        }
        else if (this._objectClassName || this._objectClass) {
            return `${this._objectClassName}${this._objectClass}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'accountNumber', {
    get() {
        if (this._agencyId && this._mainAccountCode) {
            return `${this._agencyId}-${this._mainAccountCode}`;
        }
        return '';
    }
});
Object.defineProperty(BaseFederalAccount, 'grossOutlayAmount', {
    get() {
        if (this._grossOutlayAmount) {
            return formatMoney(this._grossOutlayAmount);
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'disasterEmergencyFundCode', {
    get() {
        if (this._disasterEmergencyFundCode) {
            return this._disasterEmergencyFundCode;
        }
        return '--';
    }
});

export default BaseFederalAccount;
