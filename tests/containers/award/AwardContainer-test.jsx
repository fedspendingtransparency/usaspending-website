/**
 * AwardContainer-test.js
 * Created by Emily Gullo 03/03/2017
 **/

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import * as AwardActions from 'redux/actions/award/awardActions';
import { AwardContainer } from 'containers/award/AwardContainer';

const parameters = {
    awardId: 8533
};
const award = {
    transactionSort: {
        direction: "desc",
        field: "modification_number"
    },
    transactionMeta: {
        page: 1
    }
};

const fullData = {
    award_id: "VA760PPVFY2015OCT",
    award_type: "C",
    awarding_agency: {
        create_date: "2017-01-12T19:56:28.126000Z",
        id: 1305,
        office_agency: null,
        subtier_agency: {
            create_date: null,
            name: "VETERANS AFFAIRS, DEPARTMENT OF",
            subtier_agency_id: 1171,
            subtier_code: "3600",
            update_date: null
        },
        toptier_agency: {
            cgac_code: "036",
            create_date: null,
            fpds_code: "3600",
            name: "VETERANS AFFAIRS, DEPARTMENT OF",
            toptier_agency_id: 177,
            update_date: null
        },
        update_date: "2017-01-12T19:56:28.126000Z"
    },
    awarding_agency_name: "VETERANS AFFAIRS, DEPARTMENT OF",
    awarding_office_name: "",
    awarding_subtier_name: "VETERANS AFFAIRS, DEPARTMENT OF",
    certified_date: null,
    cost_or_pricing_data: "N",
    create_date: "2017-02-15T20:19:09.693899Z",
    data_source: "USA",
    date_signed: "10/1/2014",
    date_signed__fy: 2015,
    description: "EXPRESS REPORT PHARMACY PRIME VENDOR VA760PPVFY2015OCT",
    fain: null,
    funding_agency: {
        create_date: "2017-01-12T19:56:28.126000Z",
        id: 1305,
        office_agency: null,
        subtier_agency: {
            create_date: null,
            name: "VETERANS AFFAIRS, DEPARTMENT OF",
            subtier_agency_id: 1171,
            subtier_code: "3600",
            update_date: null
        },
        toptier_agency: {
            cgac_code: "036",
            create_date: null,
            fpds_code: "3600",
            name: "VETERANS AFFAIRS, DEPARTMENT OF",
            toptier_agency_id: 177,
            update_date: null
        },
        update_date: "2017-01-12T19:56:28.126000Z"
    },
    funding_agency_name: "VETERANS AFFAIRS, DEPARTMENT OF",
    funding_office_name: "",
    funding_subtier_name: "VETERANS AFFAIRS, DEPARTMENT OF",
    id: 8533,
    last_modified_date: "2016-12-21",
    latest_submission: 2,
    naics: "NONE",
    naics_description: null,
    parent_award: 7758,
    parent_award_id: "VA797P12D0001",
    period_of_performance_current_end_date: "10/30/2014",
    period_of_performance_start_date: "10/1/2014",
    piid: "VA760PPVFY2015OCT",
    place_of_performance: {
        address_line1: null,
        address_line2: null,
        address_line3: null
    },
    pop_city: "San Francisco",
    pop_state_province: "CA",
    pop_zip: "94104",
    potential_total_value_of_award: "$227,269,217",
    product_or_service_code: "6505",
    recipient: {
        airport_authority: "f",
        alaskan_native_owned_corporation_or_firm: "f",
        alaskan_native_servicing_institution: "f",
        american_indian_owned_business: "f",
        asian_pacific_american_owned_business: "f",
        black_american_owned_business: "f",
        business_types: "UN",
        business_types_description: "Unknown Business Type",
        c8a_program_participant: "f",
        c1862_land_grant_college: "f",
        c1890_land_grant_college: "f",
        c1994_land_grant_college: "f",
        certified_date: null,
        city_local_government: "f",
        city_township_government: null,
        community_developed_corporation_owned_firm: "f",
        community_development_corporation: "f",
        contracts: null,
        corporate_entity_not_tax_exempt: "t",
        corporate_entity_tax_exempt: "f",
        council_of_governments: "f",
        county_local_government: "f",
        create_date: "2017-02-15T20:09:57.197796Z",
        data_source: null,
        division_name: null,
        division_number: null,
        domestic_or_foreign_entity: null,
        domestic_shelter: "f",
        dot_certified_disadvantage: "f",
        economically_disadvantaged_women_owned_small_business: null,
        educational_institution: "f",
        emerging_small_business: null,
        federal_agency: "f",
        federally_funded_research_and_development_corp: "f",
        for_profit_organization: "t",
        foreign_government: "f",
        foreign_owned_and_located: "f",
        foundation: "f",
        grants: null,
        hispanic_american_owned_business: "f",
        hispanic_servicing_institution: "f",
        historically_black_college: "f",
        historically_underutilized_business_zone: "f",
        hospital_flag: "f",
        housing_authorities_public_tribal: "f",
        indian_tribe_federally_recognized: "f",
        individual: null,
        inter_municipal_local_government: "f",
        international_organization: "f",
        interstate_entity: "f",
        joint_venture_economic_disadvantaged_women_owned_small_bus: null,
        joint_venture_women_owned_small_business: null,
        labor_surplus_area_firm: "f",
        last_modified_date: null,
        legal_entity_id: 1576,
        limited_liability_corporation: "f",
        local_government_owned: "f",
        location: {
            address_line1: "ONE POST ST",
            address_line2: "",
            address_line3: "",
            certified_date: null,
            city_code: "67000",
            city_name: "San Francisco",
            congressional_code: "12",
            country_name: "UNITED STATES",
            county_code: "75",
            county_name: "San Francisco",
            create_date: "2017-02-15T20:24:25.128858Z",
            data_source: null,
            foreign_city_name: null,
            foreign_location_description: null,
            foreign_postal_code: null,
            foreign_province: null,
            last_modified_date: null,
            location_country_code: "USA",
            location_id: 9926,
            performance_code: null,
            place_of_performance_flag: false,
            recipient_flag: true,
            reporting_period_end: null,
            reporting_period_start: null,
            state_code: "CA",
            state_description: null,
            state_name: null,
            update_date: "2017-02-15T20:24:25.128884Z",
            zip4: null,
            zip5: "94104",
            zip_4a: null,
            zip_last4: "5252"
        },
        manufacturer_of_goods: "f",
        minority_institution: "f",
        minority_owned_business: "f",
        municipality_local_government: "f",
        native_american_owned_business: "f",
        native_hawaiian_owned_business: "f",
        native_hawaiian_servicing_institution: "f",
        nonprofit_organization: "f",
        other_minority_owned_business: "f",
        other_not_for_profit_organization: "f",
        parent_recipient_unique_id: "177667227",
        partnership_or_limited_liability_partnership: "f",
        planning_commission: "f",
        port_authority: "f",
        private_university_or_college: "f",
        receives_contracts_and_grants: null,
        recipient_name: "MCKESSON CORPORATION",
        recipient_unique_id: "177667227",
        reporting_period_end: null,
        reporting_period_start: null,
        sam_exception: null,
        sba_certified_8a_joint_venture: null,
        school_district_local_government: "f",
        school_of_forestry: "f",
        self_certified_small_disadvantaged_business: null,
        service_disabled_veteran_owned_business: null,
        small_agricultural_cooperative: "f",
        small_business: null,
        small_disadvantaged_business: null,
        sole_proprietorship: "f",
        special_district_government: null,
        state_controlled_institution_of_higher_learning: "f",
        subchapter_scorporation: "f",
        subcontinent_asian_asian_indian_american_owned_business: "f",
        the_ability_one_program: null,
        township_local_government: "f",
        transit_authority: "f",
        tribal_college: "f",
        tribally_owned_business: "f",
        undefinitized_action: null,
        update_date: "2017-02-15T20:09:57.197819Z",
        us_federal_government: "f",
        us_government_entity: null,
        us_local_government: "f",
        us_state_government: null,
        us_tribal_government: "f",
        vendor_doing_as_business_name: null,
        vendor_fax_number: "9724465795",
        vendor_phone_number: "9724464947",
        veteran_owned_business: "f",
        veterinary_college: "f",
        veterinary_hospital: "f",
        woman_owned_business: "f",
        women_owned_small_business: null
    },
    recipient_business_type: "Unknown Business Type",
    recipient_city: "San Francisco",
    recipient_country: "UNITED STATES",
    recipient_duns: "177667227",
    recipient_name: "MCKESSON CORPORATION",
    recipient_parent_duns: "177667227",
    recipient_state_province: "CA",
    recipient_street: "ONE POST ST",
    recipient_zip_postal: "94104",
    total_obligation: "$227,269,217",
    total_outlay: null,
    type: "Delivery Order",
    type_description: "Delivery Order",
    type_of_contract_pricing: "J",
    type_of_contract_pricing_description: "Firm Fixed Price",
    update_date: "2017-02-15T20:19:10.896695Z",
    uri: null
};

const txnData = {
    page_metadata: {
        count: 1,
        num_pages: 1,
        page_number: 1
    },
    results: [
        {
            action_date: "2014-10-01",
            action_type: null,
            assistance_data: null,
            awarding_agency: {
                id: 1305,
                office_agency: null,
                subtier_agency: {
                    name: "VETERANS AFFAIRS, DEPARTMENT OF",
                    subtier_code: "3600"
                },
                toptier_agency: {
                    cgac_code: "036",
                    fpds_code: "3600",
                    name: "VETERANS AFFAIRS, DEPARTMENT OF"
                }
            },
            contract_data: {
                cost_or_pricing_data: "N",
                naics: "NONE",
                naics_description: null,
                parent_award_id: "VA797P12D0001",
                piid: "VA760PPVFY2015OCT",
                product_or_service_code: "6505",
                type_of_contract_pricing: "J",
                type_of_contract_pricing_description: "Firm Fixed Price"
            },
            description: "EXPRESS REPORT PHARMACY PRIME VENDOR VA760PPVFY2015OCT",
            federal_action_obligation: "227269217.17",
            funding_agency: {
                id: 1305,
                office_agency: null,
                subtier_agency: {
                    name: "VETERANS AFFAIRS, DEPARTMENT OF",
                    subtier_code: "3600"
                },
                toptier_agency: {
                    cgac_code: "036",
                    fpds_code: "3600",
                    name: "VETERANS AFFAIRS, DEPARTMENT OF"
                }
            },
            id: 34779,
            modification_number: "0",
            period_of_performance_current_end_date: "2014-10-30",
            period_of_performance_start_date: "2014-10-01",
            place_of_performance: {
                address_line1: null,
                address_line2: null,
                address_line3: null,
                city_name: "San Francisco",
                country_name: "UNITED STATES",
                foreign_city_name: null,
                foreign_postal_code: null,
                foreign_province: null,
                location_country_code: "USA",
                state_code: "CA",
                state_name: null,
                zip5: "94104"
            },
            recipient: {
                business_types: "UN",
                business_types_description: "Unknown Business Type",
                legal_entity_id: 1576,
                location: {
                    address_line1: "ONE POST ST",
                    address_line2: "",
                    address_line3: "",
                    city_name: "San Francisco",
                    country_name: "UNITED STATES",
                    foreign_city_name: null,
                    foreign_postal_code: null,
                    foreign_province: null,
                    location_country_code: "USA",
                    state_code: "CA",
                    state_name: null,
                    zip5: "94104"
                },
                parent_recipient_unique_id: "177667227",
                recipient_name: "MCKESSON CORPORATION",
                type: "C",
                type_description: "Delivery Order"
            }
        }
    ],
    total_metadata: {
        count: 1
    }
};

describe('AwardContainer', () => {
    it('should make an API call for the selected award', () => {
        // Set up container with mocked award action
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={award} />);

        const getAwardSpy = sinon.spy(awardContainer.instance(),
            'getSelectedAward');

        // Retrieve award and transactions
        awardContainer.instance().getSelectedAward();

        // checking that it ran
        expect(getAwardSpy.callCount).toEqual(1);

        // reset the spies
        getAwardSpy.reset();
    });

    it('should make an API call for the selected award transactions', () => {
        // Set up container with mocked award action
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={award} />);

        const getTxnSpy = sinon.spy(awardContainer.instance(),
            'fetchTransactions');

        // Retrieve award and transactions
        awardContainer.instance().fetchTransactions();

        // checking that it ran
        expect(getTxnSpy.callCount).toEqual(1);

        // reset the spies
        getTxnSpy.reset();
    });

    // parse award
    it('should parse the returned award and send to redux store', () => {
        // Set up container with mocked award action
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={award}
                setSelectedAward={AwardActions.setSelectedAward} />);

        const parseAwardSpy = sinon.spy(awardContainer.instance(),
            'parseAward');

        // Parse award
        awardContainer.instance().parseAward(fullData);

        // checking that it ran
        expect(parseAwardSpy.callCount).toEqual(1);

        // reset the spies
        parseAwardSpy.reset();
    });

    // parse transactions
    it('should parse the returned transactions and send to redux store', () => {
        // Set up container with mocked award action
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={award}
                setAwardTransactions={AwardActions.setAwardTransactions}
                appendAwardTransactions={AwardActions.appendAwardTransactions}
                setTransactionsMeta={AwardActions.setTransactionsMeta}
                updateTransactionRenderHash={AwardActions.updateTransactionRenderHash} />);

        const parseTxnSpy = sinon.spy(awardContainer.instance(),
            'parseTransactions');

        // Parse award
        awardContainer.instance().parseTransactions(txnData);

        // checking that it ran
        expect(parseTxnSpy.callCount).toEqual(1);

        // reset the spies
        parseTxnSpy.reset();
    });

    // next transaction page
    it('should fetch the next page of available transactions', () => {
        const awardContainer = shallow(
            <AwardContainer
                params={parameters}
                award={award} />);

        const getNextPageSpy = sinon.spy(awardContainer.instance(),
            'nextTransactionPage');

        // Retrieve award and transactions
        awardContainer.instance().nextTransactionPage();

        // checking that it ran
        expect(getNextPageSpy.callCount).toEqual(1);

        // reset the spies
        getNextPageSpy.reset();
    });
});
