/**
 * additionalDetails.js
 * Created by Kevin Li 3/3/17
 */

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
        field: 'idv_type'
    },
    {
        label: 'IDC Type',
        field: 'type_of_idc'
    },
    {
        label: 'IDV Agency Identifier',
        field: 'referenced_idv_agency_identifier'
    },
    {
        label: 'Mutliple or Single Award IDV',
        field: 'multiple_or_single_award_idv'
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
        field: 'extent_competed'
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
        field: 'commercial_item_acquisition_procedures'
    },
    {
        label: 'Commercial Item Test Program',
        field: 'commercial_item_test_program'
    },
    {
        label: 'Evaluated Preference',
        field: 'evaluated_preference'
    },
    {
        label: 'FedBizOpps',
        field: 'fed_biz_opps'
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
        field: 'information_technology_commercial_item_category'
    },
    {
        label: 'Sea Transportation',
        field: 'sea_transportation'
    }
];

export const legislativeFields = [
    {
        label: 'Clinger-Cohen Act Compliant',
        field: 'clinger_cohen_act_planning'
    },
    {
        label: 'Subject to Davis Bacon Act',
        field: 'davis_bacon_act'
    },
    {
        label: 'Subject to Service Contract Act',
        field: 'service_contract_act'
    },
    {
        label: 'Subject to Walsh Healey Act',
        field: 'walsh_healey_act'
    }
];

export const additionalFields = [
    {
        label: 'Cost or Pricing Data',
        field: 'cost_or_pricing_data'
    },
    {
        label: 'Domestic or Foreign Entity',
        field: 'domestic_or_foreign_entity'
    },
    {
        label: 'Fair Opportunity Limited Sources',
        field: 'fair_opportunity_limited_sources'
    },
    {
        label: 'Foreign Funding',
        field: 'foreign_funding'
    },
    {
        label: 'Interagency Contracting Authority',
        field: 'interagency_contracting_authority'
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
        field: 'subcontracting_plan'
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
