/**
 * BaseFinancialAssistance.js
 * Created by David Trinh 10/9/18
 */

import CoreLocation from 'models/v2/CoreLocation';

import BaseAwardRecipient from './BaseAwardRecipient';
import CoreAwardAgency from './CoreAwardAgency';
import CoreAward from './CoreAward';
import BaseCFDA from './BaseCFDA';
import CorePeriodOfPerformance from './CorePeriodOfPerformance';
import CoreExecutiveDetails from '../award/CoreExecutiveDetails';

const BaseFinancialAssistance = Object.create(CoreAward);
export const emptyCfda = {
    total_funding_amount: -Infinity,
    cfdaTitle: '',
    cfdaNumber: ''
};

const getLargestCfda = (acc, cfdaItem) => {
    if (cfdaItem.total_funding_amount > acc.total_funding_amount) {
        const newCFDA = new BaseCFDA(cfdaItem);
        return newCFDA;
    }
    return acc;
};

BaseFinancialAssistance.populate = function populate(data) {
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
        baseExercisedOptions: data.base_exercised_options,
        dateSigned: data.date_signed,
        fileC: {
            obligations: data.account_obligations_by_defc,
            outlays: data.account_outlays_by_defc
        }
    };
    this.populateCore(coreData);
    if (data.cfda_info && data.cfda_info.length) {
        this.cfdas = data.cfda_info.map((cfda) => {
            const newCFDA = new BaseCFDA(cfda, data.total_obligation);
            return newCFDA;
        });
    }
    if (data.recipient) {
        const recipient = Object.create(BaseAwardRecipient);
        recipient.populate(data.recipient);
        this.recipient = recipient;
    }
    if (data.place_of_performance) {
        const placeOfPerformanceData = {
            city: data.place_of_performance.city_name,
            countyCode: data.place_of_performance.county_code,
            county: data.place_of_performance.county_name,
            stateCode: data.place_of_performance.state_code,
            state: data.place_of_performance.state_name || data.place_of_performance.state_code,
            province: data.place_of_performance.foreign_province,
            foreignPostalCode: data.foreign_postal_code,
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
            lastModifiedDate: data.period_of_performance.last_modified_date
        };
        const periodOfPerformance = Object.create(CorePeriodOfPerformance);
        periodOfPerformance.populateCore(periodOfPerformanceData);
        this.periodOfPerformance = periodOfPerformance;
    }

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
        const awardingAgency = Object.create(CoreAwardAgency);
        awardingAgency.populateCore(awardingAgencyData);
        this.awardingAgency = awardingAgency;
    }
    else {
        this.awardingAgency = {};
    }

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
        const fundingAgency = Object.create(CoreAwardAgency);
        fundingAgency.populateCore(fundingAgencyData);
        this.fundingAgency = fundingAgency;
    }
    else {
        this.fundingAgency = {};
    }

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;

    // populate the financial assistance-specific fields
    this._faceValue = parseFloat(data.total_loan_value) || 0;
    this._subsidy = parseFloat(data.total_subsidy_cost) || 0;
    this._baseAllOptions = parseFloat(data.base_and_all_options) || 0;
    this._federalObligation = parseFloat(data.transaction_obligated_amount) || 0;
    this._nonFederalFunding = parseFloat(data.non_federal_funding) || 0;
    this._totalFunding = parseFloat(data.total_funding) || 0;
    this.fain = data.fain;
    this.uri = data.uri;
    this.biggestCfda = data.cfda_info.reduce(getLargestCfda, emptyCfda);
    this.cfdaList = data.cfda_info;
    this.recordType = data.record_type;
};

Object.defineProperty(BaseFinancialAssistance, 'cfdaProgram', {
    get() {
        if (this.biggestCfda.cfdaNumber && this.biggestCfda.cfdaTitle) {
            return `${this.biggestCfda.cfdaNumber} - ${this.biggestCfda.cfdaTitle}`;
        }
        else if (this.biggestCfda.cfdaNumber || this.biggestCfda.cfdaTitle) {
            return `${this.biggestCfda.cfdaNumber}${this.biggestCfda.cfdaTitle}`;
        }
        return '--';
    }
});

export default BaseFinancialAssistance;
