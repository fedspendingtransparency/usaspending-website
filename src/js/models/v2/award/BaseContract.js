/**
 * BaseContract.js
 * Created by David Trinh 10/9/18
 */
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as pscHelper from 'helpers/pscHelper';
import CoreLocation from 'models/v2/CoreLocation';

import BaseAwardRecipient from './BaseAwardRecipient';
import BaseParentAwardDetails from './BaseParentAwardDetails';
import CoreAwardAgency from './CoreAwardAgency';
import BaseContractAdditionalDetails from './additionalDetails/BaseContractAdditionalDetails';
import CoreAward from './CoreAward';
import CoreExecutiveDetails from './CoreExecutiveDetails';
import CorePeriodOfPerformance from './CorePeriodOfPerformance';


const BaseContract = Object.create(CoreAward);

BaseContract.populate = function populate(data) {
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
        baseAndAllOptions: data.base_and_all_options,
        naics: data.naics_hierarchy,
        psc: data.psc_hierarchy ? Object.entries(data.psc_hierarchy).reduce(pscHelper.deducePscType, pscHelper.emptyHierarchy) : {},
        fileC: {
            obligations: data.account_obligations_by_defc,
            outlays: data.account_outlays_by_defc
        }
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

    if (data.latest_transaction_contract_data) {
        const additionalDetails = Object.create(BaseContractAdditionalDetails);
        additionalDetails.populate(data.latest_transaction_contract_data);
        this.additionalDetails = additionalDetails;
    }

    const parentAwardDetails = Object.create(BaseParentAwardDetails);
    parentAwardDetails.populateCore(data.parent_award || {});
    this.parentAwardDetails = parentAwardDetails;

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;

    this.pricing = data.latest_transaction_contract_data || '--';
    this._amount = parseFloat(data.base_and_all_options) || 0;
    this.piid = data.piid || '';
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
