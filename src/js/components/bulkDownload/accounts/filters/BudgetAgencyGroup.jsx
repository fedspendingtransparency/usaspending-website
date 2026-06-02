/**
 * BudgetAgencyGroup.jsx
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
    agencies: PropTypes.array,
    federalAccounts: PropTypes.array,
    setBudgetSubfunctionList: PropTypes.func,
    setFederalAccountList: PropTypes.func,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool,
    accounts: PropTypes.object
};

// eslint-disable-next-line prefer-arrow-callback
const BudgetAgencyGroup = memo(function BudgetAgencyGroup({
    budgetFunctions,
    budgetSubfunctions,
    agencies,
    federalAccounts,
    setBudgetSubfunctionList,
    setFederalAccountList,
    updateFilter,
    valid,
    accounts
}) {

    const [hasSelectedBudgetFunction, setHasSelectedBudgetFunction] = useState(false);
    const [hasSelectedAgency, setHasSelectedAgency] = useState(false);
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

    // Budget Functions
    const budgetOptions = budgetFunctions.map((option) => (
        { 
            text: option.budget_function_title,
            id: option.budget_function_code,
            value: option.budget_function_code
        }
    ));

    // add default to the beginning of options array.
    budgetOptions.unshift({ text: 'All', id: 'all', value: 'all'});
     
    const handleBudgetSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('budgetFunction', {
            code: target.value,
            title: target.name
        });
        setHasSelectedBudgetFunction(true);

        if (accounts.agency.id === ''){
            updateFilter('agency', {
                id: 'all',
                name: 'All'
            });
        }
        
        if (target.value === 'all') {
            setBudgetSubfunctionList('');
        }
        else {
            setBudgetSubfunctionList(target.value);
            updateFilter('budgetSubfunction', {
                code: 'all',
                title: 'All'
            });
        }
    }
    

    // Sub Budget Functions
    const subBudgetOptions = budgetSubfunctions.map((option) => (
        {
            text: `${option.budget_subfunction_title} - ${option.budget_subfunction_code}`,
            id: option.budget_subfunction_code,
            value: option.budget_subfunction_code
        }
    ));
    
    // add default to the beginning of options array.
    subBudgetOptions.unshift({ text: 'All', id: 'all', value: 'all'});
    
    const handleBudgetSubfunctionSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('budgetSubfunction', {
            code: target.value,
            title: target.name
        });
    }
    

    // Agency Options
    let agenciesArray = [{ name: 'All', toptier_agency_id: 'all', toptier_code: 'all' }];

    Object.entries(agencies).forEach(([key, value]) => {
        const title = {
            name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
            toptier_agency_id: key,
            toptier_code: null
        };
        agenciesArray = [...agenciesArray, title, ...value];
    });

    const agenciesOptions = agenciesArray.map(({
        name,
        toptier_agency_id: id,
        toptier_code: code
    }) => (
        { text: name, value: code ? id.toString() : `${id}-disabled`, fedCode: code }
    ));

    const handleAgencySelect = (e) => {
        e.preventDefault();
        const target = e.target;
        const fedCode = agenciesOptions
            .find((agency) => agency.value === target.value)
            .fedCode;

        updateFilter('agency', {
            id: target.value,
            name: target.name
        });
        setHasSelectedAgency(true);

        if (accounts.budgetFunction.code === '') {
            updateFilter('budgetFunction', {
                code: 'all',
                title: 'All'
            })
        }

        if (target.value === 'all') {
            setFederalAccountList('');
        }
        else {
            setFederalAccountList(fedCode);
        }
    };


    // Federal Accout options
    const federalAccountOptions = federalAccounts.map(({
        account_name: name,
        account_number: number,
        account_id: id
    }) => (
        {
            text: `${number} - ${name}`,
            id: id,
            value: `${id.toString()}`
        }
    ));

    // add default to the beginning of options array.
    federalAccountOptions.unshift({ text: 'All', id: 'all', value: 'all'});

    const handleFederalAccountSelect = (e) => {
        e.preventDefault();
        const target = e.target;
        updateFilter('federalAccount', {
            id: target.value,
            name: target.name
        });
    };

    const handleClear = (type) => {
        switch (type) {
            case "budgetFunction": 
                setBudgetSubfunctionList('')
                updateFilter('budgetFunction', {
                    code: '',
                    title: 'Select a Budget Function'
                });
                updateFilter('budgetSubfunction', {
                    code: '',
                    title: 'Select a Budget Sub-Function'
                });

                if (!hasSelectedAgency) {
                    // Agency was set by default with budgetFunction click
                    // clear Agency too.
                    updateFilter('agency', {
                        id: '',
                        name: 'Select an Agency'
                    });
                }  
                break;

            case "budgetSubfunction":
                updateFilter('budgetSubfunction', {
                    code: '',
                    title: 'Select a Budget Sub-Function'
                });
                break;

            case "agency":
                setFederalAccountList('');
                updateFilter('agency', {
                    id: '',
                    name: 'Select an Agency'
                });
                updateFilter('federalAccount', {
                    id: '',
                    name: 'Select a Federal Account'
                });
                if (!hasSelectedBudgetFunction) {
                    // Budget Function was set by default with agency click
                    // clear Budget Function too.
                    updateFilter('budgetFunction', {
                        code: '',
                        title: 'Select a Budget Function'
                    });
                } 
                break;
                
            case "federalAccount":
                updateFilter('federalAccount', {
                    id: '',
                    name: 'Select a Federal Account'
                });
                break;

            default:
                return null;
        }
    }

    return (
        <div className="download-filter">
            <div className="budget-agency-heading__container">
                <h3 className="download-filter__title">
                    {icon} Select a&nbsp;
                    <span className="download-filter__title_em">
                        Budget Function and/or Agency.&nbsp;
                    </span>
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
                <p className="download-filter__subtitle">
                    You must select at least one of these filters to continue.
                </p>
            </div>
            <div className="download-filter__content budget-function">
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={budgetOptions}
                        onSelect={handleBudgetSelect}
                        label="Budget Function"
                        formName="download-filter__budget-function"
                        onClearSelect={() => handleClear("budgetFunction")}
                        defaultValue={accounts.budgetFunction.code
                            ? accounts.budgetFunction.title 
                            : ""
                        }
                        placeholder="Select budget Function" />
                    <ComboBox
                        optionsArray={subBudgetOptions}
                        onSelect={handleBudgetSubfunctionSelect}
                        label="Budget Sub-Function"
                        formName="download-filter__budget-sub-function"
                        placeholder="Select budget sub-function"
                        onClearSelect={() => handleClear("budgetSubfunction")}
                        defaultValue={accounts.budgetSubfunctions?.code
                            ? accounts.budgetSubfunctions.title
                            : ""
                        }
                        disabled={subBudgetOptions.length <= 1} />
                </div>
                <div className="combo-box-container">
                    <ComboBox
                        optionsArray={agenciesOptions}
                        onSelect={handleAgencySelect}
                        label="Agency"
                        formName="download-filter__agency"
                        onClearSelect={() => handleClear("agency")}
                        defaultValue={accounts.agency.id
                            ? accounts.agency.name
                            : ""
                        }
                        placeholder="Select agency" />
                    <ComboBox
                        optionsArray={federalAccountOptions}
                        onSelect={handleFederalAccountSelect}
                        label="Federal Account"
                        formName="download-filter__federal-account"
                        placeholder="Select federal account"
                        onClearSelect={() => handleClear("federalAccount")}
                        defaultValue={accounts.federalAccount?.id
                            ? accounts.federalAccount.name
                            : ""
                        }
                        disabled={federalAccountOptions.length <= 1} />
                </div>
            </div>
        </div>
    );
});


BudgetAgencyGroup.propTypes = propTypes;
export default BudgetAgencyGroup;
