/**
 * BaseContract.js
 * Created by David Trinh 10/9/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';
import BaseAwardRecipient from './BaseAwardRecipient';
import BaseParentAwardDetails from './BaseParentAwardDetails';
import CoreAwardAgency from './CoreAwardAgency';
import BaseContractAdditionalDetails from './additionalDetails/BaseContractAdditionalDetails';
import CoreAward from './CoreAward';
import CoreExecutiveDetails from '../awardsV2/CoreExecutiveDetails';
import CorePeriodOfPerformance from '../awardsV2/CorePeriodOfPerformance';

const BaseContract = Object.create(CoreAward);

BaseContract.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        generatedId: data.generated_unique_award_id,
        type: data.type,
        typeDescription: data.type_description,
        description: data.description,
        category: data.category,
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count,
        totalObligation: data.total_obligation,
        baseExercisedOptions: data.base_exercised_options,
        dateSigned: data.date_signed,
        baseAndAllOptions: data.base_and_all_options
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
            state: data.place_of_performance.state_code,
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

    if (data.period_of_performance) {
        const periodOfPerformanceData = {
            startDate: data.period_of_performance.start_date,
            endDate: data.period_of_performance.end_date,
            lastModifiedDate: data.period_of_performance.last_modified_date,
            potentialEndDate: data.period_of_performance.potential_end_date
        };
        const periodOfPerformance = Object.create(CorePeriodOfPerformance);
        periodOfPerformance.populateCore(periodOfPerformanceData);
        this.periodOfPerformance = periodOfPerformance;
    }

    if (data.awarding_agency) {
        const awardingAgencyData = {
            id: data.awarding_agency.id,
            toptierName: data.awarding_agency.toptier_agency.name,
            toptierAbbr: data.awarding_agency.toptier_agency.abbreviation,
            toptierId: data.awarding_agency.toptier_agency.id,
            subtierName: data.awarding_agency.subtier_agency.name,
            subtierAbbr: data.awarding_agency.subtier_agency.abbreviation,
            subtierId: data.awarding_agency.subtier_agency.id,
            officeName: data.awarding_agency.office_agency_name,
            officeId: data.awarding_agency.office_agency_id
        };
        const awardingAgency = Object.create(CoreAwardAgency);
        awardingAgency.populateCore(awardingAgencyData);
        this.awardingAgency = awardingAgency;
    }
    else {
        this.awardingAgency = {};
    }

    if (data.funding_agency) {
        const fundingAgencyData = {
            toptierName: data.funding_agency.toptier_agency.name,
            toptierAbbr: data.funding_agency.toptier_agency.abbreviation,
            toptierId: data.funding_agency.toptier_agency.id,
            subtierName: data.funding_agency.subtier_agency.name,
            subtierAbbr: data.funding_agency.subtier_agency.abbreviation,
            subtierId: data.funding_agency.subtier_agency.id,
            officeName: data.funding_agency.office_agency_name,
            officeId: data.funding_agency.office_agency_id
        };
        const fundingAgency = Object.create(CoreAwardAgency);
        fundingAgency.populateCore(fundingAgencyData);
        this.fundingAgency = fundingAgency;
    }
    else {
        this.fundingAgency = {};
    }

    if (data.latest_transaction_contract_data) {
        const additionalDetails = Object.create(BaseContractAdditionalDetails);
        additionalDetails.populate(data.latest_transaction_contract_data);
        this.additionalDetails = additionalDetails;
    }

    const parentAwardDetails = Object.create(BaseParentAwardDetails);
    if (data.parent_award) {
        parentAwardDetails.populateCore(data.parent_award);
    }
    this.parentAwardDetails = parentAwardDetails;

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;

    this.parentAward = data.parent_award_piid || '--';
    this.pricing = data.latest_transaction_contract_data || '--';

    this._amount = parseFloat(data.base_and_all_options) || 0;
};


// getter functions
Object.defineProperty(BaseContract, 'amount', {
    get() {
        if (this._obligation >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._amount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._amount / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._amount, 0);
    }
});
Object.defineProperty(BaseContract, 'amountFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._amount);
    }
});
Object.defineProperty(BaseContract, 'remaining', {
    get() {
        const remaining = this._amount - this._obligation;
        if (remaining >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(remaining);
            return `${MoneyFormatter.formatMoneyWithPrecision(remaining / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(remaining, 0);
    }
});

export default BaseContract;
