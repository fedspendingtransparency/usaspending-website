export const mockContract = {
    type: 'A',
    category: 'contract',
    type_description: 'Testing 123',
    description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
    piid: '34242',
    generated_unique_award_id: '6657452ew23',
    parent_award_piid: '1301',
    date_signed: '2005-02-18',
    total_obligation: 123231313,
    base_and_all_options: 234234.00,
    subaward_count: 2342334,
    total_subaward_amount: 3242342,
    base_exercised_options: 234242,
    awarding_agency: {
        id: '234',
        toptier_agency: {
            name: 'Department of Defense',
            abbreviation: 'DOD'
        },
        subtier_agency: {
            name: 'Department of Navy',
            abbreviation: 'DON'
        },
        office_agency_name: 'STRATEGIC SYSTEMS'
    },
    funding_agency: null,
    recipient: {
        recipient_name: 'Booz Allen Hamilton',
        recipient_hash: '1023984-C',
        recipient_unique_id: 123223,
        parent_recipient_unique_id: 234242,
        location: {
            address_line1: '1515 EUBANK BLVD. SE',
            address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
            address_line3: null,
            foreign_province: 'NM',
            city_name: 'ALBUQUERQUE',
            county_name: null,
            state_code: 'IL',
            zip4: '871230180',
            zip5: null,
            foreign_postal_code: null,
            country_name: 'UNITED STATES',
            location_country_code: null,
            congressional_code: null
        },
        recipient_parent_name: 'HoneyWell',
        business_categories: ['Testing 1', 'Testing 2']
    },
    period_of_performance: {
        start_date: '2004-02-19',
        end_date: '2005-02-19',
        last_modified_date: '2018-08-29',
        potential_end_date: '2027-04-30'
    },
    place_of_performance: {
        address_line1: '1515 EUBANK BLVD. SE',
        address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
        address_line3: null,
        foreign_province: 'NM',
        city_name: 'ALBUQUERQUE',
        county_name: null,
        state_code: 'IL',
        zip4: '871230180',
        zip5: null,
        foreign_postal_code: null,
        country_name: 'UNITED STATES',
        location_country_code: null,
        congressional_code: null
    },
    latest_transaction_contract_data: {
        idv_type_description: 'test',
        type_of_idc_description: 'r3w',
        referenced_idv_agency_iden: '424',
        multiple_or_single_aw_desc: 'testing',
        solicitation_identifier: 'DE-2342-323-SOL',
        solicitation_procedures: 'Quote',
        number_of_offers_received: '4',
        extent_competed: 'Full',
        other_than_full_and_o_desc: 'none',
        type_set_aside_description: 'No set aside used',
        commercial_item_acquisitio: 'COMMERCIAL ITEM',
        commercial_item_test_desc: 'PROCEDURE NOT USED',
        evaluated_preference_desc: 'NO',
        fed_biz_opps_description: 'No Preference Used',
        small_business_competitive: true,
        fair_opportunity_limi_desc: 'test',
        product_or_service_code: 't324242',
        product_or_service_desc: '423we',
        naics: '35353',
        naics_description: null,
        dod_claimant_program_code: 'ERWRWRWR5242-242',
        information_technology_commercial_item_category: 'ERWRWRWR5242-242',
        sea_transportation_desc: 'seaworld',
        clinger_cohen_act_pla_desc: null,
        construction_wage_rat_desc: 'TES',
        labor_standards_descrip: 'NO',
        materials_supplies_descrip: 'YES',
        cost_or_pricing_data_desc: 'No',
        domestic_or_foreign_e_desc: 'U.S. Owned',
        foreign_funding_desc: 'Yes',
        interagency_contract_desc: 'Company A',
        major_program: 'None used',
        price_evaluation_adjustmen: '0.00',
        program_acronym: 'NOT SURE',
        subcontracting_plan: 'PLAN',
        multi_year_contract_desc: 'No',
        purchase_card_as_paym_desc: 'Yes',
        consolidated_contract_desc: 'NO',
        type_of_contract_pric_desc: 'FIRM FIXED PRICE'
    },
    executive_details: {
        officers: [{
            name: 'John Doe',
            amount: 12132
        }, {
            name: 'Jake Doe',
            amount: null
        }]
    }

};

export const mockLoan = {
    type: 'C',
    category: 'loan',
    type_description: 'Testing 123',
    description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
    fain: '342332',
    generated_unique_award_id: '6657452ew23',
    parent_award_piid: '1301',
    date_signed: '2005-02-18',
    cfda_objectives: 'Testing testing testing',
    cfda_number: '0.434',
    cfda_title: 'Flood Insurance',
    total_obligation: 123231313,
    subaward_count: 23423343,
    total_subsidy_cost: 123,
    total_loan_value: 24343,
    total_subaward_amount: 32423342,
    awarding_agency: {
        id: '323',
        toptier_agency: {
            name: 'Department of Defense',
            abbreviation: 'DOD'
        },
        subtier_agency: {
            name: 'Department of Navy',
            abbreviation: 'DON'
        },
        office_agency_name: 'STRATEGIC SYSTEMS'
    },
    funding_agency: null,
    recipient: {
        recipient_name: 'Booz Allen Hamilton',
        recipient_unique_id: '123223',
        parent_recipient_unique_id: '234242',
        location: {
            address_line1: '1515 EUBANK BLVD. SE',
            address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
            address_line3: null,
            foreign_province: 'NM',
            city_name: 'ALBUQUERQUE',
            county_name: null,
            state_code: 'IL',
            zip4: '871230180',
            zip5: null,
            foreign_postal_code: null,
            country_name: 'UNITED STATES',
            location_country_code: null,
            congressional_code: null
        },
        parent_recipient_name: 'HoneyWell',
        business_categories_name: ['Testing 1', 'Testing 2']
    },
    period_of_performance: {
        start_date: '2004-02-19',
        end_date: '2005-02-19',
        last_modified_date: '2006-03-01'
    },
    place_of_performance: {
        address_line1: '1515 EUBANK BLVD. SE',
        address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
        address_line3: null,
        foreign_province: 'NM',
        city_name: 'ALBUQUERQUE',
        county_name: null,
        state_code: 'IL',
        zip4: '871230180',
        zip5: null,
        foreign_postal_code: null,
        country_name: 'UNITED STATES',
        location_country_code: null,
        congressional_code: null
    }
};

export const mockIdv = {
    type: 'IDV_A',
    category: 'idv',
    type_description: 'Blanket Purchase Agreement',
    piid: 'W31P4Q15A0024',
    generated_unique_award_id: '6657452ew23',
    parent_award_piid: '1301',
    parent_generated_unique_award_id: '',
    description: 'ewraijwrw',
    date_signed: '2005-02-18',
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Defense',
            abbreviation: 'DOD'
        },
        subtier_agency: {
            name: 'Department of Navy',
            abbreviation: 'DON'
        },
        office_agency_name: 'STRATEGIC SYSTEMS'
    },
    recipient: {
        recipient_name: 'Booz Allen Hamilton',
        recipient_hash: '1023984-C',
        recipient_unique_id: '123223',
        parent_recipient_unique_id: '234242',
        location: {
            address_line1: '1515 EUBANK BLVD. SE',
            address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
            address_line3: null,
            foreign_province: 'NM',
            city_name: 'ALBUQUERQUE',
            county_name: null,
            state_code: 'IL',
            zip4: '871230180',
            zip5: null,
            foreign_postal_code: null,
            country_name: 'UNITED STATES',
            location_country_code: null,
            congressional_code: null
        },
        parent_recipient_name: 'HoneyWell',
        business_categories: ['Testing 1', 'Testing 2']
    },
    parent_award: {
        award_id: 5738,
        idv_type_description: 'test',
        type_of_idc_description: 'r3w',
        agency_id: '123',
        multiple_or_single_aw_desc: 'something',
        piid: '345'
    },
    idv_dates: {
        start_date: '2004-02-19',
        last_modified_date: '2301-02-20',
        end_date: '2301-01-20'
    },
    place_of_performance: {
        address_line1: '1515 EUBANK BLVD. SE',
        address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
        address_line3: null,
        foreign_province: 'NM',
        city_name: 'ALBUQUERQUE',
        county_name: null,
        state_code: 'IL',
        zip4: '871230180',
        zip5: null,
        foreign_postal_code: null,
        country_name: 'UNITED STATES',
        location_country_code: null,
        congressional_code: null
    },
    latest_transaction_contract_data: {
        idv_type_description: 'test',
        type_of_idc_description: 'r3w',
        referenced_idv_agency_iden: '424',
        multiple_or_single_aw_desc: 'testing',
        solicitation_identifier: 'DE-2342-323-SOL',
        solicitation_procedures: 'Quote',
        number_of_offers_received: '4',
        extent_competed: 'Full',
        other_than_full_and_o_desc: 'none',
        type_set_aside_description: 'No set aside used',
        commercial_item_acquisitio: 'COMMERCIAL ITEM',
        commercial_item_test_desc: 'PROCEDURE NOT USED',
        evaluated_preference_desc: 'NO',
        fed_biz_opps_description: 'No Preference Used',
        small_business_competitive: true,
        fair_opportunity_limi_desc: 'test',
        product_or_service_code: 't324242',
        product_or_service_desc: '423we',
        naics: '35353',
        naics_description: null,
        dod_claimant_program_code: 'ERWRWRWR5242-242',
        information_technology_commercial_item_category: 'ERWRWRWR5242-242',
        sea_transportation_desc: 'seaworld',
        clinger_cohen_act_pla_desc: null,
        construction_wage_rat_desc: 'TES',
        labor_standards_descrip: 'NO',
        materials_supplies_descrip: 'YES',
        cost_or_pricing_data_desc: 'No',
        domestic_or_foreign_e_desc: 'U.S. Owned',
        foreign_funding_desc: 'Yes',
        interagency_contract_desc: 'Company A',
        major_program: 'None used',
        price_evaluation_adjustmen: '0.00',
        program_acronym: 'NOT SURE',
        subcontracting_plan: 'PLAN',
        multi_year_contract_desc: 'No',
        purchase_card_as_paym_desc: 'Yes',
        consolidated_contract_desc: 'NO',
        type_of_contract_pric_desc: 'FIRM FIXED PRICE'
    },
    executive_details: {
        officers: [{
            name: 'John Doe',
            amount: 12132
        }, {
            name: 'Jake Doe',
            amount: 23432
        }]
    },
    subaward_count: 430,
    total_subaward_amount: 35345353453
};

export const mockAwardAmounts = {
    award_id: 12178065,
    generated_unique_award_id: null,
    child_idv_count: 100,
    contract_count: 10,
    rollup_base_exercised_options_val: 10000000,
    rollup_base_and_all_options_value: 106987321.10,
    rollup_total_obligation: 1623321.02
};

export const mockReferencedAwards = {
    results: [
        {
            award_id: 8330000,
            award_type: 'DO',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            funding_agency: 'DEPARTMENT OF DEFENSE (DOD)',
            funding_agency_id: 884,
            generated_unique_award_id: 'CONT_AW_9700_9700_71T0_SPM30008D3155',
            last_date_to_order: null,
            obligated_amount: 4080.71,
            period_of_performance_current_end_date: '2013-05-06',
            period_of_performance_start_date: '2013-04-28',
            piid: '71T0'
        }
    ],
    page_metadata: {
        hasPrevious: false,
        next: 2,
        hasNext: true,
        previous: null,
        page: 1
    }
};

export const mockFederalAccountFunding = {
    results: [
        {
            account_title: 'Sandwich & Subs Account',
            award_id: 1111111,
            generated_unique_award_id: 'CONT_AW_1111_1111_10KSC011F0000_NNK11MA14C',
            object_class: '111',
            object_class_name: 'Research Bread Types',
            piid: '111D111B1111',
            program_activity_code: '1111',
            program_activity_name: 'Sandwich Logistics',
            reporting_agency_name: 'National Department of Sandwich Making & Eating',
            reporting_agency_id: '987',
            reporting_fiscal_quarter: 2,
            reporting_fiscal_year: 2018,
            transaction_obligated_amount: 9469,
            agency_id: '091',
            main_account_code: '1901'
        }
    ],
    page_metadata: {
        page: 1,
        previous: null,
        hasPrevious: false,
        hasNext: false,
        next: null
    }
};

export const mockAwardFundingMetaData = {
    total_transaction_obligated_amount: 42946881.56,
    awarding_agency_count: 27,
    federal_account_count: 47
};
