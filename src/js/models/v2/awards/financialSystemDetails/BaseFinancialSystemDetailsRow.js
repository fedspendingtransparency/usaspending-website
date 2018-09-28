/**
 * BaseFinancialSystemDetailsRow.js
 * Created by Lizzie Salita 3/9/18
 */

import moment from 'moment';
import * as MoneyFormatter from 'helpers/moneyFormatter';

export const parseDate = (string) => moment(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const BaseFinancialSystemDetailsRow = {
    populate(data) {
        this.id = data.financial_accounts_by_awards_id || '';
        this._reportingFiscalYear = (data.submission && data.submission.reporting_fiscal_year) || null;
        this._reportingFiscalQuarter = (data.submission && data.submission.reporting_fiscal_quarter) || null;
        this._fedAccountTitle = (data.treasury_account && data.treasury_account.federal_account
            && data.treasury_account.federal_account.account_title) || '';
        this._fedAccountAgencyId = (data.treasury_account && data.treasury_account.federal_account)
            && data.treasury_account.federal_account.agency_identifier;
        this._fedAccountCode = (data.treasury_account && data.treasury_account.federal_account)
            && data.treasury_account.federal_account.main_account_code;
        this.tas = (data.treasury_account && data.treasury_account.tas_rendering_label) || '';
        this._objectClassName = (data.object_class && data.object_class.object_class_name) || '';
        this._objectClassCode = (data.object_class && data.object_class.object_class) || '';
        this._programActivityName = (data.program_activity && data.program_activity.program_activity_name) || '';
        this._programActivityCode = (data.program_activity && data.program_activity.program_activity_code) || '';
        this._fundingObligated = parseFloat(data.transaction_obligated_amount) || 0;
        this._budgetFunctionName = (data.treasury_account && data.treasury_account.budget_function_title) || '';
        this._budgetFunctionCode = (data.treasury_account && data.treasury_account.budget_function_code) || '';
        this._budgetSubFunctionName = (data.treasury_account && data.treasury_account.budget_subfunction_title) || '';
        this._budgetSubFunctionCode = (data.treasury_account && data.treasury_account.budget_subfunction_code) || '';
    },
    get submissionDate() {
        if (this._reportingFiscalYear && this._reportingFiscalQuarter) {
            return `FY ${this._reportingFiscalYear} Q${this._reportingFiscalQuarter}`;
        }
        return '';
    },
    get fundingObligated() {
        if (this._fundingObligated) {
            return MoneyFormatter.formatMoney(this._fundingObligated);
        }
        return '';
    },
    get fedAccount() {
        // create the federal account number by combining agency identifier and main account code
        return {
            title: this._fedAccountTitle,
            id: `${this._fedAccountAgencyId}-${this._fedAccountCode}`
        };
    },
    get objectClass() {
        if (this._objectClassName && this._objectClassCode) {
            return `${this._objectClassName} (${this._objectClassCode})`;
        }
        else if (this._objectClassName || this._objectClassCode) {
            return `${this._objectClassName}${this._objectClassCode}`;
        }
        return '';
    },
    get programActivity() {
        if (this._programActivityName && this._programActivityCode) {
            return `${this._programActivityName} (${this._programActivityCode})`;
        }
        else if (this._programActivityName || this._programActivityCode) {
            return `${this._programActivityName}${this._programActivityCode}`;
        }
        return '';
    },
    get budgetFunction() {
        if (this._budgetFunctionName && this._budgetFunctionCode) {
            return `${this._budgetFunctionName} (${this._budgetFunctionCode})`;
        }
        else if (this._budgetFunctionName || this._budgetFunctionCode) {
            return `${this._budgetFunctionName}${this._budgetFunctionCode}`;
        }
        return '';
    },
    get budgetSubFunction() {
        if (this._budgetSubFunctionName && this._budgetSubFunctionCode) {
            return `${this._budgetSubFunctionName} (${this._budgetSubFunctionCode})`;
        }
        else if (this._budgetSubFunctionName || this._budgetSubFunctionCode) {
            return `${this._budgetSubFunctionName}${this._budgetSubFunctionCode}`;
        }
        return '';
    }
};

export default BaseFinancialSystemDetailsRow;
