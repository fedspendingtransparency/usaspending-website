/**
 * AwardIDSearchContainer-test.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { AwardIDSearchContainer } from 'containers/search/filters/awardID/AwardIDSearchContainer';

const initialFilters = {
    selectedAwardIDs: {}
};

const awardID = {
    id: "601793",
    date_signed__fy: null,
    data_source: null,
    type: "U",
    type_description: "Unknown Type",
    piid: "AG3142B100012",
    fain: null,
    uri: null,
    total_obligation: null,
    total_outlay: null,
    date_signed: null,
    description: null,
    period_of_performance_start_date: null,
    period_of_performance_current_end_date: null,
    base_and_all_options_value: null,
    last_modified_date: null,
    certified_date: null,
    create_date: "2017-02-28T18:01:59.717954Z",
    update_date: "2017-02-28T18:01:59.717969Z",
    parent_award: null,
    awarding_agency: {
        id: 999,
        create_date: "2017-01-12T19:56:26.723000Z",
        update_date: "2017-01-12T19:56:26.723000Z",
        toptier_agency: {
            toptier_agency_id: 155,
            create_date: null,
            update_date: null,
            cgac_code: "012",
            fpds_code: "1200",
            name: "AGRICULTURE, DEPARTMENT OF"
        },
        subtier_agency: {
            subtier_agency_id: 865,
            create_date: null,
            update_date: null,
            subtier_code: "1205",
            name: "USDA, OFFICE OF THE CHIEF FINANCIAL OFFICER"
        },
        office_agency: null
    },
    funding_agency: null,
    recipient: null,
    place_of_performance: null,
    latest_submission: null
};

describe('AwardIDSearchContainer', () => {
    describe('Handling adding and removing award IDs', () => {
        it('should add an Award ID that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    awardID: {
                        id: "601793",
                        date_signed__fy: null,
                        data_source: null,
                        type: "U",
                        type_description: "Unknown Type",
                        piid: "AG3142B100012",
                        fain: null,
                        uri: null,
                        total_obligation: null,
                        total_outlay: null,
                        date_signed: null,
                        description: null,
                        period_of_performance_start_date: null,
                        period_of_performance_current_end_date: null,
                        base_and_all_options_value: null,
                        last_modified_date: null,
                        certified_date: null,
                        create_date: "2017-02-28T18:01:59.717954Z",
                        update_date: "2017-02-28T18:01:59.717969Z",
                        parent_award: null,
                        awarding_agency: {
                            id: 999,
                            create_date: "2017-01-12T19:56:26.723000Z",
                            update_date: "2017-01-12T19:56:26.723000Z",
                            toptier_agency: {
                                toptier_agency_id: 155,
                                create_date: null,
                                update_date: null,
                                cgac_code: "012",
                                fpds_code: "1200",
                                name: "AGRICULTURE, DEPARTMENT OF"
                            },
                            subtier_agency: {
                                subtier_agency_id: 865,
                                create_date: null,
                                update_date: null,
                                subtier_code: "1205",
                                name: "USDA, OFFICE OF THE CHIEF FINANCIAL OFFICER"
                            },
                            office_agency: null
                        },
                        funding_agency: null,
                        recipient: null,
                        place_of_performance: null,
                        latest_submission: null
                    }
                });
            });

            // Set up container with mocked award ID action
            const awardIDSearchContainer = shallow(
                <AwardIDSearchContainer
                    reduxFilters={initialFilters}
                    updateAwardIDs={mockReduxAction} />);

            const toggleAwardIDSpy = sinon.spy(awardIDSearchContainer.instance(),
                'toggleAwardID');

            // Add Award ID to redux
            awardIDSearchContainer.instance().toggleAwardID(awardID);

            // everything should be updated now
            expect(toggleAwardIDSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spies
            toggleAwardIDSpy.reset();
        });

        it('should remove an Award ID that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    awardID: {
                        id: "601793",
                        date_signed__fy: null,
                        data_source: null,
                        type: "U",
                        type_description: "Unknown Type",
                        piid: "AG3142B100012",
                        fain: null,
                        uri: null,
                        total_obligation: null,
                        total_outlay: null,
                        date_signed: null,
                        description: null,
                        period_of_performance_start_date: null,
                        period_of_performance_current_end_date: null,
                        base_and_all_options_value: null,
                        last_modified_date: null,
                        certified_date: null,
                        create_date: "2017-02-28T18:01:59.717954Z",
                        update_date: "2017-02-28T18:01:59.717969Z",
                        parent_award: null,
                        awarding_agency: {
                            id: 999,
                            create_date: "2017-01-12T19:56:26.723000Z",
                            update_date: "2017-01-12T19:56:26.723000Z",
                            toptier_agency: {
                                toptier_agency_id: 155,
                                create_date: null,
                                update_date: null,
                                cgac_code: "012",
                                fpds_code: "1200",
                                name: "AGRICULTURE, DEPARTMENT OF"
                            },
                            subtier_agency: {
                                subtier_agency_id: 865,
                                create_date: null,
                                update_date: null,
                                subtier_code: "1205",
                                name: "USDA, OFFICE OF THE CHIEF FINANCIAL OFFICER"
                            },
                            office_agency: null
                        },
                        funding_agency: null,
                        recipient: null,
                        place_of_performance: null,
                        latest_submission: null
                    }
                });
            });

            // Set up container with mocked award ID action
            const awardIDSearchContainer = shallow(
                <AwardIDSearchContainer
                    reduxFilters={initialFilters}
                    updateAwardIDs={mockReduxAction} />);

            const toggleAwardIDSpy = sinon.spy(awardIDSearchContainer.instance(),
                'toggleAwardID');

            // Add Award ID to redux
            awardIDSearchContainer.instance().toggleAwardID(awardID);

            // Remove Award ID from Redux
            awardIDSearchContainer.instance().toggleAwardID(awardID);

            // everything should be updated now
            expect(toggleAwardIDSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            toggleAwardIDSpy.reset();
        });
    });
});
