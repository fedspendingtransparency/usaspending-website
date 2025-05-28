/**
 * RoundedToggle.jsx
 * created by Nick Torres 5/5/2022
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    onToggle: PropTypes.func,
    onKeyToggle: PropTypes.func,
    toggle: PropTypes.bool,
    id: PropTypes.string
};

const RoundedToggle = ({
    label, onToggle, onKeyToggle, toggle, id = 'outlays-toggle'
}) => (
    <div className="rounded-toggle__wrapper">
        <p className="rounded-toggle__label">{label}</p>
        <label className="rounded-toggle__switch" htmlFor={id} aria-label="toggle to view outlays">
            {toggle && <input type="checkbox" id={id} onKeyDown={onKeyToggle} onClick={onToggle} defaultChecked tabIndex="0" />}
            {!toggle && <input type="checkbox" id={id} onKeyDown={onKeyToggle} onClick={onToggle} tabIndex="0" />}
            <span className="rounded-toggle__slider rounded-toggle__round" />
        </label>
    </div>
);

RoundedToggle.propTypes = propTypes;
export default RoundedToggle;
