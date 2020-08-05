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
    subCount: PropTypes.number,
    disabled: PropTypes.bool
};


const CountTab = (props) => {
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
                {props.subHeading ? (
                    <div className="count-button__sub-heading">
                    With {(props.subCount || props.subCount === 0) ? `${props.subCount}` : '--'} {props.subHeading}
                    </div>
                ) : ''}
            </div>
        </button>
    );
};

CountTab.propTypes = propTypes;
export default CountTab;
