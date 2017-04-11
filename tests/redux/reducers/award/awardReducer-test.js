import _ from 'lodash';
import awardReducer from 'redux/reducers/award/awardReducer';

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
    }
};

const sampleData = {
    total_metadata: {
        count: 2
    },
    page_metadata: {
        page: 1,
        has_next_page: true
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
                },
                {
                    id: 40905,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/30/2016',
                    action_type: 'C',
                    federal_action_obligation: '$9,740,762',
                    modification_number: '958',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $9,740,762.00 IN DOE APPROPRIATED FUNDING AND $4,278,014.31 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $435,532,331.16.'
                },
                {
                    id: 40906,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/17/2016',
                    action_type: 'C',
                    federal_action_obligation: '$241,000',
                    modification_number: '957',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $241,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40907,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/10/2016',
                    action_type: 'C',
                    federal_action_obligation: '$40,000',
                    modification_number: '956',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $40,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40909,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/7/2016',
                    action_type: 'C',
                    federal_action_obligation: '$21,007,166',
                    modification_number: '955',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $21,007,166.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40908,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/8/2016',
                    action_type: 'B',
                    federal_action_obligation: '$0',
                    modification_number: '954',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-66'
                },
                {
                    id: 39973,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/27/2016',
                    action_type: null,
                    federal_action_obligation: '$1,537,201',
                    modification_number: '953',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 0400::TAS - OBLIGATE SPP DOD FUNDING - OCTOBER 27 2016'
                },
                {
                    id: 39849,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/27/2016',
                    action_type: null,
                    federal_action_obligation: '$25,840,226',
                    modification_number: '952',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $25,840,225.75 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 39862,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/20/2016',
                    action_type: null,
                    federal_action_obligation: '$154,805,714',
                    modification_number: '951',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $154,805,714.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 36839,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/26/2015',
                    action_type: null,
                    federal_action_obligation: '$498,104',
                    modification_number: '913',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::68 0108::TAS - OBLIGATE SPP EPA FUNDING - OCTOBER 2015'
                },
                {
                    id: 36757,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/26/2015',
                    action_type: null,
                    federal_action_obligation: '$150,330,700',
                    modification_number: '912',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $150,330,700.26 IN DOE APPROPRIATED FUNDING; NON-APPROPRIATED FUNDS CURRENT ACTION = $1,523,053.45; NON-APPROPRIATED FUNDS CUMULATIVE SINCE MOD. 234 = $413,663,188.76.'
                },
                {
                    id: 36791,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/15/2015',
                    action_type: null,
                    federal_action_obligation: '$0',
                    modification_number: '911',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-62'
                },
                {
                    id: 34869,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/30/2014',
                    action_type: null,
                    federal_action_obligation: '-$14,274',
                    modification_number: '860',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - RECOVERY TAS::89 0227::TAS - DEOBLIGATE SC ARRA FUNDING FROM PROJECT ENTITLED "NUCLEAR PHYSICS - NUCLEAR SCIENCE WORKFORCE"'
                }
            ]
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
                },
                {
                    id: 40905,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/30/2016',
                    action_type: 'C',
                    federal_action_obligation: '$9,740,762',
                    modification_number: '958',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $9,740,762.00 IN DOE APPROPRIATED FUNDING AND $4,278,014.31 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $435,532,331.16.'
                },
                {
                    id: 40906,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/17/2016',
                    action_type: 'C',
                    federal_action_obligation: '$241,000',
                    modification_number: '957',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $241,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40907,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/10/2016',
                    action_type: 'C',
                    federal_action_obligation: '$40,000',
                    modification_number: '956',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $40,000.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40909,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/7/2016',
                    action_type: 'C',
                    federal_action_obligation: '$21,007,166',
                    modification_number: '955',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $21,007,166.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 40908,
                    type: 'D',
                    type_description: 'Unknown Type',
                    action_date: '11/8/2016',
                    action_type: 'B',
                    federal_action_obligation: '$0',
                    modification_number: '954',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-66'
                },
                {
                    id: 39973,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/27/2016',
                    action_type: null,
                    federal_action_obligation: '$1,537,201',
                    modification_number: '953',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 0400::TAS - OBLIGATE SPP DOD FUNDING - OCTOBER 27 2016'
                },
                {
                    id: 39849,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/27/2016',
                    action_type: null,
                    federal_action_obligation: '$25,840,226',
                    modification_number: '952',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $25,840,225.75 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 39862,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/20/2016',
                    action_type: null,
                    federal_action_obligation: '$154,805,714',
                    modification_number: '951',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $154,805,714.00 IN DOE APPROPRIATED FUNDING AND $0.00 IN NON-APPROPRIATED FUNDS; CUMULATIVE NA FUNDS - $431,254,316.85.'
                },
                {
                    id: 36839,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/26/2015',
                    action_type: null,
                    federal_action_obligation: '$498,104',
                    modification_number: '913',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::68 0108::TAS - OBLIGATE SPP EPA FUNDING - OCTOBER 2015'
                },
                {
                    id: 36757,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/26/2015',
                    action_type: null,
                    federal_action_obligation: '$150,330,700',
                    modification_number: '912',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - OBLIGATE $150,330,700.26 IN DOE APPROPRIATED FUNDING; NON-APPROPRIATED FUNDS CURRENT ACTION = $1,523,053.45; NON-APPROPRIATED FUNDS CUMULATIVE SINCE MOD. 234 = $413,663,188.76.'
                },
                {
                    id: 36791,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/15/2015',
                    action_type: null,
                    federal_action_obligation: '$0',
                    modification_number: '911',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - REVISE APPENDIX E TO INCORPORATE RCN OR-62'
                },
                {
                    id: 34869,
                    type: 'D',
                    type_description: 'Definitive Contract',
                    action_date: '10/30/2014',
                    action_type: null,
                    federal_action_obligation: '-$14,274',
                    modification_number: '860',
                    description: 'MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - RECOVERY TAS::89 0227::TAS - DEOBLIGATE SC ARRA FUNDING FROM PROJECT ENTITLED "NUCLEAR PHYSICS - NUCLEAR SCIENCE WORKFORCE"'
                }
            ]
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
});
