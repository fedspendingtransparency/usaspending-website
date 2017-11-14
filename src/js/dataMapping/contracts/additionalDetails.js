/**
 * additionalDetails.js
 * Created by Kevin Li 3/3/17
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

export const agencyFields = [
    {
        label: 'Awarding Agency',
        field: 'awarding_agency_name'
    },
    {
        label: 'Awarding Sub-Agency',
        field: 'awarding_subtier_name'
    },
    {
        label: 'Awarding Office',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.latest_transaction.contract_data.awarding_office_name) {
                output = data.latest_transaction.contract_data.awarding_office_name;
            }
            return output;
        }
    },
    {
        label: 'Funding Agency',
        field: 'funding_agency_name'
    },
    {
        label: 'Funding Sub-Agency',
        field: 'funding_subtier_name'
    },
    {
        label: 'Funding Office',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.latest_transaction.contract_data.funding_office_name) {
                output = data.latest_transaction.contract_data.funding_office_name;
            }
            return output;
        }
    }
];

export const parentFields = [
    {
        label: 'Parent Award ID',
        field: 'parent_award_id'
    },
    {
        label: 'IDV Type',
        field: 'idv_type_description'
    },
    {
        label: 'IDC Type',
        field: 'type_of_idc_description'
    },
    {
        label: 'IDV Agency Identifier',
        field: 'referenced_idv_agency_iden'
    },
    {
        label: 'Mutliple or Single Award IDV',
        field: 'multiple_or_single_aw_desc'
    }
];


export const competitionFields = [
    {
        label: 'Solicitation ID',
        field: 'solicitation_identifier'
    },
    {
        label: 'Solicitation Procedures',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.solicitation_procedur_desc) {
                output = data.solicitation_procedur_desc;
            }
            else if (data.solicitation_procedures) {
                output = data.solicitation_procedures;
            }

            return output;
        }
    },
    {
        label: 'Number of Offers Received',
        field: 'number_of_offers_received'
    },
    {
        label: 'Extent Competed',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.extent_compete_description) {
                output = data.extent_compete_description;
            }
            else if (data.extent_competed) {
                output = data.extent_competed;
            }

            return output;
        }
    },
    {
        label: 'Not Competed Reason',
        field: 'other_than_full_and_open_c'
    },
    {
        label: 'Set-Aside Type',
        field: 'type_set_aside_description'
    },
    {
        label: 'Commercial Item Acquisition Procedures',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.commercial_item_acqui_desc) {
                output = data.commercial_item_acqui_desc;
            }
            else if (data.commercial_item_acquisitio) {
                output = data.commercial_item_acquisitio;
            }

            return output;
        }
    },
    {
        label: 'Commercial Item Test Program',
        field: 'commercial_item_test_desc'
    },
    {
        label: 'Evaluated Preference',
        field: 'evaluated_preference_desc'
    },
    {
        label: 'FedBizOpps',
        field: 'fed_biz_opps_description'
    },
    {
        label: 'Small Business Competitiveness Demonstration Program',
        field: 'small_business_competitive'
    }
];

export const pscFields = [
    {
        label: 'Product Service Code (PSC)',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.product_or_service_co_desc && data.product_or_service_code) {
                output = `${data.product_or_service_code}: ${data.product_or_service_co_desc}`;
            }
            else if (data.product_or_service_co_desc) {
                output = data.product_or_service_co_desc;
            }
            else if (data.product_or_service_code) {
                output = data.product_or_service_code;
            }

            return output;
        }
    },
    {
        label: 'NAICS Code',
        field: '__special',
        parse: (data) => {
            let output = '';
            if (data.naics_description && data.naics) {
                output = `${data.naics}: ${data.naics_description}`;
            }
            else if (data.naics_description) {
                output = data.naics_description;
            }
            else if (data.naics) {
                output = data.naics;
            }

            return output;
        }
    },
    {
        label: 'DoD Claimant Code',
        field: 'dod_claimant_program_code'
    },
    {
        label: 'DOD Acquisition Program',
        field: 'program_system_or_equipmen'
    },
    {
        label: 'Information Technology Commercial Item Category',
        field: 'information_technolog_desc'
    },
    {
        label: 'Sea Transportation',
        field: 'sea_transportation_desc'
    }
];

export const legislativeFields = [
    {
        label: 'Clinger-Cohen Act Compliant',
        field: 'clinger_cohen_act_pla_desc'
    },
    {
        label: 'Subject to Davis Bacon Act',
        field: 'davis_bacon_act_descrip'
    },
    {
        label: 'Subject to Service Contract Act',
        field: 'service_contract_act_desc'
    },
    {
        label: 'Subject to Walsh Healey Act',
        field: 'walsh_healey_act_descrip'
    }
];

export const compensationFields = [
    {
        label: 'Officer 1',
        field: '__special',
        parse: (data) => {
            const name = data.officer_1_name;
            let amount = MoneyFormatter.formatMoney(data.officer_1_amount);
            if (!data.officer_1_amount) {
                amount = '--';
            }

            if (name && name !== '') {
                if (!data.officer_1_amount) {
                    return name;
                }
                return `${name} - ${amount}`;
            }

            return amount;
        }
    },
    {
        label: 'Officer 2',
        field: '__special',
        parse: (data) => {
            const name = data.officer_2_name;
            let amount = MoneyFormatter.formatMoney(data.officer_2_amount);
            if (!data.officer_2_amount) {
                amount = '--';
            }

            if (name && name !== '') {
                if (!data.officer_2_amount) {
                    return name;
                }
                return `${name} - ${amount}`;
            }

            return amount;
        }
    },
    {
        label: 'Officer 3',
        field: '__special',
        parse: (data) => {
            const name = data.officer_3_name;
            let amount = MoneyFormatter.formatMoney(data.officer_3_amount);
            if (!data.officer_3_amount) {
                amount = '--';
            }

            if (name && name !== '') {
                if (!data.officer_3_amount) {
                    return name;
                }
                return `${name} - ${amount}`;
            }

            return amount;
        }
    },
    {
        label: 'Officer 4',
        field: '__special',
        parse: (data) => {
            const name = data.officer_4_name;
            let amount = MoneyFormatter.formatMoney(data.officer_4_amount);
            if (!data.officer_4_amount) {
                amount = '--';
            }

            if (name && name !== '') {
                if (!data.officer_4_amount) {
                    return name;
                }
                return `${name} - ${amount}`;
            }

            return amount;
        }
    },
    {
        label: 'Officer 5',
        field: '__special',
        parse: (data) => {
            const name = data.officer_5_name;
            let amount = MoneyFormatter.formatMoney(data.officer_5_amount);
            if (!data.officer_5_amount) {
                amount = '--';
            }

            if (name && name !== '') {
                if (!data.officer_5_amount) {
                    return name;
                }
                return `${name} - ${amount}`;
            }

            return amount;
        }
    }
];

export const additionalFields = [
    {
        label: 'Cost or Pricing Data',
        field: 'cost_or_pricing_data_desc'
    },
    {
        label: 'Domestic or Foreign Entity',
        field: 'domestic_or_foreign_e_desc'
    },
    {
        label: 'Fair Opportunity Limited Sources',
        field: 'fair_opportunity_limi_desc'
    },
    {
        label: 'Foreign Funding',
        field: 'foreign_funding_desc'
    },
    {
        label: 'Interagency Contracting Authority',
        field: 'interagency_contract_desc'
    },
    {
        label: 'Major Program',
        field: 'major_program'
    },
    {
        label: 'Price Evaluation Adjustment Preference Percent Difference',
        field: 'price_evaluation_adjustmen'
    },
    {
        label: 'Program Acronym',
        field: 'program_acronym'
    },
    {
        label: 'Subcontracting Plan',
        field: '__special',
        parse: (data) => {
            let output = 'Not Available';
            if (data.subcontracting_plan_desc) {
                output = data.subcontracting_plan_desc;
            }
            else if (data.subcontracting_plan) {
                output = data.subcontracting_plan;
            }

            return output;
        }
    },
    {
        label: 'Multi Year Contract',
        field: 'multi_year_contract_desc'
    },
    {
        label: 'Purchase Card as Payment Method',
        field: 'purchase_card_as_paym_desc'
    },
    {
        label: 'Consolidated Contract',
        field: 'consolidated_contract_desc'
    }
];
