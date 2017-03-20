/**
 * BudgetCategoryFunctionContainer.jsx
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
    setAutocompleteBudgetFunctions: React.PropTypes.func,
    autocompleteBudgetFunctions: React.PropTypes.array,
    updateBudgetFunctions: React.PropTypes.func,
    budgetFunctions: React.PropTypes.object
};

export class BudgetCategoryFunctionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);

        this.state = {
            searchString: '',
            autocompleteBudgetFunctions: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteBudgetFunctions(this.props.autocompleteBudgetFunctions);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.autocompleteBudgetFunctions,
                this.props.autocompleteBudgetFunctions)) {
            this.parseAutocompleteBudgetFunctions(nextProps.autocompleteBudgetFunctions);
        }
    }

    parseAutocompleteBudgetFunctions(results) {
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
            autocompleteBudgetFunctions: values
        });
    }

    queryAutocompleteBudgetFunctions(input) {
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

            this.searchRequest = SearchHelper.fetchBudgetFunctions(searchParams);

            this.searchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected budget function to enable comparison
                    const selectedItems = this.props.budgetFunctions.toArray()
                            .map((item) => _.omit(item, 'identifier'));

                    // Filter out any selectedBudgetFunctions that may be in the result set
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
                    this.props.setAutocompleteBudgetFunctions(autocompleteData);
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
        this.props.setAutocompleteBudgetFunctions([]);
    }

    handleTextInput(inputField) {
        // Clear existing budget functions to ensure user can't select an old or existing one
        this.props.setAutocompleteBudgetFunctions([]);

        // Grab input, clear any exiting timeout
        const input = inputField.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteBudgetFunctions(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteBudgetFunctions}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.updateBudgetFunctions}
                placeHolder="e.g., Income Security"
                errorHeader="Unknown Budget Function"
                errorMessage="We were unable to find that budget function."
                ref={(input) => {
                    this.budgetFunctionList = input;
                }}
                label="Budget Function"
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }
}

BudgetCategoryFunctionContainer.propTypes = propTypes;

export default connect(
    (state) => ({ autocompleteBudgetFunctions: state.budgetCategories.budgetFunctions }),
    (dispatch) => bindActionCreators(budgetCategoryActions, dispatch)
)(BudgetCategoryFunctionContainer);
