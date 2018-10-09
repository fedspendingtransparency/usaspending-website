/**
 * mockAwardApi.js
 * Created by Lizzie Salita 3/20/18
 */

export const mockAwardV1Api = {
    category: 'contract',
    base_and_all_options_value: 1023.75,
    total_obligation: 1023.1,
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        contract_data: {
            idv_type: 'mock idv type',
            contract_award_type_desc: 'mock contract type',
            awarding_office_name: 'Office of Cheesesteak',
            product_or_service_code: 'psc',
            product_or_service_desc: 'product/service description',
            naics: 'naics',
            naics_description: null,
            clinger_cohen_act_planning: null
        }
    },
    place_of_performance: {
        city_name: 'Pawnee',
        county_name: 'Wamapoke',
        state_code: 'IN',
        state: 'Indiana',
        zip5: '12345',
        congressional_code: '04'
    },
    recipient: {
        legal_entity_id: '11111',
        recipient_name: 'Entertainment 720',
        recipient_unique_id: 'ABC123',
        business_types_description: null,
        nonprofit_organization: true,
        minority_owned_business: true,
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        },
        officers: {
            officer_1_name: 'George Washington',
            officer_1_amount: '9000.00',
            officer_2_name: 'John Adams',
            officer_2_amount: '7000.99',
            officer_3_name: 'Thomas Jefferson',
            officer_3_amount: '6000.01',
            officer_4_name: 'James Madison',
            officer_4_amount: '5000.00'
        }
    }
};

export const mockLoanApi = {
    category: 'loans',
    total_subsidy_cost: '1005.62',
    total_loan_value: '1023.4',
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        assistance_data: {
            awarding_office_name: 'Office of Cheesesteak',
            cfda_number: '789',
            cfda_title: 'Mock CFDA Title'
        }
    },
    place_of_performance: {
        city_name: 'Pawnee',
        county_name: 'Wamapoke',
        state_code: 'IN',
        state: 'Indiana',
        zip5: '12345',
        congressional_code: '04'
    },
    recipient: {
        legal_entity_id: '11111',
        recipient_name: 'Entertainment 720',
        recipient_unique_id: 'ABC123',
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        }
    }
};

export const mockContract = {
    type: 'A',
    category: 'contract',
    type_description: 'Testing 123',
    description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
    piid: '34242',
    parent_award_piid: '1301',
    total_obligation: 123231313,
    base_and_all_options_value: 234234.00,
    subaward_count: 2342334,
    total_subaward_amount: 3242342,
    awarding_agency: {
        toptier_agency: {
            name: "Department of Defense",
            abbreviation: "DOD"
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
        business_categories_name: ['Testing 1', 'Testing 2']
    },
    period_of_performance: {
        period_of_performance_start_date: `2004-02-19`,
        period_of_performance_current_end_date: `2005-02-19`
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
        idv_type_description: `test`,
        type_of_idc_description: `r3w`,
        referenced_idv_agency_iden: `424`,
        multiple_or_single_aw_desc: `testing`,
        solicitation_identifier: `DE-2342-323-SOL`,
        solicitation_procedures: `Quote`,
        number_of_offers_received: `4`,
        extent_competed: `Full`,
        other_than_full_and_o_desc: `none`,
        type_set_aside_description: `No set aside used`,
        commercial_item_acquisitio: `COMMERCIAL ITEM`,
        commercial_item_test_desc: `PROCEDURE NOT USED`,
        evaluated_preference_desc: `NO`,
        fed_biz_opps_description: `No Preference Used`,
        small_business_competitive: `Yes`,
        fair_opportunity_limi_desc: `test`,
        product_or_service_code: `t324242`,
        product_or_service_co_desc: `423we`,
        naics: `35353`,
        naics_description: null,
        dod_claimant_program_code: `ERWRWRWR5242-242`,
        program_system_or_equipmen: `unknown`,
        information_technolog_desc: `ERWRWRWR5242-242`,
        sea_transportation_desc: `seaworld`,
        clinger_cohen_act_pla_desc: null,
        construction_wage_rat_desc: `TES`,
        labor_standards_descrip: `NO`,
        materials_supplies_descrip: `YES`,
        cost_or_pricing_data_desc: `No`,
        domestic_or_foreign_e_desc: `U.S. Owned`,
        foreign_funding_desc: `Yes`,
        interagency_contract_desc: `Company A`,
        major_program: `None used`,
        price_evaluation_adjustmen: `0.00`,
        program_acronym: `NOT SURE`,
        subcontracting_plan: `PLAN`,
        multi_year_contract_desc: `No`,
        purchase_card_as_paym_desc: `Yes`,
        consolidated_contract_desc: `NO`,
        type_of_contract_pric_desc: `FIRM FIXED PRICE`
    },
    executive_details: {
        officers: [{
            name: "John Doe",
            amount: 12132
        }, {
            name: "Jake Doe",
            amount: 23432
        }]
    }

};

export const mockLoan = {
type: 'C',
category: 'loan',
type_description: 'Testing 123',
description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
piid: '342332',
parent_award_piid: '1301',
cfda_objectives: 'Testing testing testing',
cfda_number: `0.434`,
cfda_title: `Flood Insurance`,
total_obligation: 123231313,
subaward_count: 23423343,
total_subsidy_cost: 123,
total_loan_value: 24343,
total_subaward_amount: 32423342,
awarding_agency: {
    toptier_agency: {
        name: "Department of Defense",
        abbreviation: "DOD"
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
    business_categories_name: ['Testing 1', 'Testing 2']
},
period_of_performance: {
    period_of_performance_start_date: `2004-02-19`,
    period_of_performance_current_end_date: `2005-02-19`
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
    executive_details: {
        officers: [{
            name: "John Doe",
            amount: 12132
        }, {
            name: "Jake Doe",
            amount: null
        }, {
            name: null,
            amount: null
        }]
    }
};
