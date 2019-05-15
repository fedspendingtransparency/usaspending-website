/**
 * EntityDropdown.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import { uniqueId } from 'lodash';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EntityDropdownList from './EntityDropdownList';
import EntityWarning from './EntityWarning';

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    scope: PropTypes.string,
    enabled: PropTypes.bool,
    generateWarning: PropTypes.func,
    matchKey: PropTypes.string,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(["autocomplete", "button"])
};

const defaultProps = {
    enabled: true,
    matchKey: 'name',
    type: "button",
    loading: false
};

const alphabetRegex = /([a-z]|[0-9])/;

export default class EntityDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            showWarning: false,
            warningId: `location-field-warning-${uniqueId()}`
        };

        this.dropdownRef = null;

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.focusNext = this.focusNext.bind(this);
        this.focusPrev = this.focusPrev.bind(this);
        this.pressedLetter = this.pressedLetter.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
        this.handleDeselection = this.handleDeselection.bind(this);

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
    }

    handleTextInputChange(e) {
        this.props.setSearchString(e.target.value);
    }

    handleDeselection(e) {
        if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
            // clicked outside the dropdown, close it
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState({
            expanded: true
        }, () => {
            this.bindAccessibility();
        });
    }

    closeDropdown() {
        this.setState({
            expanded: false
        }, () => {
            this.dropdownButton.focus();
            this.unbindAccessibility();
        });
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
        if (this.props.type === "autocomplete") {
            this.props.setSearchString(item.name);
        }
        if (item.code !== "NA-000") {
            this.props.selectEntity(this.props.scope, item);
        }
        this.closeDropdown();
    }

    bindAccessibility() {
        document.addEventListener('mousedown', this.handleDeselection);
        document.addEventListener('keyup', this.pressedLetter);
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
        document.removeEventListener('keyup', this.pressedLetter);
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
                const nextItem = document.querySelector(`.geo-entity-list li:nth-child(${currentIndex + 1}) .list-item`);
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
                const prevItem = document.querySelector(`.geo-entity-list li:nth-child(${currentIndex - 1}) .list-item`);
                if (prevItem) {
                    prevItem.focus();
                }
            }
        }
    }

    pressedLetter(e) {
        // check if the key press is a letter
        if (alphabetRegex.test(e.key)) {
            // it is a letter
            e.preventDefault();
            // jump to the first entry
            const firstLetter = document.querySelector(`.geo-entity-list .letter-${e.key}`);
            if (firstLetter) {
                firstLetter.focus();
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

    renderDropdownType() {
        const {
            scope, enabled, type, options, value, searchString, loading
        } = this.props;
        let placeholder = '';
        let label = value.name;
        if (value.code === '') {
            placeholder = 'placeholder';
            label = this.props.placeholder;
        }

        if (type === 'autocomplete') {
            return (
                <div className="autocomplete__input">
                    <input
                        className="geo-entity-dropdown__input"
                        disabled={!enabled}
                        type="text"
                        value={searchString}
                        onClick={this.openDropdown}
                        onChange={this.handleTextInputChange}
                        placeholder={this.props.placeholder}
                        onBlur={this.closeDropdown} />
                    <div className="icon">
                        {this.state.expanded && !loading && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-up" />}
                        {this.state.expanded && loading && <FontAwesomeIcon onClick={this.toggleDropdown} icon="spinner" spin />}
                        {!this.state.expanded && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-down" />}
                    </div>
                </div>
            );
        }

        return (
            <button
                id={`${scope}-button`}
                className={`active-selection ${placeholder}`}
                onClick={this.toggleDropdown}
                title={label}
                aria-label={label}
                aria-haspopup="true"
                aria-expanded={this.state.expanded}
                aria-owns={`geo-dropdown-${scope}`}
                aria-describedby={this.state.warningId}
                disabled={!enabled || options.length === 0}
                ref={(button) => {
                    this.dropdownButton = button;
                }}>
                <div className="label">
                    {label}
                </div>
                <div className="icon">
                    {this.state.expanded && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-up" />}
                    {!this.state.expanded && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-down" />}
                </div>
            </button>
        );
    }

    render() {
        let dropdown = null;
        if (this.state.expanded) {
            dropdown = (<EntityDropdownList
                matchKey={this.props.matchKey}
                scope={this.props.scope}
                value={this.props.value}
                options={this.props.options}
                clickedItem={this.clickedItem} />);
        }

        let disabled = '';
        if (!this.props.enabled) {
            disabled = 'disabled';
        }

        let hideWarning = 'hide';
        if (!this.props.enabled && this.state.showWarning) {
            hideWarning = '';
        }
        const {
            type, scope, generateWarning, title
        } = this.props;

        const inputContainer = this.renderDropdownType();
        const autocompleteClass = (type === 'autocomplete') ? 'geo-entity-dropdown_autocomplete' : null;
        return (
            <div
                className="geo-entity-item">
                <label
                    className={`location-label ${disabled}`}
                    htmlFor={`${scope}-${type}`}>
                    {this.props.title}
                </label>
                <div
                    id={`${scope}-${type}`}
                    className={`geo-entity-dropdown ${disabled} ${autocompleteClass}`}
                    onMouseOver={this.mouseEnter}
                    onFocus={this.mouseEnter}
                    onMouseOut={this.mouseLeave}
                    onBlur={this.mouseLeave}
                    tabIndex={-1}
                    ref={(div) => {
                        this.wrapperDiv = div;
                    }}>
                    {inputContainer}
                    {dropdown}
                </div>
                <div
                    className={`geo-warning ${hideWarning}`}
                    id={this.state.warningId}
                    aria-hidden={hideWarning === 'hide'}>
                    <EntityWarning
                        message={generateWarning(title)} />
                </div>
            </div>
        );
    }
}

EntityDropdown.propTypes = propTypes;
EntityDropdown.defaultProps = defaultProps;
