/**
 * BaseCFDA.js
 * Created by Jonathan Hill 03/17/20
 */

import { truncate, isNumber } from 'lodash';
import {
    calculatePercentage,
    formatMoney,
    calculateUnitForSingleValue,
    formatMoneyWithPrecision
} from 'helpers/moneyFormatter';

// export default BaseCFDA;
export default class BaseCFDA {
    constructor(data, total) {
        this.samWebsite = data.sam_website || '';
        this.cfdaWebsite = data.cfda_website || '';
        this.cfdaFederalAgency = data.cfda_federal_agency || '';
        this.cfdaNumber = data.cfda_number || '';
        this.cfdaTitle = data.cfda_title || '--';
        this.applicantEligibility = data.applicant_eligibility || '';
        this.beneficiaryEligibility = data.beneficiary_eligibility || '';
        this.cfdaObjectives = data.cfda_objectives || '';
        this._totalAwardObligation = isNumber(total) ? total : '';
        this._federalActionOblicationAmount = isNumber(data.federal_action_obligation_amount) ? data.federal_action_obligation_amount : '';
        this._percentOfTotal = ((isNumber(this._totalAwardObligation) && this._totalAwardObligation !== 0) &&
            isNumber(this._federalActionOblicationAmount)) ?
            this._federalActionOblicationAmount / this._totalAwardObligation :
            null;
        Object.defineProperties(this, {
            federalActionOblicationAmount: {
                enumerable: true,
                get: () => (isNumber(this._federalActionOblicationAmount) ? formatMoney(this._federalActionOblicationAmount) : '--')
            },
            federalActionOblicationAmountShort: {
                enumerable: true,
                get: () => {
                    if (isNumber(this._federalActionOblicationAmount)) {
                        const units = calculateUnitForSingleValue(this._federalActionOblicationAmount, 1);
                        return `${formatMoneyWithPrecision((this._federalActionOblicationAmount / units.unit), 1)}${units.unitLabel}`;
                    }
                    return '--';
                }
            },
            percentOfTotal: {
                enumerable: true,
                get: () => ((isNumber(this._totalAwardObligation) && this._totalAwardObligation !== 0) && isNumber(this._federalActionOblicationAmount) ?
                    calculatePercentage(this._federalActionOblicationAmount, this._totalAwardObligation) :
                    '--')
            },
            cfdaTitleShort: {
                enumerable: true,
                get: () => (this.cfdaTitle.length >= 42 ? truncate(this.cfdaTitle, { length: 42 }) : this.cfdaTitle)
            }
        });
    }
}
