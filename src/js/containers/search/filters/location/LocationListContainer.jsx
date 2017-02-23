/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import Autocomplete from 'components/sharedComponents/autocomplete/Autocomplete';

const propTypes = {
    selectLocation: React.PropTypes.func,
    setAutocompleteLocations: React.PropTypes.func,
    selectedLocations: React.PropTypes.object,
    locationDomesticForeign: React.PropTypes.string,
    autocompleteLocations: React.PropTypes.array
};

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationSearchString: '',
            autocompleteLocations: []
        };

        this.handleTextInput = this.handleTextInput.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.parseAutocompleteLocations(this.props.autocompleteLocations);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.autocompleteLocations, this.props.autocompleteLocations)) {
            this.parseAutocompleteLocations(nextProps.autocompleteLocations);
        }
    }

    parseAutocompleteLocations(locations) {
        const values = [];
        if (locations.length > 0) {
            locations.forEach((item) => {
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
            autocompleteLocations: values
        });
    }

    queryAutocompleteLocations(input) {
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
                        .map((location) => _.omit(location, 'identifier'));

                    // Filter out any selectedLocations that may be in the result set
                    if (selectedLocations && selectedLocations.length > 0) {
                        autocompleteData = _.differenceWith(data, selectedLocations, _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    // Add search results to Redux
                    this.props.setAutocompleteLocations(autocompleteData);
                });
        }
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
                errorMessage="You must select a location from
                    the list that is provided as you type."
                ref={(input) => {
                    this.locationList = input;
                }} />
        );
    }

}

export default connect(
    (state) => ({ autocompleteLocations: state.autocompleteLocations }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(LocationListContainer);

LocationListContainer.propTypes = propTypes;
