/**
 * TopFilterBarContainer-test.js
 * Created by Kevin Li 1/9/17
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Set, OrderedMap } from 'immutable';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { TopFilterBarContainer } from 'containers/search/topFilterBar/TopFilterBarContainer';

import { defaultFilters } from '../../../testResources/defaultReduxFilters';

const setup = (props) =>
    mount(<TopFilterBarContainer {...props} />);

const removeTimePeriodSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeTimePeriod');
const removeFromSetSpy = sinon.spy(TopFilterBarContainer.prototype, 'removeFromSet');
const resetGenericFieldSpy = sinon.spy(TopFilterBarContainer.prototype, 'resetGenericField');
const prepareFiltersSpy = sinon.spy(TopFilterBarContainer.prototype, 'prepareFilters');


describe('TopFilterBarContainer', () => {
    it('should return a TopFilterBarEmpty child component when no filters are applied', () => {
        const filters = Object.assign({}, defaultFilters);
        const props = {
            reduxFilters: filters
        };
        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
    });

    it('should return a TopFilterBar child component when there are active filters', () => {
        const filters = Object.assign({}, defaultFilters, {
            timePeriodType: 'fy',
            timePeriodFY: new Set(['2014'])
        });
        const props = {
            reduxFilters: filters
        };

        const topBarContainer = setup(props);

        expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);
    });

    describe('filter preparation', () => {
        it('should update when the Redux filters change', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const updatedFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const initialProps = {
                reduxFilters: initialFilters
            };

            const updatedProps = {
                reduxFilters: updatedFilters
            };

            // mount the container
            const topBarContainer = setup(initialProps);

            // change the props
            topBarContainer.setProps(updatedProps);

            // the prepareFilters function should have been called
            expect(prepareFiltersSpy.called).toBeTruthy();
        });

        it('should update component state with Redux keyword filter when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const keywordFilter = Object.assign({}, defaultFilters, {
                keyword: 'Education'
            });

            topBarContainer.setProps({
                reduxFilters: keywordFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'keyword',
                name: 'Keyword',
                values: 'Education'
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux time filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const timeFilter = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            topBarContainer.setProps({
                reduxFilters: timeFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'timePeriodFY',
                name: 'Time Period',
                values: ['2015', '2014']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux award type filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardFilter = Object.assign({}, defaultFilters, {
                awardType: new Set(['07'])
            });

            topBarContainer.setProps({
                reduxFilters: awardFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'awardType',
                name: 'Award Type',
                values: ['07']
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux location filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const locationFilter = Object.assign({}, defaultFilters, {
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
                    }
                })
            });

            topBarContainer.setProps({
                reduxFilters: locationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedLocations',
                name: 'Place of Performance Location',
                scope: 'all',
                values: [{
                    matched_ids: [1, 2],
                    parent: 'CALIFORNIA',
                    place_type: 'CITY',
                    place: 'LOS ANGELES',
                    identifier: '1,2_LOS ANGELES_CITY'
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux location scope when it is not "all"', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const locationFilter = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'foreign'
            });

            topBarContainer.setProps({
                reduxFilters: locationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedLocations',
                name: 'Place of Performance Location',
                scope: 'foreign',
                values: [{
                    isScope: true
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux awarding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    }
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardingAgencyFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedAwardingAgencies',
                name: 'Awarding Agency',
                values: [{
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
                    office_agency: null
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux funding agency filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const awardingAgencyFilter = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    }
                })
            });

            topBarContainer.setProps({
                reduxFilters: awardingAgencyFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedFundingAgencies',
                name: 'Funding Agency',
                values: [{
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
                    office_agency: null
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux recipient filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const selectedRecipientsFilter = Object.assign({}, defaultFilters, {
                selectedRecipients: new OrderedMap({
                    "006928857": {
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
                })
            });

            topBarContainer.setProps({
                reduxFilters: selectedRecipientsFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedRecipients',
                name: 'Recipient',
                values: [{
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
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });

        it('should update component state with Redux recipient location filters when available', () => {
            // mount the container with default props
            const topBarContainer = setup({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.state().filters).toHaveLength(0);

            const recipientLocationFilter = Object.assign({}, defaultFilters, {
                selectedRecipientLocations: new OrderedMap({
                    '22796_McLean_COUNTY': {
                        place_type: "COUNTY",
                        matched_ids: [22796],
                        place: "McLean",
                        parent: "KENTUCKY",
                        identifier: "22796_McLean_COUNTY"
                    }
                })
            });

            topBarContainer.setProps({
                reduxFilters: recipientLocationFilter
            });

            expect(topBarContainer.state().filters).toHaveLength(1);

            const filterItem = topBarContainer.state().filters[0];
            const expectedFilterState = {
                code: 'selectedRecipientLocations',
                name: 'Recipient Location',
                scope: 'all',
                values: [{
                    place_type: "COUNTY",
                    matched_ids: [22796],
                    place: "McLean",
                    parent: "KENTUCKY",
                    identifier: "22796_McLean_COUNTY"
                }]
            };

            expect(filterItem).toEqual(expectedFilterState);
        });
    });

    describe('filter removal', () => {
        it('should hide the top filter bar when all filters are cleared', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014'])
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters
            });

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(1);

            // clear the filters
            topBarContainer.setProps({
                reduxFilters: Object.assign({}, defaultFilters)
            });

            expect(topBarContainer.find(TopFilterBar)).toHaveLength(0);
        });

        it('should trigger a Redux action to update the keyword when the filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                keyword: 'Education'
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove the existing keyword
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('keyword');

            // validate that the clearFilterType Redux action is called
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should trigger a Redux action to update the time period when a FY time period filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const expectedReduxArguments = {
                dateType: 'fy',
                fy: new Set(['2015']),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodFY', '2014');

            // the removeFilter function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the time period when a date range is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'dr',
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            });

            const expectedReduxArguments = {
                dateType: 'dr',
                fy: new Set([]),
                start: null,
                end: null
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateTimePeriod: mockReduxAction
            });

            topBarContainer.instance().removeFilter('timePeriodDR');

            // the removeTimePeriodSpy function should call removeTimePeriodSpy
            expect(removeTimePeriodSpy.called).toBeTruthy();
            // the removeTimePeriod function should trigger a Redux action to remove the time period
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the award type when an award type filter is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['07', '04'])
            });

            const expectedReduxArguments = {
                type: 'awardType',
                value: new Set(['04'])
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('awardType', '07');

            // the removeFilter function should call removeFromSet
            expect(removeFromSetSpy.called).toBeTruthy();
            // the removeFromSet function should trigger a Redux action to remove the award type
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when a single filter group is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['07', '04'])
            });

            const expectedReduxArguments = 'awardType';

             // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to reset a single filter group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('awardType');

            // for non-time period fields, the resetGenericField function should be called
            expect(resetGenericFieldSpy.called).toBeTruthy();
            // this function doesn't really do anything but pass the arguments onto a Redux action
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when the time period fiscal year filter group is individually removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'fy',
                timePeriodFY: new Set(['2014', '2015'])
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function the reset the single time period
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                resetTimeFilters: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('timePeriodFY');

            // validate that the resetTimeFilters Redux action is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger an appropriate Redux action when the time period date range filter group is individually removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                timePeriodType: 'dr',
                timePeriodStart: '2016-01-01',
                timePeriodEnd: '2016-12-31'
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to reset the single time period
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                resetTimeFilters: mockReduxAction
            });
            topBarContainer.instance().clearFilterGroup('timePeriodDR');

            // validate that the resetTimeFilters Redux action is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should trigger a Redux action to update the Awarding Agency filter when an Agency is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedAwardingAgencies',
                value: new OrderedMap({
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedAwardingAgencies', '1788_subtier');
        });

        it('should trigger a Redux action to update the Funding Agency filter when an Agency is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedFundingAgencies',
                value: new OrderedMap({
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedFundingAgencies', '1788_subtier');
        });

        it('should be able to trigger Redux actions that can reset the entire location filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'domestic',
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedLocations');

            // validate that the clearFilterType Redux action is called twice
            expect(mockReduxAction).toHaveBeenCalledTimes(2);
        });

        it('should be able to trigger Redux actions that can reset the specific location filter values', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                locationDomesticForeign: 'domestic',
                selectedLocations: new OrderedMap({
                    '1,2_LOS ANGELES_CITY': {
                        matched_ids: [1, 2],
                        parent: 'CALIFORNIA',
                        place_type: 'CITY',
                        place: 'LOS ANGELES',
                        identifier: '1,2_LOS ANGELES_CITY'
                    },
                    '3,4_TORONTO_CITY': {
                        matched_ids: [3, 4],
                        parent: 'CANADA',
                        place_type: 'CITY',
                        place: 'TORONTO',
                        identifier: '3,4_TORONTO_CITY'
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedLocations',
                value: new OrderedMap({
                    '3,4_TORONTO_CITY': {
                        matched_ids: [3, 4],
                        parent: 'CANADA',
                        place_type: 'CITY',
                        place: 'TORONTO',
                        identifier: '3,4_TORONTO_CITY'
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedLocations', '1,2_LOS ANGELES_CITY');
        });

        it('should be able to trigger Redux actions that can overwrite entire filter group values', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                awardType: new Set(['03', '04'])
            });

            const expectedReduxArguments = {
                type: 'awardType',
                value: new Set(['01', '02'])
            };

            // validate that the Redux action receives the arguments it is expecting
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function the overwrite a filter
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });
            topBarContainer.instance().overwriteFilter('awardType', new Set(['01', '02']));

            // validate that the Redux function is called
            expect(mockReduxAction).toHaveBeenCalled();
        });

        it('should be able to trigger Redux actions that can reset the entire Awarding Agency Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedAwardingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedAwardingAgencies');

            // validate that the clearFilterType Redux action is called
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should be able to trigger Redux actions that can reset the entire Funding Agency Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedFundingAgencies: new OrderedMap({
                    "1788_subtier": {
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
                        office_agency: null
                    },
                    "1789_subtier": {
                        id: 1789,
                        create_date: "2017-01-12T19:56:30.522000Z",
                        update_date: "2017-01-12T19:56:30.522000Z",
                        toptier_agency: {
                            toptier_agency_id: 268,
                            create_date: "2017-01-31T21:25:39.810344Z",
                            update_date: "2017-01-31T21:25:39.936439Z",
                            cgac_code: "097",
                            fpds_code: "9700",
                            name: "DEPT OF DEFENSE"
                        },
                        subtier_agency: {
                            subtier_agency_id: 1655,
                            create_date: "2017-01-31T21:25:39.569918Z",
                            update_date: "2017-01-31T21:25:39.691244Z",
                            subtier_code: "1708",
                            name: "IMMEDIATE OFFICE OF THE SECRETARY OF THE NAVY"
                        },
                        office_agency: null
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedFundingAgencies');

            // validate that the clearFilterType Redux action is called
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should trigger a Redux action to update the Recipient filter when a Recipient is removed', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedRecipients: new OrderedMap({
                    "006928857": {
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
                    /* eslint-disable quote-props */
                    // This unique ID is a number
                    "985015354": {
                        legal_entity_id: 1771,
                        data_source: null,
                        parent_recipient_unique_id: "985015354",
                        recipient_name: "ACCENTURE FEDERAL SERVICES LLC",
                        vendor_doing_as_business_name: null,
                        vendor_phone_number: "5714142442",
                        vendor_fax_number: "",
                        business_types: "UN",
                        business_types_description: "Unknown Business Type",
                        recipient_unique_id: "139727148",
                        limited_liability_corporation: "t",
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
                        create_date: "2017-02-15T20:11:04.524266Z",
                        update_date: "2017-02-15T20:11:04.524293Z",
                        city_township_government: null,
                        special_district_government: null,
                        small_business: null,
                        individual: null,
                        location: {
                            location_id: 10323,
                            data_source: null,
                            country_name: "UNITED STATES",
                            state_code: "VA",
                            state_name: null,
                            state_description: null,
                            city_name: "Arlington",
                            city_code: "3000",
                            county_name: "Arlington",
                            county_code: "13",
                            address_line1: "800 NORTH GLEBE RD #300",
                            address_line2: "",
                            address_line3: "",
                            foreign_location_description: null,
                            zip4: null,
                            zip_4a: null,
                            congressional_code: "08",
                            performance_code: null,
                            zip_last4: "1807",
                            zip5: "22203",
                            foreign_postal_code: null,
                            foreign_province: null,
                            foreign_city_name: null,
                            reporting_period_start: null,
                            reporting_period_end: null,
                            last_modified_date: null,
                            certified_date: null,
                            create_date: "2017-02-15T20:25:24.860270Z",
                            update_date: "2017-02-15T20:25:24.860305Z",
                            place_of_performance_flag: false,
                            recipient_flag: true,
                            location_country_code: "USA"
                        }
                    }
                    /* eslint-enable quote-props */
                })
            });

            const expectedReduxArguments = {
                type: 'selectedRecipients',
                value: new OrderedMap({
                    "006928857": {
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
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedRecipients', '985015354');
        });

        it('should be able to trigger Redux actions that can reset the entire Recipient Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                selectedRecipients: new OrderedMap({
                    "006928857": {
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
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedRecipients');

            // validate that the clearFilterType Redux action is called
            expect(mockReduxAction).toHaveBeenCalledTimes(1);
        });

        it('should be able to trigger Redux actions that can reset the specific Recipient Location filter values', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                recipientDomesticForeign: 'domestic',
                selectedRecipientLocations: new OrderedMap({
                    '22796_McLean_COUNTY': {
                        place_type: "COUNTY",
                        matched_ids: [22796],
                        place: "McLean",
                        parent: "KENTUCKY",
                        identifier: "22796_McLean_COUNTY"
                    },
                    '15688_McLean_COUNTY': {
                        matched_ids: [15688],
                        parent: "ILLINOIS",
                        place: "McLean",
                        place_type: "COUNTY",
                        identifier: "15688_McLean_COUNTY"
                    }
                })
            });

            const expectedReduxArguments = {
                type: 'selectedRecipientLocations',
                value: new OrderedMap({
                    '15688_McLean_COUNTY': {
                        matched_ids: [15688],
                        parent: "ILLINOIS",
                        place: "McLean",
                        place_type: "COUNTY",
                        identifier: "15688_McLean_COUNTY"
                    }
                })
            };

            // mock the redux action to test that the arguments match what is expected
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual(expectedReduxArguments);
            });

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                updateGenericFilter: mockReduxAction
            });

            topBarContainer.instance().removeFilter('selectedRecipientLocations', '22796_McLean_COUNTY');
        });

        it('should be able to trigger Redux actions that can reset the entire Recipient Location Filter', () => {
            const initialFilters = Object.assign({}, defaultFilters, {
                recipientDomesticForeign: 'domestic',
                selectedRecipientLocations: new OrderedMap({
                    '22796_McLean_COUNTY': {
                        place_type: "COUNTY",
                        matched_ids: [22796],
                        place: "McLean",
                        parent: "KENTUCKY",
                        identifier: "22796_McLean_COUNTY"
                    },
                    '15688_McLean_COUNTY': {
                        matched_ids: [15688],
                        parent: "ILLINOIS",
                        place: "McLean",
                        place_type: "COUNTY",
                        identifier: "15688_McLean_COUNTY"
                    }
                })
            });

            const mockReduxAction = jest.fn();

            // setup the top bar container and call the function to remove a single location
            // group
            const topBarContainer = setup({
                reduxFilters: initialFilters,
                clearFilterType: mockReduxAction
            });

            topBarContainer.instance().clearFilterGroup('selectedRecipientLocations');

            // validate that the clearFilterType Redux action is called twice
            expect(mockReduxAction).toHaveBeenCalledTimes(2);
        });
    });
});
