/**
 * EntityDropdown.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import { uniqueId } from 'lodash';

import { AngleDown, AngleUp } from 'components/sharedComponents/icons/Icons';

import EntityDropdownList from './EntityDropdownList';
import EntityWarning from './EntityWarning';

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    generateWarning: PropTypes.func,
    scope: PropTypes.string,
    enabled: PropTypes.bool,
    matchKey: PropTypes.string
};

const defaultProps = {
    enabled: true,
    matchKey: 'name'
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
        this.focusNext = this.focusNext.bind(this);
        this.focusPrev = this.focusPrev.bind(this);
        this.pressedLetter = this.pressedLetter.bind(this);
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
        this.props.selectEntity(this.props.scope, item);
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

    render() {
        let icon = <AngleDown alt="Open dropdown" />;
        if (this.state.expanded) {
            icon = <AngleUp alt="Close dropdown" />;
        }

        let placeholder = '';
        let label = this.props.value.name;
        if (this.props.value.code === '') {
            placeholder = 'placeholder';
            label = this.props.placeholder;
        }

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

        return (
            <div
                className="geo-entity-item">
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
                    <button
                        id={`${this.props.scope}-button`}
                        className={`active-selection ${placeholder}`}
                        onClick={this.toggleDropdown}
                        title={label}
                        aria-label={label}
                        aria-haspopup="true"
                        aria-expanded={this.state.expanded}
                        aria-owns={`geo-dropdown-${this.props.scope}`}
                        aria-describedby={this.state.warningId}
                        disabled={!this.props.enabled || this.props.options.length === 0}
                        ref={(button) => {
                            this.dropdownButton = button;
                        }}>
                        <div className="label">
                            {label}
                        </div>
                        <div className="icon">
                            {icon}
                        </div>
                    </button>
                    {dropdown}
                </div>
                <div
                    className={`geo-warning ${hideWarning}`}
                    id={this.state.warningId}
                    aria-hidden={hideWarning === 'hide'}>
                    <EntityWarning
                        message={this.props.generateWarning(this.props.title)} />
                </div>
            </div>
        );
    }
}

EntityDropdown.propTypes = propTypes;
EntityDropdown.defaultProps = defaultProps;
