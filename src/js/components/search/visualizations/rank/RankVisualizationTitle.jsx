/**
 * RankVisualizationTitle.jsx
 * Created by Kevin Li 1/31/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { categoryNames } from 'dataMapping/search/spendingByCategory';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fieldTypes: PropTypes.array,
    changeSpendingBy: PropTypes.func,
    currentSpendingBy: PropTypes.string,
    subaward: PropTypes.bool,
    showPicker: PropTypes.bool,
    togglePicker: PropTypes.func,
    setPickerState: PropTypes.func
};

export default class RankVisualizationTitle extends React.Component {
    constructor(props) {
        super(props);
        this.clickedItem = this.clickedItem.bind(this);
    }

    clickedItem(e) {
        const value = e.target.value;
        this.props.changeSpendingBy(value);

        this.props.setPickerState(false);
    }

    render() {
        const fields = this.props.fieldTypes.map((field) => (
            <li
                className="field-item"
                key={`field-${field}`}>
                <button
                    className="item-button"
                    title={categoryNames[field]}
                    aria-label={categoryNames[field]}
                    value={field}
                    onClick={this.clickedItem}>
                    {categoryNames[field]}
                </button>
            </li>
        ));

        const currentField = this.props.currentSpendingBy;
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.props.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div
                className="rank-visualization-title">
                <h2 className="static-title">
                    {this.props.subaward ? `Sub-Award Spending by: ` : `Spending by `}
                </h2>

                <div
                    className="field-picker">
                    <button
                        className="selected-button"
                        title={categoryNames[currentField]}
                        aria-label={categoryNames[currentField]}
                        onClick={this.props.togglePicker}>
                        <span className="label">
                            {categoryNames[currentField]}
                        </span>
                        <span className="arrow-icon">
                            {icon}
                        </span>
                    </button>

                    <div
                        className={`field-list ${showPicker}`}
                        style={{
                            height: (this.props.fieldTypes.length * 55) + 1
                        }}>
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
