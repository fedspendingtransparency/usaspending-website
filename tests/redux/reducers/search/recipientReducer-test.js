/**
 * recipientReducer-test.js
 * Created by michaelbray on 2/17/17.
 */

import recipientReducer from 'redux/reducers/search/recipientReducer';

const initialState = {
    recipients: [],
    recipientLocations: []
};

describe('recipientReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            recipientReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('SET_AUTOCOMPLETE_RECIPIENTS', () => {
        it('should return a new instance of the input recipients object', () => {
            const action = {
                type: 'SET_AUTOCOMPLETE_RECIPIENTS',
                recipients: [
                    {
                        legal_entity_id: 973,
                        data_source: null,
                        parent_recipient_unique_id: "964725688",
                        recipient_name: "BOOZ ALLEN HAMILTON INC.",
                        vendor_doing_as_business_name: null,
                        vendor_phone_number: "7033770195",
                        vendor_fax_number: "7039023200",
                        business_types: "UN",
                        business_types_description: "Unknown Business Type",
                        recipient_unique_id: "006928857",
                        limited_liability_corporation: "f",
                        sole_proprietorship: "f",
                        partnership_or_limited_liability_partnership: "f",
                        subchapter_scorporation: "f",
                        foundation: "f",
                        for_profit_organization: "t",
                        nonprofit_organization: "f",
                        corporate_entity_tax_exempt: "f",
                        corporate_entity_not_tax_exempt: "t",
                        other_not_for_profit_organization: "f",
                        sam_exception: null,
                        city_local_government: "f",
                        county_local_government: "f",
                        inter_municipal_local_government: "f",
                        local_government_owned: "f",
                        municipality_local_government: "f",
                        school_district_local_government: "f",
                        township_local_government: "f",
                        us_state_government: null,
                        us_federal_government: "f",
                        federal_agency: "f",
                        federally_funded_research_and_development_corp: "f",
                        us_tribal_government: "f",
                        foreign_government: "f",
                        community_developed_corporation_owned_firm: "f",
                        labor_surplus_area_firm: "f",
                        small_agricultural_cooperative: "f",
                        international_organization: "f",
                        us_government_entity: null,
                        emerging_small_business: null,
                        c8a_program_participant: "f",
                        sba_certified_8a_joint_venture: null,
                        dot_certified_disadvantage: "f",
                        self_certified_small_disadvantaged_business: null,
                        historically_underutilized_business_zone: "f",
                        small_disadvantaged_business: null,
                        the_ability_one_program: null,
                        historically_black_college: "f",
                        c1862_land_grant_college: "f",
                        c1890_land_grant_college: "f",
                        c1994_land_grant_college: "f",
                        minority_institution: "f",
                        private_university_or_college: "f",
                        school_of_forestry: "f",
                        state_controlled_institution_of_higher_learning: "f",
                        tribal_college: "f",
                        veterinary_college: "f",
                        educational_institution: "f",
                        alaskan_native_servicing_institution: "f",
                        community_development_corporation: "f",
                        native_hawaiian_servicing_institution: "f",
                        domestic_shelter: "f",
                        manufacturer_of_goods: "f",
                        hospital_flag: "f",
                        veterinary_hospital: "f",
                        hispanic_servicing_institution: "f",
                        woman_owned_business: "f",
                        minority_owned_business: "f",
                        women_owned_small_business: null,
                        economically_disadvantaged_women_owned_small_business: null,
                        joint_venture_women_owned_small_business: null,
                        joint_venture_economic_disadvantaged_women_owned_small_bus: null,
                        veteran_owned_business: "f",
                        service_disabled_veteran_owned_business: null,
                        contracts: null,
                        grants: null,
                        receives_contracts_and_grants: null,
                        airport_authority: "f",
                        council_of_governments: "f",
                        housing_authorities_public_tribal: "f",
                        interstate_entity: "f",
                        planning_commission: "f",
                        port_authority: "f",
                        transit_authority: "f",
                        foreign_owned_and_located: "f",
                        american_indian_owned_business: "f",
                        alaskan_native_owned_corporation_or_firm: "f",
                        indian_tribe_federally_recognized: "f",
                        native_hawaiian_owned_business: "f",
                        tribally_owned_business: "f",
                        asian_pacific_american_owned_business: "f",
                        black_american_owned_business: "f",
                        hispanic_american_owned_business: "f",
                        native_american_owned_business: "f",
                        subcontinent_asian_asian_indian_american_owned_business: "f",
                        other_minority_owned_business: "f",
                        us_local_government: "f",
                        undefinitized_action: null,
                        domestic_or_foreign_entity: null,
                        division_name: null,
                        division_number: null,
                        last_modified_date: null,
                        certified_date: null,
                        reporting_period_start: null,
                        reporting_period_end: null,
                        create_date: "2017-02-15T20:06:43.024083Z",
                        update_date: "2017-02-15T20:06:43.024108Z",
                        city_township_government: null,
                        special_district_government: null,
                        small_business: null,
                        individual: null,
                        location: {
                            location_id: 12619,
                            data_source: null,
                            country_name: "UNITED STATES",
                            state_code: "VA",
                            state_name: null,
                            state_description: null,
                            city_name: "McLean",
                            city_code: "48376",
                            county_name: "Fairfax",
                            county_code: "59",
                            address_line1: "8283 GREENSBORO DR",
                            address_line2: "",
                            address_line3: "",
                            foreign_location_description: null,
                            zip4: null,
                            zip_4a: null,
                            congressional_code: "11",
                            performance_code: null,
                            zip_last4: "3830",
                            zip5: "22102",
                            foreign_postal_code: null,
                            foreign_province: null,
                            foreign_city_name: null,
                            reporting_period_start: null,
                            reporting_period_end: null,
                            last_modified_date: null,
                            certified_date: null,
                            create_date: "2017-02-15T20:32:31.411437Z",
                            update_date: "2017-02-15T20:32:31.411470Z",
                            place_of_performance_flag: false,
                            recipient_flag: false,
                            location_country_code: "USA"
                        }
                    }
                ]
            };

            const updatedState = recipientReducer(undefined, action);

            // the value should be equal
            expect(updatedState.recipients).toEqual(action.recipients);
            // but it should be its own instance
            expect(updatedState.recipients).not.toBe(action.recipients);
        });
    });

    describe('SET_AUTOCOMPLETE_RECIPIENT_LOCATIONS', () => {
        it('should return a new instance of the input agency object', () => {
            const action = {
                type: 'SET_AUTOCOMPLETE_RECIPIENT_LOCATIONS',
                locations: [
                    {
                        place_type: "CITY",
                        matched_ids: [114, 76, 1319, 1328, 1589, 2460, 2454, 2467, 2461, 2469, 2837,
                            2843, 2849, 2852, 3025, 3830, 3838, 3792, 4317, 8051, 8120, 8180, 8053,
                            8041, 8206, 8209, 11011, 11004, 10983, 11008, 11005, 10965, 11013,
                            10985, 11010, 10953, 11760, 12619, 12623, 12696, 14179, 14526, 14801,
                            18603],
                        place: "McLean",
                        parent: null
                    },
                    {
                        place_type: "CITY",
                        matched_ids: [43315],
                        place: "MCLEANSBORO",
                        parent: null
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [770, 779, 12786, 15678, 16831, 16134, 16651, 16693, 17326,
                            20357, 21033, 20885, 22815, 22790, 25014, 24293, 25288, 26140, 28592,
                            29512, 29468, 29479, 29262, 31900, 35803, 37905, 38934, 41400, 42689,
                            43050, 45451, 45351, 47138, 47743, 47153, 47746, 47695, 47139, 47145,
                            47691, 47745, 47742, 47694],
                        place: "McLean",
                        parent: null
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [22796],
                        place: "McLean",
                        parent: "KENTUCKY"
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [15688],
                        place: "McLean",
                        parent: "ILLINOIS"
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [18612],
                        place: "MCLEAN",
                        parent: "NEBRASKA"
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [35810, 47141, 47698, 49171],
                        place: "MCLEAN",
                        parent: "ILLINOIS"
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [29271],
                        place: "MCLEAN",
                        parent: "KENTUCKY"
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [49167],
                        place: "MCLEAN",
                        parent: null
                    },
                    {
                        place_type: "COUNTY",
                        matched_ids: [38937],
                        place: "MCLEAN",
                        parent: "NORTH DAKOTA"
                    }
                ]
            };

            const updatedState = recipientReducer(undefined, action);

            // the value should be equal
            expect(updatedState.recipientLocations).toEqual(action.locations);
            // but it should be its own instance
            expect(updatedState.recipientLocations).not.toBe(action.locations);
        });
    });
});
