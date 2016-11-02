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
        return (
            <div key={this.props.key} className="secondaryAwardTypeOption subList">
                <input
                    type="checkbox"
                    id={this.props.subListValue} value={this.props.subListValue} />
                <label htmlFor={this.props.subListValue}>{this.props.subListValue}</label>
            </div>
        );
    }
}
SecondaryAwardType.propTypes = propTypes;
