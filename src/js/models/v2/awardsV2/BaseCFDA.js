/**
 * BaseCFDA.js
 * Created by Jonathan Hill 03/17/20
 */

import { truncate, isNumber } from 'lodash';
import { calculateTreemapPercentage, formatMoney } from 'helpers/moneyFormatter';

const BaseCFDA = {
    populate(data) {
        this.samWebsite = data.sam_website || '';
        this.cfdaWebsite = data.cfda_website || '';
        this.cfdaFederalAgency = data.cfda_federal_agency || '';
        this.cfdaNumber = data.cfda_number || '';
        this.cfdaTitle = data.cfda_title || '--';
        this.applicantEligibility = data.applicant_eligibility || '';
        this.beneficiaryEligibility = data.beneficiary_eligibility || '';
        this.cfdaObjectives = data.cfda_objectives || '';
        this._totalFundingAmount = isNumber(data.total_funding_amount) ? data.total_funding_amount : '';
        this._federalActionOblicationAmount = isNumber(data.federal_action_obligation_amount) ? data.federal_action_obligation_amount : '';
        this._percentOfTotal = (isNumber(this._totalFundingAmount) &&
            (isNumber(this._federalActionOblicationAmount) && this._federalActionOblicationAmount !== 0)) ?
            this._totalFundingAmount / this._federalActionOblicationAmount :
            null;
    },
    get totalFundingAmount() {
        return isNumber(this._totalFundingAmount) ? formatMoney(this._totalFundingAmount) : '--';
    },
    get percentOfTotal() {
        return isNumber(this._totalFundingAmount) && (isNumber(this._federalActionOblicationAmount) && this._federalActionOblicationAmount !== 0) ?
            calculateTreemapPercentage(this._totalFundingAmount, this._federalActionOblicationAmount) :
            '--';
    },
    get cfdaTitleShort() {
        return this.cfdaTitle.length >= 42 ? truncate(this.cfdaTitle, { length: 42 }) : this.cfdaTitle;
    }
};

export default BaseCFDA;
