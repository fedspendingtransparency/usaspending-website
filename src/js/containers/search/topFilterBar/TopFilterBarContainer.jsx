/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import moment from 'moment';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { topFilterGroupGenerator } from
    'components/search/topFilterBar/filterGroups/TopFilterGroupGenerator';

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

    componentWillReceiveProps(nextProps) {
        if (!Object.is(nextProps.reduxFilters, this.props.reduxFilters)) {
            this.prepareFilters(nextProps.reduxFilters);
        }
    }

    /**
     * Convert the Redux filter data into JS objects
     */
    prepareFilters(props) {
        const filters = [];
        // prepare the time filters
        const timeFilters = this.prepareTimeFilter(props);
        if (timeFilters) {
            filters.push(timeFilters);
        }

        // prepare the keyword filters
        const keywordFilters = this.prepareKeywords(props);
        if (keywordFilters) {
            filters.push(keywordFilters);
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

        // prepare the budget categories filters
        const budgetFunctions = this.prepareBudgetFunctions(props);
        if (budgetFunctions) {
            filters.push(budgetFunctions);
        }

        const federalAccounts = this.prepareFederalAccounts(props);
        if (federalAccounts) {
            filters.push(federalAccounts);
        }

        const objectClasses = this.prepareObjectClasses(props);
        if (objectClasses) {
            filters.push(objectClasses);
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

        this.setState({
            filters,
            filterCount: this.determineFilterCount(filters)
        }, () => {
            if (!this.props.compressed) {
                this.props.updateFilterCount(this.state.filterCount);
            }
        });
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
            if (props.timePeriodStart && props.timePeriodEnd) {
                // start and end dates are provided
                selected = true;
                filter.code = 'timePeriodDR';
                filter.name = 'Time Period';

                const startString = moment(props.timePeriodStart, 'YYYY-MM-DD')
                    .format('MM/DD/YYYY');
                const endString = moment(props.timePeriodEnd, 'YYYY-MM-DD').format('MM/DD/YYYY');

                filter.values = [`${startString} to ${endString}`];
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
        const filter = {};

        if (props.keyword) {
        // keyword exists
            selected = true;
            filter.code = 'keyword';
            filter.name = 'Keyword';

            filter.values = props.keyword;
        }

        if (selected) {
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
            filter.name = 'Place of Performance Location';
            return filter;
        }
        return null;
    }

    /**
     * Logic for parsing the current Redux budget functions into a JS object
     * that can be parsed by the top filter bar
     */
    prepareBudgetFunctions(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.budgetFunctions.count() > 0) {
            // budgetFunctions have been selected
            selected = true;
            filter.values = props.budgetFunctions.toArray();
        }

        if (selected) {
            filter.code = 'budgetFunctions';
            filter.name = 'Budget Functions';
            return filter;
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux federal accounts into a JS object
     * that can be parsed by the top filter bar
     */
    prepareFederalAccounts(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.federalAccounts.count() > 0) {
            // federalAccounts have been selected
            selected = true;
            filter.values = props.federalAccounts.toArray();
        }

        if (selected) {
            filter.code = 'federalAccounts';
            filter.name = 'Federal Accounts';
            return filter;
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux object classes into a JS object
     * that can be parsed by the top filter bar
     */
    prepareObjectClasses(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.objectClasses.count() > 0) {
            // objectClasses have been selected
            selected = true;
            filter.values = props.objectClasses.toObject();
        }

        if (selected) {
            filter.code = 'objectClasses';
            filter.name = 'Object Classes';
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
            filter.name = 'CFDA';
            return filter;
        }

        return null;
    }

    /**
     * Logic for parsing the current Redux selected NAICS into a JS object
     * that can be parsed by the top filter bar
     */
    prepareNAICS(props) {
        let selected = false;
        const filter = {
            values: []
        };

        if (props.selectedNAICS.count() > 0) {
            // NAICS have been selected
            selected = true;
            filter.values = props.selectedNAICS.toArray();
        }

        if (selected) {
            filter.code = 'selectedNAICS';
            filter.name = 'NAICS';
            return filter;
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

        if (props.selectedPSC.count() > 0) {
            // PSC have been selected
            selected = true;
            filter.values = props.selectedPSC.toArray();
        }

        if (selected) {
            filter.code = 'selectedPSC';
            filter.name = 'PSC';
            return filter;
        }

        return null;
    }

    /**
     * Determine the current number of filters that have been applied
     */
    determineFilterCount(filters) {
        let filterCount = 0;
        filters.forEach((filter) => {
            if (typeof filter.values === "string") {
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
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
