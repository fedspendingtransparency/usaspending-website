/**
 * CountryType.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';

const propTypes = {
    toggleCountry: React.PropTypes.func,
    locationOption: React.PropTypes.string,
    countries: React.PropTypes.array
};

const defaultProps = {
    countries: [
        "All",
        "USA",
        "Foreign"
    ]
};

export default class CountryType extends React.Component {
    render() {
        const countries = (
            this.props.countries.map((name) =>
                <span key={`location-${name}`}>
                    <input
                        type="radio"
                        id={`location-${name}`}
                        name="location"
                        value={name}
                        checked={this.props.locationOption === name}
                        onChange={this.props.toggleCountry} />
                    <label htmlFor={`location-${name}`}>{name}</label>
                </span>
            ));

        return (
            <div className="location-radio">
                <p>Show Only:</p>
                { countries }
            </div>
        );
    }
}

CountryType.propTypes = propTypes;
CountryType.defaultProps = defaultProps;
