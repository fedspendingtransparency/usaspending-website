/**
 * TypeFilter.jsx
 * Created by Lizzie Salita 12/15/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const awardTypes = [
    {
        name: 'contracts',
        display: 'Contracts'
    },
    {
        name: 'assistance',
        display: 'Financial Assistance'
    }
];

const propTypes = {
    currentType: PropTypes.string,
    updateFilter: PropTypes.func,
    formWidth: PropTypes.number,
    windowWidth: PropTypes.number
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
        this.props.updateFilter('type', {
            name: target.value,
            display: target.name
        });

        this.setState({
            showTypePicker: false
        });
    }

    render() {
    // Create the type options
        const types = awardTypes.map((type) => (
            <li
                className="field-item"
                key={`field-${type.name}`}>
                <button
                    className="item-button"
                    title={type.display}
                    aria-label={type.display}
                    name={type.display}
                    value={type.name}
                    onClick={this.handleTypeSelect}>
                    {type.display}
                </button>
            </li>
        ));
        let showTypePicker = 'hide';
        let typeIcon = <Icons.AngleDown alt="Pick an award type" />;
        if (this.state.showTypePicker) {
            showTypePicker = '';
            typeIcon = <Icons.AngleUp alt="Pick an award type" />;
        }

        let dropDownWidth = this.props.formWidth - 30;
        if (this.props.windowWidth >= 992) {
            dropDownWidth = (this.props.formWidth * 0.25) - 30;
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
                    <div
                        className={`field-list ${showTypePicker}`}
                        style={{ width: dropDownWidth }}>
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
