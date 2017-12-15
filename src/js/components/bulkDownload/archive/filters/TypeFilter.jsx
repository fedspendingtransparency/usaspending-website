/**
 * TypeFilter.jsx
 * Created by Lizzie Salita 12/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const awardTypes = ['contracts', 'assistance'];

const propTypes = {
    currentType: PropTypes.string,
    updateFilter: PropTypes.func
};

export default class ArchiveTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTypePicker: false
        };

        this.toggleTypePicker = this.toggleTypePicker.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
    }

    toggleTypePicker(e) {
        e.preventDefault();
        this.setState({
            showTypePicker: !this.state.showTypePicker
        });
    }

    handleTypeSelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('type', target.value);

        this.setState({
            showTypePicker: false
        });
    }

    render() {
        // Create the type options
        const types = awardTypes.map((type) => (
            <li
                className="field-item"
                key={`field-${type}`}>
                <button
                    className="item-button"
                    title={type}
                    aria-label={type}
                    value={type}
                    onClick={this.handleTypeSelect}>
                    {type}
                </button>
            </li>
        ));
        let showTypePicker = 'hide';
        let typeIcon = <Icons.AngleDown alt="Pick an award type" />;
        if (this.state.showTypePicker) {
            showTypePicker = '';
            typeIcon = <Icons.AngleUp alt="Pick an award type" />;
        }
        return (
            <div className="filter-picker type-picker">
                <label className="select-label" htmlFor="type-select">
                    Award Type
                </label>
                <div className="field-picker type-select">
                    <button
                        className="selected-button"
                        title={this.props.currentType}
                        aria-label={this.props.currentType}
                        onClick={this.toggleTypePicker}>
                        <div className="label">
                            {this.props.currentType}
                            <span className="arrow-icon">
                                {typeIcon}
                            </span>
                        </div>
                    </button>
                    <div className={`field-list ${showTypePicker}`}>
                        <ul>
                            {types}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ArchiveTypeFilter.propTypes = propTypes;
