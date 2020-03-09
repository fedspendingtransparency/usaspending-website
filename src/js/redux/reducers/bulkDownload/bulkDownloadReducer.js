/**
 * bulkDownloadReducer.js
 * Created by Lizzie Salita 10/31/17
 **/

import { Set } from 'immutable';

import { defaultQuarters } from 'containers/explorer/detail/helpers/explorerQuarters';

import * as AwardFilterFunctions from '../search/filters/awardFilterFunctions';

const initialQuarters = defaultQuarters();

export const initialState = {
    dataType: '',
    awards: {
        awardTypes: {
            primeAwards: new Set(),
            subAwards: new Set()
        },
        agency: {
            id: '',
            name: 'Select an Agency'
        },
        subAgency: {
            id: '',
            name: 'Select a Sub-Agency'
        },
        locationType: 'recipient_location',
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
        case 'BULK_AWARD_TYPE_CHANGE': {
            const awardTypes = Object.assign({}, state.awards.awardTypes, {
                [action.lookupName]: AwardFilterFunctions.bulkAwardTypeChange(
                    state.awards.awardTypes[action.lookupName], action.awardTypes, action.direction
                )
            });
            const awards = Object.assign({}, state.awards, { awardTypes });

            return Object.assign({}, state, { awards });
        }
        case 'TOGGLE_AWARD_TYPE_CHANGE': {
            const awardTypes = Object.assign({}, state.awards.awardTypes, {
                [action.lookupName]: AwardFilterFunctions.immutableSetToggle(
                    state.awards.awardTypes[action.lookupName], action.awardType)
            });
            const awards = Object.assign({}, state.awards, { awardTypes });

            return Object.assign({}, state, { awards });
        }
        default:
            return state;
    }
};

export default bulkDownloadReducer;
