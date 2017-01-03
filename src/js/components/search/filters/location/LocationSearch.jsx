/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as SearchHelper from 'helpers/searchHelper';
import * as autocompleteActions from 'redux/actions/search/autocompleteActions';

import LocationListContainer from 'containers/sharedContainers/LocationListContainer';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';

const propTypes = {
    selectLocation: React.PropTypes.func,
    removeLocation: React.PropTypes.func,
    setAutocompleteLocations: React.PropTypes.func,
    selectedLocations: React.PropTypes.object
};

class LocationSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationOption: 'all',
            locationSearchString: ''
        };

        // Bind functions
        this.toggleCountry = this.toggleCountry.bind(this);
        this.queryAutocompleteLocations = this.queryAutocompleteLocations.bind(this);
        this.focus = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.locationOption !== this.state.locationOption) {
            this.queryAutocompleteLocations('', true);
        }
    }

    queryAutocompleteLocations(input, updateFromToggle) {
        // Only search if input is 2 or more characters, or if the user toggled the country select
        if (input.length >= 2 || updateFromToggle === true) {
            if (updateFromToggle !== true) {
                this.setState({
                    locationSearchString: input
                });
            }

            if (this.locationSearchRequest) {
                // A request is currently in-flight, cancel it
                this.locationSearchRequest.cancel();
            }

            const locSearchParams = {
                value: this.state.locationSearchString,
                scope: this.state.locationOption
            };

            this.locationSearchRequest = SearchHelper.fetchLocations(locSearchParams);

            this.locationSearchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Filter out any selectedLocations that may be in the result set
                    if (this.props.selectedLocations.size > 0) {
                        autocompleteData = _.differenceWith(data,
                            this.props.selectedLocations.toArray(), _.isEqual);
                    }
                    else {
                        autocompleteData = data;
                    }

                    // Add search results to Redux
                    this.props.setAutocompleteLocations(autocompleteData);
                });
        }
    }

    toggleCountry(e) {
        this.focus = true;

        this.setState({
            locationOption: e.target.value
        });
    }

    render() {
        let selectedLocations = null;
        if (this.props.selectedLocations.size > 0) {
            selectedLocations = (<SelectedLocations
                selectedLocations={this.props.selectedLocations}
                removeLocation={this.props.removeLocation} />);
        }

        return (
            <div className="location-filter search-filter">
                <CountryType
                    {...this.props}
                    toggleCountry={this.toggleCountry}
                    locationOption={this.state.locationOption} />
                <LocationListContainer
                    {...this.props}
                    selectLocation={this.props.selectLocation}
                    queryAutocompleteLocations={this.queryAutocompleteLocations}
                    focus={this.focus} />
                {selectedLocations}
            </div>
        );
    }
}

export default connect(
    (state) => ({ autocompleteLocations: state.autocompleteLocations }),
    (dispatch) => bindActionCreators(autocompleteActions, dispatch)
)(LocationSearch);

LocationSearch.propTypes = propTypes;
