/**
 * FiscalYear.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';

const propTypes = {
    year: React.PropTypes.string,
    saveSelectedYear: React.PropTypes.func,
    checked: React.PropTypes.bool,
    saveAllYears: React.PropTypes.func
};

const defaultProps = {
    checked: false
};

export default class FiscalYear extends React.Component {

    saveYear() {
        this.props.saveSelectedYear(this.props.year);
    }

    allYears() {
        this.props.saveAllYears();
    }

    render() {
        let yearOption = null;

        if (this.props.year === "all") {
            yearOption = (<li className="fiscalYearOptionAll">
                <input
                    type="checkbox"
                    id={`fy${this.props.year}`}
                    value="All Years"
                    checked={this.props.checked}
                    onChange={this.allYears.bind(this)} />
                <label htmlFor={`fy${this.props.year}`}>All Years</label>
            </li>);
        }
        else {
            yearOption = (<li className="fiscalYearOption">
                <input
                    type="checkbox"
                    id={`fy${this.props.year}`}
                    value={`FY ${this.props.year}`}
                    checked={this.props.checked}
                    onChange={this.saveYear.bind(this)} />
                <label htmlFor={`fy${this.props.year}`}>{`FY ${this.props.year}`}</label>
            </li>);
        }
        return (
            <div>{ yearOption }</div>
        );
    }
}
FiscalYear.propTypes = propTypes;
FiscalYear.defaultProps = defaultProps;
