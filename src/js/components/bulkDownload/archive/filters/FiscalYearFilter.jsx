/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 12/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as fiscalYearHelper from 'helpers/fiscalYearHelper';
import * as Icons from 'components/sharedComponents/icons/Icons';

const earliestFY = fiscalYearHelper.earliestFiscalYear;
const currentFY = fiscalYearHelper.currentFiscalYear();
const fiscalYears = [];
for (let year = currentFY; year >= earliestFY; year--) {
    fiscalYears.push(year);
}

const propTypes = {
    currentFY: PropTypes.string,
    updateFilter: PropTypes.func,
    formWidth: PropTypes.number,
    windowWidth: PropTypes.number
};

export default class ArchiveFiscalYearFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showFyPicker: false
        };

        this.toggleFyPicker = this.toggleFyPicker.bind(this);
        this.handleFySelect = this.handleFySelect.bind(this);
    }

    toggleFyPicker(e) {
        e.preventDefault();
        this.setState({
            showFyPicker: !this.state.showFyPicker
        });
    }

    handleFySelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('fy', target.value);

        this.setState({
            showFyPicker: false
        });
    }

    render() {
    // Create the fiscal year options

        const FYs = fiscalYears.map((year) => (
            <li
                className="field-item"
                key={`field-${year}`}>
                <button
                    className="item-button"
                    title={year}
                    aria-label={year}
                    value={year}
                    onClick={this.handleFySelect}>
                    {year}
                </button>
            </li>
        ));

        let showFyPicker = 'hide';
        let fyIcon = <Icons.AngleDown alt="Pick a fiscal year" />;
        if (this.state.showFyPicker) {
            showFyPicker = '';
            fyIcon = <Icons.AngleUp alt="Pick a fiscal year" />;
        }

        let dropDownWidth = this.props.formWidth - 30;
        if (this.props.windowWidth >= 992) {
            dropDownWidth = (this.props.formWidth * 0.15) - 30;
        }

        return (
            <div className="filter-picker fy-picker">
                <label className="select-label" htmlFor="fy-select">
                    Fiscal Year
                </label>
                <div className="field-picker fy-select">
                    <button
                        className="selected-button"
                        title={this.props.currentFY}
                        aria-label={this.props.currentFY}
                        onClick={this.toggleFyPicker}>
                        <div className="label">
                            {this.props.currentFY}
                            <span className="arrow-icon">
                                {fyIcon}
                            </span>
                        </div>
                    </button>
                    <div
                        className={`field-list ${showFyPicker}`}
                        style={{ width: dropDownWidth }}>
                        <ul>
                            {FYs}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ArchiveFiscalYearFilter.propTypes = propTypes;
