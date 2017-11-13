/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { isCancel } from 'axios';

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
                values.push({
                    title: `RECIPIENT | ${item.search_text}`,
                    data: item
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
        if (input.length >= 3) {
            this.setState({
                recipientSearchString: input
            });

            if (this.recipientSearchRequest) {
                // A request is currently in-flight, cancel it
                this.recipientSearchRequest.cancel();
            }

            const recipientSearchParams = {
                search_text: this.state.recipientSearchString
            };

            this.recipientSearchRequest = SearchHelper.fetchRecipients(recipientSearchParams);

            this.recipientSearchRequest.promise
                .then((res) => {
                    const autocompleteData = res.data.results;

                    // Show error if there are no recipient IDs
                    if (autocompleteData.recipient_id_list.length === 0) {
                        this.setState({
                            noResults: true
                        });
                    }

                    // Prevent duplicate results
                    if (!this.props.selectedRecipients.has(autocompleteData.search_text)) {
                        // Add search results to Redux
                        this.props.setAutocompleteRecipients(autocompleteData);
                    }
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
