/**
 * RankVisualizationTitle.jsx
 * Created by Kevin Li 1/31/17
 */

import React from 'react';
import _ from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    fieldTypes: React.PropTypes.array,
    changeSpendingBy: React.PropTypes.func,
    currentSpendingBy: React.PropTypes.string
};

const defaultProps = {
    fieldTypes: [
        {
            label: 'Budget Category',
            value: 'budget_category'
        },
        {
            label: 'Awarding Agency',
            value: 'awarding_agency'
        },
        {
            label: 'Funding Agency',
            value: 'funding_agency'
        },
        {
            label: 'Recipient',
            value: 'recipient'
        },
        {
            label: 'CFDA Programs',
            value: 'cfda'
        },
        {
            label: 'Industry Codes',
            value: 'industry_code'
        }
    ]
};

export default class RankVisualizationTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const spendingBy = this.props.fieldTypes[value].value;
        this.props.changeSpendingBy(spendingBy);

        this.setState({
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

        const currentField = _.find(this.props.fieldTypes, { value: this.props.currentSpendingBy });
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div className="rank-visualization-title">
                <h3 className="static-title">
                    Spending by:&nbsp;
                </h3>

                <div className="field-picker">
                    <button
                        className="selected-button"
                        title={currentField.label}
                        aria-label={currentField.label}
                        onClick={this.togglePicker}>
                        <span className="label">
                            {currentField.label}
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
RankVisualizationTitle.defaultProps = defaultProps;
