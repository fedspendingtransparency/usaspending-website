/**
 * BaseIdv.js
 * Created by Lizzie Salita 12/3/18
 */

import CoreLocation from 'models/v2/CoreLocation';
import CoreAward from './CoreAward';
import CoreAwardAgency from './CoreAwardAgency';
import CorePeriodOfPerformance from "./CorePeriodOfPerformance";
import CoreExecutiveDetails from '../awardsV2/CoreExecutiveDetails';
import BaseIdvAdditionalDetails from './additionalDetails/BaseContractAdditionalDetails';
import BaseAwardRecipient from './BaseAwardRecipient';
import BaseParentAwardDetails from './BaseParentAwardDetails';


const BaseIdv = Object.create(CoreAward);

BaseIdv.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.piid,
        generatedId: data.generated_unique_award_id,
        type: data.type,
        typeDescription: data.type_description,
        description: data.description,
        category: data.category,
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count
    };

    this.populateCore(coreData);

    this.parentAward = data.parent_award_piid || '';
    this.parentId = data.parent_generated_unique_award_id || '';

    if (data.parent_award) {
        const parentAwardDetails = Object.create(BaseParentAwardDetails);
        parentAwardDetails.populateCore(data.parent_award);
        this.parentAwardDetails = parentAwardDetails;
    }

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

    if (data.idv_dates) {
        const periodOfPerformanceData = {
            startDate: data.idv_dates.start_date,
            endDate: data.idv_dates.end_date,
            lastModifiedDate: data.idv_dates.last_modified_date
        };
        const periodOfPerformance = Object.create(CorePeriodOfPerformance);
        periodOfPerformance.populateCore(periodOfPerformanceData);
        this.dates = periodOfPerformance;
    }

    if (data.funding_agency) {
        const fundingAgencyData = {
            toptierName: data.funding_agency.toptier_agency.name,
            toptierAbbr: data.funding_agency.toptier_agency.abbreviation,
            subtierName: data.funding_agency.subtier_agency.name,
            subtierAbbr: data.funding_agency.subtier_agency.abbreviation,
            officeName: data.funding_agency.office_agency_name
        };
        const fundingAgency = Object.create(CoreAwardAgency);
        fundingAgency.populateCore(fundingAgencyData);
        this.fundingAgency = fundingAgency;
    }

    if (data.awarding_agency) {
        const awardingAgencyData = {
            id: data.awarding_agency.id,
            toptierName: data.awarding_agency.toptier_agency.name,
            toptierAbbr: data.awarding_agency.toptier_agency.abbreviation,
            subtierName: data.awarding_agency.subtier_agency.name,
            subtierAbbr: data.awarding_agency.subtier_agency.abbreviation,
            officeName: data.awarding_agency.office_agency_name
        };
        const awardingAgency = Object.create(CoreAwardAgency);
        awardingAgency.populateCore(awardingAgencyData);
        this.awardingAgency = awardingAgency;
    }
    else {
        this.awardingAgency = {};
    }

    if (data.latest_transaction_contract_data) {
        const additionalDetails = Object.create(BaseIdvAdditionalDetails);
        additionalDetails.populate(data.latest_transaction_contract_data);
        this.additionalDetails = additionalDetails;
    }

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;
};

export default BaseIdv;
