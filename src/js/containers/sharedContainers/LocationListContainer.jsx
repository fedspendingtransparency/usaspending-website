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
import * as LocationHelper from '../../helpers/locationHelper';

import Typeahead from '../../components/sharedComponents/Typeahead';
import PlaceOfPerformanceTypeahead from '../../components/search/filters/location/PlaceOfPerformanceTypeahead';

const defaultProps = {
    locationsList: [
        {
            matchedID: [1],
            place: "Arlington",
            type: "City",
            parent: "Texas"
        }, {
            matchedID: [2, 3],
            place: "Arlington",
            type: "County",
            parent: "Virginia"
        }
    ]
};

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
            filter: {
                locationArray: [{
                    keyValue: null,
                    internalValue: null
                }]
            }
        };
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
        return {
            label: `<strong>${item.place}</strong><br>${_.upperCase(item.type)} in ${item.parent}`,
            value: item.place
        };
    }

    updateFilter(params) {
        // fetch list of locations for autocomplete
        // set the state to a clone of the filter subobject merged with the param object
        const newFilter = Object.assign({}, this.state.filter, params);
        this.setState({
            filter: newFilter
        }
        , () => {
            // LocationHelper.fetchLocations(JSON CALL WILL GO HERE);
            // set store with dummy values
            const list = {};
            list.locationArray = this.state.filter.locationArray;
            this.props.setLocationList(list);

            this.setState({
                locationNames: this.props.locationsList
            });
        });
    }

    render() {
        return (
            <PlaceOfPerformanceTypeahead
                {...this.props}
                values={this.state.locationNames}
                formatter={this.dataFormatter}
                onSelect={this.props.handleTextInput}
                placeHolder="State, City, County, Zip or District"/>
        );
    }

}

export default connect(
    (state) => ({ locations: state.filters.locationArray }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationListContainer);

LocationListContainer.defaultProps = defaultProps;
LocationListContainer.propTypes = propTypes;
