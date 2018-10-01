/**
 * FYPicker.jsx
 * Created by Lizzie Salita 5/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

import { Calendar, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fy: PropTypes.string,
    pickedYear: PropTypes.func
};

const fyOptions = [
    {
        name: 'latest',
        label: 'Trailing 12 Months'
    },
    {
        name: 'all',
        label: 'All Fiscal Years'
    }
];

export default class FYPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedYear = this.clickedYear.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUnmount() {
        // remove the event listener
        document.removeEventListener('click', this.closeMenu);
    }

    closeMenu(e) {
        if (this.pickerRef && this.pickerRef.contains(e.target)) {
            // user clicked inside the dropdown, don't auto-close because it is the user interacting
            // with the dropdown
            return;
        }
        this.setState({
            expanded: false
        }, () => {
            // remove the event listener
            document.removeEventListener('click', this.closeMenu);
        });
    }

    toggleList() {
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                // subscribe to click events on the page to auto-close the menu
                document.addEventListener('click', this.closeMenu);
            }
            else {
                // remove the event listener
                document.removeEventListener('click', this.closeMenu);
            }
        });
    }

    clickedYear(e) {
        this.props.pickedYear(e.target.value);
        this.setState({
            expanded: false
        });
    }

    render() {
        const fy = [];
        const currentFY = FiscalYearHelper.currentFiscalYear();
        const earliestFY = FiscalYearHelper.earliestFiscalYear;
        for (let year = currentFY; year >= earliestFY; year--) {
            const item = (
                <li
                    key={year}
                    className="fy-picker__list-item">
                    <button
                        className="fy-picker__item"
                        value={year}
                        onClick={this.clickedYear}>
                        FY {year}
                    </button>
                </li>
            );

            fy.push(item);
        }

        const otherFyOptions = fyOptions.map((option) => (
            <li
                key={option.name}
                className="fy-picker__list-item">
                <button
                    className="fy-picker__item"
                    value={option.name}
                    onClick={this.clickedYear}>
                    {option.label}
                </button>
            </li>
        ));

        let visibleClass = 'fy-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        let currentSelection = `FY ${this.props.fy}`;
        const otherSelection = fyOptions.find((option) =>
            option.name === this.props.fy
        );
        if (otherSelection) {
            currentSelection = otherSelection.label;
        }

        return (
            <div
                className="fy-picker"
                ref={(div) => {
                    this.pickerRef = div;
                }}>
                <div className="fy-picker__header">
                    <div className="fy-picker__icon">
                        <Calendar alt="Fiscal Year" />
                    </div>
                    <div className="fy-picker__dropdown-container">
                        <button
                            className="fy-picker__button"
                            onClick={this.toggleList}>
                            <div className="fy-picker__button-text">
                                {currentSelection}
                            </div>
                            <div className="fy-picker__button-icon">
                                <AngleDown alt="Toggle menu" />
                            </div>
                        </button>
                        <ul className={`fy-picker__list ${visibleClass}`}>
                            {otherFyOptions}
                            <li
                                className="fy-picker__list-item">
                                <button
                                    disabled
                                    className="fy-picker__item fy-picker__item_disabled">
                                    &mdash;
                                </button>
                            </li>
                            {fy}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

FYPicker.propTypes = propTypes;

