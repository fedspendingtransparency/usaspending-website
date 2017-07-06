/**
 * CountryType.jsx
 * Created by Emily Gullo 11/28/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    toggleCountry: PropTypes.func,
    countries: PropTypes.array,
    locationDomesticForeign: PropTypes.string
};

const defaultProps = {
    countries: [
        { label: "All", value: "all" },
        { label: "U.S.", value: "domestic" },
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
                        checked={this.props.locationDomesticForeign === name.value}
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
