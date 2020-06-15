/**
 * BudgetCategoriesCountTab.jsx
 * Created by James Lee 6/5/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    count: PropTypes.number,
    subCount: PropTypes.number,
    disabled: PropTypes.bool
};


const BudgetCategoriesCountTab = (props) => {
    const setActiveTab = () => {
        props.setActiveTab(props.type);
    };

    return (
        <button
            className={`count-tabs__button${props.active ? ' count-tabs__button_active' : ''}`}
            onClick={setActiveTab}
            disabled={props.disabled}>
            <div className="count-button">
                <div className="count-button__label">
                    {props.label}
                </div>
                <div className="count-button__count">
                    {(props.count || props.count === 0) ? `${props.count}` : '--'}
                </div>
            </div>
        </button>
    );
};

BudgetCategoriesCountTab.propTypes = propTypes;
export default BudgetCategoriesCountTab;
