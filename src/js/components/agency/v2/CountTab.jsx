/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchSpendingCount } from 'helpers/agencyHelper';

const propTypes = {
    fy: PropTypes.string.isRequired,
    agencyId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool
};

const CountTab = (props) => {
    const [count, setCount] = useState(null);
    const [subCount, setSubCount] = useState(null);

    useEffect(() => {
        const countRequest = fetchSpendingCount(props.agencyId, props.fy, props.id);
        countRequest.promise
            .then((res) => {
                switch (props.id) {
                    case 'budget_function':
                        setCount(res.data.budget_function_count);
                        setSubCount(res.data.budget_sub_function_count);
                        break;
                    case 'program_activity':
                        setCount(res.data.program_activity_count);
                        break;
                    case 'object_class':
                        setCount(res.data.object_class_count);
                        break;
                    case 'federal_account':
                        setCount(res.data.federal_account_count);
                        setSubCount(res.data.treasury_account_count);
                        break;
                    default:
                        // do nothing
                }
            });
    }, [props.id, props.fy, props.agencyId]);
    return (
        <button
            className={`count-tabs__button${props.active ? ' count-tabs__button_active' : ''}`}
            onClick={() => props.setActiveTab(props.id)}>
            <div className="count-button">
                <div className="count-button__label">
                    {props.label}
                </div>
                <div className="count-button__count">
                    {count || '--'}
                </div>
                {props.subHeading ? (
                    <div className="count-button__sub-heading">
                        With {subCount || '--'} {props.subHeading}
                    </div>
                ) : ''}
            </div>
        </button>
    );
};

CountTab.propTypes = propTypes;
export default CountTab;
