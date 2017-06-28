/**
  * AwardSummary.js
  * Created by Kevin Li 11/28/16
  **/

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

import GenericRecord from '../GenericRecord';

const recordType = 'award';
const fields = [
    'id',
    'award_id',
    'recipient_name',
    'description',
    'date_signed',
    'period_of_performance_start_date',
    'period_of_performance_current_end_date',
    'award_type',
    'internal_general_type',
    'type',
    'type_description',
    'awarding_agency_name',
    'awarding_subtier_name',
    'awarding_office_name',
    'funding_agency_name',
    'funding_subtier_name',
    'funding_office_name',
    'recipient_address_line1',
    'recipient_address_line2',
    'recipient_address_line3',
    'recipient_city',
    'recipient_county',
    'recipient_state_province',
    'recipient_province',
    'recipient_state_code',
    'recipient_zip_postal',
    'recipient_country',
    'recipient_country_code',
    'pop_city',
    'parent_id',
    'pop_state_province',
    'pop_state',
    'pop_province',
    'pop_zip',
    'pop_country',
    'pop_country_code',
    'total_obligation',
    'potential_total_value_of_award',
    'recipient_duns',
    'recipient_parent_duns',
    'recipient_business_type',
    'type_of_contract_pricing',
    'type_of_contract_pricing_description',
    'latest_transaction',
    'assistance_data',
    'face_value_loan_guarantee',
    'total_loan_amount',
    'original_loan_subsidy_cost',
    'subaward_count',
    'total_subaward_amount',
    'action_date',
    'recipient_congressional_district',
    'recipient_phone',
    'recipient_fax',
    'pop_congressional_district',
    'pop_county',
    'pop_state_code',
    'contract_parent_id',
    'contract_idv_type',
    'contract_idc_type',
    'contract_idv_agency_id',
    'contract_multiple_idv',
    'contract_solicitation_id',
    'contract_solicitation_procedures',
    'contract_number_offers',
    'contract_extent_competed',
    'contract_set_aside_type',
    'contract_commercial_acquisition_procedures',
    'contract_commercial_test_program',
    'contract_evaluated_preference',
    'contract_fed_biz_opps',
    'contract_small_business_competitiveness_demo',
    'contract_psc_code',
    'contract_naics_code',
    'contract_naics_description',
    'contract_dod_claimant_code',
    'contract_program_system_or_equipment_code',
    'contract_it_commercial_category',
    'contract_sea_transport',
    'contract_clinger_cohen_act',
    'contract_davis_bacon_act',
    'contract_service_contract_act',
    'contract_walsh_healey_act',
    'contract_consolidated',
    'contract_cost_or_pricing_data',
    'contract_domestic_or_foreign',
    'contract_fair_opportunity_limited_sources',
    'contract_foreign_funding',
    'contract_interagency_contacting_authority',
    'contract_major_program',
    'contract_multi_year_contract',
    'contract_price_evaluation_adjustment_preference',
    'contract_program_acronym',
    'contract_purchase_card_as_payment_method',
    'contract_subcontracting_plan'
];

const remapData = (data, idField) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    let id = 0;
    let parentId = 0;
    let awardType = '';
    let internalGeneralType = 'unknown';
    let actionDate = '';
    let awardTypeDescription = '';
    let awardDescription = '';
    let awardingAgencyName = '';
    let awardingSubtierName = '';
    let awardingOfficeName = '';
    let fundingAgencyName = '';
    let fundingSubtierName = '';
    let fundingOfficeName = '';
    let recipientName = '';
    let recipientAddressLine1 = '';
    let recipientAddressLine2 = '';
    let recipientAddressLine3 = '';
    let recipientCity = '';
    let recipientCounty = '';
    let recipientStateProvince = '';
    let recipientProvince = '';
    let recipientStateCode = '';
    let recipientZipPostal = '';
    let recipientCountry = '';
    let recipientCountryCode = '';
    let recipientDuns = '';
    let recipientParentDuns = '';
    let recipientBusinessType = '';
    let popCity = '';
    let popCounty = '';
    let popStateCode = '';
    let popStateProvince = '';
    let popState = '';
    let popProvince = '';
    let popZip = '';
    let popCongressionalDistrict = '';
    let popCountry = '';
    let popCountryCode = '';
    let contractPricingCode = '';
    let contractPricing = '';
    let latestTransaction = '';
    let assistanceData = '';
    let loanFaceValue = '';
    let loanSubsidy = '';
    let recipientCongressionalDistrict = '';
    let recipientPhone = '';
    let recipientFax = '';
    let contractParentId = '';
    let contractIdvType = '';
    let contractIdcType = '';
    let contractIdvAgencyId = '';
    let contractMultipleIdv = '';
    let contractSolicitationId = '';
    let contractSolicitationProcedures = '';
    let contractNumberOffers = '';
    let contractExtentCompeted = '';
    let contractSetAsideType = '';
    let contractCommercialAcquisitionProcedures = '';
    let contractCommercialTestProgram = '';
    let contractEvaluatedPreference = '';
    let contractFedBizOpps = '';
    let contractSmallBusinessCompetitivenessDemo = '';
    let contractPscCode = '';
    let contractNaicsCode = '';
    let contractNaicsDescription = '';
    let contractDodClaimantCode = '';
    let contractProgramSystemOrEquipmentCode = '';
    let contractItCommercialCategory = '';
    let contractSeaTransport = '';
    let contractClingerCohenAct = '';
    let contractDavisBaconAct = '';
    let contractServiceContractAct = '';
    let contractWalshHealeyAct = '';
    let contractConsolidated = '';
    let contractCostOrPricingData = '';
    let contractDomesticOrForeign = '';
    let contractFairOpportunityLimitedSources = '';
    let contractForeignFunding = '';
    let contractInteragencyContactingAuthority = '';
    let contractMajorProgram = '';
    let contractMultiYearContract = '';
    let contractPriceEvaluationAdjustmentPreference = '';
    let contractProgramAcronym = '';
    let contractPurchaseCardAsPaymentMethod = '';
    let contractSubcontractingPlan = '';

    if (data.id) {
        id = data.id;
    }

    if (data.parent_award) {
        parentId = data.parent_award;
    }

    if (data.type) {
        awardType = data.type;
        internalGeneralType = SummaryPageHelper.awardType(data.type);
    }

    if (data.type_description) {
        awardTypeDescription = data.type_description;
    }

    if (data.description) {
        awardDescription = data.description;
    }

    if (data.awarding_agency) {
        if (data.awarding_agency.toptier_agency) {
            awardingAgencyName = data.awarding_agency.toptier_agency.name;
        }
        if (data.awarding_agency.subtier_agency) {
            awardingSubtierName = data.awarding_agency.subtier_agency.name;
        }
        if (data.awarding_agency.office_agency) {
            awardingOfficeName = data.awarding_agency.office_agency.name;
        }
    }

    if (data.funding_agency) {
        if (data.funding_agency.toptier_agency) {
            fundingAgencyName = data.funding_agency.toptier_agency.name;
        }
        if (data.funding_agency.subtier_agency) {
            fundingSubtierName = data.funding_agency.subtier_agency.name;
        }
        if (data.funding_agency.office_agency) {
            fundingOfficeName = data.funding_agency.office_agency.name;
        }
    }

    if (data.place_of_performance) {
        if (data.place_of_performance.city_name) {
            popCity = data.place_of_performance.city_name;
        }

        if (popCity !== null && data.place_of_performance.state_code) {
            popStateProvince = data.place_of_performance.state_code;
        }
        else if (popCity === null && data.place_of_performance.state_name) {
            popStateProvince = data.place_of_performance.state_name;
        }
        else if (popCity === null && !data.place_of_performance.state_name) {
            popStateProvince = data.place_of_performance.state_code;
        }
        else if (data.place_of_performance.foreign_province) {
            popStateProvince = data.place_of_performance.foreign_province;
        }

        if (data.place_of_performance.state_name) {
            popState = data.place_of_performance.state_name;
        }
        else if (data.place_of_performance.state_code) {
            popState = data.place_of_performance.state_code;
        }

        if (data.place_of_performance.foreign_province) {
            popProvince = data.place_of_performance.foreign_province;
        }

        if (data.place_of_performance.zip5) {
            popZip = data.place_of_performance.zip5;
        }
        else if (data.place_of_performance.zip4) {
            popZip = data.place_of_performance.zip4.slice(0, 5);
        }

        if (data.place_of_performance.country_name) {
            popCountry = data.place_of_performance.country_name;
        }

        if (data.place_of_performance.location_country_code) {
            popCountryCode = data.place_of_performance.location_country_code;
        }

        if (data.place_of_performance.congressional_code) {
            popCongressionalDistrict = data.place_of_performance.congressional_code;
        }

        if (data.place_of_performance.county_name) {
            popCounty = data.place_of_performance.county_name;
        }
        if (data.place_of_performance.state_code) {
            popStateCode = data.place_of_performance.state_code;
        }
    }

    if (data.latest_transaction) {
        latestTransaction = data.latest_transaction;

        if (data.latest_transaction.contract_data) {
            if (data.latest_transaction.contract_data.type_of_contract_pricing) {
                contractPricingCode =
                data.latest_transaction.contract_data.type_of_contract_pricing;
            }
            if (data.latest_transaction.contract_data.type_of_contract_pricing_description) {
                contractPricing =
                data.latest_transaction.contract_data.type_of_contract_pricing_description;
            }
            if (data.latest_transaction.contract_data.parent_award_id) {
                contractParentId = data.latest_transaction.contract_data.parent_award_id;
            }
            if (data.latest_transaction.contract_data.idv_type) {
                contractIdvType = data.latest_transaction.contract_data.idv_type;
            }
            if (data.latest_transaction.contract_data.type_of_idc) {
                contractIdcType = data.latest_transaction.contract_data.type_of_idc;
            }
            if (data.latest_transaction.contract_data.referenced_idv_agency_identifier) {
                contractIdvAgencyId = data.latest_transaction.contract_data.referenced_idv_agency_identifier;
            }
            if (data.latest_transaction.contract_data.multiple_or_single_award_idv) {
                contractMultipleIdv = data.latest_transaction.contract_data.multiple_or_single_award_idv;
            }
            if (data.latest_transaction.contract_data.solicitation_identifier) {
                contractSolicitationId = data.latest_transaction.contract_data.solicitation_identifier;
            }
            if (data.latest_transaction.contract_data.solicitation_procedures) {
                contractSolicitationProcedures = data.latest_transaction.contract_data.solicitation_procedures;
            }
            if (data.latest_transaction.contract_data.number_of_offers_received) {
                contractNumberOffers = data.latest_transaction.contract_data.number_of_offers_received;
            }
            if (data.latest_transaction.contract_data.extent_competed_description) {
                contractExtentCompeted = data.latest_transaction.contract_data.extent_competed_description;
            }
            if (data.latest_transaction.contract_data.type_set_aside_description) {
                contractSetAsideType = data.latest_transaction.contract_data.type_set_aside_description;
            }
            if (data.latest_transaction.contract_data.commercial_item_acquisition_procedures_description) {
                contractCommercialAcquisitionProcedures = data.latest_transaction.contract_data.commercial_item_acquisition_procedures_description;
            }
            if (data.latest_transaction.contract_data.commercial_item_test_program) {
                contractCommercialTestProgram = data.latest_transaction.contract_data.commercial_item_test_program;
            }
            if (data.latest_transaction.contract_data.evaluated_preference_description) {
                contractEvaluatedPreference = data.latest_transaction.contract_data.evaluated_preference_description;
            }
            if (data.latest_transaction.contract_data.fed_biz_opps_description) {
                contractFedBizOpps = data.latest_transaction.contract_data.fed_biz_opps_description;
            }
            if (data.latest_transaction.contract_data.small_business_competitiveness_demonstration_program) {
                contractSmallBusinessCompetitivenessDemo = data.latest_transaction.contract_data.small_business_competitiveness_demonstration_program;
            }
            if (data.latest_transaction.contract_data.product_or_service_code) {
                contractPscCode = data.latest_transaction.contract_data.product_or_service_code;
            }
            if (data.latest_transaction.contract_data.naics) {
                contractNaicsCode = data.latest_transaction.contract_data.naics;
            }
            if (data.latest_transaction.contract_data.naics_description) {
                contractNaicsDescription = data.latest_transaction.contract_data.naics_description;
            }
            if (data.latest_transaction.contract_data.dod_claimant_program_code) {
                contractDodClaimantCode = data.latest_transaction.contract_data.dod_claimant_program_code;
            }
            if (data.latest_transaction.contract_data.program_system_or_equipment_code) {
                contractProgramSystemOrEquipmentCode = data.latest_transaction.contract_data.program_system_or_equipment_code;
            }
            if (data.latest_transaction.contract_data.information_technology_commercial_item_category_description) {
                contractItCommercialCategory = data.latest_transaction.contract_data.information_technology_commercial_item_category_description;
            }
            if (data.latest_transaction.contract_data.sea_transportation_description) {
                contractSeaTransport = data.latest_transaction.contract_data.sea_transportation_description;
            }
            if (data.latest_transaction.contract_data.clinger_cohen_act_planning) {
                contractClingerCohenAct = data.latest_transaction.contract_data.clinger_cohen_act_planning;
            }
            if (data.latest_transaction.contract_data.davis_bacon_act_description) {
                contractDavisBaconAct = data.latest_transaction.contract_data.davis_bacon_act_description;
            }
            if (data.latest_transaction.contract_data.service_contract_act_description) {
                contractServiceContractAct = data.latest_transaction.contract_data.service_contract_act_description;
            }
            if (data.latest_transaction.contract_data.walsh_healey_act) {
                contractWalshHealeyAct = data.latest_transaction.contract_data.walsh_healey_act;
            }
            if (data.latest_transaction.contract_data.consolidated_contract) {
                contractConsolidated = data.latest_transaction.contract_data.consolidated_contract;
            }
            if (data.latest_transaction.contract_data.cost_or_pricing_data_description) {
                contractCostOrPricingData = data.latest_transaction.contract_data.cost_or_pricing_data_description;
            }
            if (data.latest_transaction.contract_data.domestic_or_foreign_entity) {
                contractDomesticOrForeign = data.latest_transaction.contract_data.domestic_or_foreign_entity;
            }
            if (data.latest_transaction.contract_data.fair_opportunity_limited_sources_description) {
                contractFairOpportunityLimitedSources = data.latest_transaction.contract_data.fair_opportunity_limited_sources_description;
            }
            if (data.latest_transaction.contract_data.foreign_funding_description) {
                contractForeignFunding = data.latest_transaction.contract_data.foreign_funding_description;
            }
            if (data.latest_transaction.contract_data.interagency_contracting_authority_description) {
                contractInteragencyContactingAuthority = data.latest_transaction.contract_data.interagency_contracting_authority_description;
            }
            if (data.latest_transaction.contract_data.major_program) {
                contractMajorProgram = data.latest_transaction.contract_data.major_program;
            }
            if (data.latest_transaction.contract_data.multi_year_contract) {
                contractMultiYearContract = data.latest_transaction.contract_data.multi_year_contract;
            }
            if (data.latest_transaction.contract_data.price_evaluation_adjustment_preference_percent_difference) {
                contractPriceEvaluationAdjustmentPreference = data.latest_transaction.contract_data.price_evaluation_adjustment_preference_percent_difference;
            }
            if (data.latest_transaction.contract_data.program_acronym) {
                contractProgramAcronym = data.latest_transaction.contract_data.program_acronym;
            }
            if (data.latest_transaction.contract_data.purchase_card_as_payment_method) {
                contractPurchaseCardAsPaymentMethod = data.latest_transaction.contract_data.purchase_card_as_payment_method;
            }
            if (data.latest_transaction.contract_data.subcontracting_plan_description) {
                contractSubcontractingPlan = data.latest_transaction.contract_data.subcontracting_plan_description;
            }
        }

        if (data.latest_transaction.assistance_data) {
            assistanceData = data.latest_transaction.assistance_data;
            if (assistanceData.face_value_loan_guarantee) {
                loanFaceValue =
                    MoneyFormatter.formatMoney(assistanceData.face_value_loan_guarantee);
            }
            if (assistanceData.original_loan_subsidy_cost) {
                loanSubsidy =
                    MoneyFormatter.formatMoney(assistanceData.original_loan_subsidy_cost);
            }
        }

        if (data.latest_transaction.action_date) {
            actionDate = data.latest_transaction.action_date;
        }
    }

    remappedData.id = id;
    remappedData.parent_id = parentId;
    remappedData.award_type = awardType;
    remappedData.internal_general_type = internalGeneralType;
    remappedData.type_description = awardTypeDescription;
    remappedData.description = awardDescription;
    remappedData.awarding_agency_name = awardingAgencyName;
    remappedData.awarding_subtier_name = awardingSubtierName;
    remappedData.awarding_office_name = awardingOfficeName;
    remappedData.funding_agency_name = fundingAgencyName;
    remappedData.funding_subtier_name = fundingSubtierName;
    remappedData.funding_office_name = fundingOfficeName;
    remappedData.pop_city = popCity;
    remappedData.pop_state_province = popStateProvince;
    remappedData.pop_state = popState;
    remappedData.pop_province = popProvince;
    remappedData.pop_zip = popZip;
    remappedData.pop_country = popCountry;
    remappedData.pop_country_code = popCountryCode;
    remappedData.pop_congressional_district = popCongressionalDistrict;
    remappedData.pop_county = popCounty;
    remappedData.pop_state_code = popStateCode;
    remappedData.latest_transaction = latestTransaction;
    remappedData.type_of_contract_pricing = contractPricingCode;
    remappedData.type_of_contract_pricing_description = contractPricing;
    remappedData.contract_parent_id = contractParentId;
    remappedData.contract_idv_type = contractIdvType;
    remappedData.contract_idc_type = contractIdcType;
    remappedData.contract_idv_agency_id = contractIdvAgencyId;
    remappedData.contract_multiple_idv = contractMultipleIdv;
    remappedData.contract_solicitation_id = contractSolicitationId;
    remappedData.contract_solicitation_procedures = contractSolicitationProcedures;
    remappedData.contract_number_offers = contractNumberOffers;
    remappedData.contract_extent_competed = contractExtentCompeted;
    remappedData.contract_set_aside_type = contractSetAsideType;
    remappedData.contract_commercial_acquisition_procedures = contractCommercialAcquisitionProcedures;
    remappedData.contract_commercial_test_program = contractCommercialTestProgram;
    remappedData.contract_evaluated_preference = contractEvaluatedPreference;
    remappedData.contract_fed_biz_opps = contractFedBizOpps;
    remappedData.contract_small_business_competitiveness_demo = contractSmallBusinessCompetitivenessDemo;
    remappedData.contract_psc_code = contractPscCode;
    remappedData.contract_naics_code = contractNaicsCode;
    remappedData.contract_naics_description = contractNaicsDescription;
    remappedData.contract_dod_claimant_code = contractDodClaimantCode;
    remappedData.contract_program_system_or_equipment_code = contractProgramSystemOrEquipmentCode;
    remappedData.contract_it_commercial_category = contractItCommercialCategory;
    remappedData.contract_sea_transport = contractSeaTransport;
    remappedData.contract_clinger_cohen_act = contractClingerCohenAct;
    remappedData.contract_davis_bacon_act = contractDavisBaconAct;
    remappedData.contract_service_contract_act = contractServiceContractAct;
    remappedData.contract_walsh_healey_act = contractWalshHealeyAct;
    remappedData.contract_consolidated = contractConsolidated;
    remappedData.contract_cost_or_pricing_data = contractCostOrPricingData;
    remappedData.contract_domestic_or_foreign = contractDomesticOrForeign;
    remappedData.contract_fair_opportunity_limited_sources = contractFairOpportunityLimitedSources;
    remappedData.contract_foreign_funding = contractForeignFunding;
    remappedData.contract_interagency_contacting_authority = contractInteragencyContactingAuthority;
    remappedData.contract_major_program = contractMajorProgram;
    remappedData.contract_multi_year_contract = contractMultiYearContract;
    remappedData.contract_price_evaluation_adjustment_preference = contractPriceEvaluationAdjustmentPreference;
    remappedData.contract_program_acronym = contractProgramAcronym;
    remappedData.contract_purchase_card_as_payment_method = contractPurchaseCardAsPaymentMethod;
    remappedData.contract_subcontracting_plan = contractSubcontractingPlan;
    remappedData.assistance_data = assistanceData;
    remappedData.face_value_loan_guarantee = loanFaceValue;
    remappedData.original_loan_subsidy_cost = loanSubsidy;
    remappedData.action_date = actionDate;

    // set the awardID (fain or piid) to the relevant field
    let awardId = data.fain;
    if (!idField) {
        // unspecified ID field, use whatever value is available
        if (!data.fain && data.piid) {
            awardId = data.piid;
        }
        else if (data.uri) {
            awardId = data.uri;
        }
    }
    else {
        awardId = data[idField];
        if (!awardId) {
            awardId = '';
        }
    }
    remappedData.award_id = awardId;

    // Format Recipient Info + Address
    if (data.recipient) {
        recipientName = data.recipient.recipient_name;

        if (data.recipient.location.address_line1) {
            recipientAddressLine1 = data.recipient.location.address_line1;
        }
        if (data.recipient.location.address_line2) {
            recipientAddressLine2 = data.recipient.location.address_line2;
        }
        if (data.recipient.location.address_line3) {
            recipientAddressLine3 = data.recipient.location.address_line3;
        }
        if (data.recipient.location.foreign_province) {
            recipientProvince = data.recipient.location.foreign_province;
        }
        const loc = data.recipient.location;

        if (loc.city_name) {
            recipientCity = loc.city_name;
        }

        if (loc.county_name) {
            recipientCounty = loc.county_name;
        }

        if (loc.state_code) {
            recipientStateProvince = loc.state_code;
        }
        else if (loc.foreign_province) {
            recipientStateProvince = loc.foreign_province;
        }
        if (loc.state_code) {
            recipientStateCode = loc.state_code;
        }
        if (loc.zip5) {
            recipientZipPostal = loc.zip5;
        }
        else if (loc.zip4) {
            recipientZipPostal = loc.zip4.slice(0, 5);
        }
        else if (loc.foreign_postal_code) {
            recipientZipPostal = loc.foreign_postal_code;
        }

        if (loc.country_name) {
            recipientCountry = loc.country_name;
        }
        if (loc.location_country_code) {
            recipientCountryCode = loc.location_country_code;
        }

        if (loc.congressional_code) {
            recipientCongressionalDistrict = loc.congressional_code;
        }

        if (data.recipient.recipient_unique_id) {
            recipientDuns = data.recipient.recipient_unique_id;
        }
        if (data.recipient.parent_recipient_unique_id) {
            recipientParentDuns = data.recipient.parent_recipient_unique_id;
        }
        if (data.recipient.business_types_description) {
            recipientBusinessType = data.recipient.business_types_description;
        }
        if (data.recipient.vendor_phone_number) {
            recipientPhone = data.recipient.vendor_phone_number;
        }
        if (data.recipient.vendor_fax_number) {
            recipientFax = data.recipient.vendor_fax_number;
        }
    }
    remappedData.recipient_name = recipientName;
    remappedData.recipient_address_line1 = recipientAddressLine1;
    remappedData.recipient_address_line2 = recipientAddressLine2;
    remappedData.recipient_address_line3 = recipientAddressLine3;
    remappedData.recipient_city = recipientCity;
    remappedData.recipient_county = recipientCounty;
    remappedData.recipient_state_province = recipientStateProvince;
    remappedData.recipient_province = recipientProvince;
    remappedData.recipient_state_code = recipientStateCode;
    remappedData.recipient_zip_postal = recipientZipPostal;
    remappedData.recipient_country = recipientCountry;
    remappedData.recipient_country_code = recipientCountryCode;
    remappedData.recipient_congressional_district = recipientCongressionalDistrict;
    remappedData.recipient_duns = recipientDuns;
    remappedData.recipient_parent_duns = recipientParentDuns;
    remappedData.recipient_business_type = recipientBusinessType;
    remappedData.recipient_phone = recipientPhone;
    remappedData.recipient_fax = recipientFax;

    // convert the award type code to a user-readable string
    let serverType = '';
    if (data.type_description) {
        serverType = data.type_description;
    }
    remappedData.type = serverType;

    const moneyCells = ['total_obligation', 'potential_total_value_of_award'];
    moneyCells.forEach((cell) => {
        remappedData[cell] = MoneyFormatter.formatMoney(data[cell]);
    });

    // finally parse the moment object
    const dates = ['period_of_performance_start_date', 'period_of_performance_current_end_date',
        'date_signed', 'action_date'];
    dates.forEach((date) => {
        if (data[date]) {
            remappedData[date] = moment(data[date], 'YYYY-MM-DD').format('M/D/YYYY');
        }
        else {
            // handle null dates
            remappedData[date] = '';
        }
    });
    return remappedData;
};

class AwardSummary extends GenericRecord {
    constructor(data, idField = null) {
        const remappedData = remapData(data, idField);
        // create the object
        super(recordType, fields, remappedData);
    }
}

export default AwardSummary;
