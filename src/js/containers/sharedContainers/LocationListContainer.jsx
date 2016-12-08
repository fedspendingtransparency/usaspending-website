/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from '../../redux/actions/search/searchFilterActions';
import * as LocationHelper from '../../helpers/locationHelper';

import Typeahead from '../../components/sharedComponents/Typeahead';

const defaultProps = {
    locationsList: [
        { location_code: 1, location_name: '20902' },
        { location_code: 2, location_name: 'Silver Spring' },
        { location_code: 3, location_name: 'Maryland' },
        { location_code: 4, location_name: 'Montgomery County' }
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

            // setting dummy values in state in a new array (to go to Typeahead)
            const stateList = [];
            this.state.filter.locationArray.map((loc) =>
                stateList.push(loc.location_name)
            );
            this.setState({
                locationNames: stateList
            });
        });
    }

    render() {
        return (
            <Typeahead
                {...this.props}
                values={this.state.locationNames}
                onSelect={this.props.handleTextInput} />
        );
    }

}

export default connect(
    (state) => ({ locations: state.filters.locationArray }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(LocationListContainer);

LocationListContainer.defaultProps = defaultProps;
LocationListContainer.propTypes = propTypes;
