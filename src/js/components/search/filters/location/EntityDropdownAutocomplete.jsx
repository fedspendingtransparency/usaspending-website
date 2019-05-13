/**
 * EntityDropdownAutocomplete.jsx
 * Created by Lizzie Salita 5/6/19
 */

import React from 'react';
import PropTypes from 'prop-types';

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
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
        this.handleDeselection = this.handleDeselection.bind(this);

        this.showWarning = this.showWarning.bind(this);
        this.hideWarning = this.hideWarning.bind(this);
    }

    onChange(e) {
        const value = e.target.value;
        this.props.setSearchString(value);
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
        });
    }

    closeDropdown() {
        this.setState({
            expanded: false
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
        this.props.setSearchString(item.name);
        this.props.selectEntity(this.props.scope, item);
        this.closeDropdown();
    }

    showWarning() {
        if (this.props.enabled) {
            // active filter, do nothing
            return;
        }

        this.setState({
            showWarning: true
        });
    }

    hideWarning() {
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
    }

    render() {
        let dropdown = null;
        if (this.state.expanded) {
            dropdown = (
                <EntityDropdownList
                    showNameAndCode
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
                    htmlFor={`${this.props.scope}-autocomplete`}>
                    {this.props.title}
                    <div
                        id={`${this.props.scope}-autocomplete`}
                        className={`geo-entity-dropdown geo-entity-dropdown_autocomplete ${disabled}`}
                        onMouseOver={this.showWarning}
                        onFocus={this.showWarning}
                        onMouseOut={this.hideWarning}
                        onBlur={this.hideWarning}
                        tabIndex={-1}
                        ref={(div) => {
                            this.wrapperDiv = div;
                        }}>
                        <input
                            className="geo-entity-dropdown__input"
                            disabled={!this.props.enabled}
                            type="text"
                            value={this.props.searchString}
                            onClick={this.openDropdown}
                            onChange={this.onChange}
                            placeholder={this.props.placeholder}
                            onBlur={this.closeDropdown} />
                        {dropdown}
                    </div>
                </label>
            </div>
        );
    }
}

EntityDropdownAutocomplete.propTypes = propTypes;
EntityDropdownAutocomplete.defaultProps = defaultProps;
