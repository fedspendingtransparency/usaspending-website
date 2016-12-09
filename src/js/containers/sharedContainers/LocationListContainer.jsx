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
            "place": "Ramsey",
            "parent": "Minnesota",
            "matched_ids": [
                5
            ],
            "place_type": "COUNTY"
        },
        {
            "place": "Ouachita",
            "parent": "Louisiana",
            "matched_ids": [
                7,
                8
            ],
            "place_type": "COUNTY"
        },
        {
            "place": "Cache",
            "parent": "Utah",
            "matched_ids": [
                9,
                10
            ],
            "place_type": "COUNTY"
        },
        {
            "place": "Fairfax",
            "parent": "Virginia",
            "matched_ids": [
                1
            ],
            "place_type": "COUNTY"
        },
        {
            "place": "Utah",
            "parent": "UNITED STATES",
            "matched_ids": [
                9,
                10
            ],
            "place_type": "STATE"
        },
        {
            "place": "Minnesota",
            "parent": "UNITED STATES",
            "matched_ids": [
                5,
                6
            ],
            "place_type": "STATE"
        },
        {
            "place": "Virginia",
            "parent": "UNITED STATES",
            "matched_ids": [
                1,
                2
            ],
            "place_type": "STATE"
        },
        {
            "place": "South Dakota",
            "parent": "UNITED STATES",
            "matched_ids": [
                3,
                4
            ],
            "place_type": "STATE"
        },
        {
            "place": "Louisiana",
            "parent": "UNITED STATES",
            "matched_ids": [
                7,
                8
            ],
            "place_type": "STATE"
        },
        {
            "place": "VA",
            "parent": "UNITED STATES",
            "matched_ids": [
                1
            ],
            "place_type": "STATE"
        },
        {
            "place": "LA",
            "parent": "UNITED STATES",
            "matched_ids": [
                7
            ],
            "place_type": "STATE"
        },
        {
            "place": "Logan",
            "parent": "Cache",
            "matched_ids": [
                9
            ],
            "place_type": "CITY"
        },
        {
            "place": "Saint Paul",
            "parent": "Ramsey",
            "matched_ids": [
                5
            ],
            "place_type": "CITY"
        },
        {
            "place": "St. Paul",
            "parent": null,
            "matched_ids": [
                6
            ],
            "place_type": "CITY"
        },
        {
            "place": "Rapid City",
            "parent": null,
            "matched_ids": [
                4
            ],
            "place_type": "CITY"
        },
        {
            "place": "Rapid City",
            "parent": "Pennington",
            "matched_ids": [
                3
            ],
            "place_type": "CITY"
        },
        {
            "place": "UNITED STATES",
            "parent": "USA",
            "matched_ids": [
                7,
                5,
                3,
                9,
                1,
                8,
                6,
                4,
                10,
                2
            ],
            "place_type": "COUNTRY"
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
        let itemLabel = `<strong>${item.place}</strong><br>${_.upperCase(item.place_type)}`;
        if (item.parent !== null) {
            itemLabel += ` in ${item.parent}`;
        }

        return {
            label: itemLabel,
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
