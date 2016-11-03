/**
 * SecondaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

const propTypes = {
    subListValue: React.PropTypes.string,
    key: React.PropTypes.number
};

export default class SecondaryAwardType extends React.Component {

    render() {
        const subListValueShort = this.props.subListValue.replace(/\s+/g, '').toLowerCase();

        return (
            <div key={this.props.key} className="secondaryAwardTypeOption subList">
                <input
                    type="checkbox"
                    id={subListValueShort} value={this.props.subListValue} />
                <label htmlFor={subListValueShort}>{this.props.subListValue}</label>
            </div>
        );
    }
}
SecondaryAwardType.propTypes = propTypes;
