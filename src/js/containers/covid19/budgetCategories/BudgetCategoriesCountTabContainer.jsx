/**
 * BudgetCategoriesCountTabContainer.jsx
 * Created by James Lee 6/5/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CountTab from 'components/agency/v2/CountTab';
import { fetchDisasterSpendingCount } from '../../../helpers/covid19/budgetCategoriesHelper';

const propTypes = {
    defCodes: PropTypes.array.isRequired,
    fy: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    countField: PropTypes.string,
    subCountField: PropTypes.string
};

const BudgetCategoriesCountTabContainer = (props) => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        if (props.defCodes) {
            // Reset any existing results
            setCount(null);

            const params = {
                fiscal_year: props.fy,
                def_codes: props.defCodes
            };
            const countRequest = fetchDisasterSpendingCount(props.type, params);
            countRequest.promise
                .then((res) => {
                    setCount(res.data[props.countField]);
                });
        }
    }, [props.type, props.countField, props.subCountField]);
    return (
        <CountTab
            count={count}
            label={props.label}
            setActiveTab={props.setActiveTab}
            active={props.active}
            disabled={count === 0}
            type={props.type} />
    );
};

BudgetCategoriesCountTabContainer.propTypes = propTypes;
export default BudgetCategoriesCountTabContainer;
