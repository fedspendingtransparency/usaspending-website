/**
 * SearchAwardsOperation.js
 * Created by michaelbray on 8/7/17.
 */
import { pickBy } from 'lodash';
import {
    rootKeys,
    timePeriodKeys,
    agencyKeys,
    awardAmountKeys,
    checkboxTreeKeys
} from 'dataMapping/search/awardsOperationKeys';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import { trimCheckedToCommonAncestors } from 'helpers/checkboxTreeHelper';

class SearchAwardsOperation {
    constructor() {
        this.keyword = [];

        this.timePeriodType = 'fy';
        this.timePeriodFY = [];
        this.timePeriodRange = [];

        this.awardType = [];

        this.awardingAgencies = [];
        this.fundingAgencies = [];

        this.tasCheckbox = checkboxTreeKeys;
        this.tasSources = [];

        this.selectedRecipients = [];
        this.recipientDomesticForeign = 'all';
        this.selectedRecipientLocations = [];
        this.recipientType = [];

        this.selectedLocations = [];
        this.locationDomesticForeign = 'all';

        this.awardAmounts = [];

        this.selectedAwardIDs = [];

        this.selectedCFDA = [];
        this.naicsCodes = checkboxTreeKeys;
        this.pscCheckbox = checkboxTreeKeys;
        // the defCodes don't actually send the checkboxTrees object shape to the API. See comment below.
        this.defCodes = checkboxTreeKeys;
        this.pricingType = [];
        this.setAside = [];
        this.extentCompeted = [];
    }

    fromState(state) {
        this.keyword = state.keyword.toArray();

        this.timePeriodFY = state.timePeriodFY.toArray();
        this.timePeriodRange = [];
        this.timePeriodType = state.timePeriodType;
        if (state.timePeriodType === 'dr' && (state.timePeriodStart || state.timePeriodEnd)) {
            this.timePeriodRange = [state.timePeriodStart, state.timePeriodEnd];
            this.timePeriodFY = [];
        }

        this.awardType = state.awardType.toArray();

        this.awardingAgencies = state.selectedAwardingAgencies.toArray();
        this.fundingAgencies = state.selectedFundingAgencies.toArray();

        this.tasSources = state.treasuryAccounts.toArray();
        this.tasCheckbox = {
            require: state.tasCodes.toObject().require,
            exclude: state.tasCodes.toObject().exclude
        };

        this.selectedRecipients = state.selectedRecipients.toArray();
        this.recipientDomesticForeign = state.recipientDomesticForeign;
        this.selectedRecipientLocations = state.selectedRecipientLocations.toArray();
        this.recipientType = state.recipientType.toArray();

        this.selectedLocations = state.selectedLocations.toArray();
        this.locationDomesticForeign = state.locationDomesticForeign;

        this.awardAmounts = state.awardAmounts.toArray();

        this.selectedAwardIDs = state.selectedAwardIDs.toArray();

        this.selectedCFDA = state.selectedCFDA.toArray();
        this.naicsCodes = {
            require: state.naicsCodes.toObject().require,
            exclude: state.naicsCodes.toObject().exclude
        };
        this.pscCheckbox = {
            require: state.pscCodes.toObject().require,
            exclude: state.pscCodes.toObject().exclude
        };
        this.defCodes = {
            require: state.defCodes.toObject().require,
            exclude: state.defCodes.toObject().exclude
        };

        this.pricingType = state.pricingType.toArray();
        this.setAside = state.setAside.toArray();
        this.extentCompeted = state.extentCompeted.toArray();
    }

    toParams() {
    // Convert the search operation into JS objects
        const filters = {};
        // Add keyword
        if (this.keyword.length > 0) {
            filters[rootKeys.keywords] = this.keyword;
        }

        // Add Time Period
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            if (this.timePeriodType === 'fy' && this.timePeriodFY.length > 0) {
                filters[rootKeys.timePeriod] = this.timePeriodFY.map((fy) => {
                    const dates = FiscalYearHelper.convertFYToDateRange(fy);

                    return {
                        [timePeriodKeys.startDate]: dates[0],
                        [timePeriodKeys.endDate]: dates[1]
                    };
                });
            }
            else if (this.timePeriodType === 'dr' && this.timePeriodRange.length > 0) {
                let start = this.timePeriodRange[0];
                let end = this.timePeriodRange[1];

                // if no start or end date is provided, use the 2008-present date range to fill out
                // the missing dates
                const initialYear = FiscalYearHelper.earliestFiscalYear;
                const currentYear = FiscalYearHelper.currentFiscalYear();

                if (!start) {
                    start = FiscalYearHelper.convertFYToDateRange(initialYear)[0];
                }
                if (!end) {
                    end = FiscalYearHelper.convertFYToDateRange(currentYear)[1];
                }

                filters[rootKeys.timePeriod] = [
                    {
                        [timePeriodKeys.startDate]: start,
                        [timePeriodKeys.endDate]: end
                    }
                ];
            }
        }

        if ((this.timePeriodType === 'fy' && this.timePeriodFY.length === 0) ||
        (this.timePeriodType === 'dr' && this.timePeriodRange.length === 0)) {
            // the user selected fiscal years but did not specify any years OR
            // the user has selected the date range type but has not entered any dates yet
            // this should default to a period of time from FY 2008 to present
            const initialYear = FiscalYearHelper.earliestFiscalYear;
            const currentYear = FiscalYearHelper.currentFiscalYear();

            filters[rootKeys.timePeriod] = [{
                [timePeriodKeys.startDate]: FiscalYearHelper.convertFYToDateRange(initialYear)[0],
                [timePeriodKeys.endDate]: FiscalYearHelper.convertFYToDateRange(currentYear)[1]
            }];
        }

        // Add award types
        if (this.awardType.length > 0) {
            filters[rootKeys.awardType] = this.awardType;
        }

        // Add Agencies
        if (this.fundingAgencies.length > 0 || this.awardingAgencies.length > 0) {
            const agencies = [];

            this.fundingAgencies.forEach((agencyArray) => {
                const fundingAgencyName = agencyArray[`${agencyArray.agencyType}_agency`].name;
                const agency = {
                    [agencyKeys.type]: 'funding',
                    [agencyKeys.tier]: agencyArray.agencyType,
                    [agencyKeys.name]: fundingAgencyName
                };
                if (agencyArray.agencyType === 'subtier') {
                    agency[agencyKeys.toptierName] = agencyArray.toptier_agency.name;
                }
                agencies.push(agency);
            });

            this.awardingAgencies.forEach((agencyArray) => {
                const awardingAgencyName = agencyArray[`${agencyArray.agencyType}_agency`].name;
                const agency = {
                    [agencyKeys.type]: 'awarding',
                    [agencyKeys.tier]: agencyArray.agencyType,
                    [agencyKeys.name]: awardingAgencyName
                };
                if (agencyArray.agencyType === 'subtier') {
                    agency[agencyKeys.toptierName] = agencyArray.toptier_agency.name;
                }
                agencies.push(agency);
            });

            filters[rootKeys.agencies] = agencies;
        }

        // Add Program Sources
        if (this.tasSources.length > 0 || this.tasCheckbox.require.length > 0) {
            const tasCodes = [];

            this.tasSources.forEach((tasObject) => {
                tasCodes.push(pickBy(tasObject));
            });

            if (tasCodes.length > 0) {
                filters[rootKeys.tasSources] = tasCodes;
            }

            if (this.tasCheckbox.exclude.length > 0) {
                filters[rootKeys.tasCheckbox] = {
                    require: trimCheckedToCommonAncestors(this.tasCheckbox.require),
                    exclude: this.tasCheckbox.exclude
                };
            }
            else if (this.tasCheckbox.require.length > 0) {
                filters[rootKeys.tasCheckbox] = { require: trimCheckedToCommonAncestors(this.tasCheckbox.require) };
            }
        }

        // Add Recipients, Recipient Scope, Recipient Locations, and Recipient Types
        if (this.selectedRecipients.length > 0) {
            filters[rootKeys.recipients] = this.selectedRecipients;
        }

        if (this.selectedRecipientLocations.length > 0) {
            const locationSet = this.selectedRecipientLocations.reduce((accLocationSet, currLocation) => {
                if (!currLocation.filter.city && currLocation.filter.country && currLocation.filter.country.toLowerCase() === 'foreign') {
                    filters[rootKeys.recipientLocationScope] = 'foreign';
                }
                else {
                    accLocationSet.push(currLocation.filter);
                }
                return accLocationSet;
            }, []);

            if (locationSet.length > 0) {
                filters[rootKeys.recipientLocation] = locationSet;
            }
        }

        if (this.recipientType.length > 0) {
            filters[rootKeys.recipientType] = this.recipientType;
        }

        // Add Locations
        if (this.selectedLocations.length > 0) {
            const locationSet = this.selectedLocations.reduce((accLocationSet, currLocation) => {
                if (!currLocation.filter.city && currLocation.filter.country && currLocation.filter.country.toLowerCase() === 'foreign') {
                    filters[rootKeys.placeOfPerformanceScope] = 'foreign';
                }
                else {
                    accLocationSet.push(currLocation.filter);
                }
                return accLocationSet;
            }, []);

            if (locationSet.length > 0) {
                filters[rootKeys.placeOfPerformance] = locationSet;
            }
        }

        // Add Award Amounts
        if (this.awardAmounts.length > 0) {
            const amounts = [];

            // The backend expects an object with a lower bound, an upper bound, or both.
            this.awardAmounts.forEach((awardAmount) => {
                const amount = {};
                amount[awardAmountKeys.min] = awardAmount[0];
                amount[awardAmountKeys.max] = awardAmount[1];
                // remove property if it is null
                if (amount[awardAmountKeys.min] === null) delete amount[awardAmountKeys.min];
                if (amount[awardAmountKeys.max] === null) delete amount[awardAmountKeys.max];
                // if both null return
                if ((!amount[awardAmountKeys.min] && amount[awardAmountKeys.min] !== 0)
                && (!amount[awardAmountKeys.max] && amount[awardAmountKeys.max] !== 0)) {
                    return;
                }
                amounts.push(amount);
            });

            // Only push the array to the filters element if at least
            // one award amount object is defined
            if (amounts.length > 0) {
                filters[rootKeys.awardAmount] = amounts;
            }
        }

        // Add Award IDs
        if (this.selectedAwardIDs.length > 0) {
            filters[rootKeys.awardID] = this.selectedAwardIDs;
        }

        // Add CFDA
        if (this.selectedCFDA.length > 0) {
            filters[rootKeys.cfda] = this.selectedCFDA.map((cfda) => cfda.program_number);
        }

        // Add NAICS
        if (this.naicsCodes.require.length > 0) {
            if (this.naicsCodes.exclude.length > 0) {
                filters[rootKeys.naics] = this.naicsCodes;
            }
            else {
                filters[rootKeys.naics] = this.naicsCodes.require;
            }
        }

        // Add PSC
        if (this.pscCheckbox.require.length > 0) {
            if (this.pscCheckbox.exclude.length > 0) {
                filters[rootKeys.psc] = {
                    require: trimCheckedToCommonAncestors(this.pscCheckbox.require),
                    exclude: this.pscCheckbox.exclude
                };
            }
            else {
                filters[rootKeys.psc] = { require: trimCheckedToCommonAncestors(this.pscCheckbox.require) };
            }
        }

        // Add Contract Pricing
        if (this.pricingType.length > 0) {
            filters[rootKeys.contractPricing] = this.pricingType;
        }

        // Add Set Aside Type
        if (this.setAside.length > 0) {
            filters[rootKeys.setAsideType] = this.setAside;
        }

        // Add Extent Competed
        if (this.extentCompeted.length > 0) {
            filters[rootKeys.extentCompeted] = this.extentCompeted;
        }

        // Add Def Codes
        if (this.defCodes.require.length > 0) {
            // right now, due to the shape of this data, we never send excluded to the api, so the
            // api expects just an array of strings. Should that ever change and the DEFC data becomes more complex
            // and the checkbox tree is more like the others, we can easily migrate to the more complex request object.
            filters[rootKeys.defCodes] = this.defCodes.require;
        }

        return filters;
    }
}

export default SearchAwardsOperation;
