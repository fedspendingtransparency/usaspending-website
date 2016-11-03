/**
 * FiscalYear.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';

const propTypes = {
    name: React.PropTypes.string
};

export default class FiscalYear extends React.Component {

    render() {
        return (
            <div className="fiscalYearOption">
                <input type="checkbox" id={this.props.name} value={this.props.name} />
                <label htmlFor={this.props.name}>{this.props.name}</label>
            </div>
        );
    }
}
FiscalYear.propTypes = propTypes;
