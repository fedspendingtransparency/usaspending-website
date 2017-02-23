/**
 * RankVisualizationTitle.jsx
 * Created by Kevin Li 1/31/17
 */

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fieldTypes: React.PropTypes.array
};

const defaultProps = {
    fieldTypes: [
        {
            label: 'Awarding Agency',
            value: 'awarding_agency'
        }
    ]
};

export default class RankVisualizationTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            showPicker: false
        };

        this.togglePicker = this.togglePicker.bind(this);
        this.clickedItem = this.clickedItem.bind(this);

        this.keyboardBindings = [];
    }

    togglePicker() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }

    clickedItem(e) {
        const value = e.target.value;

        this.setState({
            selectedIndex: value,
            showPicker: false
        });
    }

    render() {
        const fields = this.props.fieldTypes.map((field, index) => (
            <li
                className="field-item"
                key={`field-${field.value}`}>
                <button
                    className="item-button"
                    title={field.label}
                    aria-label={field.label}
                    value={index}
                    onClick={this.clickedItem}>
                    {field.label}
                </button>
            </li>
        ));

        const currentField = this.props.fieldTypes[this.state.selectedIndex].label;
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div className="rank-visualization-title">
                <h3 className="static-title">
                    Spending By:&nbsp;
                </h3>

                <div className="field-picker">
                    <button
                        className="selected-button"
                        title={currentField}
                        aria-label={currentField}
                        onClick={this.togglePicker}>
                        <span className="label">
                            {currentField}
                        </span>
                        <span className="arrow-icon">
                            {icon}
                        </span>
                    </button>

                    <div className={`field-list ${showPicker}`}>
                        <ul>
                            {fields}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

RankVisualizationTitle.propTypes = propTypes;
RankVisualizationTitle.defaultProps = defaultProps;
