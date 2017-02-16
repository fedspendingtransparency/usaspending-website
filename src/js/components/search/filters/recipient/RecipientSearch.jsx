/**
 * Created by michaelbray on 2/16/17.
 */

import React from 'react';

import LocationListContainer from 'containers/search/filters/location/LocationListContainer';
import CountryType from './CountryType';
import SelectedLocations from './SelectedLocations';

const propTypes = {
    selectLocation: React.PropTypes.func,
    removeLocation: React.PropTypes.func,
    sel

export default class RecipientSearch extends React.Component {
    render() {
        return (
            <div className="recipient-filter search-filter">
            </div>
        );
    }
}

RecipientSearch.propTypes = propTypes;