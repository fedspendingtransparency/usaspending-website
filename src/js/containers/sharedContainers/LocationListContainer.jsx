/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import PoPTypeahead from 'components/search/filters/location/PlaceOfPerformanceTypeahead';

import * as SearchHelper from 'helpers/searchHelper';
import * as searchFilterActions from '../../redux/actions/search/searchFilterActions';

const propTypes = {
    setAutocompleteLocations: React.PropTypes.func,
    selectLocation: React.PropTypes.func,
    selectedLocations: React.PropTypes.object
};

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationNames: []
        };
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    dataFormatter(item) {
        let itemLabel = `<strong>${item.place}</strong><br>${_.upperCase(item.place_type)}`;
        if (item.parent !== null) {
            itemLabel += ` in ${item.parent}`;
        }

        return {
            label: itemLabel,
            value: item.place
        };
    }

    handleTextInput(locationInput) {
        // Only search if search is 2 or more characters
        if (locationInput.target.value.length >= 2 || locationInput.target.value.length === 0) {
            const locSearchParam = { value: locationInput.target.value };
            this.locationSearchRequest = SearchHelper.fetchLocations(locSearchParam);

            this.locationSearchRequest.promise
                .then((res) => {
                    const data = res.data;
                    let autocompleteData = [];

                    // Filter out selectedLocations that may be included in the result
                    if (this.props.selectedLocations.size > 0) {
                        const locs = this.props.selectedLocations.toArray();

                        data.forEach((loc) => {
                            let isSelectedLocation = false;
                            locs.forEach((selectedLoc) => {
                                if (_.isEqual(loc, selectedLoc)) {
                                    isSelectedLocation = true;
                                }
                            });

                            if (!isSelectedLocation) {
                                autocompleteData.push(loc);
                            }
                        });
                    }
                    else {
                        autocompleteData = data;
                    }

                    // Add search results to Redux
                    this.props.setAutocompleteLocations(autocompleteData);
                });
        }
    }

    render() {
        return (
            <PoPTypeahead
                {...this.props}
                formatter={this.dataFormatter}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectLocation}
                placeHolder="State, City, County, Zip or District" />
        );
    }

}

export default connect(
    (state) => ({ autocompleteLocations: state.autocompleteLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationListContainer);

LocationListContainer.propTypes = propTypes;
