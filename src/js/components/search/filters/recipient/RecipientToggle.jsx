/**
 * Created by michaelbray on 2/17/17.
 */

import React from 'react';

const propTypes = {
    toggleDomesticForeign: React.PropTypes.func,
    countries: React.PropTypes.array,
    recipientDomesticForeign: React.PropTypes.string
};

const defaultProps = {
    countries: [
        { label: "All", value: "all" },
        { label: "U.S.", value: "domestic" },
        { label: "Foreign", value: "foreign" }
    ]
};

export default class RecipientToggle extends React.Component {
    render() {
        const countries = (
            this.props.countries.map((name) =>
                <span key={`recipient-${name.value}`}>
                    <input
                        type="radio"
                        id={`recipient-${name.value}`}
                        name="recipient"
                        value={name.value}
                        checked={this.props.recipientDomesticForeign === name.value}
                        onChange={this.props.toggleDomesticForeign} />
                    <label htmlFor={`recipient-${name.value}`}>{name.label}</label>
                </span>
            ));

        return (
            <div className="recipient-radio">
                <p>Show Only:</p>
                { countries }
            </div>
        );
    }
}

RecipientToggle.propTypes = propTypes;
RecipientToggle.defaultProps = defaultProps;
