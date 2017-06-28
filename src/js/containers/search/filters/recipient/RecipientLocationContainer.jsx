/**
 * RecipientLocationContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, upperCase, omit, differenceWith } from 'lodash';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as recipientActions from 'redux/actions/search/recipientActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    toggleRecipientLocation: React.PropTypes.func,
    setAutocompleteRecipientLocations: React.PropTypes.func,
    selectedRecipientLocations: React.PropTypes.object,
    recipientDomesticForeign: React.PropTypes.string,
    autocompleteRecipientLocations: React.PropTypes.array
};

export class RecipientLocationContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipientLocationSearchString: '',
            autocompleteRecipientLocations: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteRecipientLocations(this.props.autocompleteRecipientLocations);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteRecipientLocations,
                this.props.autocompleteRecipientLocations)) {
            this.parseAutocompleteRecipientLocations(nextProps.autocompleteRecipientLocations);
        }
    }

    parseAutocompleteRecipientLocations(recipientLocations) {
        const values = [];
        if (recipientLocations.length > 0) {
            recipientLocations.forEach((item) => {
                let placeType = upperCase(item.place_type);
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
            autocompleteRecipientLocations: values
        });
    }

    queryAutocompleteRecipientLocations(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                recipientLocationSearchString: input
            });

            if (this.recipientLocationSearchRequest) {
                // A request is currently in-flight, cancel it
                this.recipientLocationSearchRequest.cancel();
            }

            const locSearchParams = {
                value: this.state.recipientLocationSearchString,
                scope: this.props.recipientDomesticForeign,
                usage: "recipient"
            };

            this.recipientLocationSearchRequest = SearchHelper.fetchLocations(locSearchParams);

            this.recipientLocationSearchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected recipient locations to enable comparison
                    const selectedRecipientLocations =
                        this.props.selectedRecipientLocations.toArray()
                            .map((recipient) => omit(recipient, 'identifier'));

                    // Filter out any selectedRecipients that may be in the result set
                    if (selectedRecipientLocations && selectedRecipientLocations.length > 0) {
                        autocompleteData = differenceWith(
                            data, selectedRecipientLocations, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteRecipientLocations(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.recipientLocationSearchRequest) {
            // A request is currently in-flight, cancel it
            this.recipientLocationSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteRecipientLocations([]);
    }

    handleTextInput(recipientInput) {
        // Clear existing recipient locationss to ensure user can't select an old or existing one
        this.props.setAutocompleteRecipientLocations([]);

        // Grab input, clear any exiting timeout
        const input = recipientInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteRecipientLocations(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                label="Recipient Location"
                values={this.state.autocompleteRecipientLocations}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.toggleRecipientLocation}
                placeholder="State, City, County, ZIP, or District"
                errorHeader="Unknown Location"
                errorMessage="We were unable to find that location."
                ref={(input) => {
                    this.recipientLocationList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({
        autocompleteRecipientLocations: state.autocompleteRecipients.recipientLocations
    }),
    (dispatch) => bindActionCreators(recipientActions, dispatch)
)(RecipientLocationContainer);

RecipientLocationContainer.propTypes = propTypes;
