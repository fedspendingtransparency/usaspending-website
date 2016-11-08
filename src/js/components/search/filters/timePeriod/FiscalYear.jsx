/**
 * FiscalYear.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';

const propTypes = {
    year: React.PropTypes.string
};

export default class FiscalYear extends React.Component {

    render() {
        return (
            <li className="fiscalYearOption">
                <input type="checkbox" id={`fy${this.props.year}`} value={`FY ${this.props.year}`} />
                <label htmlFor={`fy${this.props.year}`}>{`FY ${this.props.year}`}</label>
            </li>
        );
    }
}
FiscalYear.propTypes = propTypes;
