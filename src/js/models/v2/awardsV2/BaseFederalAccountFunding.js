/**
 * BaseFederalAccountFunding.js
 * Created by Kwadwo Opoku-Debrah 04/04/19
 */

import { formatMoney } from 'helpers/moneyFormatter';

const BaseFederalAccount = {
    populate(data) {
        this.reportingFiscalYear = data.reporting_fiscal_year || null;
        this.reportingFiscalQuarter = data.reporting_fiscal_quarter || null;
        this.id = data.piid || 0;
        this.main_account_code = data.main_account_code || 0;
        this.agency = data.reporting_agency_name || '';
        this.fedAccount = data.account_title || '';
        this._program_activity_code = data.program_activity_code || '';
        this._program_activity_name = data.program_activity_name || '';
        this.agency_id = data.agency_id || '';
        this._object_class_name = data.object_class_name || '';
        this._object_class = data.object_class || '';
        this._fundingObligated = parseFloat(data.transaction_obligated_amount) || 0;
    }
};
Object.defineProperty(BaseFederalAccount, 'fundingObligated', {
    get() {
        return formatMoney(this._fundingObligated);
    }
});
Object.defineProperty(BaseFederalAccount, 'submissionDate', {
    get() {
        if (this.reportingFiscalYear && this.reportingFiscalQuarter) {
            return `FY ${this.reportingFiscalYear} Q${this.reportingFiscalQuarter}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'programActivity', {
    get() {
        if (this._program_activity_code && this._program_activity_name) {
            return `${this.program_activity_code} - ${this.program_activity_name}`;
        }
        else if (this._program_activity_code || this._program_activity_name) {
            return `${this._program_activity_code}${this._program_activity_name}`;
        }
        return '--';
    }
});
Object.defineProperty(BaseFederalAccount, 'objectClass', {
    get() {
        if (this._object_class_name && this._object_class) {
            return `${this._object_class} - ${this._object_class_name}`;
        }
        else if (this._object_class_name || this._object_class) {
            return `${this._object_class_name}${this._object_class}`;
        }
        return '--';
    }
});

export default BaseFederalAccount;
