/**
 * RecipientLocationContainer.jsx
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

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
            autocompleteRecipientLocations: []
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteRecipientLocations(this.props.autocompleteRecipientLocations);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.autocompleteRecipientLocations,
                this.props.autocompleteRecipientLocations)) {
            this.parseAutocompleteRecipientLocations(nextProps.autocompleteRecipientLocations);
        }
    }

    parseAutocompleteRecipientLocations(recipientLocations) {
        const values = [];
        if (recipientLocations.length > 0) {
            recipientLocations.forEach((item) => {
                let placeType = _.upperCase(item.place_type);
                if (item.parent !== null) {
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
                            .map((recipient) => _.omit(recipient, 'identifier'));

                    // Filter out any selectedRecipients that may be in the result set
                    if (selectedRecipientLocations && selectedRecipientLocations.length > 0) {
                        autocompleteData = _.differenceWith(
                            data, selectedRecipientLocations, _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    // Add search results to Redux
                    this.props.setAutocompleteRecipientLocations(autocompleteData);
                });
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
                errorMessage="You must select a recipient location from
                    the list that is provided as you type."
                ref={(input) => {
                    this.recipientLocationList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions} />
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
