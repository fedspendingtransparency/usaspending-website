/**
 * BudgetCategoriesCountTabContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BudgetCategoriesCountTab from 'components/covid19/budgetCategories/BudgetCategoriesCountTab';

const propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    countField: PropTypes.string,
    subCountField: PropTypes.string
};

const BudgetCategoriesCountTabContainer = (props) => {
    const [count, setCount] = useState(null);
    const [subCount, setSubCount] = useState(null);

    const fetchCovid19CountByType = () => {
        switch (props.type) {
            case "def_codes":
                setTimeout(() => {
                    setCount(2);
                }, 1000);
                break;
            case "agencies":
                setTimeout(() => {
                    setCount(2);
                }, 2000);
                break;
            case "object_classes":
                setTimeout(() => {
                    setCount(2);
                }, 3000);
                break;
            case "program_activities":
                setTimeout(() => {
                    setCount(2);
                }, 4000);
                break;
            case "federal_accounts":
                setTimeout(() => {
                    setCount(2);
                    setSubCount(2);
                }, 5000);
                break;
            default:
                return null;
        }
        return null;
    };
    useEffect(() => {
        // Reset any existing results
        setCount(null);
        setSubCount(null);
        fetchCovid19CountByType();
    }, [props.type, props.countField, props.subCountField]);
    return (
        <BudgetCategoriesCountTab
            count={count}
            subCount={subCount}
            label={props.label}
            subHeading={props.subHeading}
            setActiveTab={props.setActiveTab}
            active={props.active}
            disabled={count === 0}
            type={props.type} />
    );
};

BudgetCategoriesCountTabContainer.propTypes = propTypes;
export default BudgetCategoriesCountTabContainer;
