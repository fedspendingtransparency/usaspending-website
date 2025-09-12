/**
 * ViewTypeButton.jsx
 * Created by Lizzie Salita 10/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    active: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    changeView: PropTypes.func
};

const ViewTypeButton = ({
    active,
    value,
    label,
    icon,
    disabled = false,
    changeView
}) => {
    let activeClass = '';
    let description = `Show results in a ${label.toLowerCase()}`;

    if (active) {
        activeClass = ' active';
    }

    if (active) {
        description += ' (currently selected)';
    }

    const clickedButton = () => {
        changeView(value);
    };

    return (
        <button
            className={`view-button${activeClass}`}
            value={value}
            title={description}
            aria-label={description}
            onClick={clickedButton}
            disabled={disabled}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};

ViewTypeButton.propTypes = propTypes;
export default ViewTypeButton;
