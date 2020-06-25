/**
 * RecipientTab.jsx
 * Created by Jonathan Hill 06/08/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};


const RecipientTab = (props) => {
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
            </div>
        </button>
    );
};

RecipientTab.propTypes = propTypes;
export default RecipientTab;
