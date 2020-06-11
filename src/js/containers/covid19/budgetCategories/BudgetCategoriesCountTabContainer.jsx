/**
 * BudgetCategoriesCountTabContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BudgetCategoriesCountTab from 'components/covid19/budgetCategories/BudgetCategoriesCountTab';
import { fetchDisasterSpendingCount } from '../../../helpers/covid19/budgetCategoriesHelper';

const propTypes = {
    defCodes: PropTypes.array.isRequired,
    fy: PropTypes.number.isRequired,
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

    useEffect(() => {
        if (props.defCodes) {
            // Reset any existing results
            setCount(null);
            setSubCount(null);

            const params = {
                fiscal_year: props.fy,
                def_codes: props.defCodes
            };
            const countRequest = fetchDisasterSpendingCount(props.type, params);
            countRequest.promise
                .then((res) => {
                    setCount(res.data[props.countField]);
                    if (props.subCountField) {
                        setSubCount(res.data[props.subCountField]);
                    }
                });
        }
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
