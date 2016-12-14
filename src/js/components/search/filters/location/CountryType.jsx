/**
 * CountryType.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';

const propTypes = {
    toggleCountry: React.PropTypes.func
};

export default class CountryType extends React.Component {

    render() {
        return (
            <div className="location-radio">
                <p>Show Only:</p>
                <input
                    type="radio"
                    id="location-all"
                    name="location"
                    value="all"
                    defaultChecked="true"
                    onClick={this.props.toggleCountry} />
                <label htmlFor="location-all">All</label>
                <input
                    type="radio"
                    id="location-usa"
                    name="location"
                    value="domestic"
                    onClick={this.props.toggleCountry} />
                <label htmlFor="location-usa">USA</label>
                <input
                    type="radio"
                    id="location-foreign"
                    name="location"
                    value="foreign"
                    onClick={this.props.toggleCountry} />
                <label htmlFor="location-foreign">Foreign</label>
            </div>
        );
    }
}
CountryType.propTypes = propTypes;
