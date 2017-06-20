/**
 * RecipienSearchContainer-test.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { RecipientSearchContainer } from
    'containers/search/filters/recipient/RecipientSearchContainer';

const initialFilters = {
    selectedRecipients: {},
    recipientDomesticForeign: 'all',
    selectedRecipientLocations: {},
    recipientType: {}
};

const recipient = {
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

const location = {
    place_type: "CITY",
    matched_ids: [43315],
    place: "MCLEANSBORO",
    parent: null
};

describe('RecipientSearchContainer', () => {
    describe('Handling adding and removing recipients', () => {
        it('should add a Recipient that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
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
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedRecipients={mockReduxAction} />);

            const toggleRecipientSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipient');

            // Add Recipient to redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Everything should be updated now
            expect(toggleRecipientSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleRecipientSpy.reset();
        });

        it('should remove a Recipient that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
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
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedRecipients={mockReduxAction} />);

            const toggleRecipientSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipient');

            // Add Recipient to redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Remove Recipient from Redux
            recipientSearchContainer.instance().toggleRecipient(recipient);

            // Everything should be updated now
            expect(toggleRecipientSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // Reset the spy
            toggleRecipientSpy.reset();
        });
    });

    describe('Handling toggling location type', () => {
        it('should toggle the Show Only selection in Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('all');
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientDomesticForeignSelection={mockReduxAction} />);

            const toggleDomesticForeignSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleDomesticForeign');

            // Add Show Only selection to Redux
            recipientSearchContainer.instance().toggleDomesticForeign({
                target: {
                    value: 'all'
                }
            });

            // Everything should be updated now
            expect(toggleDomesticForeignSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleDomesticForeignSpy.reset();
        });
    });

    describe('Handling adding and removing recipient locations', () => {
        it('should add a Recipient Location that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    place_type: "CITY",
                    matched_ids: [43315],
                    place: "MCLEANSBORO",
                    parent: null
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientLocations={mockReduxAction} />);

            const toggleRecipientLocationSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientLocation');

            // Add Recipient Location to Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Everything should be updated now
            expect(toggleRecipientLocationSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // Reset the spy
            toggleRecipientLocationSpy.reset();
        });

        it('should remove a Recipient Location that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    place_type: "CITY",
                    matched_ids: [43315],
                    place: "MCLEANSBORO",
                    parent: null
                });
            });

            // Set up container with mocked action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    updateRecipientLocations={mockReduxAction} />);

            const toggleRecipientLocationSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientLocation');

            // Add Recipient Location to Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Remove Recipient Location from Redux
            recipientSearchContainer.instance().toggleRecipientLocation(location);

            // Everything should be updated now
            expect(toggleRecipientLocationSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // Reset the spy
            toggleRecipientLocationSpy.reset();
        });
    });

    describe('Handling adding and removing recipient types', () => {
        it('should add a Recipient Type that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('small_business');
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    toggleRecipientType={mockReduxAction} />);

            const toggleRecipientTypeSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientType');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // everything should be updated now
            expect(toggleRecipientTypeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            toggleRecipientTypeSpy.reset();
        });

        it('should remove a Recipient Type that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual('small_business');
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    toggleRecipientType={mockReduxAction} />);

            const toggleRecipientTypeSpy = sinon.spy(recipientSearchContainer.instance(),
                'toggleRecipientType');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // Remove Recipient Type from redux
            recipientSearchContainer.instance().toggleRecipientType('small_business');

            // everything should be updated now
            expect(toggleRecipientTypeSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            toggleRecipientTypeSpy.reset();
        });

        it('should add bulk Recipient Types that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    recipientTypes: [
                        'small_business',
                        'other_than_small_business'
                    ],
                    direction: 'add'
                });
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    bulkRecipientTypeChange={mockReduxAction} />);

            const bulkRecipientTypeChangeSpy = sinon.spy(recipientSearchContainer.instance(),
                'bulkRecipientTypeChange');

            // Add Recipient Type to redux
            recipientSearchContainer.instance().bulkRecipientTypeChange({
                recipientTypes: [
                    'small_business',
                    'other_than_small_business'
                ],
                direction: 'add'
            });

            // everything should be updated now
            expect(bulkRecipientTypeChangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            bulkRecipientTypeChangeSpy.reset();
        });

        it('should remove bulk Recipient Types that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    recipientTypes: [
                        'small_business',
                        'other_than_small_business'
                    ],
                    direction: 'remove'
                });
            });

            // Set up container with mocked Program Activity action
            const recipientSearchContainer = shallow(
                <RecipientSearchContainer
                    reduxFilters={initialFilters}
                    bulkRecipientTypeChange={mockReduxAction} />);

            const bulkRecipientTypeChangeSpy = sinon.spy(recipientSearchContainer.instance(),
                'bulkRecipientTypeChange');

            // Remove a Bulk Recipient Type from redux
            recipientSearchContainer.instance().bulkRecipientTypeChange({
                recipientTypes: [
                    'small_business',
                    'other_than_small_business'
                ],
                direction: 'remove'
            });

            // everything should be updated now
            expect(bulkRecipientTypeChangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalledTimes(1);

            // reset the spy
            bulkRecipientTypeChangeSpy.reset();
        });
    });
});
