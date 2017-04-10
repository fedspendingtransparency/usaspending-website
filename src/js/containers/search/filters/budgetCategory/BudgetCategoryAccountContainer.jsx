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

import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';
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
                const formattedFedAccountTitle = BudgetCategoryHelper.formatFederalAccount(item);

                values.push({
                    title: formattedFedAccountTitle,
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
                fields: ['agency_identifier', 'main_account_code', 'account_title'],
                value: this.state.searchString,
                mode: "contains",
                matched_objects: true,
                limit: 10
            };

            this.searchRequest = SearchHelper.fetchFederalAccounts(searchParams);

            this.searchRequest.promise
                .then((res) => {
                    let autocompleteData = [];

                    const agencyIdentifiers = res.data.matched_objects.agency_identifier;
                    const mainAccountCodes = res.data.matched_objects.main_account_code;
                    const accountTitles = res.data.matched_objects.account_title;

                    if (agencyIdentifiers.length > 0) {
                        agencyIdentifiers.forEach((item) => {
                            autocompleteData.push({
                                id: item.id,
                                agency_identifier: item.agency_identifier,
                                main_account_code: item.main_account_code,
                                account_title: item.account_title
                            });
                        });
                    }

                    if (mainAccountCodes.length > 0) {
                        mainAccountCodes.forEach((item) => {
                            autocompleteData.push({
                                id: item.id,
                                agency_identifier: item.agency_identifier,
                                main_account_code: item.main_account_code,
                                account_title: item.account_title
                            });
                        });
                    }

                    if (accountTitles.length > 0) {
                        accountTitles.forEach((item) => {
                            autocompleteData.push({
                                id: item.id,
                                agency_identifier: item.agency_identifier,
                                main_account_code: item.main_account_code,
                                account_title: item.account_title
                            });
                        });
                    }

                    const selectedItems = this.props.federalAccounts.toArray();

                    // Filter out any selected federal accounts that may be in the result set
                    if (selectedItems && selectedItems.length > 0) {
                        autocompleteData = _.differenceWith(
                            autocompleteData, selectedItems, _.isEqual);
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
                placeholder="e.g., 012-3539 - Child Nutrition Programs"
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
    (state) => ({
        autocompleteFederalAccounts: state.autocompleteBudgetCategories.federalAccounts
    }),
    (dispatch) => bindActionCreators(budgetCategoryActions, dispatch)
)(BudgetCategoryAccountContainer);
