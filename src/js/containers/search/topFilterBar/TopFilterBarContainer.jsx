/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { orderBy, difference, concat, indexOf } from 'lodash';


import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { topFilterGroupGenerator } from
    'components/search/topFilterBar/filterGroups/TopFilterGroupGenerator';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as AwardType from 'dataMapping/search/awardType';

// import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const dayjs = require('dayjs');

const propTypes = {
    updateFilterCount: PropTypes.func,
    compressed: PropTypes.bool,
    filters: PropTypes.object
};

const TopFilterBarContainer = ({ updateFilterCount, compressed = false, filters }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const [filtersInfo, setFiltersInfo] = useState({
        filters: [],
        filterCount: 0
    });

    const prepareSelectedDefCodes = () => {
        let selected = false;
        const filter = {
            values: []
        };
        if (filters?.defCodes?.toObject()?.require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...filters.defCodes?.counts.map((def) => ({
                    ...def,
                    def_description: `${def.label} (${def?.count})`
                }))
            ];
        }
        if (selected) {
            filter.code = 'defCodes';
            filter.name = 'Disaster Emergency Fund Code (DEFC)';
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux time filter into a JS object that can be parsed by the
     * top filter bar
     */
    const prepareTimeFilter = () => {
        let selected = false;
        const filter = {
            values: []
        };
        if (filters?.timePeriodType === 'fy') {
            // check to see if any FYs are selected
            if (filters.timePeriodFY?.size > 0) {
                // years are selected
                selected = true;
                filter.code = 'timePeriodFY';
                filter.name = 'Time Period';

                // return the years in chronological order
                filter.values = orderBy(filters.timePeriodFY.toArray(), [], ['desc']);
            }
        }
        else if (filters?.timePeriodType === 'dr') {
            // const lastInTimePeriod = filters.time_period[filters.time_period.length - 1];
            // // check to see if any date ranges are selected
            if (filters.time_period.size > 0) {
                // start and end dates are provided
                selected = true;
                filter.code = 'timePeriodDR';
                filter.name = 'Time Period';
                for (const period of filters.time_period) {
                    let startString;
                    let endString;

                    if (period.start_date) {
                        startString = dayjs(period.start_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
                    }

                    if (period.end_date) {
                        endString = dayjs(period.end_date, 'YYYY-MM-DD').format('MM/DD/YYYY');
                    }
                    if (period.start_date && period.end_date) {
                        filter.values.push([`${startString} to ${endString}`]);
                    }
                    else if (period.start_date) {
                        // open-ended end date
                        filter.values.push([`${startString} to present`]);
                    }
                    else if (period.end_date) {
                        // open-ended start date
                        filter.values.push([`... to ${endString}`]);
                    }
                }
            }
        }

        if (selected) {
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux newAwardsOnly filter into a JS object that can be parsed by the
     * top filter bar
     */
    const prepareNewAwardsOnly = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.newAwardsOnly) {
            selected = true;
            filter.values = true;
        }

        if (selected) {
            filter.code = 'newAwardsOnly';
            filter.name = null;
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux keyword filter into a JS object that can be parsed by the
     * top filter bar
     */
    const prepareKeywords = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.keyword && filters.keyword?.size > 0) {
            selected = true;
            filter.values = filters.keyword?.toArray();
        }

        if (selected) {
            filter.code = 'keyword';
            filter.name = 'Keyword';
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux award type filter into a JS object that can be parsed by
     * the top filter bar
     */
    const prepareAwardTypes = () => {
        let selected = false;
        const filter = {};

        if (filters?.awardType?.count() > 0) {
            // award types exist
            selected = true;
            filter.code = 'awardType';
            filter.name = 'Award Type';

            filter.values = filters.awardType?.toArray();
        }

        if (selected) {
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux selected locations and location scope into a JS object
     * that can be parsed by the top filter bar
     */
    const prepareSelectedLocations = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.selectedLocations?.count() > 0) {
            // locations have been selected
            selected = true;
            filter.values = filters.selectedLocations.toArray();
            filter.scope = filters.locationDomesticForeign;
        }
        // add an extra property to handle location scope
        if (filters?.locationDomesticForeign && filters.locationDomesticForeign !== 'all') {
            // we are handling this in its own if block to handle a case where no locations
            // have been selected, but the scope is not 'all'
            selected = true;
            filter.scope = filters.locationDomesticForeign;
            // add the scope as a value item so the total filter count is correctly summed
            filter.values.push({
                isScope: true
            });
        }

        if (selected) {
            filter.code = 'selectedLocations';
            filter.name = 'Place of Performance';
            return filter;
        }
        return null;
    };

    const prepareTreasuryAccounts = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.treasuryAccounts && filters.treasuryAccounts?.count() > 0) {
            // treasury account components have been selected
            selected = true;
            const identifiers = Object.keys(filters.treasuryAccounts?.toObject());
            filter.values = identifiers;
        }

        if (filters?.tasCodes?.require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...filters.tasCodes?.counts.map((tas) => ({
                    ...tas,
                    isCheckbox: true,
                    tas_description: `${tas.label} (${tas?.count})`
                }))
            ];
        }

        if (selected) {
            filter.code = 'treasuryAccounts';
            filter.name = 'Treasury Account';
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux selected Awarding and Funding Agencies into a JS object
     * that can be parsed by the top filter bar
     */
    const prepareAgencies = (type) => {
        let selected = false;
        const filter = {
            values: []
        };

        if (type === 'funding') {
            if (filters?.selectedFundingAgencies?.count() > 0) {
                // Funding Agencies have been selected
                selected = true;
                filter.values = filters.selectedFundingAgencies.toArray();
            }

            if (selected) {
                filter.code = 'selectedFundingAgencies';
                filter.name = 'Funding Agency';
                return filter;
            }
        }
        else if (filters?.selectedAwardingAgencies?.count() > 0) {
            // Awarding Agencies have been selected
            selected = true;
            filter.values = filters.selectedAwardingAgencies.toArray();

            if (selected) {
                filter.code = 'selectedAwardingAgencies';
                filter.name = 'Awarding Agency';
                return filter;
            }
        }

        return null;
    };

    /**
     * Logic for parsing the current Redux selected Recipients into a JS object
     * that can be parsed by the top filter bar
     */
    const prepareRecipients = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.selectedRecipients?.count() > 0) {
            // Recipients have been selected
            selected = true;
            filter.values = filters.selectedRecipients.toArray();
        }

        if (selected) {
            filter.code = 'selectedRecipients';
            filter.name = 'Recipient';
            return filter;
        }

        return null;
    };

    /**
     * Logic for parsing the current Redux selected Recipient Locations and Recipient Location
     * Scope into a JS object that can be parsed by the top filter bar
     */
    const prepareRecipientLocations = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.selectedRecipientLocations?.count() > 0) {
            // locations have been selected
            selected = true;
            filter.values = filters.selectedRecipientLocations.toArray();
            filter.scope = filters.recipientDomesticForeign;
        }

        // add an extra property to handle location scope
        if (filters?.recipientDomesticForeign && filters.recipientDomesticForeign !== 'all') {
            // we are handling this in its own if block to handle a case where no locations
            // have been selected, but the scope is not 'all'
            selected = true;
            filter.scope = filters.recipientDomesticForeign;
            // add the scope as a value item so the total filter count is correctly summed
            filter.values.push({
                isScope: true
            });
        }

        if (selected) {
            filter.code = 'selectedRecipientLocations';
            filter.name = 'Recipient Location';
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux recipient type filter into a JS object that can
     * be parsed by the top filter bar
     */
    const prepareRecipientTypes = () => {
        let selected = false;
        const filter = {};

        if (filters?.recipientType?.count() > 0) {
            // award types exist
            selected = true;
            filter.code = 'recipientType';
            filter.name = 'Recipient Type';

            filter.values = filters.recipientType.toArray();
        }

        if (selected) {
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux selected Award IDs
     * Scope into a JS object that can be parsed by the top filter bar
     */
    const prepareAwardIDs = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.selectedAwardIDs?.count() > 0) {
            // Award IDs have been selected
            selected = true;
            filter.values = filters.selectedAwardIDs.toArray();
        }

        if (selected) {
            filter.code = 'selectedAwardIDs';
            filter.name = 'Award ID';
            return filter;
        }
        return null;
    };

    /**
     * Logic for parsing the current Redux selected Award Amounts
     * Scope into a JS object that can be parsed by the top filter bar
     */
    const prepareAwardAmounts = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.awardAmounts?.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = filters.awardAmounts?.toObject();
        }

        if (selected) {
            filter.code = 'awardAmounts';
            filter.name = 'Award Amounts';
            return filter;
        }
        return null;
    };

    const preparePricingType = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.pricingType?.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = filters.pricingType?.toObject();
        }

        if (selected) {
            filter.code = 'pricingType';
            filter.name = 'Type of Contract Pricing';
            return filter;
        }
        return null;
    };

    const prepareSetAside = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.setAside?.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = filters.setAside?.toObject();
        }

        if (selected) {
            filter.code = 'setAside';
            filter.name = 'Type of Set Aside';
            return filter;
        }
        return null;
    };

    const preparedExtentCompeted = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.extentCompeted?.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = filters.extentCompeted?.toObject();
        }

        if (selected) {
            filter.code = 'extentCompeted';
            filter.name = 'Extent Competed';
            return filter;
        }
        return null;
    };
    /**
     * Logic for parsing the current Redux selected CFDA into a JS object
     * that can be parsed by the top filter bar
     */
    const prepareCFDA = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.selectedCFDA?.count() > 0) {
            // CFDA have been selected
            selected = true;
            filter.values = filters.selectedCFDA.toArray();
        }

        if (selected) {
            filter.code = 'selectedCFDA';
            filter.name = 'Assistance Listing';
            return filter;
        }

        return null;
    };

    /**
     * Logic for parsing the current Redux selected NAICS into a JS object
     * that can be parsed by the top filter bar
     */
    const prepareNAICS = () => {
        if (filters?.naicsCodes?.require.length > 0) {
            return {
                code: 'selectedNAICS',
                name: 'NAICS',
                values: filters.naicsCodes?.counts.map((naics) => ({
                    ...naics,
                    identifier: naics.value,
                    naics_description: `${naics.label} (${naics?.count})`
                }))
            };
        }

        return null;
    };

    /**
     * Logic for parsing the current Redux selected PSC into a JS object
     * that can be parsed by the top filter bar
     */
    const preparePSC = () => {
        let selected = false;
        const filter = {
            values: []
        };

        if (filters?.pscCodes?.require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...filters.pscCodes?.counts.map((psc) => ({
                    ...psc,
                    psc_description: `${psc.value} (${psc?.count})`
                }))
            ];
        }

        if (selected) {
            filter.code = 'selectedPSC';
            filter.name = 'PSC';
            return filter;
        }

        return null;
    };

    const determineFYCount = (count) => {
        const allFY = (FiscalYearHelper.currentFiscalYear() - FiscalYearHelper.earliestFiscalYear)
            + 1;

        if (count === allFY) {
            return 1;
        }

        return count;
    };

    const determineAwardTypeCount = (values) => {
        const fullGroups = [];
        const groupKeys = ['contracts', 'grants', 'direct_payments', 'loans', 'idvs', 'other'];

        groupKeys.forEach((key) => {
            const fullMembership = AwardType.awardTypeGroups[key];

            // quick way of checking for full group membership is to return an array of missing
            // values; it'll be empty if all the values are selected
            const missingValues = difference(fullMembership, values);

            if (missingValues.length === 0) {
                // this group is complete
                fullGroups.push(key);
            }
        });

        let awardTypeCount = 0;
        let excludedValues = [];

        // Add 1 to the count if there is a full group
        // Add all values of full groups to the excludedValues array
        fullGroups.forEach((group) => {
            awardTypeCount += 1;

            // exclude these values from the remaining tags
            excludedValues = concat(excludedValues, AwardType.awardTypeGroups[group]);
        });

        // Loop through each value and add 1 to the count if the value hasn't been excluded,
        // meaning it was not part of a full group of Award Types
        values.forEach((value) => {
            if (indexOf(excludedValues, value) < 0) {
                awardTypeCount += 1;
            }
        });

        return awardTypeCount;
    };

    /**
     * Determine the current number of filters that have been applied
     */
    const determineFilterCount = (filterObj) => {
        let filterCount = 0;
        filterObj.forEach((filter) => {
            if (filter.code === 'timePeriodFY') {
                filterCount += determineFYCount(filter.values.length);
            }
            else if (filter.code === 'awardType') {
                filterCount += determineAwardTypeCount(filter.values);
            }
            else if (typeof filter.values === "string") {
                filterCount += 1;
            }
            else if (filter.values instanceof Array) {
                filterCount += filter.values.length;
            }
            else {
                filterCount += Object.keys(filter.values).length;
            }
        });

        return filterCount;
    };

    /**
     * Convert the Redux filter data into JS objects
     */
    const prepareFilters = useCallback(() => {
        const filterArray = [];

        // prepare the keyword filters
        const keywordFilters = prepareKeywords();
        if (keywordFilters) {
            filterArray.push(keywordFilters);
        }

        // prepare the time filters
        const timeFilters = prepareTimeFilter();
        if (timeFilters) {
            filterArray.push(timeFilters);
        }

        // prepare the newAwardsOnly filters
        const newAwardOnlyFilters = prepareNewAwardsOnly();
        if (newAwardOnlyFilters) {
            filterArray.push(newAwardOnlyFilters);
        }

        // prepare the award filters
        const awardFilters = prepareAwardTypes();
        if (awardFilters) {
            filterArray.push(awardFilters);
        }

        // prepare the location filters
        const selectedLocationFilters = prepareSelectedLocations();
        if (selectedLocationFilters) {
            filterArray.push(selectedLocationFilters);
        }

        // prepare the agency filters
        const selectedFundingAgencyFilters = prepareAgencies('funding');
        if (selectedFundingAgencyFilters) {
            filterArray.push(selectedFundingAgencyFilters);
        }

        const selectedAwardingAgencyFilters = prepareAgencies('awarding');
        if (selectedAwardingAgencyFilters) {
            filterArray.push(selectedAwardingAgencyFilters);
        }

        // prepare the recipient filters
        const selectedRecipientFilters = prepareRecipients();
        if (selectedRecipientFilters) {
            filterArray.push(selectedRecipientFilters);
        }

        const selectedRecipientLocationFilters = prepareRecipientLocations();
        if (selectedRecipientLocationFilters) {
            filterArray.push(selectedRecipientLocationFilters);
        }

        const recipientTypeFilters = prepareRecipientTypes();
        if (recipientTypeFilters) {
            filterArray.push(recipientTypeFilters);
        }

        // prepare the Program Source filters
        const selectedTreasuryAccountFilters = prepareTreasuryAccounts();
        if (selectedTreasuryAccountFilters) {
            filterArray.push(selectedTreasuryAccountFilters);
        }

        // prepare Award ID filters
        const selectedAwardIDFilters = prepareAwardIDs();
        if (selectedAwardIDFilters) {
            filterArray.push(selectedAwardIDFilters);
        }

        // prepare Award Amount filters
        const awardAmounts = prepareAwardAmounts();
        if (awardAmounts) {
            filterArray.push(awardAmounts);
        }

        // prepare CFDA filters
        const selectedCFDA = prepareCFDA();
        if (selectedCFDA) {
            filterArray.push(selectedCFDA);
        }

        // prepare NAICS filters
        const selectedNAICS = prepareNAICS();
        if (selectedNAICS) {
            filterArray.push(selectedNAICS);
        }

        // prepare PSC filters
        const selectedPSC = preparePSC();
        if (selectedPSC) {
            filterArray.push(selectedPSC);
        }

        // prepare Pricing Type filters
        const pricingTypes = preparePricingType();
        if (pricingTypes) {
            filterArray.push(pricingTypes);
        }

        // prepare Set Aside filters
        const setAside = prepareSetAside();
        if (setAside) {
            filterArray.push(setAside);
        }

        // prepare Extent Competed filters
        const extentCompeted = preparedExtentCompeted();
        if (extentCompeted) {
            filterArray.push(extentCompeted);
        }

        const selectedDefCodes = prepareSelectedDefCodes();
        if (selectedDefCodes) {
            filterArray.push(selectedDefCodes);
        }

        setFiltersInfo({ filters: filterArray, filterCount: determineFilterCount(filterArray) });
    });

    useEffect(() => {
        // prepare filters on initial mount to handle pre-populated filters (such as a back
        // button event or a provided URL param)
        prepareFilters(reduxFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxFilters]);

    useEffect(() => {
        if (!compressed) {
            updateFilterCount(filtersInfo.filterCount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtersInfo]);

    if (filtersInfo?.filters?.length > 0) {
        return (
            <TopFilterBar
                filters={filtersInfo.filters}
                filterCount={filtersInfo.filterCount}
                groupGenerator={topFilterGroupGenerator} />
        );
    }
    return (<></>);
};

TopFilterBarContainer.propTypes = propTypes;

export default TopFilterBarContainer;
