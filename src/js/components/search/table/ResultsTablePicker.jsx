/**
 * ResultsTablePicker.jsx
 * Created by Lizzie Salita 03/28/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import ResultsTablePickerOption from './ResultsTablePickerOption';

const propTypes = {
    types: PropTypes.array,
    active: PropTypes.string,
    switchTab: PropTypes.func
};

export default class ResultsTablePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicker: false
        };

        this.togglePicker = this.togglePicker.bind(this);
    }

    togglePicker() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }

    render() {
        const options = this.props.types.map((type) => (
            <ResultsTablePickerOption
                {...type}
                active={this.props.active === type.internal}
                switchTab={this.props.switchTab}
                key={`table-type-item-${type.internal}`}
                togglePicker={this.togglePicker} />
        ));

        const currentField = this.props.active;
        let label = '';
        for (let i = 0; i < this.props.types.length; i++) {
            if (this.props.types[i].internal === currentField) {
                label = this.props.types[i].label;
            }
        }
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div className="field-picker">
                <button
                    className="selected-button"
                    title={currentField}
                    aria-label={label}
                    onClick={this.togglePicker}>
                    <span className="label">
                        {label}
                    </span>
                    <span className="arrow-icon">
                        {icon}
                    </span>
                </button>

                <div className={`field-list ${showPicker}`}>
                    <ul>
                        {options}
                    </ul>
                </div>
            </div>
        );
    }
}

ResultsTablePicker.propTypes = propTypes;
