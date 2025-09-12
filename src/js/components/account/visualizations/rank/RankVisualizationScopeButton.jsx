/**
 * RankVisualizationScopeButton.jsx
 * Created by Kevin Li 12/29/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeScope: PropTypes.func
};

const RankVisualizationScopeButton = ({
    active, value, label, disabled = false, changeScope
}) => {
    let activeClass = '';
    let description = `Rank results by ${label.toLowerCase()}`;

    if (active) {
        activeClass = 'active';
    }

    if (active) {
        description += ' (currently selected)';
    }

    const clickedButton = () => {
        changeScope(value);
    };

    return (
        <button
            className={`visualization-scope__button ${activeClass}`}
            value={value}
            title={description}
            aria-label={description}
            onClick={clickedButton}
            disabled={disabled}>
            {label}
        </button>
    );
};

RankVisualizationScopeButton.propTypes = propTypes;
export default RankVisualizationScopeButton;
