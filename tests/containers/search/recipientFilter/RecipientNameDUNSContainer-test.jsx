/**
 * RecipientNameDUNSContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { OrderedMap } from 'immutable';

import { RecipientNameDUNSContainer } from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

const setup = (props) => mount(<RecipientNameDUNSContainer {...props} />);

const initialFilters = {
    autocompleteRecipients: []
};

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

const apiResponse = {
    matched_objects: {
        recipient_name: {
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
        },
        recipient_unique_id: []
    }
};

// we don't want to actually hit the API because tests should be fully controlled, so we will mock
// the SearchHelper functions
const mockSearchHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();
    // override the specified function
    SearchHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

const unmockSearchHelper = () => {
    jest.useRealTimers();
    jest.unmock('helpers/searchHelper');
};

describe('RecipientNameDUNSContainer', () => {
    describe('Handling text input', () => {
        it('should handle text input after 300ms', () => {
            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipients: recipientActions.setAutocompleteRecipients,
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');

            // Call handleTextInput function
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
        });

        it('should call the queryAutocompleteRecipients method 300ms ' +
            'after text input', () => {
            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipients: recipientActions.setAutocompleteRecipients,
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });
            const searchQuery = {
                target: {
                    value: 'B'
                }
            };

            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            // Call handleTextInput function
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // the mocked SearchHelper waits 1 tick to resolve the promise, so wait for the tick
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);

            // reset the spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should not search when only one character has been input', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipients: mockReduxAction,
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');

            const searchQuery = {
                target: {
                    value: 'B'
                }
            };
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(1000);

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the mocks and spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should search when more than one character has been input ' +
            'into the Recipient Name/DUNS field', () => {
            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn();

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipients: mockReduxAction,
                selectedRecipients: new OrderedMap(),
                autocompleteRecipients: []
            });

            // set up spies
            const handleTextInputSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'handleTextInput');
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');

            const searchQuery = {
                target: {
                    value: 'Booz Allen'
                }
            };
            recipientNameDUNSContainer.instance().handleTextInput(searchQuery);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(300);

            // Run fake timer for input delay
            jest.runAllTicks();

            // everything should be updated now
            expect(handleTextInputSpy.callCount).toEqual(1);
            expect(queryAutocompleteRecipientsSpy.calledWith(handleTextInputSpy));

            // Reset spies
            handleTextInputSpy.reset();
            queryAutocompleteRecipientsSpy.reset();
        });

        it('should populate Recipients after performing the search', () => {
            // Setup redux state
            const reduxState = [{
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
            }];

            // setup mock redux actions for handling search results
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(reduxState);
            });

            // Set up the Container and call the function to type a single letter
            const recipientNameDUNSContainer = setup({
                reduxFilters: initialFilters,
                setAutocompleteRecipients: mockReduxAction,
                autocompleteRecipients: reduxState,
                selectedRecipients: new OrderedMap()
            });

            // Mock the search helper to resolve with the mocked response
            mockSearchHelper('fetchRecipients', 'resolve', apiResponse);

            // Run fake timer for input delay
            jest.useFakeTimers().runTimersToTime(10000);

            // Run all ticks
            jest.runAllTicks();

            // Set up spies
            const queryAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'queryAutocompleteRecipients');
            const parseAutocompleteRecipientsSpy = sinon.spy(recipientNameDUNSContainer.instance(),
                'parseAutocompleteRecipients');

            recipientNameDUNSContainer.instance().queryAutocompleteRecipients('Booz Allen');

            // Run all ticks
            jest.runAllTicks();

            expect(queryAutocompleteRecipientsSpy.callCount).toEqual(1);
            expect(parseAutocompleteRecipientsSpy.calledWith(queryAutocompleteRecipientsSpy));
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the mock
            unmockSearchHelper();

            // Reset spies
            queryAutocompleteRecipientsSpy.reset();
            parseAutocompleteRecipientsSpy.reset();
        });
    });
});
