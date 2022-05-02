/**
 * BaseIdv.js
 * Created by Lizzie Salita 12/3/18
 */

import * as pscHelper from 'helpers/pscHelper';
import CoreLocation from 'models/v2/CoreLocation';
import CoreAward from './CoreAward';
import CoreAwardAgency from './CoreAwardAgency';
import CorePeriodOfPerformance from "./CorePeriodOfPerformance";
import CoreExecutiveDetails from '../award/CoreExecutiveDetails';
import BaseIdvAdditionalDetails from './additionalDetails/BaseContractAdditionalDetails';
import BaseAwardRecipient from './BaseAwardRecipient';
import BaseParentAwardDetails from './BaseParentAwardDetails';

const BaseIdv = Object.create(CoreAward);

BaseIdv.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.id,
        generatedId: data.generated_unique_award_id,
        type: data.type,
        typeDescription: data.type_description,
        description: data.description,
        category: data.category,
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count,
        totalObligation: data.total_obligation,
        totalOutlay: data.total_outlay,
        childAwardTotalOutlay: data.child_award_total_outlay,
        grandChildAwardTotalOutlay: data.grandchild_award_total_outlay,
        baseExercisedOptions: data.base_exercised_options,
        baseAndAllOptions: data.base_and_all_options,
        dateSigned: data.date_signed,
        naics: data.naics_hierarchy || pscHelper.emptyHierarchy,
        psc: Object.entries(data.psc_hierarchy).reduce(pscHelper.deducePscType, pscHelper.emptyHierarchy),
        fileC: {
            obligations: data.account_obligations_by_defc,
            outlays: data.account_outlays_by_defc
        }
    };

    this.populateCore(coreData);

    const parentAwardDetails = Object.create(BaseParentAwardDetails);
    if (data.parent_award) {
        parentAwardDetails.populateCore(data.parent_award || {});
    }
    this.parentAwardDetails = parentAwardDetails;
    const recipient = Object.create(BaseAwardRecipient);
    if (data.recipient) {
        recipient.populate(data.recipient);
    }
    this.recipient = recipient;

    const placeOfPerformance = Object.create(CoreLocation);
    if (data.place_of_performance) {
        const placeOfPerformanceData = {
            address1: data.place_of_performance.address_line1,
            address2: data.place_of_performance.address_line2,
            address3: data.place_of_performance.address_line3,
            province: data.place_of_performance.foreign_province,
            city: data.place_of_performance.city_name,
            county: data.place_of_performance.county_name,
            stateCode: data.place_of_performance.state_code,
            state: data.place_of_performance.state_code,
            zip5: data.place_of_performance.zip5,
            zip4: data.place_of_performance.zip4,
            foreignPostalCode: data.place_of_performance.foreign_postal_code,
            congressionalDistrict: data.place_of_performance.congressional_code,
            country: data.place_of_performance.country_name,
            countryCode: data.place_of_performance.location_country_code
        };
        placeOfPerformance.populateCore(placeOfPerformanceData);
    }
    this.placeOfPerformance = placeOfPerformance;

    const periodOfPerformance = Object.create(CorePeriodOfPerformance);
    if (data.period_of_performance) {
        const periodOfPerformanceData = {
            startDate: data.period_of_performance.start_date,
            endDate: data.period_of_performance.end_date,
            lastModifiedDate: data.period_of_performance.last_modified_date
        };
        periodOfPerformance.populateCore(periodOfPerformanceData);
    }
    this.dates = periodOfPerformance;

    const fundingAgency = Object.create(CoreAwardAgency);
    if (data.funding_agency) {
        const fundingAgencyData = {
            id: data.funding_agency.id,
            hasAgencyPage: data.funding_agency.has_agency_page,
            toptierName: data.funding_agency.toptier_agency.name,
            toptierAbbr: data.funding_agency.toptier_agency.abbreviation || '',
            subtierName: data.funding_agency.subtier_agency.name,
            subtierAbbr: data.funding_agency.subtier_agency.abbreviation || '',
            officeName: data.funding_agency.office_agency_name,
            agencySlug: data.funding_agency.toptier_agency.slug
        };
        fundingAgency.populateCore(fundingAgencyData);
    }
    this.fundingAgency = fundingAgency;

    const awardingAgency = Object.create(CoreAwardAgency);
    if (data.awarding_agency) {
        const awardingAgencyData = {
            id: data.awarding_agency.id,
            hasAgencyPage: data.awarding_agency.has_agency_page,
            toptierName: data.awarding_agency.toptier_agency.name,
            toptierAbbr: data.awarding_agency.toptier_agency.abbreviation || '',
            subtierName: data.awarding_agency.subtier_agency.name,
            subtierAbbr: data.awarding_agency.subtier_agency.abbreviation || '',
            officeName: data.awarding_agency.office_agency_name,
            agencySlug: data.awarding_agency.toptier_agency.slug
        };
        awardingAgency.populateCore(awardingAgencyData);
    }
    this.awardingAgency = awardingAgency;

    const additionalDetails = Object.create(BaseIdvAdditionalDetails);
    if (data.latest_transaction_contract_data) {
        additionalDetails.populate(data.latest_transaction_contract_data);
    }
    this.additionalDetails = additionalDetails;

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;
    this.piid = data.piid || '';
};

export default BaseIdv;
