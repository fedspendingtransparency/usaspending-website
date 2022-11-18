/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { orderBy, difference, concat, indexOf } from 'lodash';

import moment from 'moment';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { topFilterGroupGenerator } from
    'components/search/topFilterBar/filterGroups/TopFilterGroupGenerator';

import * as FiscalYearHelper from 'helpers/fiscalYearHelper';
import * as AwardType from 'dataMapping/search/awardType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    reduxFilters: PropTypes.object,
    updateFilterCount: PropTypes.func,
    compressed: PropTypes.bool
};

const defaultProps = {
    compressed: false
};

export class TopFilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: [],
            filterCount: 0
        };
    }

    componentDidMount() {
    // prepare filters on initial mount to handle pre-populated filters (such as a back
    // button event or a provided URL param)
        this.prepareFilters(this.props.reduxFilters);
    }

    componentDidUpdate(prevProps) {
        if (!Object.is(prevProps.reduxFilters, this.props.reduxFilters)) {
            this.prepareFilters(this.props.reduxFilters);
        }
    }

    /**
     * Convert the Redux filter data into JS objects
     */
    prepareFilters(props) {
        const filters = [];

        // prepare the keyword filters
        const keywordFilters = this.prepareKeywords(props);
        if (keywordFilters) {
            filters.push(keywordFilters);
        }

        // prepare the time filters
        const timeFilters = this.prepareTimeFilter(props);
        if (timeFilters) {
            filters.push(timeFilters);
        }

        // prepare the award filters
        const awardFilters = this.prepareAwardTypes(props);
        if (awardFilters) {
            filters.push(awardFilters);
        }

        // prepare the location filters
        const selectedLocationFilters = this.prepareSelectedLocations(props);
        if (selectedLocationFilters) {
            filters.push(selectedLocationFilters);
        }

        // prepare the agency filters
        const selectedFundingAgencyFilters = this.prepareAgencies(props, 'funding');
        if (selectedFundingAgencyFilters) {
            filters.push(selectedFundingAgencyFilters);
        }

        const selectedAwardingAgencyFilters = this.prepareAgencies(props, 'awarding');
        if (selectedAwardingAgencyFilters) {
            filters.push(selectedAwardingAgencyFilters);
        }

        // prepare the recipient filters
        const selectedRecipientFilters = this.prepareRecipients(props);
        if (selectedRecipientFilters) {
            filters.push(selectedRecipientFilters);
        }

        const selectedRecipientLocationFilters = this.prepareRecipientLocations(props);
        if (selectedRecipientLocationFilters) {
            filters.push(selectedRecipientLocationFilters);
        }

        const recipientTypeFilters = this.prepareRecipientTypes(props);
        if (recipientTypeFilters) {
            filters.push(recipientTypeFilters);
        }

        // prepare the Program Source filters
        const selectedTreasuryAccountFilters = this.prepareTreasuryAccounts(props);
        if (selectedTreasuryAccountFilters) {
            filters.push(selectedTreasuryAccountFilters);
        }

        // prepare Award ID filters
        const selectedAwardIDFilters = this.prepareAwardIDs(props);
        if (selectedAwardIDFilters) {
            filters.push(selectedAwardIDFilters);
        }

        // prepare Award Amount filters
        const awardAmounts = this.prepareAwardAmounts(props);
        if (awardAmounts) {
            filters.push(awardAmounts);
        }

        // prepare CFDA filters
        const selectedCFDA = this.prepareCFDA(props);
        if (selectedCFDA) {
            filters.push(selectedCFDA);
        }

        // prepare NAICS filters
        const selectedNAICS = this.prepareNAICS(props);
        if (selectedNAICS) {
            filters.push(selectedNAICS);
        }

        // prepare PSC filters
        const selectedPSC = this.preparePSC(props);
        if (selectedPSC) {
            filters.push(selectedPSC);
        }

        // prepare Pricing Type filters
        const pricingTypes = this.preparePricingType(props);
        if (pricingTypes) {
            filters.push(pricingTypes);
        }

        // prepare Set Aside filters
        const setAside = this.prepareSetAside(props);
        if (setAside) {
            filters.push(setAside);
        }

        // prepare Extent Competed filters
        const extentCompeted = this.preparedExtentCompeted(props);
        if (extentCompeted) {
            filters.push(extentCompeted);
        }

        const selectedDefCodes = this.prepareSelectedDefCodes(props);
        if (selectedDefCodes) {
            filters.push(selectedDefCodes);
        }

        this.setState({
            filters,
            filterCount: this.determineFilterCount(filters)
        }, () => {
            if (!this.props.compressed) {
                this.props.updateFilterCount(this.state.filterCount);
            }
        });
    }

    prepareSelectedDefCodes(props) {
        let selected = false;
        const filter = {
            values: []
        };
        if (props.defCodes.toObject().require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...props.defCodes.counts.map((def) => ({
                    ...def,
                    def_description: `${def.label} (${def.count})`
                }))
            ];
        }
        if (selected) {
            filter.code = 'defCodes';
            filter.name = 'Disaster Emergency Fund Code (DEFC)';
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux time filter into a JS object that can be parsed by the
     * top filter bar
     */
    prepareTimeFilter(props) {
        let selected = false;
        const filter = {};
        if (props.timePeriodType === 'fy') {
            // check to see if any FYs are selected
            if (props.timePeriodFY.count() > 0) {
                // years are selected
                selected = true;
                filter.code = 'timePeriodFY';
                filter.name = 'Time Period';

                // return the years in chronological order
                filter.values = orderBy(props.timePeriodFY.toArray(), [], ['desc']);
            }
        }
        else if (props.timePeriodType === 'dr') {
            // check to see if any date ranges are selected
            if (props.timePeriodStart || props.timePeriodEnd) {
                // start and end dates are provided
                selected = true;
                filter.code = 'timePeriodDR';
                filter.name = 'Time Period';

                const startString = moment(props.timePeriodStart, 'YYYY-MM-DD')
                    .format('MM/DD/YYYY');
                const endString = moment(props.timePeriodEnd, 'YYYY-MM-DD').format('MM/DD/YYYY');
                filter.values = [`${startString} to ${endString}`];

                if (!props.timePeriodStart) {
                    // open-ended start date
                    filter.values = [`... to ${endString}`];
                }
                else if (!props.timePeriodEnd) {
                    // open-ended end date
                    filter.values = [`${startString} to present`];
                }
            }
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux keyword filter into a JS object that can be parsed by the
     * top filter bar
     */
    prepareKeywords(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.keyword.size > 0) {
            selected = true;
            filter.values = props.keyword.toArray();
        }

        if (selected) {
            filter.code = 'keyword';
            filter.name = 'Keyword';
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux award type filter into a JS object that can be parsed by
     * the top filter bar
     */
    prepareAwardTypes(props) {
        let selected = false;
        const filter = {};

        if (props.awardType.count() > 0) {
            // award types exist
            selected = true;
            filter.code = 'awardType';
            filter.name = 'Award Type';

            filter.values = props.awardType.toArray();
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux selected locations and location scope into a JS object
     * that can be parsed by the top filter bar
     */
    prepareSelectedLocations(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedLocations.count() > 0) {
            // locations have been selected
            selected = true;
            filter.values = props.selectedLocations.toArray();
            filter.scope = props.locationDomesticForeign;
        }

        // add an extra property to handle location scope
        if (props.locationDomesticForeign !== 'all') {
            // we are handling this in its own if block to handle a case where no locations
            // have been selected, but the scope is not 'all'
            selected = true;
            filter.scope = props.locationDomesticForeign;
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
    }

    prepareTreasuryAccounts(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.treasuryAccounts && props.treasuryAccounts.count() > 0) {
            // treasury account components have been selected
            selected = true;
            const identifiers = Object.keys(props.treasuryAccounts.toObject());
            filter.values = identifiers;
        }

        if (props.tasCodes.require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...props.tasCodes.counts.map((tas) => ({
                    ...tas,
                    isCheckbox: true,
                    tas_description: `${tas.label} (${tas.count})`
                }))
            ];
        }

        if (selected) {
            filter.code = 'treasuryAccounts';
            filter.name = 'Treasury Account';
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux selected Awarding and Funding Agencies into a JS object
     * that can be parsed by the top filter bar
     */
    prepareAgencies(props, type) {
        let selected = false;
        const filter = {
            values: []
        };

        if (type === 'funding') {
            if (props.selectedFundingAgencies.count() > 0) {
                // Funding Agencies have been selected
                selected = true;
                filter.values = props.selectedFundingAgencies.toArray();
            }

            if (selected) {
                filter.code = 'selectedFundingAgencies';
                filter.name = 'Funding Agency';
                return filter;
            }
        }
        else if (props.selectedAwardingAgencies.count() > 0) {
            // Awarding Agencies have been selected
            selected = true;
            filter.values = props.selectedAwardingAgencies.toArray();

            if (selected) {
                filter.code = 'selectedAwardingAgencies';
                filter.name = 'Awarding Agency';
                return filter;
            }
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux selected Recipients into a JS object
     * that can be parsed by the top filter bar
     */
    prepareRecipients(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedRecipients.count() > 0) {
            // Recipients have been selected
            selected = true;
            filter.values = props.selectedRecipients.toArray();
        }

        if (selected) {
            filter.code = 'selectedRecipients';
            filter.name = 'Recipient';
            return filter;
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux selected Recipient Locations and Recipient Location
     * Scope into a JS object that can be parsed by the top filter bar
     */
    prepareRecipientLocations(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedRecipientLocations.count() > 0) {
            // locations have been selected
            selected = true;
            filter.values = props.selectedRecipientLocations.toArray();
            filter.scope = props.recipientDomesticForeign;
        }

        // add an extra property to handle location scope
        if (props.recipientDomesticForeign !== 'all') {
            // we are handling this in its own if block to handle a case where no locations
            // have been selected, but the scope is not 'all'
            selected = true;
            filter.scope = props.recipientDomesticForeign;
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
    }

    /**
     * Logic for parsing the current Redux recipient type filter into a JS object that can
     * be parsed by the top filter bar
     */
    prepareRecipientTypes(props) {
        let selected = false;
        const filter = {};

        if (props.recipientType.count() > 0) {
            // award types exist
            selected = true;
            filter.code = 'recipientType';
            filter.name = 'Recipient Type';

            filter.values = props.recipientType.toArray();
        }

        if (selected) {
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux selected Award IDs
     * Scope into a JS object that can be parsed by the top filter bar
     */
    prepareAwardIDs(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedAwardIDs.count() > 0) {
            // Award IDs have been selected
            selected = true;
            filter.values = props.selectedAwardIDs.toArray();
        }

        if (selected) {
            filter.code = 'selectedAwardIDs';
            filter.name = 'Award ID';
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux selected Award Amounts
     * Scope into a JS object that can be parsed by the top filter bar
     */
    prepareAwardAmounts(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.awardAmounts.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = props.awardAmounts.toObject();
        }

        if (selected) {
            filter.code = 'awardAmounts';
            filter.name = 'Award Amounts';
            return filter;
        }
        return null;
    }

    preparePricingType(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.pricingType.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = props.pricingType.toObject();
        }

        if (selected) {
            filter.code = 'pricingType';
            filter.name = 'Type of Contract Pricing';
            return filter;
        }
        return null;
    }

    prepareSetAside(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.setAside.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = props.setAside.toObject();
        }

        if (selected) {
            filter.code = 'setAside';
            filter.name = 'Type of Set Aside';
            return filter;
        }
        return null;
    }

    preparedExtentCompeted(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.extentCompeted.count() > 0) {
            // Award Amounts have been selected
            selected = true;
            filter.values = props.extentCompeted.toObject();
        }

        if (selected) {
            filter.code = 'extentCompeted';
            filter.name = 'Extent Competed';
            return filter;
        }
        return null;
    }
    /**
     * Logic for parsing the current Redux selected CFDA into a JS object
     * that can be parsed by the top filter bar
     */
    prepareCFDA(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedCFDA.count() > 0) {
            // CFDA have been selected
            selected = true;
            filter.values = props.selectedCFDA.toArray();
        }

        if (selected) {
            filter.code = 'selectedCFDA';
            filter.name = 'Assistance Listing';
            return filter;
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux selected NAICS into a JS object
     * that can be parsed by the top filter bar
     */
    prepareNAICS(props) {
        if (props.naicsCodes.require.length > 0) {
            return {
                code: 'selectedNAICS',
                name: 'NAICS',
                values: props.naicsCodes.counts.map((naics) => ({
                    ...naics,
                    identifier: naics.value,
                    naics_description: `${naics.label} (${naics.count})`
                }))
            };
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux selected PSC into a JS object
     * that can be parsed by the top filter bar
     */
    preparePSC(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.pscCodes.require.length > 0) {
            selected = true;
            filter.values = [
                ...filter.values,
                ...props.pscCodes.counts.map((psc) => ({
                    ...psc,
                    psc_description: `${psc.value} (${psc.count})`
                }))
            ];
        }

        if (selected) {
            filter.code = 'selectedPSC';
            filter.name = 'PSC';
            return filter;
        }

        return null;
    }

    determineFYCount(count) {
        const allFY = (FiscalYearHelper.currentFiscalYear() - FiscalYearHelper.earliestFiscalYear)
            + 1;

        if (count === allFY) {
            return 1;
        }

        return count;
    }

    determineAwardTypeCount(values) {
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
    }

    /**
     * Determine the current number of filters that have been applied
     */
    determineFilterCount(filters) {
        let filterCount = 0;
        filters.forEach((filter) => {
            if (filter.code === 'timePeriodFY') {
                filterCount += this.determineFYCount(filter.values.length);
            }
            else if (filter.code === 'awardType') {
                filterCount += this.determineAwardTypeCount(filter.values);
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
    }

    render() {
        let output = null;
        if (this.state.filters.length > 0) {
            output = (<TopFilterBar
                {...this.props}
                filters={this.state.filters}
                filterCount={this.state.filterCount}
                groupGenerator={topFilterGroupGenerator} />);
        }

        return output;
    }
}

TopFilterBarContainer.propTypes = propTypes;
TopFilterBarContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ reduxFilters: state.appliedFilters.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
