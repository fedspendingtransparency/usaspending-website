/**
 * EntityDropdownAutocomplete.jsx
 * Created by Lizzie Salita 5/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';

import { AngleDown, AngleUp } from 'components/sharedComponents/icons/Icons';

import EntityDropdownList from './EntityDropdownList';

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    scope: PropTypes.string,
    enabled: PropTypes.bool,
    matchKey: PropTypes.string,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string
};

const defaultProps = {
    enabled: true,
    matchKey: 'name'
};

export default class EntityDropdownAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            value: ''
        };

        this.dropdownRef = null;

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.focusNext = this.focusNext.bind(this);
        this.focusPrev = this.focusPrev.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
        this.handleDeselection = this.handleDeselection.bind(this);

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    handleDeselection(e) {
        if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
            // clicked outside the dropdown, close it
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState(
            {
                expanded: true
            },
            () => {
                this.bindAccessibility();
            }
        );
    }

    closeDropdown() {
        this.setState(
            {
                expanded: false
            },
            () => {
                this.dropdownButton.focus();
                this.unbindAccessibility();
            }
        );
    }

    toggleDropdown(e) {
        e.preventDefault();
        if (this.state.expanded) {
            this.closeDropdown();
            return;
        }

        this.openDropdown();
    }

    clickedItem(item) {
        this.props.selectEntity(this.props.scope, item);
        this.closeDropdown();
    }

    bindAccessibility() {
        document.addEventListener('mousedown', this.handleDeselection);
        Mousetrap.bind('esc', this.closeDropdown);
        Mousetrap.bind('down', this.focusNext);
        Mousetrap.bind('up', this.focusPrev);

        this.dropdownRef = this.wrapperDiv.querySelector('.geo-entity-list');

        let activeSelection = this.wrapperDiv.querySelector('.active');
        if (!activeSelection) {
            // no item has been selected yet in the dropdown so focus on the first item
            activeSelection = this.wrapperDiv.querySelector('.geo-entity-list .list-item');
        }
        activeSelection.focus();
    }

    unbindAccessibility() {
        document.removeEventListener('mousedown', this.handleDeselection);
        Mousetrap.unbind('esc', this.closeDropdown);
        Mousetrap.unbind('down', this.focusNext);
        Mousetrap.unbind('up', this.focusPrev);
    }

    focusNext(e) {
        const active = document.activeElement;
        if (active && this.dropdownRef && this.dropdownRef.contains(active)) {
            // a dropdown list item is currently selected
            e.preventDefault();
            // nth-child is 1 indexed but listindex is based on the array so it is 0 indexed
            // add 1 to the index to bring them in line
            const currentIndex = parseInt(active.getAttribute('data-listindex'), 10) + 1;
            if (currentIndex + 1 < this.props.options.length) {
                // we're not at the end of the list
                const nextItem = document.querySelector(
                    `.geo-entity-list li:nth-child(${currentIndex + 1}) .list-item`
                );
                if (nextItem) {
                    nextItem.focus();
                }
            }
        }
    }

    focusPrev(e) {
        const active = document.activeElement;
        if (active && this.dropdownRef && this.dropdownRef.contains(active)) {
            // a dropdown list item is currently selected
            e.preventDefault();
            // nth-child is 1 indexed but listindex is based on the array so it is 0 indexed
            // add 1 to the index to bring them in line
            const currentIndex = parseInt(active.getAttribute('data-listindex'), 10) + 1;
            if (currentIndex - 1 > 0) {
                // we're not at the start of the list
                const prevItem = document.querySelector(
                    `.geo-entity-list li:nth-child(${currentIndex - 1}) .list-item`
                );
                if (prevItem) {
                    prevItem.focus();
                }
            }
        }
    }

    mouseEnter() {
        if (this.props.enabled) {
            // active filter, do nothing
            return;
        }

        this.setState({
            showWarning: true
        });
    }

    mouseLeave() {
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
    }

    onChange(e) {
        const value = e.target.value;
        this.props.setSearchString(value);
    }

    render() {
        let icon = <AngleDown alt="Open dropdown" />;
        if (this.state.expanded) {
            icon = <AngleUp alt="Close dropdown" />;
        }

        let dropdown = null;
        if (this.state.expanded) {
            dropdown = (
                <EntityDropdownList
                    matchKey={this.props.matchKey}
                    scope={this.props.scope}
                    value={this.props.value}
                    options={this.props.options}
                    clickedItem={this.clickedItem} />
            );
        }

        let disabled = '';
        if (!this.props.enabled) {
            disabled = 'disabled';
        }

        return (
            <div className="geo-entity-item">
                <label
                    className={`location-label ${disabled}`}
                    htmlFor={`${this.props.scope}-button`}>
                    {this.props.title}
                </label>
                <div
                    className={`geo-entity-dropdown ${disabled}`}
                    onMouseOver={this.mouseEnter}
                    onFocus={this.mouseEnter}
                    onMouseOut={this.mouseLeave}
                    onBlur={this.mouseLeave}
                    tabIndex={-1}
                    ref={(div) => {
                        this.wrapperDiv = div;
                    }}>
                    <input
                        disabled={!this.props.enabled}
                        type="text"
                        value={this.props.searchString}
                        onChange={this.onChange.bind(this)}
                        placeholder={this.props.placeholder} />
                    {dropdown}
                </div>
            </div>
        );
    }
}

EntityDropdownAutocomplete.propTypes = propTypes;
EntityDropdownAutocomplete.defaultProps = defaultProps;
