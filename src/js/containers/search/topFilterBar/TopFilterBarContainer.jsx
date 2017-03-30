/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    reduxFilters: React.PropTypes.object,
    updateTimePeriod: React.PropTypes.func,
    updateGenericFilter: React.PropTypes.func,
    clearFilterType: React.PropTypes.func,
    resetTimeFilters: React.PropTypes.func
};

export class TopFilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };

        this.removeFilter = this.removeFilter.bind(this);
        this.clearFilterGroup = this.clearFilterGroup.bind(this);
        this.overwriteFilter = this.overwriteFilter.bind(this);
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

        const selectedAwardIDFilters = this.prepareAwardIDs(props);
        if (selectedAwardIDFilters) {
            filters.push(selectedAwardIDFilters);
        }

        const awardAmounts = this.prepareAwardAmounts(props);
        if (awardAmounts) {
            filters.push(awardAmounts);
        }

        this.setState({
            filters
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
                filter.values = _.orderBy(props.timePeriodFY.toArray(), [], ['desc']);
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
     * Generic function that can be called to overwrite a filter with a specified value. This is
     * useful for filters that have complex logic associated with item or group removal (such as
     * award type groups).
     *
     * This pretty much just directly calls the associated Redux function, but is first routed
     * through this function to minimize Redux logic occurring in dumb child components.
     *
     * @param      {string}  type    The Redux filter key
     * @param      {<type>}  value   The value to set the Redux filter to
     */
    overwriteFilter(type, value) {
        this.props.updateGenericFilter({
            type,
            value
        });
    }

    /**
     * Generic callback function called when an individual filter "remove" button is clicked.
     *
     * @param      {string}  type    The filter type (an internal code)
     * @param      {<type>}  value   The filter value to remove
     */
    removeFilter(type, value) {
        switch (type) {
            case 'timePeriodFY':
                this.removeTimePeriod(type, value);
                break;
            case 'timePeriodDR':
                this.removeTimePeriod(type, value);
                break;
            case 'awardType':
                this.removeFromSet(type, value);
                break;
            case 'selectedLocations':
                this.removeFromOrderedMap(type, value);
                break;
            case 'budgetFunctions':
                this.removeFromOrderedMap(type, value);
                break;
            case 'federalAccounts':
                this.removeFromOrderedMap(type, value);
                break;
            case 'objectClasses':
                this.removeFromOrderedMap(type, value);
                break;
            case 'selectedFundingAgencies':
                this.removeFromOrderedMap(type, value);
                break;
            case 'selectedAwardingAgencies':
                this.removeFromOrderedMap(type, value);
                break;
            case 'selectedRecipients':
                this.removeFromOrderedMap(type, value);
                break;
            case 'selectedRecipientLocations':
                this.removeFromOrderedMap(type, value);
                break;
            case 'selectedAwardIDs':
                this.removeFromOrderedMap(type, value);
                break;
            case 'awardAmounts':
                this.removeFromOrderedMap(type, value);
                break;
            case 'keyword':
                this.clearFilterGroup(type);
                break;
            default:
                break;
        }
    }

    /**
     * Specific logic to handle removing a single fiscal year or to clear the date range from the
     * Redux time period filter.
     *
     * @param      {string}  type    The type identifying if the value is a date range or fiscal
     * year
     * @param      {<type>}  value   The fiscal year to remove (optional if the type is date range)
     */
    removeTimePeriod(type, value) {
        // prepopulate the Redux action argument with the current filter values
        const timePeriodFilter = {
            dateType: this.props.reduxFilters.timePeriodType,
            fy: this.props.reduxFilters.timePeriodFY,
            start: this.props.reduxFilters.timePeriodStart,
            end: this.props.reduxFilters.timePeriodEnd
        };

        // check if fiscal year or date range
        if (type === 'timePeriodFY') {
            // remove the item from the set
            timePeriodFilter.dateType = 'fy';
            // as an ImmutableJS structure, the delete function will return a new instance
            timePeriodFilter.fy = this.props.reduxFilters.timePeriodFY.delete(value);
        }
        else {
            // reset the date range
            timePeriodFilter.dateType = 'dr';
            timePeriodFilter.start = null;
            timePeriodFilter.end = null;
        }

        // reuse the Redux action from the time period filter component
        this.props.updateTimePeriod(timePeriodFilter);
    }

    /**
     * Generic logic to handle removing a single element from a Redux filter that is an ImmutableJS
     * Set.
     *
     * @param      {<type>}  type    The Redux filter key
     * @param      {<type>}  value   The value to remove from the Set
     */
    removeFromSet(type, value) {
        const newValue = this.props.reduxFilters[type].delete(value);
        this.props.updateGenericFilter({
            type,
            value: newValue
        });
    }

    /**
     * Generic logic to handle removing an element from an OrderedMap (ImmutableJS) Redux object.
     * This is logically identical to removeFromSet but keeping it sepearate because it is using
     * a different API (that happens to have the same function names).
     *
     * @param      {<type>}  type    The key identifying the OrderedMap within the Redux filter
     *                                  store
     * @param      {<type>}  identifier    The key within the OrderedMap to remove
     */
    removeFromOrderedMap(type, identifier) {
        const newValue = this.props.reduxFilters[type].delete(identifier);
        this.props.updateGenericFilter({
            type,
            value: newValue
        });
    }


    /**
     * Remove all filters in the specified filter group
     *
     * @return     {string}  type   The filter group key to clear
     */
    clearFilterGroup(type) {
        if (type === 'timePeriodFY' || type === 'timePeriodDR') {
            this.props.resetTimeFilters();
        }
        else if (type === 'selectedLocations') {
            // selected locations is actually two fields, so reset them both
            this.resetGenericField('selectedLocations');
            this.resetGenericField('locationDomesticForeign');
        }
        else if (type === 'selectedRecipientLocations') {
            // selected locations is actually two fields, so reset them both
            this.resetGenericField('selectedRecipientLocations');
            this.resetGenericField('recipientDomesticForeign');
        }
        else {
            this.resetGenericField(type);
        }
    }

    resetGenericField(type) {
        this.props.clearFilterType(type);
    }

    render() {
        let output = null;
        if (this.state.filters.length > 0) {
            output = (<TopFilterBar
                {...this.props}
                filters={this.state.filters}
                removeFilter={this.removeFilter}
                clearFilterGroup={this.clearFilterGroup}
                overwriteFilter={this.overwriteFilter} />);
        }

        return output;
    }
}

TopFilterBarContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(TopFilterBarContainer);
