import _ from 'lodash';
import awardReducer from 'redux/reducers/award/awardReducer';

const initialState = {
    selectedAward: null,
    transactions: [],
    transactionMeta: {
        count: 0,
        page: 0,
        totalPages: 0
    },
    renderHash: null,
    groupHash: null,
    transactionSort: {
        field: "modification_number",
        direction: "asc"
    },
    finSysData: [],
    finSysMeta: {
        count: 0,
        page: 0,
        totalPages: 0
    },
    finSysSort: {
        field: "certified_date",
        direction: "desc"
    }
};

const sampleData = {
    total_metadata: {
        count: 2
    },
    page_metadata: {
        num_pages: 1,
        page_number: 1,
        count: 2
    },
    results: [
        {
            financial_accounts_by_awards_id: 1,
            program_activity_name: 'Reimbursable program activity',
            certified_date: null,
            treasury_account: {
                treasury_account_identifier: 69481,
                tas_rendering_label: '0892017/20180228',
                account_title: 'Departmental Administration, Energy Programs, Energy',
                reporting_agency_id: '089',
                reporting_agency_name: 'Department of Energy'
            },
            program_activity_code: 801,
            object_class: '254',
            transaction_obligations: [{
                transaction_obligated_amount: '-323015.00'
            }]
        }, {
            financial_accounts_by_awards_id: 2,
            program_activity_name: 'Wind Energy',
            certified_date: null,
            treasury_account: {
                treasury_account_identifier: 35975,
                tas_rendering_label: '089X0321',
                account_title: 'Energy Efficiency and Renewable Energy, Energy Programs, Energy',
                reporting_agency_id: '089',
                reporting_agency_name: 'Department of Energy'
            },
            program_activity_code: 102,
            object_class: '254',
            transaction_obligations: [{
                transaction_obligated_amount: '-11522.00'
            }]
        }
    ]
};

describe('awardReducer', () => {
    describe('SET_AWARD_FINSYS_DATA', () => {
        it('should set the finSysData array to equal the provided value', () => {
            const action = {
                type: 'SET_AWARD_FINSYS_DATA',
                data: sampleData.results
            };

            let updatedState = awardReducer(undefined, {});
            // initial state should have an empty array
            expect(updatedState.finSysData).toEqual([]);

            updatedState = awardReducer(updatedState, action);
            // the Redux action should modify the finSysData array
            expect(updatedState.finSysData).toEqual(sampleData.results);
        });
    });

    describe('APPEND_AWARD_FINSYS_DATA', () => {
        it('should append the existing finSysData array with the provided values', () => {
            const firstAction = {
                type: 'SET_AWARD_FINSYS_DATA',
                data: sampleData.results
            };

            const newItems = [
                {
                    financial_accounts_by_awards_id: 3,
                    program_activity_name: 'Program Name',
                    certified_date: null,
                    treasury_account: {
                        treasury_account_identifier: 1234,
                        tas_rendering_label: 'ABCD',
                        account_title: 'Account Title',
                        reporting_agency_id: '123',
                        reporting_agency_name: 'Department of Department'
                    },
                    program_activity_code: 1,
                    object_class: '252',
                    transaction_obligations: [{
                        transaction_obligated_amount: '1.00'
                    }]
                }
            ];

            const secondAction = {
                type: 'APPEND_AWARD_FINSYS_DATA',
                data: newItems
            };

            let updatedState = awardReducer(undefined, firstAction);
            // the Redux action should set the initial finSysData array
            expect(updatedState.finSysData).toEqual(sampleData.results);

            updatedState = awardReducer(updatedState, secondAction);
            expect(updatedState.finSysData.length).toBe(3);
            expect(updatedState.finSysData).toEqual(_.concat(sampleData.results, newItems));
        });
    });

    describe('SET_FINSYS_META', () => {
        it('should update the finSysMeta object with the provided values', () => {
            const action = {
                type: 'SET_FINSYS_META',
                meta: {
                    count: 12,
                    page: 1,
                    totalPages: 2
                }
            };

            const expected = {
                count: 12,
                page: 1,
                totalPages: 2
            };

            const updatedState = awardReducer(undefined, action);
            // the Redux action should set the metadata
            expect(updatedState.finSysMeta).toEqual(expected);
        });
    });

    describe('SET_FINSYS_SORT', () => {
        it('should update the finSysSort object with the provided values', () => {
            const action = {
                type: 'SET_FINSYS_SORT',
                value: {
                    field: 'tas_rendering_label',
                    direction: 'asc'
                }
            };

            const expected = {
                field: 'tas_rendering_label',
                direction: 'asc'
            };

            const updatedState = awardReducer(undefined, action);
            // the Redux action should set the sort object
            expect(updatedState.finSysSort).toEqual(expected);
        });
    });

    describe('RESET_FINSYS', () => {
        it('should reset the finSys fields to their default values', () => {
            const firstAction = {
                type: 'SET_FINSYS_SORT',
                value: {
                    field: 'tas_rendering_label',
                    direction: 'asc'
                }
            };

            const firstExpected = {
                field: 'tas_rendering_label',
                direction: 'asc'
            };

            const secondAction = {
                type: 'RESET_FINSYS'
            };

            let updatedState = awardReducer(undefined, firstAction);
            // the sort object should be updated
            expect(updatedState.finSysSort).toEqual(firstExpected);

            updatedState = awardReducer(updatedState, secondAction);
            // the state should now be reset to its original values
            expect(updatedState).toEqual(initialState);
        });
    });
});
