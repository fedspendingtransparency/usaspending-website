/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set, OrderedMap } from 'immutable';

import * as AwardFilterFunctions from './filters/awardFilterFunctions';
import * as LocationFilterFunctions from './filters/locationFilterFunctions';
import * as AgencyFilterFunctions from './filters/agencyFilterFunctions';
import * as RecipientFilterFunctions from './filters/recipientFilterFunctions';
import * as AwardIDFilterFunctions from './filters/awardIDFilterFunctions';

const initialState = {
    awardType: new Set(),
    timePeriodType: 'fy',
    timePeriodFY: new Set(),
    timePeriodStart: null,
    timePeriodEnd: null,
    keyword: '',
    selectedFundingAgencies: new OrderedMap(),
    selectedAwardingAgencies: new OrderedMap(),
    selectedLocations: new OrderedMap(),
    locationDomesticForeign: 'all',
    selectedRecipients: new OrderedMap(),
    recipientDomesticForeign: 'all',
    selectedRecipientLocations: new OrderedMap(),
    selectedAwardIDs: new OrderedMap()
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Free Text Search
        case 'UPDATE_TEXT_SEARCH': {
            return Object.assign({}, state, {
                keyword: action.textInput
            });
        }
        case 'TOGGLE_SEARCH_FILTER_AWARD_TYPE': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified
            return Object.assign({}, state, {
                awardType: AwardFilterFunctions.immutableSetToggle(
                    state.awardType, action.awardType)
            });
        }
        case 'BULK_SEARCH_FILTER_AWARD_TYPE': {
            return Object.assign({}, state, {
                awardType: AwardFilterFunctions.bulkAwardTypeChange(
                    state.awardType, action.awardTypes, action.direction)
            });
        }
        case 'UPDATE_SEARCH_FILTER_TIME_PERIOD': {
            // FY time period is stored as an ImmutableJS set
            return Object.assign({}, state, {
                timePeriodType: action.dateType,
                timePeriodStart: action.start,
                timePeriodEnd: action.end,
                timePeriodFY: new Set(action.fy)
            });
        }

        // Location Filter
        case 'UPDATE_SELECTED_LOCATIONS': {
            return Object.assign({}, state, {
                selectedLocations: LocationFilterFunctions.updateSelectedLocations(
                    state.selectedLocations, action.location)
            });
        }
        case 'UPDATE_DOMESTIC_FOREIGN': {
            return Object.assign({}, state, {
                locationDomesticForeign: action.selection
            });
        }

        // Agency Filter
        case 'UPDATE_SELECTED_AWARDING_AGENCIES': {
            return Object.assign({}, state, {
                selectedAwardingAgencies: AgencyFilterFunctions.updateSelectedAgencies(
                    state.selectedAwardingAgencies, action.agency)
            });
        }
        case 'UPDATE_SELECTED_FUNDING_AGENCIES': {
            return Object.assign({}, state, {
                selectedFundingAgencies: AgencyFilterFunctions.updateSelectedAgencies(
                    state.selectedFundingAgencies, action.agency)
            });
        }

        // Recipient Filter
        case 'UPDATE_SELECTED_RECIPIENTS': {
            return Object.assign({}, state, {
                selectedRecipients: RecipientFilterFunctions.updateSelectedRecipients(
                    state.selectedRecipients, action.recipient)
            });
        }
        case 'UPDATE_RECIPIENT_DOMESTIC_FORIEGN': {
            return Object.assign({}, state, {
                recipientDomesticForeign: action.selection
            });
        }
        case 'UPDATE_RECIPIENT_LOCATIONS': {
            return Object.assign({}, state, {
                selectedRecipientLocations: RecipientFilterFunctions
                    .updateSelectedRecipientLocations(
                        state.selectedRecipientLocations, action.location)
            });
        }

        // Award ID Filter
        case 'UPDATE_SELECTED_AWARD_IDS': {
            return Object.assign({}, state, {
                selectedAwardIDs: AwardIDFilterFunctions.updateSelectedAwardIDs(
                    state.selectedAwardIDs, action.awardID)
            });
        }

        // Generic
        case 'UPDATE_SEARCH_FILTER_GENERIC': {
            return Object.assign({}, state, {
                [action.filterType]: action.filterValue
            });
        }
        case 'RESET_SEARCH_TIME_FILTER': {
            return Object.assign({}, state, {
                timePeriodType: initialState.timePeriodType,
                timePeriodFY: initialState.timePeriodFY,
                timePeriodStart: initialState.timePeriodStart,
                timePeriodEnd: initialState.timePeriodEnd
            });
        }
        case 'CLEAR_SEARCH_FILTER_TYPE': {
            return Object.assign({}, state, {
                [action.filterType]: initialState[action.filterType]
            });
        }
        case 'CLEAR_SEARCH_FILTER_ALL': {
            return Object.assign({}, initialState);
        }
        default:
            return state;
    }
};

export default searchFiltersReducer;
