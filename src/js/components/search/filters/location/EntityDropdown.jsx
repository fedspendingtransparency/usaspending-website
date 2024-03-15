/**
 * EntityDropdown.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId, isEqual } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TooltipWrapper } from "data-transparency-ui";
import { defaultLocationValues }
    from "containers/search/filters/location/LocationPickerContainer";

import EntityDropdownList from './EntityDropdownList';
import EntityWarning from './EntityWarning';
import { EntityDropdownAutocomplete } from './EntityDropdownAutocomplete';
import { CDTooltip } from "../tooltips/AdvancedSearchTooltip";

const propTypes = {
    value: PropTypes.object,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.array,
    selectEntity: PropTypes.func,
    field: PropTypes.string,
    enabled: PropTypes.bool,
    generateDisclaimer: PropTypes.func,
    matchKey: PropTypes.string,
    setSearchString: PropTypes.func,
    searchString: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(["autocomplete", "button"]),
    showDisclaimer: PropTypes.bool
};

const defaultProps = {
    enabled: true,
    matchKey: 'name',
    type: "button",
    loading: false,
    showDisclaimer: false
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

        this.getSelectedItemIdentifier = this.getSelectedItemIdentifier.bind(this);

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.resetSelectedItem = this.resetSelectedItem.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.type === 'autocomplete' && (!isEqual(prevProps.options, this.props.options))) {
            this.openDropdown();
        }
    }

    getSelectedItemIdentifier() {
        return this.props.value[this.props.matchKey];
    }

    resetSelectedItem() {
        this.props.selectEntity(this.props.field, defaultLocationValues[this.props.field]);
    }

    handleTextInputChange(e) {
        this.props.setSearchString(e.target.value);
    }

    handleOnKeyDown(e) {
        if (e.key === 'Backspace') { // backspace
            this.resetSelectedItem();
        }
    }

    handleOnKeyUp(e) {
        if (e.key === "Enter") {
            this.setState({
                expanded: true
            });
            this.handleTextInputChange(e);
        }
    }

    handleDeselection(e) {
        if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
            // clicked outside the dropdown, close it
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState({ expanded: (this.props.options.length > 0) }, () => {
            this.bindAccessibility();
        });
    }

    closeDropdown(e) {
        if (e?.key === 'Escape' || e?.key === 'Enter' || e?.type === 'mouseup') {
            this.setState({
                expanded: false
            }, () => {
                if (this.dropdown) {
                    this.dropdown.focus();
                }
                this.unbindAccessibility();
            });
        }
    }

    toggleDropdown(e) {
        e.preventDefault();
        if (this.state.expanded) {
            this.closeDropdown();
            return;
        }

        if (this.props.enabled) this.openDropdown();
    }

    clickedItem(item) {
        if (this.props.type === "autocomplete") {
            // just update the search string, don't perform search
            this.props.setSearchString(item.name, false);
        }
        if (this.props.title.includes("Original Congressional")) {
            this.props.selectEntity("district_original", item);
        }
        else if (this.props.title.includes("Current Congressional")) {
            this.props.selectEntity("district_current", item);
        }
        else if (item.code !== "NA-000") {
            this.props.selectEntity(this.props.field, item);
        }
        this.closeDropdown();
    }

    bindAccessibility() {
        document.addEventListener('mousedown', this.handleDeselection);
        document.addEventListener('keyup', this.pressedLetter);

        document.addEventListener('keyup', this.closeDropdown);
        document.addEventListener('mouseup', this.closeDropdown);
        document.addEventListener('keyup', this.focusNext);
        document.addEventListener('keyup', this.focusPrev);

        this.dropdownRef = this.wrapperDiv.querySelector('.geo-entity-list');

        let activeSelection = this.wrapperDiv.querySelector('.active');
        if (!activeSelection) {
            // no item has been selected yet in the dropdown so focus on the first item
            activeSelection = this.wrapperDiv.querySelector('.geo-entity-list .list-item');
        }
        if (this.props.type === "button") {
            // we don't want to move focus to the dropdown if we're using autocomplete
            activeSelection?.focus();
        }
    }

    unbindAccessibility() {
        document.removeEventListener('mousedown', this.handleDeselection);
        document.removeEventListener('keyup', this.pressedLetter);

        document.removeEventListener('keyup', this.closeDropdown);
        document.removeEventListener('mouseup', this.closeDropdown);
        document.removeEventListener('keyup', this.focusNext);
        document.removeEventListener('keyup', this.focusPrev);
    }

    focusNext(e) {
        const active = document.activeElement;
        if (e.key === 'ArrowDown' && active && this.dropdownRef && this.dropdownRef.contains(active)) {
            // a dropdown list item is currently selected
            e.preventDefault();
            // nth-child is 1 indexed but listindex is based on the array so it is 0 indexed
            // add 1 to the index to bring them in line
            const currentIndex = parseInt(active.getAttribute('data-listindex'), 10) + 1;
            if (currentIndex + 1 <= this.props.options.length) {
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
        if (e.key === 'ArrowUp' && active && this.dropdownRef && this.dropdownRef.contains(active)) {
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
    // check if the key press is a letter (only for non-autocomplete dropdowns)
        if (this.props.type === "button" && (alphabetRegex.test(e.key))) {
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
        const shouldShowWarning = (!this.props.enabled || this.props.showDisclaimer);
        // If field is disabled, show the warning as to why if its not already showing
        if (shouldShowWarning && !this.state.showWarning) {
            this.setState({
                showWarning: true
            });
        }
    }

    mouseLeave() {
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
    }

    render() {
        const {
            type, field, generateDisclaimer, title, enabled, options, value, searchString, loading, showDisclaimer
        } = this.props;

        const isAutocomplete = (type === 'autocomplete');
        const autocompleteClass = isAutocomplete ? 'geo-entity-dropdown_autocomplete' : '';
        const warningField = title.split(" (")[0];

        let dropdown = null;
        let placeholder = '';
        let label = value.name;
        let disabled = '';
        let hideWarning = 'hide';

        if (this.state.expanded && !loading) {
            const selectedItem = this.getSelectedItemIdentifier();
            dropdown = (<EntityDropdownList
                matchKey={this.props.matchKey}
                scope={this.props.field}
                selectedItem={selectedItem}
                options={this.props.options}
                clickedItem={this.clickedItem} />);
        }

        if (value.code === '') {
            placeholder = 'placeholder';
            label = this.props.placeholder;
        }
        if (!this.props.enabled) {
            disabled = 'disabled';
        }

        if (this.state.showWarning) {
            // even if this is enabled, still showWarning b/c we're also showingDisclaimer now
            hideWarning = '';
        }
        const uniqueIdentifier = uniqueId();
        return (
            <div
                className="geo-entity-item">
                <div className="location-label__with-tt">
                    <label
                        className={`location-label ${disabled}`}
                        htmlFor={`${field}-${type}-${uniqueIdentifier}`}>
                        {this.props.title}
                    </label>
                    {this.props.title === 'CONGRESSIONAL DISTRICT (US ONLY)' ?
                        <div>
                            <TooltipWrapper
                                className="advanced-search__cd-tooltip"
                                icon="info"
                                tooltipComponent={<CDTooltip />} />
                        </div>
                        : ''}
                </div>
                <div
                    id={`${field}-${type}-${uniqueIdentifier}`}
                    className={`geo-entity-dropdown ${disabled} ${autocompleteClass}`}
                    onMouseOver={this.mouseEnter}
                    onFocus={this.mouseEnter}
                    onMouseOut={this.mouseLeave}
                    onBlur={this.mouseLeave}
                    tabIndex={-1}
                    ref={(div) => {
                        this.wrapperDiv = div;
                    }}>
                    {!isAutocomplete &&
                            <button
                                id={`${field}-button`}
                                className={`active-selection ${placeholder}`}
                                onClick={this.toggleDropdown}
                                title={label}
                                aria-label={label}
                                aria-haspopup="true"
                                aria-expanded={this.state.expanded}
                                aria-owns={`geo-dropdown-${field}`}
                                aria-describedby={this.state.warningId}
                                disabled={!enabled || options.length === 0}
                                ref={(dd) => {
                                    this.dropdown = dd;
                                }}>
                                <div className="label">
                                    {label}
                                </div>
                                <div className="icon">
                                    {this.state.expanded && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-up" />}
                                    {!this.state.expanded && <FontAwesomeIcon onClick={this.toggleDropdown} icon="chevron-down" />}
                                </div>
                            </button>
                    }
                    {isAutocomplete &&
                            <EntityDropdownAutocomplete
                                searchString={searchString}
                                enabled={enabled}
                                openDropdown={this.openDropdown}
                                handleOnKeyDown={this.handleOnKeyDown}
                                handleOnKeyUp={this.handleOnKeyUp}
                                handleTextInputChange={this.handleTextInputChange}
                                toggleDropdown={this.toggleDropdown}
                                placeholder={this.props.placeholder}
                                showDisclaimer={showDisclaimer}
                                context={this} // used to create dropdown ref
                                loading={loading} />
                    }
                    {dropdown}
                </div>
                {generateDisclaimer &&
                <div
                    className={`geo-warning ${hideWarning}`}
                    id={this.state.warningId}
                    aria-hidden={hideWarning === 'hide'}>
                    <EntityWarning
                        message={generateDisclaimer(warningField)} />
                </div>}
            </div>
        );
    }
}

EntityDropdown.propTypes = propTypes;
EntityDropdown.defaultProps = defaultProps;
