/**
 * BudgetAgencyComboFilter.jsx
 * Created by JD House 5/28/2026
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
    CheckCircle, ExclamationCircle
} from "components/sharedComponents/icons/Icons";

import ComboBox from 'components/sharedComponents/ComboBox';

const propTypes = {
    budgetFunctions: PropTypes.array,
    budgetSubfunctions: PropTypes.array,
    currentBudgetFunction: PropTypes.object,
    currentBudgetSubfunction: PropTypes.object,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    setBudgetSubfunctionList: PropTypes.func
};

const BudgetAgencyComboFilter = memo(function BudgetAgencyComboFilter({
    budgetFunctions,
    budgetSubfunctions,
    currentBudgetFunction,
    currentBudgetSubfunction,
    updateFilter,
    valid,
    setBudgetSubfunctionList,
}) {

    let icon = (
        <div className="icon valid">
            <CheckCircle />
        </div>
    );

    if (!valid) {
        icon = (
            <div className="icon invalid">
                <ExclamationCircle />
            </div>
        );
    }

    const handleBudgetSelect = (e, type) => {
        e.preventDefault();
    }

    const handleBudgetSubfunctionSelect = () => {

    }

    const handleAgencySelect = () => {

    }

    const handleSubAgencySelect = () => {

    }

    const budgetOptions = [];
    const subBudgetOptions = [];
    const agenciesOptions = [];
    const subAgenciesOptions = [];

    return (
        <div className="download-filter">
            <div className="budget-agency-heading__container">
                <h3 className="download-filter__title">
                    {icon} Select a
                    <span className="download-filter__title_em"> Budget Function and/or Agency. </span>
                    <span className='required'> (Required) </span>
                </h3>
                <p className="download-filter__subtitle">
                    The federal budget is divided into categories known as&nbsp;
                    <Link to="/download_center/custom_account_data?glossary=budget-function">
                    budget functions
                    </Link>
                    . Select Budget Function and/or Budget Sub-function to view spending by these categories.
                </p>
                <p className="download-filter__subtitle">
                    The federal budget can also be divided by government&nbsp;
                    <Link to="/download_center/custom_account_data?glossary=agency">
                    agency
                    </Link>. Select Agency to view spending distributed to a particular agency.
                </p>
                <p className="download-filter__subtitle">You must select at least one of these filters to continue.</p>
            </div>
            <div className="download-filter__content budget-function">
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={budgetOptions}
                        onSelect={handleBudgetSelect}
                        label="Budget Function"
                        placeholder="Select budget Function" />
                    <ComboBox
                        optionsArray={subBudgetOptions}
                        onSelect={handleBudgetSubfunctionSelect}
                        label="Budget Sub-Function"
                        placeholder="Select budget sub-function"
                        disabled={subBudgetOptions.length === 0} />
                </div>
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={agenciesOptions}
                        onSelect={handleAgencySelect}
                        label="Agency"
                        placeholder="Select agency" />
                    <ComboBox
                        optionsArray={subAgenciesOptions}
                        onSelect={handleSubAgencySelect}
                        label="Federal Account"
                        placeholder="Select federal account"
                        disabled={subAgenciesOptions.length === 0} />
                </div>
            </div>
        </div>
    );
});



//     const toggleBudgetFunctionPicker = (e) => {
//         e.preventDefault();
//         setShowBudgetFunctionPicker(!showBudgetFunctionPicker);
//         setShowBudgetSubfunctionPicker(false);
//     }

//     const toggleBudgetSubfunctionPicker = (e) => {
//         e.preventDefault();
//         setShowBudgetFunctionPicker(false);
//         setShowBudgetSubfunctionPicker(!showBudgetSubfunctionPicker);
//     }

//     const handleBudgetFunctionSelect = (e, budgetFunction) => {
//         e.preventDefault();
//         const target = e.target;
//         updateFilter('budgetFunction', {
//             code: target.value,
//             title: target.name
//         });

//         if (!validAgencyId) {
//             updateFilter('agency', {
//                 id: 'all',
//                 name: 'All'
//             });
//         }

//         if (target.value !== 'all') {
//             setBudgetSubfunctionList(budgetFunction);
//             updateFilter('budgetSubfunction', {
//                 code: 'all',
//                 title: 'All'
//             });
//         }
//         else {
//             setBudgetSubfunctionList('');
//         }
        
//         setShowBudgetFunctionPicker(false);
//     }

//     const handleBudgetSubfunctionSelect = (e) => {
//         e.preventDefault();
//         const target = e.target;
//         updateFilter('budgetSubfunction', {
//             code: target.value,
//             title: target.name
//         });

//         setShowBudgetFunctionPicker(false);
//     }


//         let budgetSubfunctionDisabled = 'disabled';
//         let disabled = true;
//         if (budgetSubfunctions.length > 0) {
//             budgetSubfunctionDisabled = '';
//             disabled = false;
//         }

//         // Create the budget function options
//         const budgetFunctions = budgetFunctions.map((budgetFunction) => (
//             <li
//                 className="field-item indent"
//                 key={`field-${budgetFunction.budget_function_code}`}>
//                 <button
//                     className="item-button"
//                     title={budgetFunction.budget_function_title}
//                     aria-label={budgetFunction.budget_function_title}
//                     value={budgetFunction.budget_function_code}
//                     name={budgetFunction.budget_function_title}
//                     onClick={(e) => handleBudgetFunctionSelect(e, budgetFunction.budget_function_code)}>
//                     {budgetFunction.budget_function_title}
//                 </button>
//             </li>
//         ));

//         const budgetSubfunctions = budgetSubfunctions.map((budgetSubfunction) => (
//             <li
//                 className="field-item indent"
//                 key={`field-${budgetSubfunction.budget_subfunction_code}`}>
//                 <button
//                     className="item-button"
//                     title={budgetSubfunction.budget_subfunction_title}
//                     aria-label={budgetSubfunction.budget_subfunction_title}
//                     value={budgetSubfunction.budget_subfunction_code}
//                     onClick={handleBudgetSubfunctionSelect}
//                     name={budgetSubfunction.budget_subfunction_title} >
//                     {budgetSubfunction.budget_subfunction_title} - {budgetSubfunction.budget_subfunction_code}
//                 </button>
//             </li>
//         ));

//         const currentBudgetFunctionTitle = currentBudgetFunction.title;
//         let showBudgetFunctionPicker = 'hide';
//         let budgetFunctionIcon = <Icons.AngleDown alt="Pick a budget function" />;
//         if (showBudgetFunctionPicker) {
//             showBudgetFunctionPicker = '';
//             budgetFunctionIcon = <Icons.AngleUp alt="Pick a budget function" />;
//         }

//         const currentBudgetSubfunctionTitle = currentBudgetSubfunction.title;
//         let showBudgetSubfunctionPicker = 'hide';
//         let budgetSubfunctionIcon = <Icons.AngleDown alt="Pick a budget sub-function" />;
//         if (showBudgetSubfunctionPicker) {
//             showBudgetSubfunctionPicker = '';
//             budgetSubfunctionIcon = <Icons.AngleUp alt="Pick a budget sub-function" />;
//         }

//         return (
//             <div className="download-filter width-96">
//                 <h4 className="download-filter__title">
//                     Budget Function
//                 </h4>
//                 <p className="download-filter__info">This is spending divided by a high level categorization based on purpose.</p>
//                 <div className="download-filter__container">
//                     <div className="download-filter__content">
//                         <div className="filter-picker">
//                             <label className="select-label" htmlFor="agency-select">
//                             Budget Function
//                             </label>

//                             <div className="field-picker">
//                                 <button
//                                     className="selected-button"
//                                     title={currentBudgetFunctionTitle}
//                                     aria-label={currentBudgetFunctionTitle}
//                                     onClick={this.toggleBudgetFunctionPicker}>
//                                     <div className="label">
//                                         {currentBudgetFunctionTitle}
//                                     </div>
//                                     <div className="arrow-icon">
//                                         {budgetFunctionIcon}
//                                     </div>
//                                 </button>

//                                 <div className={`field-list ${showBudgetFunctionPicker}`}>
//                                     <ul>
//                                         <li className="field-item">
//                                             <button
//                                                 className="item-button"
//                                                 title="All"
//                                                 aria-label="all"
//                                                 name="All"
//                                                 value="all"
//                                                 onClick={handleBudgetFunctionSelect}>
//                                             All
//                                             </button>
//                                         </li>
//                                         {budgetFunctions}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="download-filter__content">
//                         <div className="federal-picker">
//                             <label className="select-label" htmlFor="federal-select" tabIndex={-1}>
//                             Budget Sub-function
//                             </label>
//                             <div className="field-picker">
//                                 <button
//                                     className={`selected-button ${budgetSubfunctionDisabled}`}
//                                     title={currentBudgetSubfunctionTitle}
//                                     aria-label={currentBudgetSubfunctionTitle}
//                                     disabled={disabled}
//                                     tabIndex={disabled ? -1 : 0}
//                                     onClick={toggleBudgetSubfunctionPicker} >
//                                     <div className="label">
//                                         {currentBudgetSubfunctionTitle}
//                                     </div>
//                                     <div className="arrow-icon">
//                                         {budgetSubfunctionIcon}
//                                     </div>
//                                 </button>

//                                 <div className={`field-list ${showBudgetSubfunctionPicker}`}>
//                                     <ul>
//                                         <li className="field-item indent">
//                                             <button
//                                                 className="item-button"
//                                                 title="All"
//                                                 aria-label="all"
//                                                 name="All"
//                                                 value="all"
//                                                 onClick={handleBudgetSubfunctionSelect}>
//                                             All
//                                             </button>
//                                         </li>
//                                         {budgetSubfunctions}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

BudgetAgencyComboFilter.propTypes = propTypes;
export default BudgetAgencyComboFilter;
