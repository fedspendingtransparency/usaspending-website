/**
 * BaseContract.js
 * Created by Kevin Li 2/22/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';
import BaseAwardRecipient from './BaseAwardRecipient';
import CoreAwardAgency from './CoreAwardAgency';
import BaseContractAdditionalDetails from './additionalDetails/BaseContractAdditionalDetails';
import CoreAward from './CoreAward';

const BaseContract = Object.create(CoreAward);

BaseContract.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        internalId: data.id,
        category: data.category,
        startDate: data.period_of_performance_start_date,
        endDate: data.period_of_performance_current_end_date
            || ((data.latest_transaction && data.latest_transaction.contract_data)
                && data.latest_transaction.contract_data.ordering_period_end_date),
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count
    };
    this.populateCore(coreData);

    if (data.recipient) {
        const recipient = Object.create(BaseAwardRecipient);
        recipient.populate(data.recipient);
        this.recipient = recipient;
    }

    if (data.place_of_performance) {
        const placeOfPerformanceData = {
            city: data.place_of_performance.city_name,
            county: data.place_of_performance.county_name,
            stateCode: data.place_of_performance.state_code,
            state: data.place_of_performance.state_name || data.place_of_performance.state_code,
            province: data.place_of_performance.foreign_province,
            zip5: data.place_of_performance.zip5,
            zip4: data.place_of_performance.zip4,
            congressionalDistrict: data.place_of_performance.congressional_code,
            country: data.place_of_performance.country_name,
            countryCode: data.place_of_performance.location_country_code
        };
        const placeOfPerformance = Object.create(CoreLocation);
        placeOfPerformance.populateCore(placeOfPerformanceData);
        this.placeOfPerformance = placeOfPerformance;
    }

    const awardingAgency = Object.create(CoreAwardAgency);
    this.awardingAgency = awardingAgency;
    if (data.awarding_agency) {
        const awardingAgencyData = {
            name: data.awarding_agency.toptier_agency && data.awarding_agency.toptier_agency.name,
            subtierName: data.awarding_agency.subtier_agency && data.awarding_agency.subtier_agency.name,
            officeName: data.latest_transaction && data.latest_transaction.contract_data
                && data.latest_transaction.contract_data.awarding_office_name
        };
        awardingAgency.populateCore(awardingAgencyData);
    }

    const fundingAgency = Object.create(CoreAwardAgency);
    this.fundingAgency = fundingAgency;
    if (data.funding_agency) {
        const fundingAgencyData = {
            name: data.funding_agency.toptier_agency && data.funding_agency.toptier_agency.name,
            subtierName: data.funding_agency.subtier_agency && data.funding_agency.subtier_agency.name,
            officeName: data.latest_transaction && data.latest_transaction.contract_data
                && data.latest_transaction.contract_data.funding_office_name
        };
        fundingAgency.populateCore(fundingAgencyData);
    }

    if (data.latest_transaction && data.latest_transaction.contract_data) {
        const additionalDetails = Object.create(BaseContractAdditionalDetails);
        additionalDetails.populate(data.latest_transaction.contract_data);
        this.additionalDetails = additionalDetails;
    }

    this.description = data.description || '--';
    this.pricing = (data.latest_transaction && data.latest_transaction.contract_data
            && data.latest_transaction.contract_data.type_of_contract_pric_desc) || '--';

    this._contractType = (data.latest_transaction && data.latest_transaction.contract_data
            && data.latest_transaction.contract_data.contract_award_type_desc) || '--';
    this._idvType = (data.latest_transaction && data.latest_transaction.contract_data
            && data.latest_transaction.contract_data.idv_type) || '--';

    this._amount = parseFloat(data.base_and_all_options_value) || 0;
    this._ceiling = parseFloat(data.base_and_all_options_value) || 0;
    this._obligation = parseFloat(data.total_obligation) || 0;
};


// getter functions
Object.defineProperty(BaseContract, 'amount', {
    get() {
        return formatMoney(this._amount);
    }
});
Object.defineProperty(BaseContract, 'ceiling', {
    get() {
        return formatMoney(this._ceiling);
    }
});
Object.defineProperty(BaseContract, 'obligation', {
    get() {
        return formatMoney(this._obligation);
    }
});
Object.defineProperty(BaseContract, 'awardType', {
    get() {
        if (this.category === 'idv') {
            return this._idvType;
        }
        return this._contractType;
    }
});

export default BaseContract;
