/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    toggleRecipient: React.PropTypes.func,
    setAutocompleteRecipients: React.PropTypes.func,
    selectedRecipients: React.PropTypes.object,
    autocompleteRecipients: React.PropTypes.array
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
        if (!_.isEqual(nextProps.autocompleteRecipients, this.props.autocompleteRecipients)) {
            this.parseAutocompleteRecipients(nextProps.autocompleteRecipients);
        }
    }

    parseAutocompleteRecipients(recipients) {
        const values = [];
        if (recipients.length > 0) {
            recipients.forEach((item) => {
                values.push({
                    title: item.recipient_name,
                    subtitle: `DUNS: ${item.recipient_unique_id}`,
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
        if (input.length >= 2) {
            this.setState({
                recipientSearchString: input
            });

            if (this.recipientSearchRequest) {
                // A request is currently in-flight, cancel it
                this.recipientSearchRequest.cancel();
            }

            const recipientSearchParams = {
                fields: ['recipient_name', 'recipient_unique_id'],
                value: this.state.recipientSearchString,
                matched_objects: true
            };

            this.recipientSearchRequest = SearchHelper.fetchRecipients(recipientSearchParams);

            this.recipientSearchRequest.promise
                .then((res) => {
                    const data = _.union(res.data.matched_objects.recipient_name,
                        res.data.matched_objects.recipient_unique_id);
                    let autocompleteData = [];

                    // Remove 'identifier' from selected recipients to enable comparison
                    const selectedRecipients = this.props.selectedRecipients.toArray()
                        .map((recipient) => _.omit(recipient, 'identifier'));

                    // Filter out any selectedRecipients that may be in the result set
                    if (selectedRecipients && selectedRecipients.length > 0) {
                        autocompleteData = _.differenceWith(data, selectedRecipients, _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: !autocompleteData.length
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteRecipients(autocompleteData);
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
