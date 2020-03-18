/**
 * BaseCFDA.js
 * Created by Jonathan Hill 03/17/20
 */

import { calculateTreemapPercentage, formatMoney } from 'helpers/moneyFormatter';

const BaseCFDA = {
    populate(data) {
        this.samWebsite = data.sam_website || '';
        this.cfdaWebsite = data.cfda_website || '';
        this.cfdaFederalAgency = data.cfda_federal_agency || '';
        this.cfdaNumber = data.cfda_number || '';
        this.cfdaTitle = data.cfda_title || '';
        this.applicantEligibility = data.applicant_eligibility || '';
        this.beneficiaryEligibility = data.beneficiary_eligibility || '';
        this.cfdaObjectives = data.cfda_objectives || '';
        this._totalFundingAmount = data.total_funding_amount || '';
        this._federalActionOblicationAmount = data.federal_action_obligation_amount || '';
        this._percentOfTotal = !isNaN(this._totalFundingAmount) && !isNaN(this._federalActionOblicationAmount) ?
            this._totalFundingAmount / this._federalActionOblicationAmount :
            null;
    },
    get totalFundingAmount() {
        return !isNaN(this._totalFundingAmount) ? formatMoney(this._totalFundingAmount) : '--';
    },
    get percentOfTotal() {
        return !isNaN(this._totalFundingAmount) && !isNaN(this._federalActionOblicationAmount) ?
            calculateTreemapPercentage(this._totalFundingAmount, this._federalActionOblicationAmount) :
            '--';
    }
};

export default BaseCFDA;
