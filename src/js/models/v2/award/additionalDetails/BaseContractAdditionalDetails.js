/**
 * BaseContractAdditionalDetails.js
 * Created by David Trinh 10/9/18
 */

const parseCodeAndDescription = (code, description) => {
    if (code && description) {
        return `${code}: ${description}`;
    }
    else if (code || description) {
        return `${code}${description}`;
    }
    return '--';
};

const handleBoolean = (value) => {
    // differentiate between null/undefined and false values for boolean fields
    if (value) {
        return 'TRUE';
    }
    else if (value === false) {
        return 'FALSE';
    }
    return '--';
};

const BaseContractAdditionalDetails = {
    populate(data) {
    // Parent Award Details
        this.idvType = data.idv_type_description || '--';
        this.idcType = data.type_of_idc_description || '--';
        this.idvAgencyId = data.referenced_idv_agency_iden || '--';
        this.idvAgencyName = data.referenced_idv_agency_desc || '--';
        this.multipleIdv = data.multiple_or_single_award_description || '--';

        // Competition Details
        this.solicitationId = data.solicitation_identifier || '--';
        this._solicitationProcedures = data.solicitation_procedures || '';
        this._solicitationProceduresDescription = data.solicitation_procedures_description || '';
        this.numberOffers = data.number_of_offers_received || '--';
        this._extentCompeted = data.extent_competed || '';
        this._extentCompetedDescription = data.extent_competed_description || '';
        this.notCompeted = data.other_than_full_and_open_description || '--';
        this.setAsideType = data.type_set_aside_description || '--';
        this._commercialAcquisitionProcedures = data.commercial_item_acquisition || '';
        this._commercialAcquisitionProceduresDescription = data.commercial_item_acquisition_description || '';
        this.commercialTestProgram = data.commercial_item_test_program_description || '--';
        this.evaluatedPreference = data.evaluated_preference_description || '--';
        this.fedBizOpps = data.fed_biz_opps_description || '--';
        this._smallBusinessCompetitive = data.small_business_competitive;
        this.fairOpportunityLimitedSources = data.fair_opportunity_limited_description || '--';

        // Product or Service Details
        this._pscCode = data.product_or_service_code || '';
        this._pscDescription = data.product_or_service_description || '';
        this._naicsCode = data.naics || '';
        this._naicsDescription = data.naics_description || '';
        this._dodClaimantCode = data.dod_claimant_program || '';
        this._dodClaimantDescription = data.dod_claimant_program_description || '';
        this.itCommercialCategory = data.information_technology_commercial_item_category || '--';
        this.seaTransport = data.sea_transportation_description || '--';

        // Legislative Mandates
        this.clingerCohenAct = data.clinger_cohen_act_planning_description || '--';
        this.constructionWageRateReq = data.construction_wage_rate_description || '--';
        this.laborStandards = data.labor_standards_description || '--';
        this.materialSuppliesArticlesEquip = data.materials_supplies_description || '--';

        // Additional Details
        this.costOrPricingData = data.cost_or_pricing_data_description || '--';
        this.domesticForeign = data.domestic_or_foreign_entity_description || '--';
        this.foreignFunding = data.foreign_funding_description || '--';
        this.interagencyContactingAuthority = data.interagency_contracting_authority_description || '--';
        this.majorProgram = data.major_program || '--';
        this.priceEvaluationAdjustmentPreference = data.price_evaluation_adjustment || '--';
        this.programAcronym = data.program_acronym || '--';
        this._subcontractingPlan = data.subcontracting_plan || '';
        this._subcontractingPlanDescription = data.subcontracting_plan_description || '';
        this.multiYearContract = data.multi_year_contract_description || '--';
        this.purchaseCardAsPaymentMethod = data.purchase_card_as_payment_method_description || '--';
        this.consolidated = data.consolidated_contract_description || '--';
        this.contractPriceDesc = data.type_of_contract_pricing_description || '--';
        this._dodAcquisitionProgramCode = data.dod_acquisition_program || '';
        this._dodAcquisitionProgramDescription = data.dod_acquisition_program_description || '';
        this._infoTechCommercialItem = data.information_technology_commercial_item_category || '';
        this._infoTechCommercialItemDescription = data.information_technology_commercial_item_category_description || '';
        this.nationalInterestActionDesc = data.national_interest_action_description || '--';
    },
    get pscCode() {
        return parseCodeAndDescription(this._pscCode, this._pscDescription);
    },
    get naicsCode() {
        return parseCodeAndDescription(this._naicsCode, this._naicsDescription);
    },
    get dodAcquisitionProgram() {
        return parseCodeAndDescription(this._dodAcquisitionProgramCode, this._dodAcquisitionProgramDescription);
    },
    get extentCompeted() {
        return parseCodeAndDescription(this._extentCompeted, this._extentCompetedDescription);
    },
    get solicitationProcedures() {
        return parseCodeAndDescription(this._solicitationProcedures, this._solicitationProceduresDescription);
    },
    get subcontractingPlan() {
        return parseCodeAndDescription(this._subcontractingPlan, this._subcontractingPlanDescription);
    },
    get commercialAcquisitionProcedures() {
        return parseCodeAndDescription(this._commercialAcquisitionProcedures, this._commercialAcquisitionProceduresDescription);
    },
    get dodClaimantProgram() {
        return parseCodeAndDescription(this._dodClaimantCode, this._dodClaimantDescription);
    },
    get smallBusinessCompetitive() {
        return handleBoolean(this._smallBusinessCompetitive);
    }
};

export default BaseContractAdditionalDetails;
