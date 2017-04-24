import _ from 'lodash';
import awardReducer from 'redux/reducers/award/awardReducer';

import { mockAwardResponse, mockTransactions } from './mockAward';

const initialState = {
    selectedAward: null,
    transactions: [],
    transactionMeta: {
        page: 0,
        nextPage: false
    },
    renderHash: null,
    groupHash: null,
    transactionSort: {
        field: "modification_number",
        direction: "asc"
    },
    finSysData: [],
    finSysMeta: {
        page: 0,
        nextPage: false
    },
    finSysSort: {
        field: "certified_date",
        direction: "desc"
    },
    subawards: [],
    subawardMeta: {
        hasNext: false,
        page: 1,
        render: '',
        group: ''
    },
    subawardSort: {
        field: "subaward_number",
        direction: "desc"
    }
};

const appendState = {
    selectedAward: null,
    transactions: [
        {
            id: 40904,
            type: 'D',
            type_description: 'Unknown Type',
            action_date: '11/30/2016',
            action_type: 'C',
            federal_action_obligation: '$4,437,307',
            modification_number: '959',
            description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 4555::TAS - OBLIGATE SPP DOD FUNDING - NOVEMBER 30 2016'
        }
    ],
    transactionMeta: {
        page: 1,
        nextPage: false
    },
    renderHash: 5,
    groupHash: 7,
    transactionSort: {
        field: "modification_number",
        direction: "desc"
    }
};
it('should return the initial state by default', () => {
    expect(awardReducer(undefined, {})).toEqual(initialState);
});

describe('SET_SELECTED_AWARD', () => {
    it('should save the returned award to redux state', () => {
        const action = {
            type: 'SET_SELECTED_AWARD',
            selectedAward: {
                id: 8914,
                award_id: "DEAC0500OR22725",
                recipient_name: "UT BATTELLE LIMITED LIABILITY COMPANY",
                description: "MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 0400::TAS - OBLIGATE SPP DOD FUNDING - OCTOBER 27 2016",
                date_signed: "10/9/2014",
                period_of_performance_start_date: "10/9/2014",
                period_of_performance_current_end_date: "3/31/2020",
                award_type: "D",
                type: "Definitive Contract",
                type_description: "Definitive Contract",
                awarding_agency_name: "ENERGY, DEPARTMENT OF",
                awarding_subtier_name: "ENERGY, DEPARTMENT OF",
                awarding_office_name: "",
                funding_agency_name: "DEPT OF DEFENSE",
                funding_subtier_name: "DEPT OF DEFENSE",
                funding_office_name: "",
                recipient_street: "BETHEL VALLEY ROAD",
                recipient_city: "OAK RIDGE",
                recipient_state_province: "TN",
                recipient_zip_postal: "37831",
                recipient_country: "UNITED STATES",
                pop_city: null,
                pop_state_province: "TN",
                pop_zip: "37830",
                total_obligation: "$524,325,656",
                potential_total_value_of_award: "$1,537,201",
                recipient_duns: "099114287",
                recipient_parent_duns: "099114287",
                recipient_business_type: "Unknown Business Type",
                type_of_contract_pricing: "R",
                type_of_contract_pricing_description: ""
            }
        };
        const updatedState = awardReducer(initialState, action);
        // the value should be equal
        expect(updatedState.selectedAward).toEqual(action.selectedAward);
    });
});

describe('SET_AWARD_TRANSACTIONS', () => {
    it('should save the returned award transcations to redux state', () => {
        const action = {
            type: 'SET_AWARD_TRANSACTIONS',
            transactions: mockTransactions
        };
        const updatedState = awardReducer(undefined, action);
        // the value should be equal
        expect(updatedState.transactions).toEqual(action.transactions);
    });
});

describe('APPEND_AWARD_TRANSACTIONS', () => {
    it('should append transactions for pages beyond page 1 instead of overwriting', () => {
        const action = {
            type: 'APPEND_AWARD_TRANSACTIONS',
            transactions: mockTransactions
        };
        const updatedState = awardReducer(appendState, action);
        // the value should be equal
        expect(updatedState.transactions).toEqual(_.concat(
            appendState.transactions, action.transactions));
    });
});

describe('SET_TRANSACTIONS_META', () => {
    it('should save the returned award to redux state', () => {
        const action = {
            type: 'SET_TRANSACTIONS_META',
            page: 1,
            nextPage: true
        };
        const updatedState = awardReducer(initialState, action);
        // the value should be equal
        expect(updatedState.transactionMeta).toEqual(action.transactionMeta);
    });
});

describe('SET_TRANSACTION_SORT', () => {
    it('should set the sorting column and direction', () => {
        const action = {
            type: 'SET_TRANSACTION_SORT',
            direction: 'desc',
            field: 'modification_number'
        };
        const updatedState = awardReducer(initialState, action);
        // the value should be equal
        expect(updatedState.transactionSort).toEqual(action.transactionSort);
    });
});

describe('UPDATE_TXN_RENDER_HASH', () => {
    it('should provide a unique hash id for the transaction render', () => {
        const action = {
            type: 'UPDATE_TXN_RENDER_HASH',
            renderHash: _.uniqueId()
        };
        // running twice
        let updatedState = awardReducer(initialState, action);
        updatedState = awardReducer(updatedState, action);
        // the value should be equal
        expect(updatedState.renderHash).not.toEqual(action.renderHash);
    });
});

describe('UPDATE_TXN_GROUP_HASH', () => {
    it('should provide a unique hash for the transaction group', () => {
        const action = {
            type: 'UPDATE_TXN_GROUP_HASH',
            groupHash: _.uniqueId()
        };
        // running twice
        let updatedState = awardReducer(initialState, action);
        updatedState = awardReducer(updatedState, action);
        // the value should be equal
        expect(updatedState.groupHash).not.toEqual(action.groupHash);
    });
});

describe('RESET_AWARD_DATA', () => {
    it('should reset state to the initial state', () => {
        const action = {
            type: 'RESET_AWARD_DATA'
        };
        // using append state to provide a non-empty state to reset
        const updatedState = awardReducer(appendState, action);
        // the value should be equal
        expect(updatedState).toEqual(initialState);
    });
});

describe('awardReducer', () => {
    describe('SET_AWARD_FINSYS_DATA', () => {
        it('should set the finSysData array to equal the provided value', () => {
            const action = {
                type: 'SET_AWARD_FINSYS_DATA',
                data: mockAwardResponse.results
            };

            let updatedState = awardReducer(undefined, {});
            // initial state should have an empty array
            expect(updatedState.finSysData).toEqual([]);

            updatedState = awardReducer(updatedState, action);
            // the Redux action should modify the finSysData array
            expect(updatedState.finSysData).toEqual(mockAwardResponse.results);
        });
    });

    describe('APPEND_AWARD_FINSYS_DATA', () => {
        it('should append the existing finSysData array with the provided values', () => {
            const firstAction = {
                type: 'SET_AWARD_FINSYS_DATA',
                data: mockAwardResponse.results
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
            expect(updatedState.finSysData).toEqual(mockAwardResponse.results);

            updatedState = awardReducer(updatedState, secondAction);
            expect(updatedState.finSysData.length).toBe(3);
            expect(updatedState.finSysData).toEqual(_.concat(mockAwardResponse.results, newItems));
        });
    });

    describe('SET_FINSYS_META', () => {
        it('should update the finSysMeta object with the provided values', () => {
            const action = {
                type: 'SET_FINSYS_META',
                meta: {
                    page: 1,
                    nextPage: true
                }
            };

            const expected = {
                page: 1,
                nextPage: true
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

    describe('SET_AWARD_SUBAWARDS', () => {
        it('should the subaward array to the provided values', () => {
            const startingState = Object.assign({}, initialState, {
                subawards: ['something 1', 'something 2']
            });

            let state = awardReducer(startingState, {});

            expect(state.subawards).toHaveLength(2);

            const newSubawards = ['something 3', 'something 4', 'something 5'];

            const action = {
                type: 'SET_AWARD_SUBAWARDS',
                subawards: newSubawards
            };

            // this action should overwrite the existing values
            state = awardReducer(state, action);
            expect(state.subawards).toHaveLength(3);
            expect(state.subawards).toEqual(newSubawards);
        });
    });

    describe('APPEND_AWARD_SUBAWARDS', () => {
        it('should append the provided values to the existing subaward array', () => {
            const startingState = Object.assign({}, initialState, {
                subawards: ['something 1', 'something 2']
            });

            let state = awardReducer(startingState, {});

            expect(state.subawards).toHaveLength(2);

            const newSubawards = ['something 3', 'something 4', 'something 5'];

            const action = {
                type: 'APPEND_AWARD_SUBAWARDS',
                subawards: newSubawards
            };

            state = awardReducer(state, action);
            expect(state.subawards).toHaveLength(5);
            expect(state.subawards).toEqual([
                'something 1', 'something 2', 'something 3', 'something 4', 'something 5'
            ]);
        });
    });

    describe('SET_SUBAWARD_META', () => {
        it('should merge the provided metadata into the existing meta values', () => {
            const startingState = Object.assign({}, initialState, {
                subawardMeta: {
                    hasNext: true,
                    page: 1,
                    render: '123',
                    group: '234'
                }
            });

            let state = awardReducer(startingState, {});

            const action = {
                type: 'SET_SUBAWARD_META',
                meta: {
                    hasNext: false,
                    page: 2,
                    render: '222'
                }
            };

            state = awardReducer(state, action);

            const expectedState = {
                hasNext: false,
                page: 2,
                render: '222',
                group: '234'
            };

            expect(state.subawardMeta).toEqual(expectedState);
        });
    });

    describe('SET_SUBAWARD_SORT', () => {
        it('should set the subaward sort object to the provided value', () => {
            let state = awardReducer(initialState, {});

            expect(state.subawardSort).toEqual(initialState.subawardSort);

            const action = {
                type: 'SET_SUBAWARD_SORT',
                sort: {
                    field: 'new_field',
                    direction: 'asc'
                }
            };

            state = awardReducer(state, action);

            expect(state.subawardSort).toEqual({
                field: 'new_field',
                direction: 'asc'
            });
        });
    });

    describe('RESET_SUBAWARD', () => {
        it('should reset the subaward values', () => {
            const startingState = Object.assign({}, initialState, {
                subawards: ['item 1', 'item 2'],
                subawardMeta: {
                    hasNext: true,
                    page: 3,
                    render: '222',
                    group: '111'
                },
                subawardSort: {
                    field: 'field_name',
                    direction: 'asc'
                }
            });

            let state = awardReducer(startingState, {});

            expect(state).not.toEqual(initialState);

            const action = {
                type: 'RESET_SUBAWARD'
            };

            state = awardReducer(state, action);

            expect(state).toEqual(initialState);
        });
    });
});
