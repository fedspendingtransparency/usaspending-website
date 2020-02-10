/**
 * bulkDownloadReducer.js
 * Created by Lizzie Salita 10/31/17
 **/

import { defaultQuarters } from 'containers/explorer/detail/helpers/explorerQuarters';


const initialQuarters = defaultQuarters();

export const initialState = {
    dataType: '',
    awards: {
        awardLevels: {
            primeAwards: false,
            subAwards: false
        },
        awardTypes: {
            contracts: false,
            grants: false,
            directPayments: false,
            loans: false,
            otherFinancialAssistance: false,
            idvs: false
        },
        agency: {
            id: '',
            name: 'Select an Agency'
        },
        subAgency: {
            id: '',
            name: 'Select a Sub-Agency'
        },
        location: {
            country: {
                code: '',
                name: ''
            },
            state: {
                code: '',
                name: ''
            }
        },
        dateType: 'action_date',
        dateRange: {
            startDate: '',
            endDate: ''
        },
        columns: [],
        fileFormat: 'csv'
    },
    accounts: {
        accountLevel: 'federalAccount',
        budgetFunction: {
            code: '',
            title: 'Select a Budget Function'
        },
        budgetSubfunction: {
            code: '',
            title: 'Select a Budget Sub-Function'
        },
        agency: {
            id: '',
            name: 'Select an Agency'
        },
        federalAccount: {
            id: '',
            name: 'Select a Federal Account'
        },
        submissionTypes: ['accountBalances'],
        fy: `${initialQuarters.year}`,
        quarter: `${Math.max(...initialQuarters.quarters)}`,
        fileFormat: 'csv'
    },
    download: {
        expectedFile: '',
        expectedUrl: '',
        pendingDownload: false,
        showCollapsedProgress: false
    }
};

const bulkDownloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA_TYPE': {
            return Object.assign({}, state, {
                dataType: action.dataType
            });
        }
        case 'UPDATE_CHECKBOX': {
            const filter = Object.assign({}, state.awards[action.filter], {
                [action.name]: action.value
            });

            const dataType = Object.assign({}, state[action.dataType], {
                [action.filter]: filter
            });

            return Object.assign({}, state, {
                [action.dataType]: dataType
            });
        }
        case 'UPDATE_DOWNLOAD_FILTER': {
            const { dataType, name, value } = action;
            if (name === 'submissionTypes') {
                // toggle; checkbox is unchecked
                if (state[dataType][name].includes(value)) {
                    return {
                        ...state,
                        [dataType]: {
                            ...state[dataType],
                            [name]: state[dataType][name].filter((submissionType) => submissionType !== value)
                        }
                    };
                }
                // insert; checkbox is checked, persist existing values and add new value
                return {
                    ...state,
                    [dataType]: {
                        ...state[dataType],
                        [name]: [...state[dataType][name], value]
                    }
                };
            }
            return Object.assign({}, state, {
                [dataType]: Object.assign({}, state[dataType], {
                    [name]: value
                })
            });
        }
        case 'UPDATE_AWARD_DATE_RANGE': {
            const dateRange = Object.assign({}, state.awards.dateRange, {
                [action.dateType]: action.date
            });

            const awards = Object.assign({}, state.awards, {
                dateRange
            });

            return Object.assign({}, state, {
                awards
            });
        }
        case 'CLEAR_DOWNLOAD_FILTERS': {
            const reset = Object.assign({}, initialState[action.dataType]);

            return Object.assign({}, state, {
                [action.dataType]: reset
            });
        }
        case 'SET_BULK_DOWNLOAD_EXPECTED_URL': {
            const download = Object.assign({}, state.download, {
                expectedUrl: action.url
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_EXPECTED_FILE': {
            const download = Object.assign({}, state.download, {
                expectedFile: action.file
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_PENDING': {
            const download = Object.assign({}, state.download, {
                pendingDownload: action.state
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'SET_BULK_DOWNLOAD_COLLAPSED': {
            const download = Object.assign({}, state.download, {
                showCollapsedProgress: action.collapsed
            });
            return Object.assign({}, state, {
                download
            });
        }
        case 'RESET_BULK_DOWNLOAD': {
            const download = Object.assign({}, initialState.download);

            return Object.assign({}, state, {
                download
            });
        }
        default:
            return state;
    }
};

export default bulkDownloadReducer;
