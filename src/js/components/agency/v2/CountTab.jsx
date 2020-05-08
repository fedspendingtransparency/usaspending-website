/**
 * AccountSpending.jsx
 * Created by Lizzie Salita 5/8/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
