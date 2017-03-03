/**
 * Created by michaelbray on 2/6/17.
 */

import agencyReducer from 'redux/reducers/search/agencyReducer';

const initialState = {
    fundingAgencies: [],
    awardingAgencies: []
};

describe('agencyReducer', () => {
    it('should return the initial state by default', () => {
        expect(
            agencyReducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('SET_AUTOCOMPLETE_AWARDING_AGENCIES', () => {
        it('should return a new instance of the input agency object', () => {
            const action = {
                type: 'SET_AUTOCOMPLETE_AWARDING_AGENCIES',
                agencies: [
                    {
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
                    {
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
                ]
            };

            const updatedState = agencyReducer(undefined, action);

            // the value should be equal
            expect(updatedState.awardingAgencies).toEqual(action.agencies);
            // but it should be its own instance
            expect(updatedState.awardingAgencies).not.toBe(action.agencies);
        });
    });

    describe('SET_AUTOCOMPLETE_FUNDING_AGENCIES', () => {
        it('should return a new instance of the input agency object', () => {
            const action = {
                type: 'SET_AUTOCOMPLETE_FUNDING_AGENCIES',
                agencies: [
                    {
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
                    {
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
                ]
            };

            const updatedState = agencyReducer(undefined, action);

            // the value should be equal
            expect(updatedState.fundingAgencies).toEqual(action.agencies);
            // but it should be its own instance
            expect(updatedState.fundingAgencies).not.toBe(action.agencies);
        });
    });
});
