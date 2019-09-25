/**
 * BaseContractAdditionalDetails.js
 * Created by Lizzie Salita 3/5/18
 */

import { formatMoney } from 'helpers/moneyFormatter';

const parseExecutiveCompensation = (data) => {
    const executiveCompensation = {};
    for (let i = 1; i < 6; i++) {
        const name = data[`officer_${i}_name`] || '';
        const amount = formatMoney(data[`officer_${i}_amount`]) || 0;
        if (name) {
            executiveCompensation[`officer${i}`] = `${name} - ${amount}`;
        }
        else {
            executiveCompensation[`officer${i}`] = '--';
        }
    }
    return executiveCompensation;
};

const BaseContractAdditionalDetails = {
    populate(data) {
        this.pricingCode = data.type_of_contract_pricing || '';
        this.pricing = data.type_of_contract_pric_desc || '';

        // Parent Award Details

        this.idvType = data.idv_type_description || '--';
        this.idcType = data.type_of_idc_description || '--';
        this.idvAgencyId = data.referenced_idv_agency_iden || '--';
        this.multipleIdv = data.multiple_or_single_aw_desc || '--';

        // Competition Details
        this.solicitationId = data.solicitation_identifier || '--';
        this.solicitationProcedures = data.solicitation_procedur_desc || data.solicitation_procedures || '--';
        this.numberOffers = data.number_of_offers_received || '--';
        this.extentCompeted = data.extent_compete_description || data.extent_competed || '--';
        this.notCompeted = data.other_than_full_and_o_desc || '--';
        this.setAsideType = data.type_set_aside_description || '--';
        this.commercialAcquisitionProcedures = data.commercial_item_acqui_desc || data.commercial_item_acquisitio || '--';
        this.commercialTestProgram = data.commercial_item_test_desc || '--';
        this.evaluatedPreference = data.evaluated_preference_desc || '--';
        this.fedBizOpps = data.fed_biz_opps_description || '--';
        this.smallBusinessCompetitivenessDemo = data.small_business_competitive || '--';
        this.fairOpportunityLimitedSources = data.fair_opportunity_limi_desc || '--';

        // Product or Service Details
        this._pscCode = data.product_or_service_code || '';
        this._pscCodeDescription = data.product_or_service_co_desc || '';
        this._naicsCode = data.naics || '';
        this._naicsDescription = data.naics_description || '';
        this.dodClaimantCode = data.dod_claimant_program_code || '--';
        this.programSystemOrEquipmentCode = data.program_system_or_equipmen || '--';
        this.itCommercialCategory = data.information_technolog_desc || '--';
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
        this.subcontractingPlan = data.subcontracting_plan_desc || data.subcontracting_plan || '--';
        this.multiYearContract = data.multi_year_contract_desc || '--';
        this.purchaseCardAsPaymentMethod = data.purchase_card_as_paym_desc || '--';
        this.consolidated = data.consolidated_contract_desc || '--';

        // Executive Compensation
        this.officers = parseExecutiveCompensation(data);
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
    }
};

export default BaseContractAdditionalDetails;
