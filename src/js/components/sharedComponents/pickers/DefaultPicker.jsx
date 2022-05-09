/**
 * DefaultPicker.jsx
 * Created by Jonathan Hill 07/25/19
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    defaultSelection: PropTypes.number,
    prependSelection: PropTypes.string,
    menuData: PropTypes.array,
    menuList: PropTypes.array,
    selectedItemFunc: PropTypes.func,
    prepend: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    append: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default class DefaultPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedYear = this.clickedYear.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.createMenu = this.createMenu.bind(this);
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

    toggleList(e) {
        e.preventDefault();
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
        e.preventDefault();
        this.props.selectedItemFunc(e.target.value);
        this.setState({
            expanded: false
        });
    }

    createMenu() {
        return this.props.menuData.map((data) => {
            const {
                key,
                value,
                label,
                prepend,
                append
            } = data;
            return (
                <li
                    key={`${key}`}
                    className="default-picker__list-item">
                    <button
                        className="default-picker__item"
                        value={value}
                        onClick={this.clickedYear}>
                        {prepend} {label} {append}
                    </button>
                </li>
            );
        });
    }

    render() {
        const {
            defaultSelection,
            menuList,
            prepend,
            append,
            prependSelection
        } = this.props;
        const menu = menuList || this.createMenu();
        let visibleClass = 'default-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        return (
            <div
                className="default-picker"
                ref={(div) => {
                    this.pickerRef = div;
                }}>
                <div className="default-picker__header">
                    <div className="default-picker__icon">
                        {prepend}
                    </div>
                    <div className="default-picker__dropdown-container">
                        <button
                            className="default-picker__button"
                            onClick={this.toggleList}>
                            <div className="default-picker__button-text">
                                {prependSelection} {defaultSelection.toString()}
                            </div>
                            <div className="default-picker__button-icon">
                                <FontAwesomeIcon size="lg" icon="chevron-down" />
                            </div>
                        </button>
                        <ul className={`default-picker__list ${visibleClass}`}>
                            {menu}
                        </ul>
                    </div>
                    <div className="default-picker__icon">
                        {append}
                    </div>
                </div>
            </div>
        );
    }
}

DefaultPicker.propTypes = propTypes;

