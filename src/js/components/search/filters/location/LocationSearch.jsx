/**
 * LocationSearch.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import CountryType from './CountryType';
import LocationListContainer from '../../../../containers/sharedContainers/LocationListContainer';

const propTypes = {
    toggleCountry: React.PropTypes.func,
    handleTextInput: React.PropTypes.func
};

export default class LocationSearch extends React.Component {

    render() {
        return (
            <div className="location-filter search-filter">
                <CountryType toggleCountry={this.props.toggleCountry} />
                <LocationListContainer handleTextInput={this.props.handleTextInput} />
            </div>
        );
    }
}
LocationSearch.propTypes = propTypes;
