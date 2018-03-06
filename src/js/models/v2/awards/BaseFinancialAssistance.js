/**
 * BaseFinancialAssistance. js
 * Created by Lizzie Salita 3/5/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import BaseAwardRecipient from './BaseAwardRecipient';
import BaseAwardPlaceOfPerformance from './BaseAwardPlaceOfPerformance';
import BaseAwardAgency from './BaseAwardAgency';
import CoreAward from './CoreAward';

const BaseFinancialAssistance = Object.create(CoreAward);

BaseFinancialAssistance. populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        internalId: data.id,
        category: data.category,
        startDate: data.period_of_performance_start_date,
        endDate: data.period_of_performance_current_end_date
    };
    this.populateCore(coreData);

    const recipient = Object.create(BaseAwardRecipient);
    recipient.populate(data.recipient);
    this.recipient = recipient;

    const placeOfPerformance = Object.create(BaseAwardPlaceOfPerformance);
    placeOfPerformance.populate(data.place_of_performance);
    this.placeOfPerformance = placeOfPerformance;

    if(data.awarding_agency) {
        const awardingAgency = Object.create(BaseAwardAgency);
        awardingAgency.populate(data.awarding_agency);
        this.awardingAgency = awardingAgency;
    }

    if(data.funding_agency) {
        const fundingAgency = Object.create(BaseAwardAgency);
        fundingAgency.populate(data.funding_agency);
        this.fundingAgency = fundingAgency;
    }

    // populate the financial assistance-specific fields
    this._faceValue = parseFloat(data.latest_transaction.assistance_data.face_value_loan_guarantee) || 0;
    this._subsidy = parseFloat(data.total_subsidy_cost) || 0;

};


// getter functions
Object.defineProperty(BaseFinancialAssistance, 'faceValue', {
    get() {
        return formatMoney(this._faceValue);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'subsidy', {
    get() {
        return formatMoney(this._subsidy);
    }
});

export default BaseFinancialAssistance; 
