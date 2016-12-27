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
        { label: "All", value: "all" },
        { label: "USA", value: "domestic" },
        { label: "Foreign", value: "foreign" }
    ]
};

export default class CountryType extends React.Component {
    render() {
        const countries = (
            this.props.countries.map((name) =>
                <span key={`location-${name.value}`}>
                    <input
                        type="radio"
                        id={`location-${name.value}`}
                        name="location"
                        value={name.value}
                        checked={this.props.locationOption === name.value}
                        onChange={this.props.toggleCountry} />
                    <label htmlFor={`location-${name.value}`}>{name.label}</label>
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
