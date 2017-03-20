/**
 * BudgetCategoryAccountContainer.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isCancel } from 'axios';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

import * as SearchHelper from 'helpers/searchHelper';

import * as budgetCategoryActions from 'redux/actions/search/budgetCategoryActions';

const propTypes = {
    setAutocompleteFederalAccounts: React.PropTypes.func,
    autocompleteFederalAccounts: React.PropTypes.array,
    updateFederalAccounts: React.PropTypes.func,
    federalAccounts: React.PropTypes.object
};

export class BudgetCategoryAccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);

        this.state = {
            searchString: '',
            autocompleteFederalAccounts: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteFederalAccounts(this.props.autocompleteFederalAccounts);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.autocompleteFederalAccounts,
                this.props.autocompleteFederalAccounts)) {
            this.parseAutocompleteFederalAccounts(nextProps.autocompleteFederalAccounts);
        }
    }

    parseAutocompleteFederalAccounts(results) {
        const values = [];

        if (results.length > 0) {
            results.forEach((item) => {
                let placeType = _.upperCase(item.place_type);
                if (item.parent !== null &&
                    (item.place_type !== null && item.place_type !== 'COUNTRY')) {
                    placeType += ` in ${item.parent}`;
                }

                values.push({
                    title: item.place,
                    subtitle: placeType,
                    data: item
                });
            });
        }

        this.setState({
            autocompleteFederalAccounts: values
        });
    }

    queryAutocompleteFederalAccounts(input) {
        this.setState({
            noResults: false
        });

        // Only search if search is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                searchString: input
            });

            if (this.searchRequest) {
                // A request is currently in-flight, cancel it
                this.searchRequest.cancel();
            }

            const searchParams = {
                fields: ['subtier_agency__name'],
                value: this.state.searchString,
                mode: "contains",
                matched_objects: true,
                limit: 10
            };

            this.searchRequest = SearchHelper.fetchFederalAccounts(searchParams);

            this.searchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected federal accounts to enable comparison
                    const selectedItems = this.props.federalAccounts.toArray()
                            .map((item) => _.omit(item, 'identifier'));

                    // Filter out any selected federal accounts that may be in the result set
                    if (selectedItems && selectedItems.length > 0) {
                        autocompleteData = _.differenceWith(data, selectedItems, _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteFederalAccounts(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.searchRequest) {
            // A request is currently in-flight, cancel it
            this.searchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteFederalAccounts([]);
    }

    handleTextInput(inputField) {
        // Clear existing federalAccounts to ensure user can't select an old or existing one
        this.props.setAutocompleteFederalAccounts([]);

        // Grab input, clear any exiting timeout
        const input = inputField.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteFederalAccounts(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteFederalAccounts}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.updateFederalAccounts}
                placeHolder="e.g., 012-3539 - Child Nutrition Programs"
                errorHeader="Unknown Federal Account"
                errorMessage="We were unable to find that federal account."
                ref={(input) => {
                    this.list = input;
                }}
                label="Federal Account"
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

BudgetCategoryAccountContainer.propTypes = propTypes;

export default connect(
    (state) => ({ autocompleteFederalAccounts: state.budgetCategories.federalAccounts }),
    (dispatch) => bindActionCreators(budgetCategoryActions, dispatch)
)(BudgetCategoryAccountContainer);
