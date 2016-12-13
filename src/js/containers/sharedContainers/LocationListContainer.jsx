/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import _ from 'lodash';

import * as searchFilterActions from '../../redux/actions/search/searchFilterActions';
import * as SearchHelper from 'helpers/searchHelper';

import Typeahead from '../../components/sharedComponents/Typeahead';
import PlaceOfPerformanceTypeahead from '../../components/search/filters/location/PlaceOfPerformanceTypeahead';

const propTypes = {
    handleTextInput: React.PropTypes.func,
    locationsList: React.PropTypes.array,
    setLocationList: React.PropTypes.func
};

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationNames: [],
            showWarning: this.props.showWarning,
            errorMessage: this.props.errorMessage,
            errorHeader: this.props.errorHeader,
            filter: {
                locationArray: [{
                    keyValue: null,
                    internalValue: null
                }]
            }
        };

        this.handleTextInput = this.handleTextInput.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.updateFilter({
            locationArray: this.props.locationsList
        });
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

    handleTextInput(locationInput){
        // Only search if search is 2 or more characters
        if (locationInput.target.value.length >= 2 || locationInput.target.value.length === 0) {
            const locSearchParam = {"value": locationInput.target.value};
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
                                if (_.isEqual(loc,selectedLoc)){
                                    isSelectedLocation = true;
                                }
                            })

                            if (!isSelectedLocation){
                                autocompleteData.push(loc);
                            }
                        });
                    } else {
                        autocompleteData = data;
                    }

                    // Add search results to Redux
                    this.props.setAutocompleteLocations(autocompleteData);
                });
            this.setState({
                showWarning: false
            });
        }
        else {
            setTimeout(() => {
                this.setState({
                    showWarning: true,
                    errorMessage: 'You must enter at least 2 characters in the search box.',
                    errorHeader: 'Location Error'
                });
            }, 500);
        }
    }

    updateFilter(params) {
        // fetch list of locations for autocomplete
        // set the state to a clone of the filter subobject merged with the param object
    }

    render() {
        return (
            <PlaceOfPerformanceTypeahead
                {...this.props}
                formatter={this.dataFormatter}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectLocation}
                showWarning={this.state.showWarning}
                errorMessage={this.state.errorMessage}
                errorHeader={this.state.errorHeader}
                placeHolder="State, City, County, Zip or District"/>
        );
    }

}

export default connect(
    (state) => ({ autocompleteLocations: state.autocompleteLocations }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationListContainer);

LocationListContainer.propTypes = propTypes;
