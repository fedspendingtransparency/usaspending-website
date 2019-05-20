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
        clinger_cohen_act_planning: "N",
        clinger_cohen_act_planning_description: null,
        commercial_item_acquisition: "D",
        commercial_item_acquisition_description: "COMMERCIAL ITEM PROCEDURES NOT USED",
        commercial_item_test_program: null,
        commercial_item_test_program_description: null,
        consolidated_contract: "D",
        consolidated_contract_description: "NOT CONSOLIDATED",
        construction_wage_rate: "X",
        construction_wage_rate_description: "NOT APPLICABLE",
        cost_or_pricing_data: "N",
        cost_or_pricing_data_description: "NO",
        dod_acquisition_program: "000",
        dod_acquisition_program_description: null,
        dod_claimant_program: "A1C",
        dod_claimant_program_description: "OTHER AIRCRAFT EQUIPMENT ",
        domestic_or_foreign_entity: "A",
        domestic_or_foreign_entity_description: "U.S. OWNED BUSINESS",
        evaluated_preference: "NONE",
        evaluated_preference_description: "NO PREFERENCE USED",
        extent_competed: null,
        extent_competed_description: "NOT COMPETED UNDER SAP",
        fair_opportunity_limited: null,
        fair_opportunity_limited_description: null,
        fed_biz_opps: "N",
        fed_biz_opps_description: "NO",
        foreign_funding: "X",
        foreign_funding_description: "NOT APPLICABLE",
        idv_type_description: null,
        information_technology_commercial_item_category: "Z",
        information_technology_commercial_item_category_description: "NOT IT PRODUCTS OR SERVICES",
        interagency_contracting_authority: "X",
        interagency_contracting_authority_description: "NOT APPLICABLE",
        labor_standards: "X",
        labor_standards_description: "NOT APPLICABLE",
        major_program: null,
        materials_supplies: "Y",
        materials_supplies_description: "YES",
        multi_year_contract: null,
        multi_year_contract_description: null,
        multiple_or_single_award_description: null,
        naics: "336413",
        naics_description: "OTHER AIRCRAFT PARTS AND AUXILIARY EQUIPMENT MANUFACTURING",
        number_of_offers_received: "1",
        other_than_full_and_open: "SP2",
        other_than_full_and_open_description: "SAP NON-COMPETITION (FAR 13)",
        price_evaluation_adjustment: null,
        product_or_service_code: "1560",
        product_or_service_description: "AIRFRAME STRUCTURAL COMPONENTS",
        program_acronym: null,
        purchase_card_as_payment_method: "N",
        purchase_card_as_payment_method_description: "NO",
        referenced_idv_agency_iden: "9700",
        sea_transportation: "U",
        sea_transportation_description: "UNKNOWN",
        small_business_competitive: false,
        solicitation_identifier: "SPE4A717U0350",
        solicitation_procedures: "SP1",
        solicitation_procedures_description: "SIMPLIFIED ACQUISITION",
        subcontracting_plan: null,
        subcontracting_plan_description: null,
        type_of_contract_pricing: "J",
        type_of_contract_pricing_description: "FIRM FIXED PRICE",
        type_of_idc_description: null,
        type_set_aside: "NONE",
        type_set_aside_description: "NO SET ASIDE USED."
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
    child_award_count: 10,
    child_award_base_exercised_options_val: 5000000,
    grandchild_award_base_exercised_options_val: 5000000,
    child_award_base_and_all_options_value: 53493660.55,
    grandchild_award_base_and_all_options_value: 53493660.55,
    child_award_total_obligation: 811660.51,
    grandchild_award_total_obligation: 811660.51

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

export const mockFileDownloadResponse = {
    total_size: 35.055,
    file_name: `012_account_balances_20180613140845.zip`,
    total_rows: 652,
    total_columns: 27,
    url: `S3/path_to/bucket/012_account_balances_20180613140845.zip`,
    status: `finished`,
    seconds_elapsed: `10.061132`
};

export const mockAwardFederalAccounts = {
    page_metadata: {
        count: 3,
        hasNext: true,
        hasPrevious: false,
        next: 0,
        page: 1,
        previous: null
    },
    results: [
        {
            account_title: 'Operations Support,Internal Revenue Service, Treasury',
            federal_account: '020-0919',
            funding_agency_abbreviation: 'TREAS',
            funding_agency_id: 456,
            funding_agency_name: 'Department of the Treasury',
            total_transaction_obligated_amount: 42029539.53
        },
        {
            account_title: 'Program Management, Centers for Medicare and Medicaid Services',
            federal_account: '075-0511',
            funding_agency_abbreviation: 'HHS',
            funding_agency_id: 806,
            funding_agency_name: 'Department of Health and Human Services',
            total_transaction_obligated_amount: 37865386
        },
        {
            account_title: 'Diplomatic and Consular Programs, State',
            federal_account: '019-0113',
            funding_agency_abbreviation: 'DOS',
            funding_agency_id: 315,
            funding_agency_name: 'Department of State',
            total_transaction_obligated_amount: 32912320.74
        }
    ],
    total: 271716259.64
};
