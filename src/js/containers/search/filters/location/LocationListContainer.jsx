/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual, upperCase, omit, differenceWith } from 'lodash';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectLocation: PropTypes.func,
    setAutocompleteLocations: PropTypes.func,
    selectedLocations: PropTypes.object,
    locationDomesticForeign: PropTypes.string,
    autocompleteLocations: PropTypes.array
};

export class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationSearchString: '',
            autocompleteLocations: [],
            noResults: false
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.clearAutocompleteSuggestions = this.clearAutocompleteSuggestions.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteLocations(this.props.autocompleteLocations);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.autocompleteLocations, this.props.autocompleteLocations)) {
            this.parseAutocompleteLocations(nextProps.autocompleteLocations);
        }
    }

    parseAutocompleteLocations(locations) {
        const values = [];
        if (locations.length > 0) {
            locations.forEach((item) => {
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
            autocompleteLocations: values
        });
    }

    queryAutocompleteLocations(input) {
        this.setState({
            noResults: false
        });

        // Only search if input is 2 or more characters
        if (input.length >= 2) {
            this.setState({
                locationSearchString: input
            });

            if (this.locationSearchRequest) {
                // A request is currently in-flight, cancel it
                this.locationSearchRequest.cancel();
            }

            const locSearchParams = {
                value: this.state.locationSearchString,
                scope: this.props.locationDomesticForeign,
                usage: "place_of_performance"
            };

            this.locationSearchRequest = SearchHelper.fetchLocations(locSearchParams);

            this.locationSearchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Remove 'identifier' from selected locations to enable comparison
                    const selectedLocations = this.props.selectedLocations.toArray()
                        .map((location) => omit(location, 'identifier'));

                    // Filter out any selectedLocations that may be in the result set
                    if (selectedLocations && selectedLocations.length > 0) {
                        autocompleteData = differenceWith(data, selectedLocations, isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    this.setState({
                        noResults: autocompleteData.length === 0
                    });

                    // Add search results to Redux
                    this.props.setAutocompleteLocations(autocompleteData);
                })
                .catch((err) => {
                    if (!isCancel(err)) {
                        this.setState({
                            noResults: true
                        });
                    }
                });
        }
        else if (this.locationSearchRequest) {
            // A request is currently in-flight, cancel it
            this.locationSearchRequest.cancel();
        }
    }

    clearAutocompleteSuggestions() {
        this.props.setAutocompleteLocations([]);
    }

    handleTextInput(locationInput) {
        // Clear existing locations to ensure user can't select an old or existing one
        this.props.setAutocompleteLocations([]);

        // Grab input, clear any exiting timeout
        const input = locationInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.queryAutocompleteLocations(input);
        }, 300);
    }

    render() {
        return (
            <Autocomplete
                {...this.props}
                values={this.state.autocompleteLocations}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectLocation}
                placeholder="State, City, County, ZIP, or District"
                errorHeader="Unknown Location"
                errorMessage="We were unable to find that location."
                ref={(input) => {
                    this.locationList = input;
                }}
                clearAutocompleteSuggestions={this.clearAutocompleteSuggestions}
                noResults={this.state.noResults} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteLocations: state.autocompleteLocations }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(LocationListContainer);

LocationListContainer.propTypes = propTypes;
