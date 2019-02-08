/**
 * BaseContractAdditionalDetails.js
 * Created by David Trinh 10/9/18
 */

const BaseContractAdditionalDetails = {
    populate(data) {
        // Parent Award Details
        this.idvType = data.idv_type_description || '--';
        this.idcType = data.type_of_idc_description || '--';
        this.idvAgencyId = data.referenced_idv_agency_iden || '--';
        this.multipleIdv = data.multiple_or_single_aw_desc || '--';

        // Competition Details
        this.solicitationId = data.solicitation_identifier || '--';
        this.solicitationProcedures = data.solicitation_procedures || '--';
        this.numberOffers = data.number_of_offers_received || '--';
        this.extentCompeted = data.extent_competed || '--';
        this.notCompeted = data.other_than_full_and_o_desc || '--';
        this.setAsideType = data.type_set_aside_description || '--';
        this.commercialAcquisitionProcedures = data.commercial_item_acquisitio || '--';
        this.commercialTestProgram = data.commercial_item_test_desc || '--';
        this.evaluatedPreference = data.evaluated_preference_desc || '--';
        this.fedBizOpps = data.fed_biz_opps_description || '--';
        this.smallBusinessCompetitive = (data.small_business_competitive && 'Yes') || 'No';
        this.fairOpportunityLimitedSources = data.fair_opportunity_limi_desc || '--';

        // Product or Service Details
        this._pscCode = data.product_or_service_code || '';
        this._pscCodeDescription = data.product_or_service_co_desc || '';
        this._naicsCode = data.naics || '';
        this._naicsDescription = data.naics_description || '';
        this.dodClaimantCode = data.dod_claimant_program_code || '--';
        this.itCommercialCategory = data.information_technology_commercial_item_category || '--';
        this.seaTransport = data.sea_transportation_desc || '--';

        // Legislative Mandates
        this.clingerCohenAct = data.clinger_cohen_act_pla_desc || '--';
        this.constructionWageRateReq = data.construction_wage_rat_desc || '--';
        this.laborStandards = data.labor_standards_descrip || '--';
        this.materialSuppliesArticlesEquip = data.materials_supplies_descrip || '--';

        // Additional Details
        this.costOrPricingData = data.cost_or_pricing_data_desc || '--';
        this.domesticForeign = data.domestic_or_foreign_e_desc || '--';
        this.foreignFunding = data.foreign_funding_desc || '--';
        this.interagencyContactingAuthority = data.interagency_contract_desc || '--';
        this.majorProgram = data.major_program || '--';
        this.priceEvaluationAdjustmentPreference = data.price_evaluation_adjustmen || '--';
        this.programAcronym = data.program_acronym || '--';
        this.subcontractingPlan = data.subcontracting_plan || '--';
        this.multiYearContract = data.multi_year_contract_desc || '--';
        this.purchaseCardAsPaymentMethod = data.purchase_card_as_paym_desc || '--';
        this.consolidated = data.consolidated_contract_desc || '--';
        this.contractPriceDesc = data.type_of_contract_pric_desc || '--';
        this.dodAcquisitionProgramCode = data.dod_acquisition_program_code || '';
        this.dodAcquisitionProgramDescription = data.dod_acquisition_program_description || '';
        this.infoTechCommercialItem = data.information_technology_commercial_item_category_code || '--';
    },
    get pscCode() {
        if (this._pscCode && this._pscCodeDescription) {
            return `${this._pscCode}: ${this._pscCodeDescription}`;
        }
        else if (this._pscCode || this._pscCodeDescription) {
            return `${this._pscCode}${this._pscCodeDescription}`;
        }
        return '--';
    },
    get naicsCode() {
        if (this._naicsCode && this._naicsDescription) {
            return `${this._naicsCode}: ${this._naicsDescription}`;
        }
        else if (this._naicsCode || this._naicsDescription) {
            return `${this._naicsCode}${this._naicsDescription}`;
        }
        return '--';
    },
    get dodAcquisitionProgram() {
        if (this.dodAcquisitionProgramCode && this.dodAcquisitionProgramDescription) {
            return `${this.dodAcquisitionProgramCode}: ${this.dodAcquisitionProgramDescription}`;
        }
        else if (this.dodAcquisitionProgramCode || this.dodAcquisitionProgramDescription) {
            return `${this.dodAcquisitionProgramCode}${this.dodAcquisitionProgramDescription}`;
        }
        return '--';
    }
};

export default BaseContractAdditionalDetails;
