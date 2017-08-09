/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, concat, differenceWith, slice } from 'lodash';
import { isCancel } from 'axios';

import { Search } from 'js-search';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    toggleRecipient: PropTypes.func,
    setAutocompleteRecipients: PropTypes.func,
    selectedRecipients: PropTypes.object,
    autocompleteRecipients: PropTypes.array
};

export class RecipientNameDUNSContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientSearchString: '',
            autocompleteRecipients: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteRecipients(this.props.autocompleteRecipients);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteRecipients, this.props.autocompleteRecipients)) {
            this.parseAutocompleteRecipients(nextProps.autocompleteRecipients);
        }
    }

    parseAutocompleteRecipients(recipients) {
        const values = [];
        if (recipients.length > 0) {
            recipients.forEach((item) => {
                let subtitle = `DUNS: ${item.recipient_unique_id}`;
                let duns = item.recipient_unique_id;
                if (item.parent_recipient_unique_id) {
                    subtitle = `Parent DUNS: ${item.parent_recipient_unique_id}`;
                    duns = item.parent_recipient_unique_id;
                }

                values.push({
                    subtitle,
                    title: item.recipient_name,
                    data: Object.assign({}, item, {
                        duns
                    })
                });
            });
        }

        this.setState({
            autocompleteRecipients: values
        });
    }

    queryAutocompleteRecipients(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                recipientSearchString: input
            });

            if (this.recipientSearchRequest) {
                // A request is currently in-flight, cancel it
                this.recipientSearchRequest.cancel();
            }

            const recipientSearchParams = {
                search_text: this.state.recipientSearchString,
                limit: 10
            };

            this.recipientSearchRequest = SearchHelper.fetchRecipients(recipientSearchParams);

            this.recipientSearchRequest.promise
                .then((res) => {
                    const parentResults = this.performSecondarySearch(
                        res.data.results.parent_recipient, 'parent_recipient_unique_id');
                    const normalResults = this.performSecondarySearch(
                        res.data.results.recipient, 'recipient_unique_id');
                    this.parseResults(parentResults, normalResults);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.recipientSearchRequest) {
            // A request is currently in-flight, cancel it
            this.recipientSearchRequest.cancel();
        }
    }

    performSecondarySearch(data, dunsKey) {
        // search within the returned data
        // create a search index with the API response records
        const search = new Search('legal_entity_id');
        search.addIndex('recipient_name');
        search.addIndex(dunsKey);

        // add the API response as the data source to search within
        search.addDocuments(data);

        // use the JS search library to search within the records
        const results = search.search(this.state.recipientSearchString);

        // combine the two arrays and limit it to 10
        const improvedResults = slice(results, 0, 10);
        return improvedResults;
    }

    parseResults(parent, normal) {
        // combine the two arrays
        const data = slice(concat(parent, normal), 0, 10);

        let autocompleteData = [];
        const selectedRecipients = this.props.selectedRecipients.toArray();
        // Filter out any selectedRecipients that may be in the result set
        if (selectedRecipients && selectedRecipients.length > 0) {
            autocompleteData = differenceWith(data, selectedRecipients, isEqual);
        }
        else {
            autocompleteData = data;
        }

        this.setState({
            noResults: !autocompleteData.length
        });

        // Add search results to Redux
        this.props.setAutocompleteRecipients(autocompleteData);
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteRecipients([]);
    }

    handleTextInput(recipientInput) {
        // Clear existing recipients to ensure user can't select an old or existing one
        this.props.setAutocompleteRecipients([]);

        // Grab input, clear any exiting timeout
        const input = recipientInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteRecipients(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                label="Recipient Name/DUNS"
                values={this.state.autocompleteRecipients}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.toggleRecipient}
                placeholder="Recipient Name or DUNS"
                errorHeader="Unknown Recipient"
                errorMessage="We were unable to find that recipient."
                ref={(input) => {
                    this.recipientList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({
        autocompleteRecipients: state.autocompleteRecipients.recipients
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientNameDUNSContainer);

RecipientNameDUNSContainer.propTypes = propTypes;
