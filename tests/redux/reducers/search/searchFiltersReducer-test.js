/**
 * searchFiltersReducer-test.js
 * Created by Kevin Li 1/17/17
 */

import { Set, OrderedMap } from 'immutable';

import searchFiltersReducer from 'redux/reducers/search/searchFiltersReducer';
import { awardRanges } from 'dataMapping/search/awardAmount';
import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

const initialState = {
    keyword: '',
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all',
    budgetFunctions: new OrderedMap(),
    federalAccounts: new OrderedMap(),
    objectClasses: new OrderedMap(),
    selectedFundingAgencies: new OrderedMap(),
    selectedAwardingAgencies: new OrderedMap(),
    selectedRecipients: new OrderedMap(),
    recipientDomesticForeign: 'all',
    selectedRecipientLocations: new OrderedMap(),
    selectedAwardIDs: new OrderedMap(),
    awardAmounts: new OrderedMap()
};

describe('searchFiltersReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            searchFiltersReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('TOGGLE_SEARCH_FILTER_AWARD_TYPE', () => {
        const action = {
            type: 'TOGGLE_SEARCH_FILTER_AWARD_TYPE',
            awardType: '09'
        };

        it('should add a value if it does not currently exist in the set', () => {
            const startingState = Object.assign({}, initialState);

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '09'
            ]));
        });

        it('should remove a value if currently exists in the set', () => {
            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09'])
            });

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([]));
        });
    });

    describe('BULK_SEACH_FILTER_AWARD_TYPE', () => {
        it('should add the provided values when the direction is "add"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: [
                    '10',
                    '06'
                ],
                direction: 'add'
            };

            const startingState = Object.assign({}, initialState);

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '10',
                '06'
            ]));
        });

        it('should remove the provided values when the direction is "remove"', () => {
            const action = {
                type: 'BULK_SEARCH_FILTER_AWARD_TYPE',
                awardTypes: [
                    '10',
                    '06'
                ],
                direction: 'remove'
            };

            const startingState = Object.assign({}, initialState, {
                awardType: new Set(['09', '10', '06'])
            });

            expect(
                searchFiltersReducer(startingState, action).awardType
            ).toEqual(new Set([
                '09'
            ]));
        });
    });

    describe('UPDATE_SEARCH_FILTER_TIME_PERIOD', () => {
        it('should set the time period value to the provided action data', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: [
                    '2017',
                    '2015',
                    '2013'
                ],
                start: null,
                end: null
            };

            const expected = {
                timePeriodType: 'fy',
                timePeriodFY: new Set([
                    '2017',
                    '2015',
                    '2013'
                ]),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            const updatedState = searchFiltersReducer(undefined, action);

            Object.keys(expected).forEach((key) => {
                expect(updatedState[key]).toEqual(expected[key]);
            });
        });
    });

    describe('UPDATE_TEXT_SEARCH', () => {
        it('should set the keyword filter option to the input string', () => {
            const action = {
                type: 'UPDATE_TEXT_SEARCH',
                textInput: 'business'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.keyword).toEqual('business');
        });
    });

    describe('UPDATE_SELECTED_LOCATIONS', () => {
        const action = {
            type: 'UPDATE_SELECTED_LOCATIONS',
            location: {
                matched_ids: [2, 3],
                place_type: 'CITY',
                parent: 'INDIANA',
                place: 'PAWNEE'
            }
        };

        const cityId = `2,3_PAWNEE_CITY`;

        const expectedCity = {
            matched_ids: [2, 3],
            place_type: 'CITY',
            parent: 'INDIANA',
            place: 'PAWNEE',
            identifier: cityId
        };

        it('should add the provided location if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap({
                [cityId]: expectedCity
            }));
        });

        it('should remove the provided location if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedLocations: new OrderedMap({
                    [cityId]: expectedCity
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedLocations).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_DOMESTIC_FOREIGN', () => {
        it('should set the domestic/foreign filter scope to the input string', () => {
            const action = {
                type: 'UPDATE_DOMESTIC_FOREIGN',
                selection: 'domestic'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.locationDomesticForeign).toEqual('domestic');
        });
    });

    describe('UPDATE_SELECTED_BUDGET_FUNCTIONS', () => {
        const action = {
            type: 'UPDATE_SELECTED_BUDGET_FUNCTIONS',
            budgetFunction: {
                title: 'Income Security',
                functionType: 'Function'
            }
        };

        const identifier = 'Income Security';

        const expectedValue = {
            title: 'Income Security',
            functionType: 'Function'
        };

        it('should add the provided budget function if it does not currently exist in the filter',
            () => {
                const updatedState = searchFiltersReducer(undefined, action);
                expect(updatedState.budgetFunctions).toEqual(new OrderedMap({
                    [identifier]: expectedValue
                }));
            });

        it('should remove the provided budget function if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                budgetFunctions: new OrderedMap({
                    [identifier]: expectedValue
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.budgetFunctions).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_FEDERAL_ACCOUNTS', () => {
        const action = {
            type: 'UPDATE_SELECTED_FEDERAL_ACCOUNTS',
            federalAccount: {
                id: '392',
                agency_identifier: '012',
                main_account_code: '3539',
                account_title: 'Child Nutrition Programs, Food Nutrition Service, Agriculture'
            }
        };

        const identifier = '392';

        const expectedValue = {
            id: '392',
            agency_identifier: '012',
            main_account_code: '3539',
            account_title: 'Child Nutrition Programs, Food Nutrition Service, Agriculture'
        };

        it('should add the provided federal account if it does not currently exist in the filter',
            () => {
                const updatedState = searchFiltersReducer(undefined, action);
                expect(updatedState.federalAccounts).toEqual(new OrderedMap({
                    [identifier]: expectedValue
                }));
            });

        it('should remove the provided federal account if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                federalAccounts: new OrderedMap({
                    [identifier]: expectedValue
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.federalAccounts).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_OBJECT_CLASSES', () => {
        const action = {
            type: 'UPDATE_SELECTED_OBJECT_CLASSES',
            objectClass: '10'
        };

        const identifier = '10';

        const expectedValue = objectClassDefinitions[identifier];

        it('should add the provided federal account if it does not currently exist in the filter',
            () => {
                const updatedState = searchFiltersReducer(undefined, action);
                expect(updatedState.objectClasses).toEqual(new OrderedMap({
                    [identifier]: expectedValue
                }));
            });

        it('should remove the provided federal account if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                objectClasses: new OrderedMap({
                    [identifier]: expectedValue
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.objectClasses).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_AWARDING_AGENCIES', () => {
        const action = {
            type: 'UPDATE_SELECTED_AWARDING_AGENCIES',
            agency: {
                id: 1788,
                create_date: "2017-01-12T19:56:30.517000Z",
                update_date: "2017-01-12T19:56:30.517000Z",
                toptier_agency: {
                    toptier_agency_id: 268,
                    create_date: "2017-01-31T21:25:39.810344Z",
                    update_date: "2017-01-31T21:25:39.936439Z",
                    cgac_code: "097",
                    fpds_code: "9700",
                    name: "DEPT OF DEFENSE"
                },
                subtier_agency: {
                    subtier_agency_id: 1654,
                    create_date: "2017-01-31T21:25:39.569918Z",
                    update_date: "2017-01-31T21:25:39.691244Z",
                    subtier_code: "1700",
                    name: "DEPT OF THE NAVY"
                },
                office_agency: null,
                agencyType: 'subtier'
            }
        };

        const agency = "1788_subtier";

        const expectedAgency = {
            id: 1788,
            create_date: "2017-01-12T19:56:30.517000Z",
            update_date: "2017-01-12T19:56:30.517000Z",
            toptier_agency: {
                toptier_agency_id: 268,
                create_date: "2017-01-31T21:25:39.810344Z",
                update_date: "2017-01-31T21:25:39.936439Z",
                cgac_code: "097",
                fpds_code: "9700",
                name: "DEPT OF DEFENSE"
            },
            subtier_agency: {
                subtier_agency_id: 1654,
                create_date: "2017-01-31T21:25:39.569918Z",
                update_date: "2017-01-31T21:25:39.691244Z",
                subtier_code: "1700",
                name: "DEPT OF THE NAVY"
            },
            office_agency: null,
            agencyType: 'subtier'
        };

        it('should add the provided agency if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedAwardingAgencies).toEqual(
                new OrderedMap([[agency, expectedAgency]])
            );
        });

        it('should remove the provided agency if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedAwardingAgencies: new OrderedMap([[agency, expectedAgency]])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedAwardingAgencies).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_FUNDING_AGENCIES', () => {
        const action = {
            type: 'UPDATE_SELECTED_FUNDING_AGENCIES',
            agency: {
                id: 1788,
                create_date: "2017-01-12T19:56:30.517000Z",
                update_date: "2017-01-12T19:56:30.517000Z",
                toptier_agency: {
                    toptier_agency_id: 268,
                    create_date: "2017-01-31T21:25:39.810344Z",
                    update_date: "2017-01-31T21:25:39.936439Z",
                    cgac_code: "097",
                    fpds_code: "9700",
                    name: "DEPT OF DEFENSE"
                },
                subtier_agency: {
                    subtier_agency_id: 1654,
                    create_date: "2017-01-31T21:25:39.569918Z",
                    update_date: "2017-01-31T21:25:39.691244Z",
                    subtier_code: "1700",
                    name: "DEPT OF THE NAVY"
                },
                office_agency: null,
                agencyType: 'subtier'
            }
        };

        const agency = "1788_subtier";

        const expectedAgency = {
            id: 1788,
            create_date: "2017-01-12T19:56:30.517000Z",
            update_date: "2017-01-12T19:56:30.517000Z",
            toptier_agency: {
                toptier_agency_id: 268,
                create_date: "2017-01-31T21:25:39.810344Z",
                update_date: "2017-01-31T21:25:39.936439Z",
                cgac_code: "097",
                fpds_code: "9700",
                name: "DEPT OF DEFENSE"
            },
            subtier_agency: {
                subtier_agency_id: 1654,
                create_date: "2017-01-31T21:25:39.569918Z",
                update_date: "2017-01-31T21:25:39.691244Z",
                subtier_code: "1700",
                name: "DEPT OF THE NAVY"
            },
            office_agency: null,
            agencyType: 'subtier'
        };

        it('should add the provided agency if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedFundingAgencies).toEqual(
                new OrderedMap([[agency, expectedAgency]])
            );
        });

        it('should remove the provided agency if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedFundingAgencies: new OrderedMap([[agency, expectedAgency]])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedFundingAgencies).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_RECIPIENTS', () => {
        const action = {
            type: 'UPDATE_SELECTED_RECIPIENTS',
            recipient: {
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
        };

        const recipient = "006928857";

        const expectedRecipient = {
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
        };

        it('should add the Recipient if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);

            expect(updatedState.selectedRecipients).toEqual(
                new OrderedMap([[recipient, expectedRecipient]])
            );
        });

        it('should remove the Recipient if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedRecipients: new OrderedMap([[recipient, expectedRecipient]])
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedRecipients).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_RECIPIENT_DOMESTIC_FORIEGN', () => {
        it('should set the Recipient domestic/foreign filter ' +
            'scope to the input string', () => {
            const action = {
                type: 'UPDATE_RECIPIENT_DOMESTIC_FORIEGN',
                selection: 'domestic'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.recipientDomesticForeign).toEqual('domestic');
        });
    });

    describe('UPDATE_RECIPIENT_LOCATIONS', () => {
        const action = {
            type: 'UPDATE_RECIPIENT_LOCATIONS',
            location: {
                place_type: "COUNTY",
                matched_ids: [22796],
                place: "McLean",
                parent: "KENTUCKY"
            }
        };

        const recipientCityId = `22796_McLean_COUNTY`;

        const expectedRecipientCity = {
            place_type: "COUNTY",
            matched_ids: [22796],
            place: "McLean",
            parent: "KENTUCKY",
            identifier: recipientCityId
        };

        it('should add the provided location if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedRecipientLocations).toEqual(new OrderedMap({
                [recipientCityId]: expectedRecipientCity
            }));
        });

        it('should remove the provided location if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedRecipientLocations: new OrderedMap({
                    [recipientCityId]: expectedRecipientCity
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedRecipientLocations).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_SELECTED_AWARD_IDS', () => {
        const action = {
            type: 'UPDATE_SELECTED_AWARD_IDS',
            awardID: {
                id: "601793",
                piid: "AG3142B100012",
                fain: null,
                uri: null
            }
        };

        const awardIDID = "601793";

        const expectedAwardID = {
            id: "601793",
            piid: "AG3142B100012",
            fain: null,
            uri: null
        };

        it('should add the provided award ID if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.selectedAwardIDs).toEqual(new OrderedMap({
                [awardIDID]: expectedAwardID
            }));
        });

        it('should remove the provided award ID if already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                selectedAwardIDs: new OrderedMap({
                    [awardIDID]: expectedAwardID
                })
            });

            const updatedState = searchFiltersReducer(startingState, action);
            expect(updatedState.selectedAwardIDs).toEqual(new OrderedMap());
        });
    });

    describe('UPDATE_AWARD_AMOUNTS', () => {
        const predefinedRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: {
                amount: "range-1",
                searchType: 'range'
            }
        };

        const specificRangeAction = {
            type: 'UPDATE_AWARD_AMOUNTS',
            awardAmounts: {
                amount: [10000, 20000],
                searchType: 'specific'
            }
        };

        const predefinedAwardAmount = "range-1";
        const expectedpredefinedAwardAmount = awardRanges[predefinedAwardAmount];

        const specificAwardAmount = [10000, 20000];

        it('should add the predefined Award Amount ' +
            'if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, predefinedRangeAction);
            expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                [predefinedAwardAmount]: expectedpredefinedAwardAmount
            }));
        });

        it('should remove the predefined Award Amount ' +
            'if it already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                awardAmounts: new OrderedMap({
                    [predefinedAwardAmount]: expectedpredefinedAwardAmount
                })
            });

            const updatedState = searchFiltersReducer(startingState, predefinedRangeAction);
            expect(updatedState.selectedAwardIDs).toEqual(new OrderedMap());
        });

        it('should add the specific Award Amount ' +
            'if it does not currently exist in the filter', () => {
            const updatedState = searchFiltersReducer(undefined, specificRangeAction);
            expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                specific: specificAwardAmount
            }));
        });

        it('should remove the specific Award Amount ' +
            'if it already exists in the filter', () => {
            const startingState = Object.assign({}, initialState, {
                awardAmounts: new OrderedMap({
                    specific: specificAwardAmount
                })
            });

            const updatedState = searchFiltersReducer(startingState, specificRangeAction);
            expect(updatedState.selectedAwardIDs).toEqual(new OrderedMap());
        });

        it('should remove a specific Award Amount ' +
            'if a predefined Award Amount is specified', () => {
            const startingState = Object.assign({}, initialState, {
                awardAmounts: new OrderedMap({
                    specific: specificAwardAmount
                })
            });

            const updatedState = searchFiltersReducer(startingState, predefinedRangeAction);
            expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                [predefinedAwardAmount]: expectedpredefinedAwardAmount
            }));
        });

        it('should remove a predefined Award Amount ' +
            'if a specific Award Amount is specified', () => {
            const startingState = Object.assign({}, initialState, {
                awardAmounts: new OrderedMap({
                    [predefinedAwardAmount]: expectedpredefinedAwardAmount
                })
            });

            const updatedState = searchFiltersReducer(startingState, specificRangeAction);
            expect(updatedState.awardAmounts).toEqual(new OrderedMap({
                specific: specificAwardAmount
            }));
        });
    });

    describe('UPDATE_SEARCH_FILTER_GENERIC', () => {
        it('should set an arbitrary child filter key with the given filter value', () => {
            const action = {
                type: 'UPDATE_SEARCH_FILTER_GENERIC',
                filterType: 'timePeriodType',
                filterValue: 'dr'
            };

            const updatedState = searchFiltersReducer(undefined, action);
            expect(updatedState.timePeriodType).toEqual('dr');
        });
    });

    describe('RESET_SEARCH_TIME_FILTER', () => {
        it('should reset the fields relevant to time period filtering to their initial state'
        + ' values after fiscal years change', () => {
            const firstAction = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: [
                    '2017',
                    '2015',
                    '2013'
                ],
                start: null,
                end: null
            };

            const resetAction = {
                type: 'RESET_SEARCH_TIME_FILTER'
            };

            const expectedFirst = {
                timePeriodType: 'fy',
                timePeriodFY: new Set([
                    '2017',
                    '2015',
                    '2013'
                ]),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            const expectedSecond = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            // perform the first action to change the time period filter values
            let updatedState = searchFiltersReducer(undefined, firstAction);
            // validate that the search filters changed
            Object.keys(expectedFirst).forEach((key) => {
                expect(updatedState[key]).toEqual(expectedFirst[key]);
            });


            // reset the time period filters
            updatedState = searchFiltersReducer(updatedState, resetAction);
            // validate that the search filters reset
            Object.keys(expectedSecond).forEach((key) => {
                expect(updatedState[key]).toEqual(expectedSecond[key]);
            });
        });

        it('should reset the fields relevant to time period filtering to their initial state'
        + ' values after a date range changes', () => {
            const firstAction = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'dr',
                fy: [],
                start: '2016-01-01',
                end: '2016-12-31'
            };

            const resetAction = {
                type: 'RESET_SEARCH_TIME_FILTER'
            };

            const expectedFirst = {
                timePeriodType: 'dr',
                timePeriodFY: new Set(),
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            };

            const expectedSecond = {
                timePeriodType: 'fy',
                timePeriodFY: new Set(),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            // perform the first action to change the time period filter values
            let updatedState = searchFiltersReducer(undefined, firstAction);
            // validate that the search filters changed
            Object.keys(expectedFirst).forEach((key) => {
                expect(updatedState[key]).toEqual(expectedFirst[key]);
            });


            // reset the time period filters
            updatedState = searchFiltersReducer(updatedState, resetAction);
            // validate that the search filters reset
            Object.keys(expectedSecond).forEach((key) => {
                expect(updatedState[key]).toEqual(expectedSecond[key]);
            });
        });
    });

    describe('CLEAR_SEARCH_FILTER_TYPE', () => {
        it('should reset a single search filter to its initial state value', () => {
            const firstAction = {
                type: 'UPDATE_SEARCH_FILTER_GENERIC',
                filterType: 'awardType',
                filterValue: new Set(['03', '04'])
            };

            const clearAction = {
                type: 'CLEAR_SEARCH_FILTER_TYPE',
                filterType: 'awardType'
            };

            const firstExpected = new Set(['03', '04']);
            const secondExpected = new Set();

            // perform the first action that updates the award type filter
            let updatedState = searchFiltersReducer(undefined, firstAction);
            expect(updatedState.awardType).toEqual(firstExpected);

            // perform the clear action to reset the award type filter value
            updatedState = searchFiltersReducer(updatedState, clearAction);
            expect(updatedState.awardType).toEqual(secondExpected);
        });
    });

    describe('CLEAR_SEARCH_FILTER_ALL', () => {
        it('should reset the search filters to the initial state after multiple actions have been'
            + ' performed', () => {
            const firstAction = {
                type: 'UPDATE_DOMESTIC_FOREIGN',
                selection: 'domestic'
            };

            const secondAction = {
                type: 'UPDATE_SEARCH_FILTER_TIME_PERIOD',
                dateType: 'fy',
                fy: [
                    '2017',
                    '2015',
                    '2013'
                ],
                start: null,
                end: null
            };

            const firstExpected = 'domestic';
            const secondExpected = {
                timePeriodType: 'fy',
                timePeriodFY: new Set([
                    '2017',
                    '2015',
                    '2013'
                ]),
                timePeriodStart: null,
                timePeriodEnd: null
            };

            // perform the first action that updates the domestic/foreign scope
            let updatedState = searchFiltersReducer(undefined, firstAction);
            expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

            // perform the second action to modify the time period
            updatedState = searchFiltersReducer(updatedState, secondAction);
            Object.keys(secondExpected).forEach((key) => {
                expect(updatedState[key]).toEqual(secondExpected[key]);
            });

            // validate that the changes from the first action remained
            expect(updatedState.locationDomesticForeign).toEqual(firstExpected);

            // reset the state to its initial value
            const finalAction = {
                type: 'CLEAR_SEARCH_FILTER_ALL'
            };
            updatedState = searchFiltersReducer(updatedState, finalAction);
            expect(updatedState).toEqual(initialState);
        });
    });
});
