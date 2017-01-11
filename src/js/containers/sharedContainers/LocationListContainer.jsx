/**
* LocationListContainer.jsx
* Created by Emily Gullo 12/1/2016
**/

import React from 'react';
import _ from 'lodash';

import LocationList from 'components/search/filters/location/LocationList';

const propTypes = {
    setAutocompleteLocations: React.PropTypes.func,
    queryAutocompleteLocations: React.PropTypes.func,
    selectLocation: React.PropTypes.func,
    focus: React.PropTypes.bool
};

export default class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextInput = this.handleTextInput.bind(this);
        this.timeout = null;
    }

    componentDidUpdate() {
        if (this.props.focus === true) {
            this.locationList.awesompleteInput.focus();
        }
    }

    dataFormatter(item) {
        let itemLabel = `<b>${item.place}</b><br>${_.upperCase(item.place_type)}`;
        if (item.parent !== null) {
            itemLabel += ` in ${item.parent}`;
        }

        return {
            label: itemLabel,
            value: item.place
        };
    }

    handleTextInput(locationInput) {
        // Clear existing locations to ensure user can't select an old or existing one
        this.props.setAutocompleteLocations([]);

        // Grab input, clear any exiting timeout
        const input = locationInput.target.value;
        window.clearTimeout(this.timeout);

        // Perform search if user doesn't type again for 300ms
        this.timeout = window.setTimeout(() => {
            this.props.queryAutocompleteLocations(input, false);
        }, 300);
    }

    render() {
        return (
            <LocationList
                {...this.props}
                formatter={this.dataFormatter}
                handleTextInput={this.handleTextInput}
                onSelect={this.props.selectLocation}
                placeHolder="State, City, County, Zip or District"
                ref={(input) => {
                    this.locationList = input;
                }}
                focus={this.props.focus} />
        );
    }

}

LocationListContainer.propTypes = propTypes;
