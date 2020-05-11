/**
 * CountTab.jsx
 * Created by Lizzie Salita 5/8/20
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
    subCount: PropTypes.number
};

const CountTab = (props) => (
    <button
        className={`count-tabs__button${props.active ? ' count-tabs__button_active' : ''}`}
        onClick={() => props.setActiveTab(props.type)}>
        <div className="count-button">
            <div className="count-button__label">
                {props.label}
            </div>
            <div className="count-button__count">
                {props.count || '--'}
            </div>
            {props.subHeading ? (
                <div className="count-button__sub-heading">
                    With {props.subCount || '--'} {props.subHeading}
                </div>
            ) : ''}
        </div>
    </button>
);

CountTab.propTypes = propTypes;
export default CountTab;
