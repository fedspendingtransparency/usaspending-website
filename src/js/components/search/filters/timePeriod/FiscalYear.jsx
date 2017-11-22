/**
 * FiscalYear.jsx
 * Created by Emily Gullo 11/03/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    year: PropTypes.string,
    saveSelectedYear: PropTypes.func,
    checked: PropTypes.bool,
    saveAllYears: PropTypes.func
};

const defaultProps = {
    checked: false
};

export default class FiscalYear extends React.Component {
    constructor(props) {
        super(props);
        // bind functions
        this.allYears = this.allYears.bind(this);
        this.saveYear = this.saveYear.bind(this);
    }
    saveYear() {
        this.props.saveSelectedYear(this.props.year);
    }

    allYears() {
        this.props.saveAllYears();
    }

    render() {
        let yearOption = null;

        if (this.props.year === "all") {
            yearOption = (
                <li className="fiscal-year-option-all">
                    <input
                        type="checkbox"
                        id={`fy${this.props.year}`}
                        value="All Fiscal Years"
                        checked={this.props.checked}
                        onChange={this.allYears} />
                    <label htmlFor={`fy${this.props.year}`}>All Fiscal Years</label>
                </li>
            );
        }
        else {
            yearOption = (
                <li className="fiscal-year-option">
                    <input
                        type="checkbox"
                        id={`fy${this.props.year}`}
                        value={`FY ${this.props.year}`}
                        checked={this.props.checked}
                        onChange={this.saveYear} />
                    <label htmlFor={`fy${this.props.year}`}>{`FY ${this.props.year}`}</label>
                </li>
            );
        }
        return (
            <div>{ yearOption }</div>
        );
    }
}
FiscalYear.propTypes = propTypes;
FiscalYear.defaultProps = defaultProps;
