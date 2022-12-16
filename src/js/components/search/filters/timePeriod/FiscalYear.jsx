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
                    <label
                        className="fy-option-wrapper"
                        htmlFor={`fy${this.props.year}`}>
                        <input
                            type="checkbox"
                            className="fy-option-checkbox"
                            id={`fy${this.props.year}`}
                            value="All Fiscal Years"
                            checked={this.props.checked}
                            onChange={this.allYears} />
                        <span className="fy-option-label">
                            All Fiscal Years
                        </span>
                    </label>
                </li>
            );
        }
        else {
            yearOption = (
                <li className="fiscal-year-option">
                    <label
                        className="fy-option-wrapper"
                        htmlFor={`fy${this.props.year}`}>
                        <input
                            type="checkbox"
                            className="fy-option-checkbox"
                            id={`fy${this.props.year}`}
                            value={`FY ${this.props.year}`}
                            checked={this.props.checked}
                            onChange={this.saveYear} />
                        <span className="fy-option-label">
                            {`FY ${this.props.year}`}
                        </span>
                    </label>
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
