/**
 * FYPicker.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import { Calendar, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fy: PropTypes.string,
    pickedYear: PropTypes.func
};

export default class FYPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
    }

    toggleList() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const fy = [];
        const currentFY = FiscalYearHelper.defaultFiscalYear();
        const earliestFY = FiscalYearHelper.earliestExplorerYear;
        for (let year = currentFY; year >= earliestFY; year--) {
            const item = (
                <li key={year}>
                    <button
                        className="fy-picker__item">
                        FY {year}
                    </button>
                </li>
            );

            fy.push(item);
        }

        let visibleClass = 'fy-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        return (
            <div className="fy-picker">
                <div className="fy-picker__header">
                    <div className="fy-picker__icon">
                        <Calendar alt="Fiscal Year" />
                    </div>
                    <button
                        className="fy-picker__button"
                        onClick={this.toggleList}>
                        <div className="fy-picker__button-text">
                            FY {this.props.fy}
                        </div>
                        <div className="fy-picker__button-icon">
                            <AngleDown alt="Toggle menu" />
                        </div>
                    </button>
                </div>
                <ul className={`fy-picker__list ${visibleClass}`}>
                    {fy}
                </ul>
            </div>
        );
    }
}

FYPicker.propTypes = propTypes;

