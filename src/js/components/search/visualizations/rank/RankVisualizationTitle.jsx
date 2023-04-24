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
    subaward: PropTypes.bool
};

export default class RankVisualizationTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicker: false
        };

        this.togglePicker = this.togglePicker.bind(this);
        this.clickedItem = this.clickedItem.bind(this);
    }

    togglePicker() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }

    clickedItem(e) {
        const prevValue = this.props.currentSpendingBy;
        const value = e.target.value;

        if (value !== '') {
            this.props.changeSpendingBy(value);
        }
        else {
            this.props.changeSpendingBy(prevValue);
        }

        this.setState({
            showPicker: false
        });
    }

    render() {
        const fields = this.props.fieldTypes.map((field) => (
            <li
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                className="field-item"
                key={`field-${field}`}>
                <button
                    tabIndex={0}
                    className="item-button"
                    title={categoryNames[field]}
                    aria-label={categoryNames[field]}
                    value={field}
                    onMouseDown={this.clickedItem}
                    onKeyDown={(e) => {
                        console.debug("EVENT 1: ", e);
                        if (e.key === 'Enter') {
                            this.clickedItem(e);
                        }
                    }}>
                    {categoryNames[field]}
                </button>
            </li>
        ));

        const currentField = this.props.currentSpendingBy;
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div className="rank-visualization-title">
                <h2 className="static-title">
                    {this.props.subaward ? `Sub-Award Spending by: ` : `Spending by `}
                </h2>

                <div className="field-picker">
                    <button
                        tabIndex="0"
                        className="selected-button"
                        title={categoryNames[currentField]}
                        aria-label={categoryNames[currentField]}
                        onMouseDown={this.togglePicker}
                        onKeyDown={(e) => {
                            e.preventDefault();
                            console.debug("EVENT 2: ", e);
                            if (e.key === "Enter") {
                                this.togglePicker();
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value === '') {
                                this.togglePicker();
                            }

                            this.clickedItem(e);
                        }}>
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
                        <ul
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                            tabIndex={0}>
                            {fields}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

RankVisualizationTitle.propTypes = propTypes;
