/**
 * searchFiltersReducer.js
 * Created by Kevin Li 11/1/16
 **/

import { Set, OrderedMap, Record } from 'immutable';

import * as KeywordFilterFunctions from './filters/keywordFilterFunctions';
import * as AwardFilterFunctions from './filters/awardFilterFunctions';
import * as LocationFilterFunctions from './filters/locationFilterFunctions';
import * as AgencyFilterFunctions from './filters/agencyFilterFunctions';
import * as RecipientFilterFunctions from './filters/recipientFilterFunctions';
import * as AwardAmountFilterFunctions from './filters/awardAmountFilterFunctions';
import * as OtherFilterFunctions from './filters/OtherFilterFunctions';
import * as ContractFilterFunctions from './filters/contractFilterFunctions';
import * as ProgramSourceFilterFunctions from './filters/programSourceFilterFunctions';
import * as TimePeriodFilterFunctions from './filters/timePeriodFilterFunctions';
// update this version when changes to the reducer structure are made
// frontend will reject inbound hashed search filter sets with different versions because the
// data structures may have changed

export const filterStoreVersion = '2020-06-01';

const defaultCheckboxTreeSelections = { require: [], exclude: [], counts: [] };

export const CheckboxTreeSelections = Record(defaultCheckboxTreeSelections);

export const requiredTypes = {
    keyword: OrderedMap,
    timePeriodFY: Set,
    time_period: Set,
    selectedLocations: OrderedMap,
    selectedFundingAgencies: OrderedMap,
    selectedAwardingAgencies: OrderedMap,
    selectedRecipients: Set,
    recipientType: Set,
    selectedRecipientLocations: OrderedMap,
    awardType: Set,
    contractAwardType: Set,
    financialAssistanceAwardType: Set,
    selectedAwardIDs: OrderedMap,
    awardAmounts: OrderedMap,
    selectedCFDA: OrderedMap,
    treasuryAccounts: OrderedMap,
    tasCodes: CheckboxTreeSelections,
    naicsCodes: CheckboxTreeSelections,
    pscCodes: CheckboxTreeSelections,
    defCodes: CheckboxTreeSelections,
    covidDefCode: Set,
    infraDefCode: Set,
    pricingType: Set,
    setAside: Set,
    extentCompeted: Set
};

export const initialState = {
    keyword: OrderedMap(),
    timePeriodType: 'dr',
    timePeriodFY: Set(),
    time_period: Set(),
    filterNewAwardsOnlySelected: false,
    filterNewAwardsOnlyActive: false,
    filterNaoActiveFromFyOrDateRange: false,
    selectedLocations: OrderedMap(),
    locationDomesticForeign: 'all',
    selectedFundingAgencies: OrderedMap(),
    selectedAwardingAgencies: OrderedMap(),
    selectedRecipients: Set(),
    recipientDomesticForeign: 'all',
    recipientType: Set(),
    selectedRecipientLocations: OrderedMap(),
    awardType: Set(),
    contractAwardType: Set(),
    financialAssistanceAwardType: Set(),
    selectedAwardIDs: OrderedMap(),
    awardAmounts: OrderedMap(),
    selectedCFDA: OrderedMap(),
    naicsCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    pscCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    defCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    covidDefCode: Set(),
    infraDefCode: Set(),
    pricingType: Set(),
    setAside: Set(),
    extentCompeted: Set(),
    treasuryAccounts: OrderedMap(),
    tasCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    awardDescription: ''
};

export const initialStateFY = {
    keyword: OrderedMap(),
    timePeriodType: 'fy',
    timePeriodFY: Set(),
    time_period: Set(),
    filterNewAwardsOnlySelected: false,
    filterNewAwardsOnlyActive: false,
    filterNaoActiveFromFyOrDateRange: false,
    selectedLocations: OrderedMap(),
    locationDomesticForeign: 'all',
    selectedFundingAgencies: OrderedMap(),
    selectedAwardingAgencies: OrderedMap(),
    selectedRecipients: Set(),
    recipientDomesticForeign: 'all',
    recipientType: Set(),
    selectedRecipientLocations: OrderedMap(),
    awardType: Set(),
    selectedAwardIDs: OrderedMap(),
    awardAmounts: OrderedMap(),
    selectedCFDA: OrderedMap(),
    naicsCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    pscCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    defCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    covidDefCode: Set(),
    infraDefCode: Set(),
    pricingType: Set(),
    setAside: Set(),
    extentCompeted: Set(),
    treasuryAccounts: OrderedMap(),
    tasCodes: CheckboxTreeSelections(defaultCheckboxTreeSelections),
    awardDescription: ''
};

const searchFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        // Free Text Search
        case 'UPDATE_TEXT_SEARCH': {
            return Object.assign({}, state, {
                keyword: KeywordFilterFunctions.updateTextSearchInput(
                    state.keyword, action.textInput)
            });
        }

        // Time Period Filter
        case 'UPDATE_SEARCH_FILTER_TIME_PERIOD': {
            // FY time period is stored as an ImmutableJS set
            return Object.assign({}, state, {
                timePeriodType: action.dateType,
                timePeriodFY: new Set(action.fy)
            });
        }

        // New Time Period Filter Item
        case 'ADD_TIME_PERIOD_OBJECT': {
            return Object.assign({}, state, {
                timePeriodType: action.dateType,
                time_period: TimePeriodFilterFunctions.updateDRs(
                    state.time_period, action)
            });
        }

        // New Awards Only Filter, Selected
        case 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_SELECTED': {
            return Object.assign({}, state, {
                filterNewAwardsOnlySelected: action.filterValue
            });
        }

        // New Awards Only Filter, Active
        case 'UPDATE_SEARCH_FILTER_NEW_AWARDS_ONLY_ACTIVE': {
            return Object.assign({}, state, {
                filterNewAwardsOnlyActive: action.filterValue
            });
        }

        // New Awards Only Filter, Selected bc of conditions in fy or date range
        case 'UPDATE_SEARCH_FILTER_NAO_FROM_FY_OR_DATE_RANGE': {
            return Object.assign({}, state, {
                filterNaoActiveFromFyOrDateRange: action.filterValue
            });
        }

        // Place of Performance Filter
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

        case 'ADD_POP_LOCATION_OBJECT': {
            return Object.assign({}, state, {
                selectedLocations: state.selectedLocations.set(action.location.identifier, action.location)
            });
        }

        case 'ADD_RECIPIENT_LOCATION_OBJECT': {
            return Object.assign({}, state, {
                selectedRecipientLocations: state.selectedRecipientLocations.set(action.location.identifier, action.location)
            });
        }

        // Program Source (TAS) Filter
        case 'UPDATE_TREASURY_ACCOUNT_COMPONENTS': {
            return Object.assign({}, state, {
                treasuryAccounts: ProgramSourceFilterFunctions.updateSelectedSources(
                    state.treasuryAccounts, action.source)
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
        case 'TOGGLE_SEARCH_FILTER_RECIPIENT_TYPE': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified
            return Object.assign({}, state, {
                recipientType: RecipientFilterFunctions.immutableSetToggle(
                    state.recipientType, action.recipientType)
            });
        }
        case 'BULK_SEARCH_FILTER_RECIPIENT_TYPES': {
            return Object.assign({}, state, {
                recipientType: RecipientFilterFunctions.bulkRecipientTypeChange(
                    state.recipientType, action.recipientTypes, action.direction)
            });
        }

        // Award Type Filter
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

        // Contract Award Type Filter
        case 'TOGGLE_SEARCH_FILTER_CONTRACT_AWARD_TYPE': {
            return Object.assign({}, state, {
                contractAwardType: AwardFilterFunctions.immutableSetToggle(
                    state.contractAwardType, action.contractAwardType)
            });
        }
        case 'BULK_SEARCH_FILTER_CONTRACT_AWARD_TYPE': {
            return Object.assign({}, state, {
                contractAwardType: AwardFilterFunctions.bulkAwardTypeChange(
                    state.contractAwardType, action.contractAwardTypes, action.direction)
            });
        }

        // Financial Assistance Award Type Filter
        case 'TOGGLE_SEARCH_FILTER_FINANCIAL_ASSISTANCE_AWARD_TYPE': {
            return Object.assign({}, state, {
                financialAssistanceAwardType: AwardFilterFunctions.immutableSetToggle(
                    state.financialAssistanceAwardType, action.financialAssistanceAwardType)
            });
        }
        case 'BULK_SEARCH_FILTER_FINANCIAL_ASSISTANCE_AWARD_TYPE': {
            return Object.assign({}, state, {
                financialAssistanceAwardType: AwardFilterFunctions.bulkAwardTypeChange(
                    state.financialAssistanceAwardType, action.financialAssistanceAwardTypes, action.direction)
            });
        }

        // Award Amount Filter
        case 'UPDATE_AWARD_AMOUNTS': {
            return Object.assign({}, state, {
                awardAmounts: AwardAmountFilterFunctions.updateAwardAmounts(
                    state.awardAmounts, action.awardAmounts)
            });
        }

        // CFDA Filter
        case 'UPDATE_SELECTED_CFDA': {
            return Object.assign({}, state, {
                selectedCFDA: OtherFilterFunctions.updateSelectedCFDA(
                    state.selectedCFDA, action.cfda)
            });
        }

        // NAICS Filter
        case 'UPDATE_NAICS': {
            const naicsCodes = new CheckboxTreeSelections(OtherFilterFunctions.updateNaics(action.payload));
            return Object.assign({}, state, {
                naicsCodes
            });
        }

        // PSC_V2 Filter
        case 'UPDATE_PSC': {
            return Object.assign({}, state, {
                pscCodes: action.payload
            });
        }

        // TAS_V2 Filter
        case 'UPDATE_TAS': {
            return Object.assign({}, state, {
                tasCodes: action.payload
            });
        }

        // Pricing Type Filter
        case 'UPDATE_PRICING_TYPE': {
            return Object.assign({}, state, {
                pricingType: ContractFilterFunctions.updateContractFilterSet(
                    state.pricingType, action.pricingType)
            });
        }

        // Set Aside Filter
        case 'UPDATE_SET_ASIDE': {
            return Object.assign({}, state, {
                setAside: ContractFilterFunctions.updateContractFilterSet(
                    state.setAside, action.setAside)
            });
        }

        // Extent Competed Filter
        case 'UPDATE_EXTENT_COMPETED': {
            return Object.assign({}, state, {
                extentCompeted: ContractFilterFunctions.updateContractFilterSet(
                    state.extentCompeted, action.extentCompeted)
            });
        }

        // DEF Codes Filter
        case 'UPDATE_DEF_CODES': {
            return Object.assign({}, state, {
                defCodes: action.payload
            });
        }

        // Search 2.0 DEFC Filters
        case 'TOGGLE_COVID_DEF_CODES': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified
            return Object.assign({}, state, {
                covidDefCode: AwardFilterFunctions.immutableSetToggle(
                    state.covidDefCode, action.covidDefCode)
            });
        }
        case 'BULK_UPDATE_COVID_DEF_CODES': {
            return Object.assign({}, state, {
                covidDefCode: AwardFilterFunctions.bulkAwardTypeChange(
                    state.covidDefCode, action.covidDefCodes, action.direction)
            });
        }

        case 'TOGGLE_INFRA_DEF_CODES': {
            // this redux state is stored in an ImmutableJS set, which returns new instances
            // whenever it is modified
            return Object.assign({}, state, {
                infraDefCode: AwardFilterFunctions.immutableSetToggle(
                    state.infraDefCode, action.infraDefCode)
            });
        }
        case 'BULK_UPDATE_INFRA_DEF_CODES': {
            return Object.assign({}, state, {
                infraDefCode: AwardFilterFunctions.bulkAwardTypeChange(
                    state.infraDefCode, action.infraDefCodes, action.direction)
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
                time_period: initialState.time_period
            });
        }
        case 'RESET_TIME_PERIOD_OBJECT': {
            return initialState.time_period;
        }
        case 'CLEAR_SEARCH_FILTER_TYPE': {
            return Object.assign({}, state, {
                [action.filterType]: initialState[action.filterType]
            });
        }
        case 'RESTORE_HASHED_FILTERS': {
            return Object.assign({}, initialState, action.filters);
        }
        case 'CLEAR_SEARCH_FILTER_ALL': {
            return Object.assign({}, initialState);
        }

        default:
            return state;
    }
};

export default searchFiltersReducer;
