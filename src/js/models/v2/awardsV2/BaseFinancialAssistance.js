/**
 * BaseFinancialAssistance.js
 * Created by David Trinh 10/9/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';
import BaseAwardRecipient from './BaseAwardRecipient';
import CoreAwardAgency from './CoreAwardAgency';
import CoreAward from './CoreAward';
import CorePeriodOfPerformance from './CorePeriodOfPerformance';
import CoreExecutiveDetails from '../awardsV2/CoreExecutiveDetails';

const BaseFinancialAssistance = Object.create(CoreAward);

BaseFinancialAssistance.populate = function populate(data) {
    // reformat some fields that are required by the CoreAward
    const coreData = {
        id: data.fain || data.uri,
        generatedId: data.generated_unique_award_id,
        type: data.type,
        typeDescription: data.type_description,
        description: data.description,
        category: data.category,
        subawardTotal: data.total_subaward_amount,
        subawardCount: data.subaward_count,
        totalObligation: data.total_obligation,
        baseExercisedOptions: data.base_exercised_options,
        dateSigned: data.date_signed
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
    if (data.period_of_performance) {
        const periodOfPerformanceData = {
            startDate: data.period_of_performance.start_date,
            endDate: data.period_of_performance.end_date
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

    const executiveDetails = Object.create(CoreExecutiveDetails);
    executiveDetails.populateCore(data.executive_details);
    this.executiveDetails = executiveDetails;

    // populate the financial assistance-specific fields
    this._cfdaNumber = data.cfda_number || '';
    this._cfdaTitle = data.cfda_title || '';
    this.cfdaProgramDescription = data.cfda_objectives || '--';
    this._faceValue = parseFloat(data.total_loan_value) || 0;
    this._subsidy = parseFloat(data.total_subsidy_cost) || 0;
    this._baseAllOptions = parseFloat(data.base_and_all_options) || 0;
    this._federalObligation = parseFloat(data.transaction_obligated_amount) || 0;
    this._nonFederalFunding = parseFloat(data.non_federal_funding) || 0;
    this._totalFunding = parseFloat(data.total_funding) || 0;
};

// getter functions
Object.defineProperty(BaseFinancialAssistance, 'faceValue', {
    get() {
        if (this._faceValue >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._faceValue);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._faceValue / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._faceValue, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'faceValueFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._faceValue);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'subsidy', {
    get() {
        if (this._subsidy >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subsidy);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subsidy / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._subsidy, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'subsidyFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._subsidy);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'baseAllOptions', {
    get() {
        if (this._baseAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAllOptions / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._baseAllOptions, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'baseAllOptionsFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._baseAllOptions);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'federalObligation', {
    get() {
        if (this._federalObligation >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._federalObligation);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._federalObligation / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._federalObligation, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'federalObligationFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._federalObligation);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'nonFederalFunding', {
    get() {
        if (this._nonFederalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._nonFederalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'nonFederalFundingFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._nonFederalFunding);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'totalFunding', {
    get() {
        if (this._totalFunding >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalFunding);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalFunding / units.unit, 2)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._totalFunding, 0);
    }
});
Object.defineProperty(BaseFinancialAssistance, 'totalFundingFormatted', {
    get() {
        return MoneyFormatter.formatMoney(this._totalFunding);
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
