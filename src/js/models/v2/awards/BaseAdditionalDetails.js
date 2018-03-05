/**
 * BaseAdditionalDetails.js
 * Created by Lizzie Salita 3/5/18
 */

const BaseAdditionalDetails = {
    populate(data) {
        this.pricingCode = data.type_of_contract_pricing || '';
        this.pricing = data.type_of_contract_pric_desc || '';

        // Parent Award Details
        this.idvType = data.idv_type || '';
        this.idcType = data.type_of_idc || '';
        this.idvAgencyId = data.referenced_idv_agency_iden || '';
        this.multipleIdv = data.multiple_or_single_award_i || '';

        // Competition Details
        this.solicitationId = data.solicitation_identifier || '';
        this.solicitationProcedures = data.solicitation_procedures || '';
        this.numberOffers = data.number_of_offers_received || '';
        this.extentCompeted = data.extent_compete_description || '';
        this.setAsideType = data.type_set_aside_description || '';
        this.commercialAcquisitionProcedures = data.commercial_item_acqui_desc || '';
        this.commercialTestProgram = data.commercial_item_test_progr || '';
        this.evaluatedPreference = data.evaluated_preference_desc || '';
        this.fedBizOpps = data.fed_biz_opps_description || '';
        this.smallBusinessCompetitivenessDemo = data.small_business_competitive || '';

        // Product of Service Details
        this.pscCode = data.product_or_service_code || '';
        this.naicsCode = data.naics || '';
        this.naicsDescription = data.naics_description || '';
        this.dodClaimantCode = data.dod_claimant_prog_cod_desc || '';
        this.itCommercialCategory = data.information_technolog_desc || '';
        this.seaTransport = data.sea_transportation_desc || '';

        // Legislative Mandates
        this.clingerCohenAct = data.clinger_cohen_act_planning || '';
        this.davisBaconAct = data.davis_bacon_act_descrip || '';
        this.serviceContractAct = data.service_contract_act_desc || '';
        this.walshHealeyAct = data.walsh_healey_act || '';

        // Additional Details
        this.costOrPricingData = data.cost_or_pricing_data_desc || '';
        this.fairOpportunityLimitedSources = data.fair_opportunity_limi_desc || '';
        this.foreignFunding = data.foreign_funding_desc || '';
        this.interagencyContactingAuthority = data.interagency_contract_desc || '';
        this.majorProgram = data.major_program || '';
        this.priceEvaluationAdjustmentPreference = data.price_evaluation_adjustmen || '';
        this.programAcronym = data.program_acronym || '';
        this.subcontractingPlan = '';
        this.multiYearContract = data.multi_year_contract || '';
        this.purchaseCardAsPaymentMethod = data.purchase_card_as_payment_m || '';
        this.consolidated = data.consolidated_contract || '';

        this.programSystemOrEquipmentCode = data.program_system_or_equipmen || '';
    }
};

export default BaseAdditionalDetails;
