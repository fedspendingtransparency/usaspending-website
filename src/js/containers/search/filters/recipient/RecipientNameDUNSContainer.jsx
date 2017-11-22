/**
 * RecipientNameDUNSContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

import RecipientName from 'components/search/filters/recipient/RecipientName';

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object
};

export class RecipientNameDUNSContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientSearchString: '',
            showWarning: false,
            inFlight: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.queryRecipients = this.queryRecipients.bind(this);
    }

    queryRecipients() {
        this.setState({
            showWarning: false,
            inFlight: true
        });

        const searchString = this.state.recipientSearchString;

        // Only search if input is 3 or more characters and is not already
        // in the list of results
        if (searchString.length >= 3 && !this.props.selectedRecipients.has(searchString)) {
            if (this.recipientSearchRequest) {
                // A request is currently in-flight, cancel it
                this.recipientSearchRequest.cancel();
            }

            const recipientSearchParams = {
                search_text: searchString
            };

            this.recipientSearchRequest = SearchHelper.fetchRecipients(recipientSearchParams);

            this.recipientSearchRequest.promise
                .then((res) => {
                    const autocompleteData = res.data.results;

                    this.setState({
                        inFlight: false
                    });

                    // Show error if there are no recipient IDs
                    if (autocompleteData.recipient_id_list.length === 0) {
                        this.setState({
                            showWarning: true
                        });
                    }
                    else {
                        // Add search results to Redux
                        this.props.toggleRecipient(autocompleteData);

                        // Reset input and hide any existing warnings
                        this.setState({
                            showWarning: false,
                            recipientSearchString: ''
                        });
                    }
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            showWarning: true,
                            inFlight: false
                        });
                    }
                });
        }
        else if (searchString.length < 3) {
            this.setState({
                showWarning: true,
                inFlight: false
            });
        }
        else if (this.props.selectedRecipients.has(searchString)) {
            this.setState({
                showWarning: true,
                inFlight: false
            });
        }
        else if (this.recipientSearchRequest) {
            // A request is currently in-flight, cancel it
            this.recipientSearchRequest.cancel();

            this.setState({
                inFlight: false
            });
        }
    }

    handleTextInput(recipientInput) {
        // Save input and clear any errors
        this.setState({
            recipientSearchString: recipientInput.target.value,
            showWarning: false
        });
    }

    render() {
        return (
            <RecipientName
                searchRecipient={this.queryRecipients}
                changedInput={this.handleTextInput}
                value={this.state.recipientSearchString}
                disableButton={this.state.inFlight}
                showWarning={this.state.showWarning}
                selectedRecipients={this.props.selectedRecipients} />
        );
    }
}

export default connect(
    (state) => ({
        selectedRecipients: state.filters.selectedRecipients
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientNameDUNSContainer);

RecipientNameDUNSContainer.propTypes = propTypes;
