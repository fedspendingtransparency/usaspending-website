/**
 * BudgetFunctionFilter.jsx
 * Created by David Trinh 9/7/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    budgetFunctions: PropTypes.array,
    budgetSubfunctions: PropTypes.array,
    currentBudgetFunction: PropTypes.object,
    currentBudgetSubfunction: PropTypes.object,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    setBudgetSubfunctionList: PropTypes.func,
    validAgencyId: PropTypes.bool
};

export default class BudgetFunctionFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBudgetFunctionPicker: false,
            showBudgetSubfunctionPicker: false
        };

        this.toggleBudgetFunctionPicker = this.toggleBudgetFunctionPicker.bind(this);
        this.toggleBudgetSubfunctionPicker = this.toggleBudgetSubfunctionPicker.bind(this);
        this.handleBudgetFunctionSelect = this.handleBudgetFunctionSelect.bind(this);
        this.handleBudgetSubfunctionSelect = this.handleBudgetSubfunctionSelect.bind(this);
    }

    toggleBudgetFunctionPicker(e) {
        e.preventDefault();
        this.setState({
            showBudgetFunctionPicker: !this.state.showBudgetFunctionPicker,
            showBudgetSubfunctionPicker: false
        });
    }

    toggleBudgetSubfunctionPicker(e) {
        e.preventDefault();
        this.setState({
            showBudgetSubfunctionPicker: !this.state.showBudgetSubfunctionPicker,
            showBudgetFunctionPicker: false
        });
    }

    handleBudgetFunctionSelect(e, budgetFunction) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('budgetFunction', {
            code: target.value,
            title: target.name
        });

        if (!this.props.validAgencyId) {
            this.props.updateFilter('agency', {
                id: 'all',
                name: 'All'
            });
        }

        if (target.value !== 'all') {
            this.props.setBudgetSubfunctionList(budgetFunction);
            this.props.updateFilter('budgetSubfunction', {
                code: 'all',
                title: 'All'
            });
        }
        else {
            this.props.setBudgetSubfunctionList('');
        }

        this.setState({
            showBudgetFunctionPicker: false
        });
    }

    handleBudgetSubfunctionSelect(e) {
        e.preventDefault();
        const target = e.target;
        this.props.updateFilter('budgetSubfunction', {
            code: target.value,
            title: target.name
        });

        this.setState({
            showBudgetSubfunctionPicker: false
        });
    }

    render() {
        let budgetSubfunctionDisabled = 'disabled';
        let disabled = true;
        if (this.props.budgetSubfunctions.length > 0) {
            budgetSubfunctionDisabled = '';
            disabled = false;
        }

        // Create the budget function options
        const budgetFunctions = this.props.budgetFunctions.map((budgetFunction) => (
            <li
                className="field-item indent"
                key={`field-${budgetFunction.budget_function_code}`}>
                <button
                    className="item-button"
                    title={budgetFunction.budget_function_title}
                    aria-label={budgetFunction.budget_function_title}
                    value={budgetFunction.budget_function_code}
                    name={budgetFunction.budget_function_title}
                    onClick={(e) => this.handleBudgetFunctionSelect(e, budgetFunction.budget_function_code)}>
                    {budgetFunction.budget_function_title}
                </button>
            </li>
        ));

        const budgetSubfunctions = this.props.budgetSubfunctions.map((budgetSubfunction) => (
            <li
                className="field-item indent"
                key={`field-${budgetSubfunction.budget_subfunction_code}`}>
                <button
                    className="item-button"
                    title={budgetSubfunction.budget_subfunction_title}
                    aria-label={budgetSubfunction.budget_subfunction_title}
                    value={budgetSubfunction.budget_subfunction_code}
                    onClick={this.handleBudgetSubfunctionSelect}
                    name={budgetSubfunction.budget_subfunction_title} >
                    {budgetSubfunction.budget_subfunction_title} - {budgetSubfunction.budget_subfunction_code}
                </button>
            </li>
        ));

        const currentBudgetFunctionTitle = this.props.currentBudgetFunction.title;
        let showBudgetFunctionPicker = 'hide';
        let budgetFunctionIcon = <Icons.AngleDown alt="Pick a budget function" />;
        if (this.state.showBudgetFunctionPicker) {
            showBudgetFunctionPicker = '';
            budgetFunctionIcon = <Icons.AngleUp alt="Pick a budget function" />;
        }

        const currentBudgetSubfunctionTitle = this.props.currentBudgetSubfunction.title;
        let showBudgetSubfunctionPicker = 'hide';
        let budgetSubfunctionIcon = <Icons.AngleDown alt="Pick a budget sub-function" />;
        if (this.state.showBudgetSubfunctionPicker) {
            showBudgetSubfunctionPicker = '';
            budgetSubfunctionIcon = <Icons.AngleUp alt="Pick a budget sub-function" />;
        }

        return (
            <div className="download-filter">
                <h4 className="download-filter__title">
                    Budget Function
                </h4>
                <p className="download-filter__info">This is spending divided by a high level categorization based on purpose.</p>
                <div className="download-filter__container">
                    <div className="download-filter__content">
                        <div className="filter-picker">
                            <label className="select-label" htmlFor="agency-select">
                            Budget Function
                            </label>

                            <div className="field-picker">
                                <button
                                    className="selected-button"
                                    title={currentBudgetFunctionTitle}
                                    aria-label={currentBudgetFunctionTitle}
                                    onClick={this.toggleBudgetFunctionPicker}>
                                    <div className="label">
                                        {currentBudgetFunctionTitle}
                                    </div>
                                    <div className="arrow-icon">
                                        {budgetFunctionIcon}
                                    </div>
                                </button>

                                <div className={`field-list ${showBudgetFunctionPicker}`}>
                                    <ul>
                                        <li className="field-item">
                                            <button
                                                className="item-button"
                                                title="All"
                                                aria-label="all"
                                                name="All"
                                                value="all"
                                                onClick={this.handleBudgetFunctionSelect}>
                                            All
                                            </button>
                                        </li>
                                        {budgetFunctions}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="download-filter__content">
                        <div className="federal-picker">
                            <label className={`select-label ${budgetSubfunctionDisabled}`} htmlFor="federal-select">
                            Budget Sub-function
                            </label>
                            <div className="field-picker">
                                <button
                                    className={`selected-button ${budgetSubfunctionDisabled}`}
                                    title={currentBudgetSubfunctionTitle}
                                    aria-label={currentBudgetSubfunctionTitle}
                                    disabled={disabled}
                                    onClick={this.toggleBudgetSubfunctionPicker} >
                                    <div className="label">
                                        {currentBudgetSubfunctionTitle}
                                    </div>
                                    <div className="arrow-icon">
                                        {budgetSubfunctionIcon}
                                    </div>
                                </button>

                                <div className={`field-list ${showBudgetSubfunctionPicker}`}>
                                    <ul>
                                        <li className="field-item indent">
                                            <button
                                                className="item-button"
                                                title="All"
                                                aria-label="all"
                                                name="All"
                                                value="all"
                                                onClick={this.handleBudgetSubfunctionSelect}>
                                            All
                                            </button>
                                        </li>
                                        {budgetSubfunctions}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BudgetFunctionFilter.propTypes = propTypes;
