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
        label: 'Awarding Sub-Tier Agency',
        field: 'awarding_subtier_name'
    },
    {
        label: 'Awarding Office',
        field: 'awarding_office_name'
    },
    {
        label: 'Funding Agency',
        field: 'funding_agency_name'
    },
    {
        label: 'Funding Sub-Tier Agency',
        field: 'funding_subtier_name'
    },
    {
        label: 'Funding Office',
        field: 'funding_office_name'
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
        field: 'referenced_idv_agency_identifier'
    },
    {
        label: 'Mutliple or Single Award IDV',
        field: 'multiple_or_single_award_idv_description'
    }
];


export const competitionFields = [
    {
        label: 'Solicitation ID',
        field: 'solicitation_identifier'
    },
    {
        label: 'Solicitation Procedures',
        field: 'solicitation_procedures'
    },
    {
        label: 'Number of Offers Received',
        field: 'number_of_offers_received'
    },
    {
        label: 'Extent Competed',
        field: 'extent_competed_description'
    },
    {
        label: 'Not Competed Reason',
        field: 'other_than_full_and_open_competition'
    },
    {
        label: 'Set-Aside Type',
        field: 'type_set_aside'
    },
    {
        label: 'Commercial Item Acquisition Procedures',
        field: 'commercial_item_acquisition_procedures_description'
    },
    {
        label: 'Commercial Item Test Program',
        field: 'commercial_item_test_program'
    },
    {
        label: 'Evaluated Preference',
        field: 'evaluated_preference_description'
    },
    {
        label: 'FedBizOpps',
        field: 'fed_biz_opps_description'
    },
    {
        label: 'Small Business Competitiveness Demonstration Program',
        field: 'small_business_competitiveness_demonstration_program'
    }
];

export const pscFields = [
    {
        label: 'Product Service Code (PSC)',
        field: 'product_or_service_code'
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
        label: 'Program, System, or Equipment Code',
        field: 'program_system_or_equipment_code'
    },
    {
        label: 'Information Technology Commercial Item Category',
        field: 'information_technology_commercial_item_category_description'
    },
    {
        label: 'Sea Transportation',
        field: 'sea_transportation_description'
    }
];

export const legislativeFields = [
    {
        label: 'Clinger-Cohen Act Compliant',
        field: 'clinger_cohen_act_planning'
    },
    {
        label: 'Subject to Davis Bacon Act',
        field: 'davis_bacon_act_description'
    },
    {
        label: 'Subject to Service Contract Act',
        field: 'service_contract_act_description'
    },
    {
        label: 'Subject to Walsh Healey Act',
        field: 'walsh_healey_act'
    }
];

export const compensationFields = [
    {
        label: 'Officer 1',
        field: '__special',
        parse: (data) => {
            const name = data.officer_1_name;
            const amount = MoneyFormatter.formatMoney(data.officer_1_amount);

            if (name && name !== '') {
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
            const amount = MoneyFormatter.formatMoney(data.officer_2_amount);

            if (name && name !== '') {
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
            const amount = MoneyFormatter.formatMoney(data.officer_3_amount);

            if (name && name !== '') {
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
            const amount = MoneyFormatter.formatMoney(data.officer_4_amount);

            if (name && name !== '') {
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
            const amount = MoneyFormatter.formatMoney(data.officer_5_amount);

            if (name && name !== '') {
                return `${name} - ${amount}`;
            }

            return amount;
        }
    }
];

export const additionalFields = [
    {
        label: 'Cost or Pricing Data',
        field: 'cost_or_pricing_data_description'
    },
    {
        label: 'Domestic or Foreign Entity',
        field: 'domestic_or_foreign_entity_description'
    },
    {
        label: 'Fair Opportunity Limited Sources',
        field: 'fair_opportunity_limited_sources_description'
    },
    {
        label: 'Foreign Funding',
        field: 'foreign_funding_description'
    },
    {
        label: 'Interagency Contracting Authority',
        field: 'interagency_contracting_authority_description'
    },
    {
        label: 'Major Program',
        field: 'major_program'
    },
    {
        label: 'Price Evaluation Adjustment Preference Percent Difference',
        field: 'price_evaluation_adjustment_preference_percent_difference'
    },
    {
        label: 'Program Acronym',
        field: 'program_acronym'
    },
    {
        label: 'Subcontracting Plan',
        field: 'subcontracting_plan_description'
    },
    {
        label: 'Multi Year Contract',
        field: 'multi_year_contract'
    },
    {
        label: 'Purchase Card as Payment Method',
        field: 'purchase_card_as_payment_method'
    },
    {
        label: 'Consolidated Contract',
        field: 'consolidated_contract'
    }
];
