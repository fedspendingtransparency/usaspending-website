/**
 * FYPicker.jsx
 * Created by Lizzie Salita 5/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getDropdownLabelsByApiValue } from 'dataMapping/recipients/fiscalYearDropdown';

import { Calendar, AngleDown } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    selectedFy: PropTypes.string,
    pickedYear: PropTypes.func
};

export default class FYPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedYear = this.clickedYear.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.sortDropdownOptions = this.sortDropdownOptions.bind(this);
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

    sortDropdownOptions(key1, key2) {
        if (key1 === 'latest') return -1;
        else if (key2 === 'latest') return 1;
        else if (key1 === 'all') return -1;
        else if (key2 === 'all') return 1;
        else if (key1 > key2) return -1;
        else if (key2 > key1) return 1;
        return 0;
    }

    render() {
        const dropdownValuesByApiValue = getDropdownLabelsByApiValue();
        let visibleClass = 'fy-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        const selectedApiValue = Object.keys(dropdownValuesByApiValue)
            .find((option) => option === this.props.selectedFy);
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
                                {dropdownValuesByApiValue[selectedApiValue]}
                            </div>
                            <div className="fy-picker__button-icon">
                                <AngleDown alt="Toggle menu" />
                            </div>
                        </button>
                        <ul className={`fy-picker__list ${visibleClass}`}>
                            {Object.keys(dropdownValuesByApiValue)
                                .sort(this.sortDropdownOptions)
                                .map((apiValue) => (
                                    <li
                                        key={apiValue}
                                        className="fy-picker__list-item">
                                        <button
                                            className="fy-picker__item"
                                            value={apiValue}
                                            onClick={this.clickedYear}>
                                            {dropdownValuesByApiValue[apiValue]}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

FYPicker.propTypes = propTypes;

