/**
 * BaseFinancialAssistance.js
 * Created by Lizzie Salita 3/5/18
 */

import { formatMoney } from 'helpers/moneyFormatter';
import CoreLocation from 'models/CoreLocation';
import BaseAwardRecipient from './BaseAwardRecipient';
import CoreAwardAgency from './CoreAwardAgency';
import CoreAward from './CoreAward';

const BaseFinancialAssistance = Object.create(CoreAward);

BaseFinancialAssistance.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.fain || data.uri,
        internalId: data.id,
        category: data.category,
        startDate: data.period_of_performance_start_date,
        endDate: data.period_of_performance_current_end_date,
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count
    };
    this.populateCore(coreData);

    const recipient = Object.create(BaseAwardRecipient);
    recipient.populate(data.recipient);
    this.recipient = recipient;

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

    const awardingAgency = Object.create(CoreAwardAgency);
    this.awardingAgency = awardingAgency;
    if (data.awarding_agency) {
        const awardingAgencyData = {
            name: data.awarding_agency.toptier_agency && data.awarding_agency.toptier_agency.name,
            subtierName: data.awarding_agency.subtier_agency && data.awarding_agency.subtier_agency.name,
            officeName: data.latest_transaction && data.latest_transaction.assistance_data
                && data.latest_transaction.assistance_data.awarding_office_name
        };
        awardingAgency.populateCore(awardingAgencyData);
    }

    const fundingAgency = Object.create(CoreAwardAgency);
    this.fundingAgency = fundingAgency;
    if (data.funding_agency) {
        const fundingAgencyData = {
            name: data.funding_agency.toptier_agency && data.funding_agency.toptier_agency.name,
            subtierName: data.funding_agency.subtier_agency && data.funding_agency.subtier_agency.name,
            officeName: data.latest_transaction && data.latest_transaction.assistance_data
                && data.latest_transaction.assistance_data.funding_office_name
        };
        fundingAgency.populateCore(fundingAgencyData);
    }

    this.description = data.description || '--';
    this.typeDescription = data.type_description || '--';

    this._cfdaNumber = (data.latest_transaction && data.latest_transaction.assistance_data
            && data.latest_transaction.assistance_data.cfda_number) || '';
    this._cfdaTitle = (data.latest_transaction && data.latest_transaction.assistance_data
            && data.latest_transaction.assistance_data.cfda_title) || '';
    this.cfdaProgramDescription = (data.latest_transaction && data.latest_transaction.assistance_data
            && data.latest_transaction.assistance_data.cfda_objectives) || '--';

    // populate the financial assistance-specific fields
    this._obligation = parseFloat(data.total_obligation) || 0;
    this._faceValue = parseFloat(data.total_loan_value) || 0;
    this._subsidy = parseFloat(data.total_subsidy_cost) || 0;
};

// getter functions
Object.defineProperty(BaseFinancialAssistance, 'obligation', {
    get() {
        return formatMoney(this._obligation);
    }
});
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
Object.defineProperty(BaseFinancialAssistance, 'cfdaProgram', {
    get() {
        if (this._cfdaNumber && this._cfdaTitle) {
            return `${this._cfdaNumber} - ${this._cfdaTitle}`;
        }
        else if (this._cfdaNumber || this._cfdaTitle) {
            return `${this._cfdaNumber}${this._cfdaTitle}`;
        }
        return '--';
    }
});

export default BaseFinancialAssistance;
